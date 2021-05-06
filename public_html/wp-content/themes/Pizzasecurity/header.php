<?php
/**
 * The header for our theme
*
* This is the template that displays all of the <head> section and everything up until <div id="content">
*
* @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
*
* @package WordPress
* @subpackage Twenty_Seventeen
* @since 1.0
* @version 1.0
*/
   ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Pizza Security</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri();?>/assets/css/bootstrap.min.css">  
  <link rel="stylesheet" href="<?php echo get_template_directory_uri();?>/assets/css/style.css"> 

  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet"> 
 <?php wp_head(); ?>
</head>