import { BaseCommand } from './base.command';

/**
 * The DevServerCommand class.
 *
 * @class
 * @classdesc The class that represents the command to start the server.
 * @extends {BaseCommand}
 * @export
 * @public
 * @example
 * const command = new DevServerCommand(config);
 */
export class DevServerCommand extends BaseCommand {
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
   * @memberof DevServerCommand
   */
  async execute(): Promise<void> {
    this.service.startServer();
  }
}
