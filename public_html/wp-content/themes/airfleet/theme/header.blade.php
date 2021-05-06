<?php
/**
 * Theme header partial.
 * Only change code until the opening of the body. In most cases you won't need to do any change in this file.
 * If you want to add header content (navigation, etc.), customize the header component in folder "components" and the page layouts in "layouts".
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WPEmergeTheme
 */

?>
@php do_action('get_header') @endphp
<!DOCTYPE html>
<html @php language_attributes() @endphp>
	<head>
		<meta http-equiv="Content-Type" content="@php bloginfo( 'html_type' ) @endphp; charset=@php bloginfo( 'charset' ) @endphp" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />

		<link rel="profile" href="http://gmpg.org/xfn/11" />
		<link rel="pingback" href="@php bloginfo( 'pingback_url' ) @endphp" />

		@php wp_head() @endphp
	</head>
	<body @php body_class() @endphp>
		@php app_shim_wp_body_open() @endphp
