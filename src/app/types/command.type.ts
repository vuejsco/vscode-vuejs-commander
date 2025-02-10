/**
 * The Command interface.
 *
 * @interface
 * @export
 * @public
 * @property {Promise<void>} execute - The execute method
 * @example
 * class Command implements Command {
 *   async execute(): Promise<void> {
 *     console.log('Hello, World!');
 *   }
 * }
 */
export interface Command {
  execute(): Promise<void>;
}
