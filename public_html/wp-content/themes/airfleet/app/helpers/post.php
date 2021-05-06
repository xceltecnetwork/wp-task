<?php
/**
 * Helper functions related to post objects.
 *
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Return the ID from a post.
 *
 * @param int|WP_Post|null $post Post ID or post object. Defaults to global $post.
 * @return int
 */
function af_get_post_id( $post = null ) {
	$post = get_post( $post );

	return $post->ID;
}

/**
 * Get the content of a post after filters have been applied.
 *
 * @param int|WP_Post|null $post Post ID or post object. Defaults to global $post.
 * @return string
 */
function af_get_content( $post = null ) {
	$post = get_post( $post );

	return apply_filters( 'the_content', $post->post_content );
}
