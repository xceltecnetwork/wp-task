// Uncomment the next line for importing the log utility
// import { getLogger } from 'loglevel';

export default class Example {
  constructor() {
    // The selector that identifies the main element that this script is attached to.
    this.selector = '.example';

    /**
     * Uncomment the following lines for a logging example.
     */

    // // Create a unique logger for this component.
    // this.logger = getLogger('example');

    // // Optionally disable logging messages below a given level.
    // // To disable logging completely, set it to 'silent'.
    // this.logger.setLevel('warn');
  }

  // eslint-disable-next-line class-methods-use-this
  bootstrap() {
    // The code here is only executed when the selector is present on the page.

    // // Call logging functions as needed.
    // this.logger.info(`Example component only gets bootstraped when selector ${this.selector} is present on the page.`);
    // this.logger.warn('Something unexpected happened');
  }
}
