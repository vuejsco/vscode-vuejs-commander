import { BaseCommand } from './base.command';

/**
 * The CreateProjectCommand class.
 *
 * @class
 * @classdesc The class that represents the command to create a project.
 * @extends {BaseCommand}
 * @export
 * @public
 * @example
 * const command = new CreateProjectCommand(config);
 */
export class CreateProjectCommand extends BaseCommand {
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
   * @memberof CreateProjectCommand
   */
  async execute(): Promise<void> {
    this.service.createProject();
  }
}
