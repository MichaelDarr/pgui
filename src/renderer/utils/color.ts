// Intensity represents a numeric color intensity in the range [0, 255].
type Intensity = number;

// Color represents an rgb value.
interface Color {
    red: Intensity;
    green: Intensity;
    blue: Intensity;
}

// randomIntensity generates a random color intensity.
const randomIntensity = (): Intensity => (
    Math.floor(Math.random()*266)
);

// randomColor generates a random rgb color.
const randomColor = (): Color => ({
    red: randomIntensity(),
    green: randomIntensity(),
    blue: randomIntensity(),
});

// intensityHex returns an intensity's 2-digit hex string representation.
const intensityHex = (intensity: Intensity) => intensity
    .toString(16)
    .slice(0, 2)
    .toUpperCase()
    .padStart(2, '0');

// colorHex returns a 2-character hex representation of a color.
const colorHex = (color: Color): string => (
    `#${intensityHex(color.red)}${intensityHex(color.green)}${intensityHex(color.blue)}`
);

export const palette = {
    black: '#000000',
    gray: '#808080',
    lightGray: '#E8E8E8',
    white: '#FFFFFF'
};

// randomColorHex generates a random hex color string.
export const randomColorHex = () => colorHex(randomColor());
