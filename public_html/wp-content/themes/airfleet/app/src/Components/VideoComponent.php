<?php

namespace App\Components;

class VideoComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'class' => [ $this, 'get_class' ],
			],
			$context
		);
	}

	public function get_class( $class ) {
		$source_class = 'c-video--source-' . $this->context['source'];

		return classNames([
			$class,
			$source_class => ! empty( $this->context['source'] ),
		]);
	}
}
