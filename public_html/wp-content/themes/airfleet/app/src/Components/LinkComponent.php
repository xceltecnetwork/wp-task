<?php

namespace App\Components;

class LinkComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'url' => '',
				'title' => '',
				'target' => '_self',
				'data' => [],
				'attributes' => [ $this, 'get_attributes' ],
			],
			$context
		);
	}

	public function get_attributes( $attrs, $defaults ) {
		$attrs = [
			'href' => $defaults['url'],
			'class' => $this->context['class'],
			'target' => $defaults['target'],
		];

		foreach( $defaults[ 'data' ] as $key => $value ) {
			$attrs[ 'data-' . $key ] = $value;
		}

		return $attrs;
	}
}
