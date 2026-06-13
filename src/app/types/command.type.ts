import type { Uri } from 'vscode';

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
  execute(targetFolder?: Uri): Promise<void>;
}
