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
  public async createProject(targetFolder?: Uri): Promise<void> {
    // Vue 3 con Vite (moderno)
    const createProjectVue3Commands: PackageManagerAction[] = [
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

    // Vue 2 con CLI (legacy pero aún usado en proyectos existentes)
    const createProjectVue2Commands: PackageManagerAction[] = [
      {
        type: 'npm',
        command: 'npm init vue@legacy .',
      },
      {
        type: 'yarn',
        command: 'yarn create vue@legacy .',
      },
      {
        type: 'pnpm',
        command: 'pnpm create vue@legacy .',
      },
    ];

    // Nuxt
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

    // Solicitar el tipo de proyecto
    const projectType = await window.showQuickPick(['Vue 3', 'Vue 2', 'Nuxt'], {
      placeHolder: l10n.t('Select the type of project to create'),
    });

    if (!projectType) {
      const message = l10n.t('No project type selected');
      window.showErrorMessage(message);
      return;
    }

    switch (projectType) {
      case 'Vue 3':
        await this.executeCommand(createProjectVue3Commands, targetFolder);
        break;

      case 'Vue 2':
        await this.executeCommand(createProjectVue2Commands, targetFolder);
        break;

      case 'Nuxt':
        await this.executeCommand(createProjectNuxtCommands, targetFolder);
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
  public async startServer(targetFolder?: Uri): Promise<void> {
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

    await this.executeCommand(startDevServerCommands, targetFolder);
  }

  /**
   * The method that builds the project.
   *
   * @returns {Promise<void>} The promise that resolves when the command is executed
   */
  public async buildProject(targetFolder?: Uri): Promise<void> {
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
    await this.executeCommand(buildCommands, targetFolder);
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
    targetFolder?: Uri,
  ): Promise<void> {
    try {
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

      this.openTerminalAndRun(
        selectedInstallationManager.command,
        targetFolder,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const message = l10n.t('Error executing command: {0}', errorMessage);
      window.showErrorMessage(message);
    }
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
  private resolveTerminalCwd(targetFolder?: Uri): Uri | undefined {
    if (targetFolder) {
      const explorerFolder = workspace.getWorkspaceFolder(targetFolder);

      if (explorerFolder) {
        return explorerFolder.uri;
      }
    }

    const { currentWorkingDirectory, workspaceSelection } = this.config;

    if (currentWorkingDirectory) {
      const configuredFolder = workspace.getWorkspaceFolder(
        Uri.file(currentWorkingDirectory),
      );

      if (configuredFolder) {
        return configuredFolder.uri;
      }

      const message = l10n.t(
        'The specified working directory does not exist or is not accessible: {0}. Using the selected workspace folder instead.',
        currentWorkingDirectory,
      );
      window.showWarningMessage(message);
    }

    if (workspaceSelection) {
      const selectedFolder = workspace.getWorkspaceFolder(
        Uri.file(workspaceSelection),
      );

      if (selectedFolder) {
        return selectedFolder.uri;
      }
    }

    return undefined;
  }

  private openTerminalAndRun(command: string, targetFolder?: Uri): void {
    try {
      const { hideFromUser } = this.config;
      const cwd = this.resolveTerminalCwd(targetFolder);

      // Crear y mostrar la terminal
      const terminal = window.createTerminal({
        name: 'VueJS Commander',
        cwd,
        hideFromUser,
      });

      terminal.show();

      // Informar al usuario qué comando se va a ejecutar
      const infoMessage = l10n.t('Running: {0}', command);
      window.showInformationMessage(infoMessage);

      // Enviar el comando a la terminal
      terminal.sendText(command);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const message = l10n.t(
        'Error executing terminal command: {0}',
        errorMessage,
      );
      window.showErrorMessage(message);
    }
  }
}
