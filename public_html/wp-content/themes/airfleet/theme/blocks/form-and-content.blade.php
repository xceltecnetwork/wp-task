@block([
	'block' => $block,
	'class' => 'b-form-and-content--layout-' . $layout,
])
	<div class="container">
		<div class="row">
			<div class="col">
				@sectionheader($section_header)@endsectionheader
				@text($text)@endtext
				@media($media)@endmedia
				@buttoncollection($buttons)@endbuttoncollection
			</div>
			<div class="col">
				@form($form)@endform
			</div>
		</div>
	</div>
@endblock
