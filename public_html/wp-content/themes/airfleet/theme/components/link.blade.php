<!-- Note the $style variable which renders the button style (button vs link) as set on backend. You can see this output when inspecting. Add appropriate (S)CSS directives to match design -->
<li class="c-button-collection__item c-button-single-style__{{ $style }}"><a href="{{ $link['url'] }}" target="{{ $link['target'] }}">{!! $link['title'] !!}{{ $slot }}</a></li>
