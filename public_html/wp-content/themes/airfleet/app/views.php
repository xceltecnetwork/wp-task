<?php
/**
 * Views.
 *
 * @link https://docs.wpemerge.com/#/framework/views/overview
 *
 * @package WPEmergeTheme
 */

use \WPEmerge\Facades\View;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ------------------------------------------------------------------------
 * Globals
 *
 * @link https://docs.wpemerge.com/#/framework/views/overview
 * ------------------------------------------------------------------------
 */

View::addGlobal( 'modals', [] );

/**
 * ------------------------------------------------------------------------
 * View composers
 *
 * @link https://docs.wpemerge.com/#/framework/views/view-composers
 * ------------------------------------------------------------------------
 */

// phpcs:ignore
// View::addComposer( 'partials/foo', 'FooPartialViewComposer' );
