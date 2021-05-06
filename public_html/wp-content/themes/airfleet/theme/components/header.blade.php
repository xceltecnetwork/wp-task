@navbar(['class'=> 'navbar-expand-lg fixed-top c-navbar--position-top'])
    @slot('logo')
        @if(!empty($image))
            <a class="navbar-brand" href="{{ home_url('/') }}">@image(['image' => $image,'class' => 'c-navbar__logo',])@endimage</a>
        @endif
    @endslot
    {{ $composer->main_menu() }}
    @buttoncollection($header_buttons)@endbuttoncollection
@endnavbar
