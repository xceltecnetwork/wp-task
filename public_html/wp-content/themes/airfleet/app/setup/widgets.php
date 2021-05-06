<?php
/**
 * Register widgets.
 *
 * @link https://developer.wordpress.org/reference/functions/register_widget/
 *
 * @hook    widgets_init
 * @package WPEmergeTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:ignore
use \App\Widgets\SocialWidget;

register_widget( SocialWidget::class );
