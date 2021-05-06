@foreach($global['modals'] as $modal)
	@modalpost(['modal' => $modal])@endmodalpost
@endforeach
