<?php
/**
 * Base app layout.
 *
 * @package WPEmergeTheme
 */

?>
<?php echo $__env->make('header', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

<?php echo $__env->yieldContent('content'); ?>

<?php $__env->startComponent('components.footer'); ?><?php echo $__env->renderComponent(); ?>
<?php echo $__env->make('partials/modals', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php echo $__env->make('footer', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
<?php /**PATH /nas/content/live/wpfepizza/wp-content/themes/airfleet/theme/layouts/app.blade.php ENDPATH**/ ?>