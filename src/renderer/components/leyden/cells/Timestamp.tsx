import { CellRenderer } from 'leyden-react';

import { Paragraph } from 'renderer/components/Text';

export const Timestamp: CellRenderer<'Timestamp'> = ({
    attributes,
    children,
    element,
}) => {
    const copyText = element.value.toString();

    return (
        <section {...attributes}>
            <Paragraph>
                {copyText}
            </Paragraph>
            {children}
        </section>
    );
};
