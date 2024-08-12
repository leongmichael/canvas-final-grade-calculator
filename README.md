# <img src="imgs/Logo500x500.png" alt="favicon" width="40" height="40"/> Canvas Final Grade Calculator

Web extension that fetches your Canvas grade and calculates the final exam score needed for your desired grade.

Download on the [Chrome Web Store](https://chromewebstore.google.com/detail/canvas-final-grade-calcul/dmbbpohkjofcbbibpfjmhobfebgckihm)!

<div align="center">
    <img src="imgs/CanvasDemo.jpg" width="640" height="400" alt="demo"/>
</div>

## Setup

[Install](https://nodejs.org/en/download) Node.js 20 \
Confirm installation by running `node --version` in the command line.

To add to Google Chrome locally,

1. Navigate to `chrome://extensions` in the browser
2. Enable developer mode
3. Click `manage extensions`
4. Click `load unpacked`
5. Select the `dist` directory

## Available Scripts

### `npm run build`

Creates a production-ready version of your project.

### `npm install`

Installs all packages listed in the `package.json` file in the directory you are in.

### `npm run format`

Formats all code using Prettier. \
In VS Code, you can install the plugin [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to format code automatically when saving a file.
