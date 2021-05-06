<section class="section">
	<div class="container">
		<h2 class="section__title">Buttons</h2>
		@php
			$buttons = [
				'primary',
				'secondary',
				'success',
				'danger',
				'warning',
				'info',
				'light',
				'dark',
				'link',
			];
		@endphp

		<h3 class="section__subtitle">Normal buttons</h3>
		@foreach( $buttons as $button )
			@button([
				'link' => [ 'title' => ucfirst($button), 'url' => '#' ],
				'class' => 'btn-'. $button,
			])
			@endbutton
		@endforeach

		<h3 class="section__subtitle">Outline buttons</h3>
		@foreach( $buttons as $button )
			@button([
				'link' => [ 'title' => ucfirst($button), 'url' => '#' ],
				'class' => 'btn-outline-'. $button,
			])
			@endbutton
		@endforeach

		<h3 class="section__subtitle">Button collection</h3>
		@buttoncollection([
			'buttons' => [
				[
					'link' => [ 'title' => 'Primary', 'url' => '#' ],
					'class' => 'btn-primary',
				],
				[
					'link' => [ 'title' => 'Secondary', 'url' => '#' ],
					'class' => 'btn-secondary',
				],
			],
			'button_class' => 'c-button-collection--guide',
		])
		@endbuttoncollection
	</div>
</section>
