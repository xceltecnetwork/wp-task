@if(!empty($buttons))
	<ul @attrs([ 'class' => $container_class ])>
		@foreach($buttons as $button)
			<li class="c-button-collection__item">@button($button)@endbutton</li>
		@endforeach
	</ul>
@endif
