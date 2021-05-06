@php
	$margins = [
		[
			'background' => 'bg-primary',
			'margin' => [ 'margin_bottom' => 'default' ],
			'title' => 'Default - no explicit margin',
		],
		[
			'background' => 'bg-secondary',
			'margin' => [ 'margin_bottom' => 'none' ],
			'title' => 'None',
		],
		[
			'background' => 'bg-success',
			'margin' => [ 'margin_bottom' => 'small' ],
			'title' => 'Small',
		],
		[
			'background' => 'bg-danger',
			'margin' => [ 'margin_bottom' => 'medium' ],
			'title' => 'Medium',
		],
		[
			'background' => 'bg-warning',
			'margin' => [ 'margin_bottom' => 'large' ],
			'title' => 'Large',
		],
		[
			'background' => 'bg-info',
			'margin' => [ 'margin_bottom' => 'none' ],
			'title' => 'End',
		],
	];
@endphp
<section class="section">
	<div class="container">
    	<h2 class="section__title">Margin</h2>
    	<h3 class="section__subtitle">Bottom</h3>
    	@foreach($margins as $margin)
    		<div class="{{ af_margin_classes($margin['margin']) }} p-3 {{ $margin['background'] }} text-dark">{{ $margin['title'] }}</div>
    	@endforeach
	</div>
</section>
