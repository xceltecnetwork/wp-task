@if( ! empty( $embed_code ) )
	<div @attrs([ 'class' => $class ])>
		{!! $embed_code !!}
	</div>
@endif
