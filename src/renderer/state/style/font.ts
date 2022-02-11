import { atom } from 'recoil';

import { getFontFamily } from '../../utils/font';

export const primaryFontFamilyState = atom({
    key: 'stylePrimaryFontState',
    default: getFontFamily('Arial').cssFontFamily,
});

