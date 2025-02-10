import { l10n, Uri, window, workspace } from 'vscode';
import { ExtensionConfig } from '../configs';

/**
 * The package installation interface.
 * @interface
 * @public
 */
interface PackageManagerAction {
  type: 'npm' | 'yarn' | 'pnpm';
  command: string;
}

/**
 * The TerminalService class.
 *
 * @class
 * @classdesc The class that represents the example controller.
 * @export
 * @public
 * @example
 * const controller = new TerminalService(config);
 */
export class TerminalService {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * The constructor.
   *
   * @param {ExtensionConfig} config - The extension configuration.
   * @memberof TerminalService
   */
  constructor(private readonly config: ExtensionConfig) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * The method that creates a new project.
   *
   * @returns {Promise<void>} The promise that resolves when the command is executed.
   */
  public async createProject(): Promise<void> {
    const createProjectVueCommands: PackageManagerAction[] = [
      {
        type: 'npm',
        command: 'npm create vite@latest . -- --template vue',
      },
      {
        type: 'yarn',
        command: 'yarn create vite . --template vue',
      },
      {
        type: 'pnpm',
        command: 'pnpm create vite . --template vue',
      },
    ];

    const createProjectNuxtCommands: PackageManagerAction[] = [
      {
        type: 'npm',
        command: 'npx nuxi init .',
      },
      {
        type: 'yarn',
        command: 'yarn create nuxt-app .',
      },
      {
        type: 'pnpm',
        command: 'pnpm create nuxt-app .',
      },
    ];

    const projectType = await window.showQuickPick(['Vue', 'Nuxt'], {
      placeHolder: l10n.t('Select the type of project to create'),
    });

    if (!projectType) {
      const message = l10n.t('No project type selected');
      window.showErrorMessage(message);
      return;
    }

    switch (projectType) {
      case 'Vue':
        await this.executeCommand(createProjectVueCommands);
        break;

      case 'Nuxt':
        await this.executeCommand(createProjectNuxtCommands);
        break;

      default:
        break;
    }
  }

  /**
   * The method that starts the server.
   *
   * @returns {Promise<void>} The promise that resolves when the command is executed
   */
  public async startServer(): Promise<void> {
    const startDevServerCommands: PackageManagerAction[] = [
      {
        type: 'npm',
        command: 'npm run dev',
      },
      {
        type: 'yarn',
        command: 'yarn dev',
      },
      {
        type: 'pnpm',
        command: 'pnpm dev',
      },
    ];

    await this.executeCommand(startDevServerCommands);
  }

  /**
   * The method that builds the project.
   *
   * @returns {Promise<void>} The promise that resolves when the command is executed
   */
  public async buildProject(): Promise<void> {
    // Define the build commands
    const buildCommands: PackageManagerAction[] = [
      {
        type: 'npm',
        command: 'npm run build',
      },
      {
        type: 'yarn',
        command: 'yarn build',
      },
      {
        type: 'pnpm',
        command: 'pnpm build',
      },
    ];

    // Execute the build command
    await this.executeCommand(buildCommands);
  }

  // Private methods

  /**
   * The method that creates a new project.
   *
   * @param {string} name The name of the command.
   * @param {Array} install The installation commands.
   *
   * @returns {Promise<void>} The promise that resolves when the command is executed.
   */
  private async executeCommand(
    packageManagerActions: PackageManagerAction[],
  ): Promise<void> {
    const { defaultPackageManager } = this.config;

    const availablePackageManagers = packageManagerActions.map(
      (manager) => manager.type,
    );

    let selectedPackageManager;

    if (!availablePackageManagers.includes(defaultPackageManager)) {
      selectedPackageManager = await window.showQuickPick(
        availablePackageManagers,
        {
          placeHolder: l10n.t(
            'Select the package manager to run the command with',
          ),
        },
      );

      if (!selectedPackageManager) {
        const message = l10n.t('No package manager selected');
        window.showErrorMessage(message);
        return;
      }
    } else {
      selectedPackageManager = defaultPackageManager;
    }

    const selectedInstallationManager = packageManagerActions.find(
      (manager) => manager.type === selectedPackageManager,
    );

    if (!selectedInstallationManager) {
      const message = l10n.t('The selected package manager is not supported');
      window.showErrorMessage(message);
      return;
    }

    this.openTerminalAndRun(selectedInstallationManager.command);
  }

  /**
   * The method that opens a terminal and executes a command.
   *
   * @param {string} name The name of the command.
   * @param {string} message The message to display.
   * @param {string} command The command to run.
   *
   * @returns {void}
   */
  private openTerminalAndRun(command: string): void {
    const { currentWorkingDirectory, hideFromUser } = this.config;

    let cwd: Uri | undefined;

    if (
      currentWorkingDirectory &&
      workspace.getWorkspaceFolder(Uri.file(currentWorkingDirectory))
    ) {
      cwd = Uri.file(currentWorkingDirectory);
    }

    const terminal = window.createTerminal({
      cwd,
      hideFromUser,
    });

    terminal.show();

    terminal.sendText(command);
  }
}
