import { getLogger } from 'loglevel';
import loadJs from './loadJs';

/**
 * Script to load and handle HubSpot forms.
 * @see https://developers.hubspot.com/docs/methods/forms/advanced_form_options
 */
export default class FormHubSpot {
  constructor() {
    this.selector = '.c-form-hubspot';
    this.logger = getLogger('c-form-hubspot');
    this.logger.setLevel('warn');
  }

  bootstrap() {
    this.loadScripts().then(() => this.loadForms());
  }

  loadScripts() {
    this.logger.info('loadScripts', 'Loading HubSpot form scripts');

    return Promise.all([
      loadJs('https://js.hsforms.net/forms/v2-legacy.js'),
      loadJs('https://js.hsforms.net/forms/v2.js'),
    ]).catch(error => {
      this.logger.warn('bootstrap', 'Unable to load HubSpot form scripts', error);
    });
  }

  loadForms() {
    $(this.selector).each((index, element) => {
      const $formDiv = $(element);

      this.loadForm($formDiv);
    });
  }

  loadForm($formDiv) {
    this.logger.info('loadForm', $formDiv);

    if (!window.hbspt.forms) {
      this.logger.warn('loadForm', 'Unable to load form. HubSpot Forms API script not available.');

      return false;
    }
    const formData = this.getFormData($formDiv);

    window.hbspt.forms.create(formData);
  }

  getFormData($formDiv) {
    const formData = {
      target: `#${$formDiv.attr('id')}`,
      formInstanceId: $formDiv.attr('id'),
      portalId: $formDiv.data('portal-id'),
      formId: $formDiv.data('form-id'),
      submitButtonClass: $formDiv.data('submit-button-class'),
      errorClass: $formDiv.data('error-class'),
      errorMessageClass: $formDiv.data('error-message-class'),
      onBeforeFormInit: ctx => this.onBeforeFormInit($formDiv, ctx),
      onFormReady: $form => this.onFormReady($formDiv, $form),
      onFormSubmit: $form => this.onFormSubmit($formDiv, $form),
      onFormSubmitted: () => this.onFormSubmitted($formDiv),
    };

    if ($formDiv.data('redirect-url')) {
      formData.redirectUrl = $formDiv.data('redirect-url');
    }

    if ($formDiv.data('include-styles') === false) {
      formData.css = '';
      formData.cssRequired = '';
    }

    return formData;
  }

  onBeforeFormInit($formDiv, ctx) {
    this.logger.info('onBeforeFormInit', $formDiv, ctx);
  }

  onFormReady($formDiv, $form) {
    this.logger.info('onFormReady', $formDiv, $form);
  }

  onFormSubmit($formDiv, $form) {
    this.logger.info('onFormSubmit', $formDiv, $form);
  }

  onFormSubmitted($formDiv) {
    this.logger.info('onFormSubmitted', $formDiv);
  }
}
