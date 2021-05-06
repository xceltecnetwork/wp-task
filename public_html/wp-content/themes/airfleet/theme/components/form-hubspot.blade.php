@if(!empty($fields))
	<div class="c-form-hubspot"
		@attrs([
			'id' => $id,
			'data-portal-id' => $portal_id,
			'data-form-id' => $fields['form_id'],
			'data-include-styles' => ($fields['include_styles'] ? 'true' : 'false'),
			'data-redirect-url' => $redirect_url,
			'data-submit-button-class' => 'c-form-hubspot__submit c-btn-form-submit',
			'data-error-class' => 'c-form-hubspot__input c-form-hubspot__input--error c-input-error',
			'data-error-message-class' => 'c-form-hubspot__error-messages c-error-messages',
		])>
	</div>
@endif
