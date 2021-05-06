<?php

namespace App\Core;

use WPEmerge\ServiceProviders\ServiceProviderInterface;

/**
 * Search the custom fields content when searching for posts in WP Admin.
 * Checks if the option "admin_search_custom_fields_enabled" is enabled before proceeding.
 */
class AdminSearchCustomFieldsServiceProvider implements \WPEmerge\ServiceProviders\ServiceProviderInterface {

	/**
	 * {@inheritDoc}
	 */
	public function register( $container ) {
	}

	/**
	 * {@inheritDoc}
	 */
	public function bootstrap( $container ) {
		add_filter( 'posts_join', [ $this, 'posts_join' ]);
		add_filter( 'posts_where', [ $this, 'posts_where' ]);
		add_filter( 'posts_distinct', [ $this, 'posts_distinct' ]);
	}

	function posts_join( string $join ) {
		global $wpdb;

		if ( $this->is_enabled() ) {
			// Join with the table for the custom fields
			$join .= 'LEFT JOIN ' . $wpdb->postmeta . ' ON ' . $wpdb->posts . '.ID = ' . $wpdb->postmeta . '.post_id ';
		}

		return $join;
	}

	function posts_where( string $where ) {
		global $wpdb;

		if ( $this->is_enabled() ) {
			// Support for custom fields
			$where_custom = " OR (" . $wpdb->postmeta . ".meta_value LIKE $1)";

			// Support for custom date fields
			$time = strtotime( $_GET['s'] );
			$where_time = $time ? " OR (" . $wpdb->postmeta . ".meta_value = " . $time . ")" : '';

			// Update where to include custom queries
			$where = preg_replace(
				"/\(\s*" . $wpdb->posts . ".post_title\s+LIKE\s*(\'[^\']+\')\s*\)/",
				"(" . $wpdb->posts . ".post_title LIKE $1)" . $where_custom . $where_time,
				$where
			);
    }

		return $where;
	}

	function posts_distinct( string $where ) {
		return $this->is_enabled() ? 'DISTINCT' : $where;
	}

	public function is_option_enabled() {
		return get_field( 'admin_search_custom_fields_enabled', 'option' ) === true;
	}

	/**
	 * Returns true when the option to include custom fields in admin search is enabled
	 * and when we are in the context of an admin search.
	 *
	 * @return boolean
	 */
	public function is_enabled() {
		global $pagenow;

		return is_admin()
			&& is_search()
			&& ! empty( $_GET['s'] )
			&& $pagenow  === 'edit.php'
			&& $this->is_option_enabled();
	}
}
