<?php

namespace App\Components;

class ModalComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'id' => 'c-modal_' . uniqid(),
				'title' => '',
				'header' => false,
				'footer',
				'class' => [ $this, 'get_class' ],
			],
			$context
		);
	}

	public function get_class( $class, $defaults ) {
		return classNames([
			$class,
			'modal',
			'fade',
			'c-modal--style-' . $this->context[ 'style' ],
			'c-modal--title-' . sanitize_title( $defaults[ 'title' ] ),
		]);
	}
}
