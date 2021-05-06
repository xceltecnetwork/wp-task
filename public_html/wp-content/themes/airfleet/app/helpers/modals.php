<?php
/**
 * Modals helper functions.
 *
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use \WPEmerge\Facades\View;

/**
 * Register custom post type for modals.
 *
 * @return void
 */
function af_register_post_type_modal() {
	register_post_type(
		'af_modal',
		array(
			'labels'              => array(
				'name'               => __( 'Modals', 'app' ),
				'singular_name'      => __( 'Modal', 'app' ),
				'add_new'            => __( 'Add New', 'app' ),
				'add_new_item'       => __( 'Add new Modal', 'app' ),
				'view_item'          => __( 'View Modal', 'app' ),
				'edit_item'          => __( 'Edit Modal', 'app' ),
				'new_item'           => __( 'New Modal', 'app' ),
				'view_item'          => __( 'View Modal', 'app' ),
				'search_items'       => __( 'Search Modals', 'app' ),
				'not_found'          => __( 'No modals found', 'app' ),
				'not_found_in_trash' => __( 'No modals found in trash', 'app' ),
			),
			'public'              => false,
			'exclude_from_search' => false,
			'show_ui'             => true,
			'hierarchical'        => false,
			'query_var'           => true,
			'menu_icon'           => 'dashicons-admin-post',
			'supports'            => array( 'title', 'editor' ),
			'show_in_rest'        => true, // Required for Gutenberg.
			'rewrite'             => array(
				'slug'       => 'modal',
				'with_front' => false,
			),
		)
	);
}

/**
 * Register a modal.
 * Modals are not rendered by default. By registering a modal, it becomes available for rendering.
 *
 * @param int $post_id Modal post ID.
 * @return void
 */
function af_register_modal( $post_id ) {
	$globals = View::getGlobals();
	$modals  = $globals['modals'] ?: array();

	if ( ! in_array( $post_id, $modals, true ) ) {
		$modals[] = $post_id;
	}
	View::addGlobal( 'modals', $modals );
}
