@if(!empty($title))
	@el([
		'tag' => $tag,
		'class' => $class,
	])
		{!! nl2br($title) !!}
	@endel
@endif
