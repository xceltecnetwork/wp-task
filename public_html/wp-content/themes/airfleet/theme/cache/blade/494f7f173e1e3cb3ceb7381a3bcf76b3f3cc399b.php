<?php
/**
 * App Layout: layouts/app.php
 *
 * This is the template that is used for displaying 404 errors.
 *
 * @package WPEmergeTheme
 */

?>


<?php $__env->startSection('content'); ?>
	<p>
		<?php echo sprintf(
			/* translators: 404 page content; placeholders represents homepage opening and closing anchor tags */
			esc_html__( 'Please check the URL for proper spelling and capitalization. If you\'re having trouble locating a destination, try visiting the %1$shome page%2$s.', 'app' ),
			'<a href="' . esc_url( home_url( '/' ) ) . '">',
			'</a>'
		); ?>

	</p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/abc.xceltec.in/public_html/wp-content/themes/airfleet/theme/404.blade.php ENDPATH**/ ?>