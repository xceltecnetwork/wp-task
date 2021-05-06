<?php

namespace App\Components;

class ShareComponent implements \App\Core\ComponentComposer {
	public function __construct( $file, $context ) {
		$this->file = $file;
		$this->context = $context;
	}

	public function get_context( $file, $context ) {
		return af_defaults(
			[
				'title' => get_the_title(),
				'url' => get_the_permalink(),
				'facebook' => true,
				'twitter' => true,
				'linkedin' => true,
				'email' => true,
				'items' => [ $this, 'get_items' ],
			],
			$context
		);
	}

	public function get_items( $items, $defaults ) {
		return [
			'facebook' => [
				'enabled' => $defaults['facebook'],
				'url'     => 'http://www.facebook.com/share.php?u=' . urlencode( $defaults['url'] ),
				'icon'    => 'fab fa-facebook-f',
			],
			'twitter' => [
				'enabled' => $defaults['twitter'],
				'url'     => 'https://twitter.com/share?url=' . urlencode( $defaults['url'] ) . '&text=' . urlencode( $defaults['title'] ),
				'icon'    => 'fab fa-twitter',
			],
			'linkedin' => [
				'enabled' => $defaults['linkedin'],
				'url'     => 'https://www.linkedin.com/cws/share?url=' . urlencode( $defaults['url'] ),
				'icon'    => 'fab fa-linkedin-in',
			],
			'email' => [
				'enabled' => $defaults['email'],
				'url'     => 'mailto:?subject=' . urlencode( $defaults['title'] ) . '&body=' . urlencode( $defaults['url'] ),
				'icon'    => 'fas fa-envelope',
			]
		];
	}
}
