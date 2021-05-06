<section class="section">
	<div class="container">
		<h2 class="section__title">Media</h2>

		<h3 class="section__subtitle">Picture</h3>
		@media([
			'type' => 'picture',
		    'picture' => [
				'image' => Theme\Assets::getAssetUri( 'images/duck.jpg' ),
			]
		])@endmedia

		<h3 class="section__subtitle">Video</h3>
		@media([
			'type' => 'video',
			'video' => [
				'source' => 'file',
				'file' => [
					'sources' => [
						[
							'type' => 'mp4',
							'file' => 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
						],
					],
					'autoplay' => false,
					'loop' => false,
					'controls' => true,
					'muted' => true,
				],
			]
		])@endmedia
	</div>
</section>
