<?php

namespace App\Components;

class FormHubspotComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'form',
				'id' => uniqid('c-form-hubspot-'),
				'portal_id' => af_field( 'hubspot_portal_id', 'option' ),
				'fields' => [ $this, 'get_fields' ],
				'redirect_url' => [ $this, 'get_redirect_url' ],
			],
			$context
		);
	}

	public function get_fields( $fields, $defaults ) {
		if ( isset( $fields ) && ! empty( $fields ) ) {
			// Accept $fields array instead of reading custom fields from $form object.
			return $fields;
		}

		if ( empty( $defaults['form'] ) ) {
			return false;
		}

		return af_field( 'hubspot', $defaults['form'] );
	}

	public function get_redirect_url( $redirect_url, $defaults ) {
		if ( empty( $defaults['fields'] )) {
			// Bail when we don't have any fields.
			return false;
		}
		$fields = $defaults['fields'];

		if ( !isset( $fields['redirect'] ) || empty( $fields['redirect'] ) || 'default' === $fields['redirect'] ) {
			// Bail when "redirect" custom field is not set or is "default".
			return false;
		}
		$redirect_type = $fields['redirect'];
		$redirect_key = "redirect_$redirect_type";

		if ( ! isset( $fields[$redirect_key] ) || empty( $fields[$redirect_key] ) ) {
			// Bail when the redirect value based on its type is not set or empty.
			return false;
		}

		if ( $redirect_type === 'page' ) {
			// If the redirect is page, get its permalink.
			// Because its a relationship field, it will return an array, so get the first value.
			return get_permalink( $fields[$redirect_key][0] );
		}

		return $fields[$redirect_key];
	}
}
