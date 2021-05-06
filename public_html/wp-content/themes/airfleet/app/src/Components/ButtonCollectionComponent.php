<?php

namespace App\Components;

class ButtonCollectionComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'button_class' => '',
				'container_class' => [ $this, 'get_container_class' ],
				'buttons' => [ $this, 'get_buttons' ],
			],
			$context
		);
	}

	public function get_container_class( $container_class ) {
		return classNames([
			'c-button-collection',
			$container_class,
		]);
	}

	public function get_buttons( $buttons, $defaults ) {
		return array_map(
			function ( $button ) use ( $defaults ) {
				$button['class'] = classNames([
					$button['class'] ?? '',
					$defaults['button_class']
				]);

				return $button;
			},
			$buttons ?? []
		);
	}
}
