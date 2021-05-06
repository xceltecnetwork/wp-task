@link([
	'url' => 'c-modal_' . $modal_id,
	'class' => $class,
	'title' => $label,
	'data' => [
		'toggle' => 'modal',
		'target' => '#c-modal_' . $modal_id,
	],
]){{ $slot }}@endlink
