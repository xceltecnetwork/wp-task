<?php
/**
 * Base app layout.
 *
 * @package WPEmergeTheme
 */

?>
@include('header')

@yield('content')

@footer()@endfooter
@include('partials/modals')
@include('footer')
