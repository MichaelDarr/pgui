import { Cell, LeydenEditor, Table } from 'leyden';
import { Editor, Transforms } from 'slate';

import { Serialize } from 'renderer/serialize';

import { PguiEditor } from '.';

export const withPlaceholders = <T extends PguiEditor>(editor: T): T => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        if (Table.isTableLenient(node)) {
            // Populate empty tables with a single row of placeholder cells.
            if (node.children.length === 0) {
                const cells = Array.from({ length: node.columns }, Serialize.Cell.Placeholder);
                Transforms.insertNodes(editor, cells, { at: [...path, 0] });
                return;
            }
            // If the first or last table cell is a placeholder, remove all placeholders.
            // Running this check before the flush is ideal for performance, but if cells are
            // placed before in the middle of the placeholders, the placeholders will linger in the
            // now-populated table.
            if (Cell.isCell(node.children[0], { type: 'Placeholder' })
             || Cell.isCell(node.children[node.children.length-1], { type: 'Placeholder' })) {
                Editor.withoutNormalizing(editor, () => {
                    for (const [, coords] of Table.cells(node, { type: 'Placeholder' })) {
                        Transforms.removeNodes(editor, {
                            at: LeydenEditor.cellPath(editor, { at: coords }),
                        });
                    }
                })
            }
        }

        normalizeNode(entry);
    };

    return editor;
};
