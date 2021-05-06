@if($has_title)
	<header class="{{ $class }}">
		@title(['class' => 'c-section-header__title'] + $title)@endtitle
		@title(['class' => 'c-section-header__sub-title'] + $subtitle)@endtitle
	</header>
@endif
