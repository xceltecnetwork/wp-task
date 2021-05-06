<?php
/**
 * Register post types.
 *
 * @link https://developer.wordpress.org/reference/functions/register_post_type/
 *
 * @hook    init
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

af_register_post_type_modal();

register_post_type(
	'cta',
	array(
		'labels'              => array(
			'name'               => __( 'CTAs', 'app' ),
			'singular_name'      => __( 'CTA', 'app' ),
			'add_new'            => __( 'Add New', 'app' ),
			'add_new_item'       => __( 'Add new CTA', 'app' ),
			'view_item'          => __( 'View CTA', 'app' ),
			'edit_item'          => __( 'Edit CTA', 'app' ),
			'new_item'           => __( 'New CTA', 'app' ),
			'view_item'          => __( 'View CTA', 'app' ),
			'search_items'       => __( 'Search Custom Types', 'app' ),
			'not_found'          => __( 'No CTAs found', 'app' ),
			'not_found_in_trash' => __( 'No CTAs found in trash', 'app' ),
		),
		'public'              => false,
		'exclude_from_search' => true,
		'show_ui'             => true,
		'supports'            => array( 'title' ),
		'has_archive'         => false,
		'rewrite'             => false,
	)
);
