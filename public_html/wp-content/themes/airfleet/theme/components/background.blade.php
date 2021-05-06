@php
	$id = wp_unique_id('spacer-id-');
@endphp
@switch($style)
	@case('solid')
		<style>
			#{{ $id }} {
				background-color: {{ $color }}
			}
		</style>
		@break
		
	@case('gradient')
		<style>
			/*
			 * ADD STYLES FOR GRADIENT HERE - VALUES FROM BACKEND ARE RENDERED FOR YOU TO USE
			 * YOU CAN ALSO SEE THESE WHEN INSPECTING THE FRONT-END, RENDERED AS VALUES
			 *
			 Stops:
			 @foreach($gradient['stops'] as $stop)
				Position: {{ $stop['position'] }}
				Color: {{ $stop['color'] }}
			 @endforeach

			 Angle: {{ $gradient['angle'] }}

			#{{ $id }} {
				background: ...
			}
			*/
		</style>
		@break
	@default
@endswitch

<div class="{{ $class }}" id="{{ $id }}">
	<div @attrs([
		'class' => $background_class,
	])></div>
	{{ $slot }}
</div>
