<?php

namespace App\Components;

class FormComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'source' => [ $this, 'get_source' ],
				'class' => [ $this, 'get_class' ],
			],
			$context
		);
	}

	public function get_source( $source, $defaults ) {
		if ( ! empty( $source ) ) {
			return $source;
		}

		if ( empty( $this->context['form'] ) ) {
			return false;
		}

		return af_field( 'source', $this->context['form'] );
	}

	public function get_class( $class, $defaults ) {
		return classNames([
			$class,
			'c-form--' . $defaults['source'],
		]);
	}
}
