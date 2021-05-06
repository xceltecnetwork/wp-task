<section class="section">
	<div class="container">
		<h2 class="section__title">Video</h2>
		<p>Video component can have different sources: embed or file.</p>
		<h3 class="section__subtitle">Embed</h3>
		@video([
			'source' => 'embed',
			'embed' => [
				'embed_code' => '<iframe width="560" height="315" src="https://www.youtube.com/embed/zpOULjyy-n8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
				'container' => '16by9',
			],
		])
		@endvideo
		<h3 class="section__subtitle">File</h3>
		@video([
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
		])
		@endvideo
	</div>
</section>
