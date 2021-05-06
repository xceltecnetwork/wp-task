@block(['block' => $block])
	@background($background)
		<div class="container {{ $orientation }}"> <!-- Note the $orientation variable which renders the direction (text+image -or- image+text). You can see this output when inspecting. Add appropriate (S)CSS directives to match design -->
			<div class="row">
				<div class="col-6 col-text">
					@text($title)@endtext
					@text($description)@endtext
				</div>
				<div class="col-6 col-picture">
					@picture($image)@endpicture
				</div>
			</div>
		</div>
	@endbackground
@endblock
