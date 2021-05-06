<?php
/**
 * The front page template file
 *
 * If the user has selected a static page for their homepage, this is what will
 * appear.
 * Learn more: https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since Twenty Seventeen 1.0
 * @version 1.0
 */

get_header(); ?>

<body>

<section class="first-banner">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="text-box">
          <h1><?php the_field('main_image_text'); ?>  </h1>
          <p><?php the_field('main_image_sub_text'); ?></p>
          <div class="link-box">
            <?php $link = get_field('contact_us_buttons');
                if( $link ): ?>
                  <a class="cont-btn" href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a>
                  <?php endif; ?>

            <?php $link = get_field('read_more_button');
                if( $link ): ?>
                  <a class="read-btn" href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a>
                <?php endif; ?>
          </div>
        </div>
      <div class="shape-img">
          <img src="<?php the_field('main_image_desktop'); ?>" align="first banner shape" class="shape-image-1">
          <img src="<?php the_field('main_image_mobile'); ?>" align="first banner shape" class="shape-image-2">
      </div>
      </div>
    </div>
  </div> 
</section>
<?php 
wp_reset_query(); 
    if( have_rows('advance_flexible_content') ):
      while( have_rows('advance_flexible_content') ): the_row();
        if( get_row_layout() == 'image_with_white_section'): ?>
          <section class="sec-banner">
            <div class="container">
              <div class="row d-flex align-items-center">
                <div class="col-md-6 sec-2-text">
                  <div class="content-box">
                  <h2><?php the_sub_field('white_section_title'); ?></h2>
                  <p><?php the_sub_field('white_section_content_area'); ?></p>
                  <?php $link = get_sub_field('white_section_link');
                if( $link ): ?>
                  <a class="read-btn" href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a>
                <?php endif; ?></div>
                </div>
                <div class="col-md-6 sec-2-img">
                  <div class="zoom-img">
                  <img src="<?php the_sub_field('white_section_image'); ?>" class="img-fluid">
                </div>
                </div>
              </div>
            </div>
          </section> 
     
     <?php elseif( get_row_layout() == 'image_with_blue_section' ):?>
          <section class="sec-banner third-banner">
            <div class="container">
              <div class="row d-flex align-items-center">
              
                <div class="col-md-6 sec-2-img">
                   <div class="zoom-img">
                  <img src="<?php the_sub_field('blue_section_image'); ?>" class="img-fluid"> </div>
                </div> 
                  <div class="col-md-6 sec-2-text">
                  <div class="content-box">
                  <h2><?php the_sub_field('blue_section_title'); ?></h2>
                  <p><?php the_sub_field('blue_section_content_area_copy'); ?></p>
                    <?php $link = get_sub_field('blue_section_link');
                if( $link ): ?>
                  <a class="read-btn" href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a>
                <?php endif; ?> </div>
                </div>
              </div>
            </div>
          </section>
           <?php endif;
      endwhile;
    endif; ?>
<section class="fourth-banner">
  <div class="container">
    <div class="row">
      <?php if( have_rows('last_section_repeter') ): 
            while( have_rows('last_section_repeter') ): the_row(); ?>
      <div class="col-md-4">
        <div class="icon-box icon-box-1">
          <div class="img-cricle">
          <img src="<?php the_sub_field('icon_image_1'); ?>"> 
        </div>
       

        <h3><?php the_sub_field('icon_title_1'); ?></h3>
        <p><?php the_sub_field('icon_content_1'); ?></p>
        <?php $link = get_sub_field('icon_button_1');
                if( $link ): ?>
                  <a class="read-btn" href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a>
                <?php endif; ?>
         </div> 
      </div>
       <div class="col-md-4">
        <div class="icon-box icon-box-2">
          <div class="img-cricle">
          <img src="<?php the_sub_field('icon_image_2'); ?>"> 
        </div>
       

        <h3><?php the_sub_field('icon_title_2'); ?></h3>
        <p><?php the_sub_field('icon_content_2'); ?></p>
       <?php $link = get_sub_field('icon_button_2');
                if( $link ): ?>
                  <a class="read-btn" href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a>
                <?php endif; ?>
         </div>  


      </div> 
       <div class="col-md-4">
        <div class="icon-box icon-box-3">
          <div class="img-cricle">
          <img src="<?php the_sub_field('icon_image_3'); ?>"> 
        </div>

        <h3><?php the_sub_field('icon_title_3'); ?></h3>
        <p><?php the_sub_field('icon_content_3'); ?></p>
        <?php $link = get_sub_field('icon_button_3');
                if( $link ): ?>
                  <a class="read-btn" href="<?php echo $link['url']; ?>"><?php echo $link['title']; ?></a>
                <?php endif; ?> 
         </div> 
      </div>
      <?php endwhile; 
          endif; ?>
    </div>
  </div>
</section>

   
<?php get_footer(); ?>

   
  