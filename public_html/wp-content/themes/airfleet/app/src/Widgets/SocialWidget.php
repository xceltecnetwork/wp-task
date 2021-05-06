<?php

namespace App\Widgets;


class SocialWidget extends BaseWidget
{
    public function __construct()
    {
      parent::__construct('airfleet_social', __('Social'), [
          'classname' => 'social-widget',
          'description' => __( 'A list of social buttons')
      ]);
    }

    public function render($args, $instance, $widget_id)
    {
       $social = af_field('social', $widget_id);

       if(!empty($social)) {
         // Pass $social array to component
         \WPEmerge\render('components/social', $social);
       }
    }
}
