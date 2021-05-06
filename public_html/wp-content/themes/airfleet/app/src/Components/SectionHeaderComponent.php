<?php

namespace App\Components;

class SectionHeaderComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'title' => [ $this, 'get_title' ],
				'subtitle' => [ $this, 'get_subtitle' ],
				'has_title' => [ $this, 'has_title' ],
			],
			$context
		);
	}

	public function get_title( $title ) {
		return $title + [ 'title' => '', 'tag' => 'h2' ];
	}

	public function get_subtitle( $subtitle ) {
		return $subtitle + [ 'title' => '', 'tag' => 'h4' ];
	}

	public function has_title( $has_title, $defaults ) {
		return !empty( $defaults['title']['title'] )
			|| !empty( $defaults['subtitle']['title'] );
	}
}
