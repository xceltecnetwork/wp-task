@php
	$hubspot = [
		'portal_id' => '4078036',
		'form_id' => '0b3ff318-be00-4258-8554-88f61e304f69',
		'variations' => [
			[
				'title' => 'HubSpot (no redirect or default redirect)',
				'include_styles' => true,
				'redirect' => 'default',
			],
			[
				'title' => 'HubSpot (redirect to url)',
				'include_styles' => true,
				'redirect' => 'url',
				'redirect_url' => 'https://google.com',
			],
		],
	];
@endphp
<section class="section">
    <div class="container">
        <h2 class="section__title">Forms</h2>
        <h3 class="section__subtitle">HubSpot</h3>
		<div class="alert alert-warning" role="alert">
			<strong>Warning!</strong> The option to disable styles (<code>include_styles</code>) only works on some forms, depending on their type and configuration in HubSpot.
		</div>
		@foreach($hubspot['variations'] as $hubspot_variation)
			<h4 class="section__subtitle">{{ $hubspot_variation['title'] }}</h4>
			@formhubspot([
				'portal_id' => $hubspot['portal_id'],
				'fields' => $hubspot_variation + [ 'form_id' => $hubspot['form_id'] ],
			])@endformhubspot
		@endforeach
    </div>
</section>
