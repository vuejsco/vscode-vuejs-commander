import { WorkspaceConfiguration, workspace } from 'vscode';

import { ENABLE } from './constants.config';

/**
 * The ExtensionConfig class.
 *
 * @class
 * @classdesc The class that represents the configuration of the extension.
 * @export
 * @public
 * @property {WorkspaceConfiguration} config - The workspace configuration
 * @property {boolean} enable - The flag to enable the extension
 * @property {string} currentWorkingDirectory - The current working directory
 * @property {string} hideFromUser - The hide from user flag
 * @example
 * const config = new ExtensionConfig(workspace.getConfiguration());
 * console.log(config.include);
 * console.log(config.exclude);
 */
export class ExtensionConfig {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties

  /**
   * The flag to enable the extension.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.enable);
   */
  enable: boolean;

  /**
   * The default package manager.
   * @type {'npm' | 'yarn' | 'pnpm'}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.defaultPackageManager);
   */
  defaultPackageManager: 'npm' | 'yarn' | 'pnpm';

  /**
   * The current working directory.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.currentWorkingDirectory);
   */
  currentWorkingDirectory: string | undefined;

  /**
   * The terminal name.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * const config = new ExtensionConfig(workspace.getConfiguration());
   * console.log(config.terminalName);
   */
  hideFromUser: boolean;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ExtensionConfig class.
   *
   * @constructor
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof ExtensionConfig
   */
  constructor(readonly config: WorkspaceConfiguration) {
    this.enable = config.get<boolean>('enable', ENABLE);
    this.defaultPackageManager = config.get<'npm' | 'yarn' | 'pnpm'>(
      'packages.defaultPackageManager',
      'npm',
    );
    this.currentWorkingDirectory = config.get<string | undefined>(
      'terminal.currentWorkingDirectory',
      workspace.workspaceFolders?.[0].uri.fsPath,
    );
    this.hideFromUser = config.get<boolean>('terminal.hideFromUser', false);
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The update method.
   *
   * @function update
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * config.update(workspace.getConfiguration());
   */
  update(config: WorkspaceConfiguration): void {
    this.enable = config.get<boolean>('enable', this.enable);
    this.defaultPackageManager = config.get<'npm' | 'yarn' | 'pnpm'>(
      'packages.defaultPackageManager',
      this.defaultPackageManager,
    );
    this.currentWorkingDirectory = config.get<string | undefined>(
      'terminal.currentWorkingDirectory',
      this.currentWorkingDirectory,
    );
    this.hideFromUser = config.get<boolean>(
      'terminal.hideFromUser',
      this.hideFromUser,
    );
  }
}
