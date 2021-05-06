<?php

namespace App\Components;

class TitleComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'tag' => 'h2',
			],
			$context
		);
	}
}
