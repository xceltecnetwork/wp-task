<?php

namespace App\Components;

class ButtonComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'link' => [ $this, 'get_link' ],
				'has_link' => [ $this, 'has_link' ],
				'btn_class' => [ $this, 'get_btn_class' ],
			],
			$context
		);
	}

	public function get_link( $link ) {
		return ($link ?: []) + [ 'url' => '', 'target' => '', 'title' => '' ];
	}

	public function has_link( $has_link, $defaults ) {
		return !empty( $defaults[ 'link' ] )
			&& is_array( $defaults[ 'link' ] )
			&& ( !empty( $defaults[ 'link' ][ 'title' ] ) || !empty( $defaults[ 'link' ][ 'url' ] ) );
	}

	public function get_btn_class() {
		return classNames([
			'btn',
			'c-button',
			$this->context['class'],
			$this->context['style'],
		]);
	}
}
