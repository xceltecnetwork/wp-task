<?php
	$id = wp_unique_id('spacer-id-');
?>
<?php switch($style):
	case ('solid'): ?>
		<style>
			#<?php echo e($id); ?> {
				background-color: <?php echo e($color); ?>

			}
		</style>
		<?php break; ?>
		
	<?php case ('gradient'): ?>
		<style>
			/*
			 * ADD STYLES FOR GRADIENT HERE - VALUES FROM BACKEND ARE RENDERED FOR YOU TO USE
			 * YOU CAN ALSO SEE THESE WHEN INSPECTING THE FRONT-END, RENDERED AS VALUES
			 *
			 Stops:
			 <?php $__currentLoopData = $gradient['stops']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $stop): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
				Position: <?php echo e($stop['position']); ?>

				Color: <?php echo e($stop['color']); ?>

			 <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

			 Angle: <?php echo e($gradient['angle']); ?>


			#<?php echo e($id); ?> {
				background: ...
			}
			*/
		</style>
		<?php break; ?>
	<?php default: ?>
<?php endswitch; ?>

<div class="<?php echo e($class); ?>" id="<?php echo e($id); ?>">
	<div <?= af_attributes([
		'class' => $background_class,
	]); ?>></div>
	<?php echo e($slot); ?>

</div>
<?php /**PATH /nas/content/live/wpfepizza/wp-content/themes/airfleet/theme/components/background.blade.php ENDPATH**/ ?>