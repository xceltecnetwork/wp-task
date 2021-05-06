<?php

namespace App\Components;

class ElComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'class' => '',
				'tag' => 'span',
				'data' => [],
				'attrs' => [ $this, 'get_attrs' ],
			],
			$context
		);
	}

	public function get_attrs( $attrs, $defaults ) {
		$allowed_tags = wp_kses_allowed_html( 'post' );
		$allowed_attrs = $allowed_tags[ $defaults[ 'tag' ] ] ?? [];
		$attrs = [];

		foreach( $allowed_attrs as $attr => $enabled ) {
			if ( $enabled && isset( $defaults[ $attr ] ) ) {
				$attrs[ $attr ] = $defaults[ $attr ];
			}
		}

		foreach( $defaults[ 'data' ] as $key => $value ) {
			$attrs[ "data-$key" ] = $value;
		}

		return $attrs;
	}
}
