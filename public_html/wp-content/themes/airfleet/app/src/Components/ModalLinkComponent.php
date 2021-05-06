<?php

namespace App\Components;

class ModalLinkComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'label' => '',
				'modal_id',
			],
			$context
		);
	}
}
