enum Category {
    Cursive = 'cursive',
    Monospace = 'monospace',
    SansSerif = 'sans-serif',
    Serif = 'serif',
}

enum Stretch {
    UltraCondensed = 'ultra-condensed',
    ExtraCondensed = 'extra-condensed',
    Condensed = 'condensed',
    SemiCondensed = 'semi-condensed',
    Normal = 'normal',
    SemiExpanded = 'semi-expanded',
    Expanded = 'expanded',
    ExtraExpanded = 'extra-expanded',
    UltraExpanded = 'ultra-expanded',
}

enum Style {
    Italic = 'italic',
    Normal = 'normal',
    Oblique = 'oblique',
}

enum Weight {
    Thin = 100,
    ExtraLight = 200,
    Light = 300,
    Regular = 400,
    Medium = 500,
    SemiBold = 600,
    Bold = 700,
    ExtraBold = 800,
    Black = 900,
}

interface Asset {
    filename: string,
    stretch?: Stretch,
    style?: Style,
    weight?: Weight,
}

class FontFamily {
    public readonly name: string;
    public readonly category: Category;
    public readonly isWebSafe: boolean = false;

    private readonly assets: Asset[];
    private _loaded = false;

    constructor(name: string, category: Category, assets: Asset[]) {
        const webSafeFont = matchWebSafeFont(name);
        if (webSafeFont !== null) {
            this.name = webSafeFont;
            this.category = webSafeFontCategories[webSafeFont];
            this.isWebSafe = true;
            this.assets = [];
            this._loaded = true;
        } else if (assets.length === 0) {
            throw new Error(`non-web-safe font requires at least one asset: ${name}`);
        } else {
            this.name = name;
            this.category = category;
            this.assets = assets;
        }
    }

    get cssFontFamily() {
        return `'${this.name}', ${this.category}`;
    }

    get loaded() {
        return this._loaded;
    }

    public async load() {
        if (this._loaded) {
            return;
        }

        const fonts = this.assets.map(({ filename, weight, stretch, style }) => {
            return new FontFace(
                this.name,
                `url(fonts/${filename})`,
                { stretch, style, weight: weight?.toString() }
            );
        });

        await Promise.all(fonts.map(async font => {
            await font.load();
            document.fonts.add(font);
        }));

        this._loaded = true;
    }
}

const supportedFontFamilyData = {
    ['Arial']: {
        category: Category.SansSerif,
        assets: [],
    },
    ['Montserrat']: {
        category: Category.SansSerif,
        assets: [
            {
                filename: 'Montserrat-ExtraLight.woff2',
                style: Style.Normal,
                weight: Weight.ExtraLight,
            },
            {
                filename: 'Montserrat-Regular.woff2',
                style: Style.Normal,
                weight: Weight.Regular,
            },
            {
                filename: 'Montserrat-SemiBold.woff2',
                style: Style.Normal,
                weight: Weight.SemiBold,
            },
        ],
    },
    ['Open Sans']: {
        category: Category.SansSerif,
        assets: [
            {
                filename: 'OpenSans-Regular.ttf',
                style: Style.Normal,
                weight: Weight.Regular,
            },
            {
                filename: 'OpenSans-SemiBold.ttf',
                style: Style.Normal,
                weight: Weight.SemiBold,
            },
        ]
    }
};

export const getFontFamily = (family: keyof typeof supportedFontFamilyData): FontFamily => {
    const { assets, category } = supportedFontFamilyData[family];
    return new FontFamily(family, category, assets);
}

enum WebSafeFont {
    Arial = 'Arial',
    Verdana = 'Verdana',
    Helvetica = 'Helvetica',
    Tahoma = 'Tahoma',
    TrebuchetMS = 'Trebuchet MS',
    TimesNewRoman = 'Times New Roman',
    Georgia = 'Georgia',
    Garamond = 'Garamond',
    CourierNew = 'Courier New',
    BrushScriptMT = 'Brush Script MT',
}

const webSafeFontCategories = {
    [WebSafeFont.Arial]: Category.SansSerif,
    [WebSafeFont.Verdana]: Category.SansSerif,
    [WebSafeFont.Helvetica]: Category.SansSerif,
    [WebSafeFont.Tahoma]: Category.SansSerif,
    [WebSafeFont.TrebuchetMS]: Category.SansSerif,
    [WebSafeFont.TimesNewRoman]: Category.Serif,
    [WebSafeFont.Georgia]: Category.Serif,
    [WebSafeFont.Garamond]: Category.Serif,
    [WebSafeFont.CourierNew]: Category.Monospace,
    [WebSafeFont.BrushScriptMT]: Category.Cursive,
};

const webSafeFontLowercaseNames = {
    'arial': WebSafeFont.Arial,
    'verdana': WebSafeFont.Verdana,
    'helvetica': WebSafeFont.Helvetica,
    'tahoma': WebSafeFont.Tahoma,
    'trebuchet ms': WebSafeFont.TrebuchetMS,
    'times new roman': WebSafeFont.TimesNewRoman,
    'georgia': WebSafeFont.Georgia,
    'garamond': WebSafeFont.Garamond,
    'courier new': WebSafeFont.CourierNew,
    'brush script mt': WebSafeFont.BrushScriptMT,
};

const nameIsLowercaseWebSafeFont = (name: string): name is keyof typeof webSafeFontLowercaseNames => (
    name in webSafeFontLowercaseNames
);

const matchWebSafeFont = (name: string): WebSafeFont|null => {
    const lowercaseName = name.toLowerCase();
    if (nameIsLowercaseWebSafeFont(lowercaseName)) {
        return webSafeFontLowercaseNames[lowercaseName];
    }
    return null;
}
