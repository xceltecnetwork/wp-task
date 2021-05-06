@if($sources)
	<div class="{{ $class }}">
		<video @attrs([
			'class' => 'c-video-file__video',
			'autoplay' => boolval( $autoplay ),
			'controls' => boolval( $controls ),
			'loop' => boolval( $loop ),
			'muted' => boolval( $muted ),
			'preload' => $preload,
			'poster' => $poster,
		])>
			@foreach($sources as $source)
				<source @attrs([
					'src' => $source['file'],
					'type' => 'video/' . $source['type'],
				])>
			@endforeach
		</video>
	</div>
@endif
