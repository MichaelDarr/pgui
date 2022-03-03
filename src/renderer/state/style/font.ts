import { atom } from 'recoil';

import { getFontFamily } from 'renderer/common/font';

export const primaryFontFamilyState = atom({
    key: 'stylePrimaryFontState',
    default: getFontFamily('Arial').cssFontFamily,
});

