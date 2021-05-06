<?php

namespace App\Components;

class CtaComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		// For each of these properties, we are either
		// going to take the value that was passed in the context
		// or if there is not value in the context
		// then we search for the value in a custom field of the post
		$properties = [
			'background',
			'section_header',
			'text',
			'buttons',
		];
		$properties_defaults = [];

		foreach ( $properties as $property ) {
			$properties_defaults[ $property ] = function ( $value, $defaults, $defined_vars ) use ( $property ) {
				return call_user_func(
					[ $this, 'get_value_or_post_field' ],
					$property,
					$defaults,
					$defined_vars
				);
			};
		}

		return af_defaults(
			array_merge(
				[ 'post' ],
				$properties_defaults
			),
			$context
		);
	}

	protected function get_value_or_post_field( $field, $defaults, $defined_vars ) {
		if ( isset( $defined_vars[ $field ] ) && $defined_vars[ $field ] ) {
			return $defined_vars[ $field ];
		}

		if ( isset( $defaults[ 'post' ] ) ) {
			return af_field( $field, $defaults[ 'post' ] );
		}

		return [];
	}
}
