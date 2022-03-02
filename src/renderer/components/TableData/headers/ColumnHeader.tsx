/* eslint-disable react/prop-types */
import { HeaderRenderer } from 'leyden-react';
import { useRecoilValue } from 'recoil';

import { tableFieldsState } from '..';

export const ColumnHeader: HeaderRenderer = ({ position }) => {
    const fields = useRecoilValue(tableFieldsState);

    if (fields === null || position >= fields.length) {
        return null;
    }

    return (
        <section>
            {fields[position].name}
        </section>
    );
};
