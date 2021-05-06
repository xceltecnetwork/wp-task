{{--
 Description: Display a hero with text, buttons, and picture.
--}}
@block(['block' => $block])
	@background($background)
		<div class="container">
			<div class="row">
				<div class="col-6 col-text">
					@text($title)@endtext
					@text($subtitle)@endtext
					<ul class="buttons">
						@link($primary_button)@endlink
						@link($secondary_button)@endlink
					</ul>
				</div>
				<div class="col-6 col-picture">
					@picture($image)@endpicture
				</div>
			</div>
		</div>
	@endbackground
@endblock
