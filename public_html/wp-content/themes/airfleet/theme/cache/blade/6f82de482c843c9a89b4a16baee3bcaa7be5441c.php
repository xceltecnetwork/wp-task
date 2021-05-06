<?php if( is_string( $image ) ): ?>
	<img <?= af_attributes([
		'src' => $image,
		'class' => $class,
		'alt' => '',
	]); ?>>
<?php else: ?>
	<?php echo wp_get_attachment_image(
		$image,
		$size,
		$icon,
		$attr
	); ?>

<?php endif; ?>
<?php /**PATH D:\local\wp-test-theme\app\public\wp-content\themes\airfleet\theme/components/image.blade.php ENDPATH**/ ?>