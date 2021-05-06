{{--
 Description: Display an image or a video depending on the choosen type.
 Keywords: airfleet picture video media
--}}
@block(['block' => $block])
	<div class="container">
		@media($media)@endmedia
	</div>
@endblock
