const detectProcessVersion = (processType: string): string => {
    const version: unknown = Reflect.get(process.versions, processType);
    if (typeof version !== 'string') {
        throw new Error(`failed to detect process version: ${processType}`);
    }
    return version;
};

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    for (const processType of ['chrome', 'node', 'electron']) {
        replaceText(`${processType}-version`, detectProcessVersion(processType));
    }
});
