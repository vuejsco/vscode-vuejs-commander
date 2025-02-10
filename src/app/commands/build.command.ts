import { BaseCommand } from './base.command';

/**
 * The BuildCommand class.
 *
 * @class
 * @classdesc The class that represents the command to build a project.
 * @extends {BaseCommand}
 * @export
 * @public
 * @example
 * const command = new BuildCommand(config);
 */
export class BuildCommand extends BaseCommand {
  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * The execute method.
   *
   * @async
   * @method execute
   * @public
   * @memberof BuildCommand
   */
  async execute(): Promise<void> {
    this.service.buildProject();
  }
}
