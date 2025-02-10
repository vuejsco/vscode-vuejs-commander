import { ExtensionConfig } from '../configs';
import { TerminalService } from '../services';
import type { Command } from '../types';

/**
 * The BaseCommand abstract class.
 *
 * @abstract
 * @class
 * @classdesc The class that represents the base command.
 * @implements {Command}
 * @export
 * @public
 * @example
 * class Command extends BaseCommand {
 *   async execute(): Promise<void> {
 *     console.log('Hello, World!');
 *   }
 * }
 */
export abstract class BaseCommand implements Command {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Protected properties

  /**
   * The protected service.
   *
   * @type {TerminalService}
   * @protected
   * @memberof BaseCommand
   */
  protected service: TerminalService;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * The BaseCommand constructor.
   *
   * @constructor
   * @memberof BaseCommand
   *
   * @param {ExtensionConfig} config - The extension configuration
   */
  constructor(config: ExtensionConfig) {
    this.service = new TerminalService(config);
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * The execute method.
   *
   * @async
   * @function execute
   * @memberof BaseCommand
   *
   * @returns {Promise<void>}
   */
  abstract execute(): Promise<void>;
}
