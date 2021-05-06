<?php
/**
 * App Layout: layouts/app.php
 *
 * This is the template that is used for displaying all pages by default.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WPEmergeTheme
 */

?>


<?php $__env->startSection('content'); ?>
	<?php while(have_posts()): ?>
		<?php the_post() ?>
		<div <?php post_class() ?>>
			<div class="page__content">
				<?php the_content(); ?>
				<?php carbon_pagination( 'custom' ); ?>
			</div>
		</div>
	<?php endwhile; ?>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH D:\local\wp-test-theme\app\public\wp-content\themes\airfleet\theme/page.blade.php ENDPATH**/ ?>