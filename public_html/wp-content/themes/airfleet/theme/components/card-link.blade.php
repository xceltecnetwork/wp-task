@php
	$id = wp_unique_id('card-link-id-');
@endphp
<style>
  .{{ $id }} a {
    background-color: {{ $background_color }};
    color: {{ $text_color }}
  }
</style>
<li class="c-button-collection__item {{ $id }}"><a href="{{ $link['url'] }}" target="{{ $link['target'] }}">{!! $link['title'] !!}{{ $slot }}</a></li>
