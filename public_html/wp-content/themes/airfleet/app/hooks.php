<?php
/**
 * Declare all your actions and filters here.
 * Don't declare the functions here! Only call the actions and filters.
 * You can declare the respective functions in folder helpers.
 *
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ------------------------------------------------------------------------
 * WordPress
 * ------------------------------------------------------------------------
 */

/**
 * Assets
 */
add_action( 'wp_enqueue_scripts', 'app_action_theme_enqueue_assets' );
add_action( 'admin_enqueue_scripts', 'app_action_admin_enqueue_assets' );
add_action( 'login_enqueue_scripts', 'app_action_login_enqueue_assets' );
add_action( 'enqueue_block_editor_assets', 'app_action_editor_enqueue_assets' );

add_action( 'wp_head', 'app_action_add_favicon', 5 );
add_action( 'login_head', 'app_action_add_favicon', 5 );
add_action( 'admin_head', 'app_action_add_favicon', 5 );

add_filter( 'upload_dir', 'app_filter_fix_upload_dir_url_schema' );

/**
 * Content
 */
add_filter( 'excerpt_more', 'app_filter_excerpt_more' );
add_filter( 'excerpt_length', 'app_filter_excerpt_length', 999 );
add_filter( 'the_content', 'app_filter_fix_shortcode_empty_paragraphs' );

// Attach all suitable hooks from `the_content` on `app_content`.
add_filter( 'app_content', 'do_shortcode', 9 );
add_filter( 'app_content', 'app_filter_fix_shortcode_empty_paragraphs', 10 );
add_filter( 'app_content', 'wptexturize', 10 );
add_filter( 'app_content', 'wpautop', 10 );
add_filter( 'app_content', 'shortcode_unautop', 10 );
add_filter( 'app_content', 'prepend_attachment', 10 );
add_filter( 'app_content', 'wp_make_content_images_responsive', 10 );
add_filter( 'app_content', 'convert_smilies', 20 );

/**
 * Login
 */
add_filter( 'login_headerurl', 'app_filter_login_headerurl' );
if ( version_compare( get_bloginfo( 'version' ), '5.2', '<' ) ) {
	add_filter( 'login_headertitle', 'app_filter_login_headertext' );
}
add_filter( 'login_headertext', 'app_filter_login_headertext' );

/**
 * Core
 * Hooks part of the core AirFleet starter theme.
 */
// Run plugin dependencies installer. More info here: https://github.com/afragen/wp-dependency-installer.
WP_Dependency_Installer::instance()->run( __DIR__ . '/..' );
add_filter( 'acf/settings/show_admin', 'af_show_acf_admin' );
add_filter( 'af_option_pages', 'af_add_option_pages' );
add_filter( 'body_class', 'af_cleanup_body_classes' );
add_filter( 'body_class', 'af_custom_body_class' );
add_filter( 'acf/load_field/key=field_5dc1c84ff725f', 'af_load_acf_colors' );
add_filter( 'acf/load_value/type=select', 'af_coerce_array_to_value', 10, 3 );

/**
 * ------------------------------------------------------------------------
 * External Libraries and Plugins.
 * ------------------------------------------------------------------------
 */
