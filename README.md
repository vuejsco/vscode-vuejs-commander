# VueJS Commander

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-vuejs-commander?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-vuejs-commander)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-vuejs-commander?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-vuejs-commander)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-vuejs-commander?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-vuejs-commander)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-vuejs-commander?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-vuejs-commander&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/vuejsco/vscode-vuejs-commander?style=for-the-badge&logo=github)](https://github.com/vuejsco/vscode-vuejs-commander)
[![GitHub license](https://img.shields.io/github/license/vuejsco/vscode-vuejs-commander?style=for-the-badge&logo=github)](https://github.com/vuejsco/vscode-vuejs-commander/blob/main/LICENSE)

**VueJS Commander** is a Visual Studio Code extension designed to streamline the execution of common Vue.js and Nuxt.js commands. It simplifies project creation, development server management, and production builds directly from the VS Code command palette.

## Index

- [VueJS Commander](#vuejs-commander)
  - [Index](#index)
  - [Requirements](#requirements)
  - [Setup](#setup)
    - [Step 1: Open Command Palette in VS Code](#step-1-open-command-palette-in-vs-code)
    - [Step 2: Add Configuration to `settings.json`](#step-2-add-configuration-to-settingsjson)
    - [Step 3: Restart VS Code](#step-3-restart-vs-code)
  - [Configuration](#configuration)
  - [Commands](#commands)
  - [Community](#community)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [License](#license)

## Requirements

- **VS Code 1.88.0** or higher.

## Setup

### Step 1: Open Command Palette in VS Code

1. Open the **Command Palette** in VS Code:
   - Windows: `CTRL + SHIFT + P`
   - macOS: `CMD + SHIFT + P`

2. Open the **Workspace Settings**:
   - Type `Preferences: Open Workspace Settings (JSON)`.

### Step 2: Add Configuration to `settings.json`

Copy the following configuration into your `.vscode/settings.json` file:

```json
{
    "vuejs.commander.enable": true,
    "vuejs.commander.packages.defaultPackageManager": "npm",
    "vuejs.commander.terminal.currentWorkingDirectory": "/path/to/your/project", // MUST BE an absolute path
    "vuejs.commander.terminal.hideFromUser": false,
}
```

### Step 3: Restart VS Code

Restart VS Code to apply the settings.

## Configuration

You can customize **VueJS Commander** by modifying its settings in `.vscode/settings.json`. Some of the available settings are:

- `vuejs.commander.enable`: Enable or disable the extension.
- `vuejs.commander.packages.defaultPackageManager`: Set the default package manager for the project. Options are `npm`, `yarn` or `pnpm` (default: `"npm"`).
- `vuejs.commander.terminal.currentWorkingDirectory`: Set the current working directory for the terminal. This must be an absolute path (default: `"/path/to/your/project"`).
- `vuejs.commander.terminal.hideFromUser`: Hide the terminal from the user. If set to `true`, the terminal will run in the background (default: `false`).

## Commands

| Command                                  | Description                        |
|------------------------------------------|------------------------------------|
| `Create New Project`                     | Create a new Vue/Nuxt project      |
| `Start Development Server`               | Start the development server       |
| `Build for Production`                   | Build the project for production   |

## Community

This extension is maintained by the **Vue JS Colombia Meetup Community**. Stay updated on new features and improvements:

- [GitHub](https://github.com/vuejsco)
- [Twitter (X)](https://twitter.com/vuejsco)

## Contributing

We welcome contributions from the community! To get started:

1. Fork the [GitHub repository](https://github.com/vuejsco/vscode-vuejs-commander).
2. Make your changes and submit a pull request.

For contribution guidelines, refer to the [Contribution Guide](./CONTRIBUTING.md).

## Code of Conduct

We value a welcoming and inclusive community. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating.

## Changelog

See the full list of changes in the [CHANGELOG.md](./CHANGELOG.md) file.

## License

This extension is licensed under the MIT License. See the [MIT License](https://opensource.org/licenses/MIT) for details.
