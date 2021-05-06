@php
	if ( ! empty( $modal_id )) {
		af_register_modal( $modal_id );
	}
@endphp
@if($has_modal)
	@modallink([
		'modal_id' => $modal_id,
		'class' => $class,
		'label' => $label,
	])@endmodallink
@endif
