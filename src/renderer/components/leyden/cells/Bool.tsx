import { CellRenderer } from 'leyden-react';

import { Paragraph } from 'renderer/components/Text';

export const Bool: CellRenderer<'Bool'> = ({
    attributes,
    children,
    element,
}) => {
    const copyText = element.value
        ? 'True'
        : 'False';

    return (
        <section {...attributes}>
            <Paragraph>
                {copyText}
            </Paragraph>
            {children}
        </section>
    );
};
