<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'abc' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'R6F%T+^!DZ%}r]5n' );

/** MySQL hostname */
define( 'DB_HOST', '192.168.1.200' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'PHj9~?TKv*?{h0(Q4nhY0=}<<?uVE((w;eG^n4X-xE>VpsSHn#l-/x*qwM xIqBj' );
define( 'SECURE_AUTH_KEY',  'QH&+O}UCHGBwu:(ZC&CrG8Ul_AUsJZT5w^#?EQY~0m;JD_Q2+3{`vJS^_3*S~s3S' );
define( 'LOGGED_IN_KEY',    '%C7F[jvP4WQUQ^Q8M])8Mt~*q5LaYzCUWo5#<~6*=[ ;wUz_^6MvX0aqc43Q<uUC' );
define( 'NONCE_KEY',        '+0Gi|/Fx1YaH(W6J>0MYm/vR&S4eBCB6:<&a8Q2?yrfEGc:P8U?Lb!<r}URyp+B+' );
define( 'AUTH_SALT',        'i*J(#&MB*^B[5J})Z&#kJA<<|[/C;m){Lc<CE Mk7N-XDA[Ng#x~rvP^`_c<SfK{' );
define( 'SECURE_AUTH_SALT', 'f8VR#>e#?<5hVNVva$mvSrc>d7x!A<q<Ua:Yczr{/N_jr@MG{RVZ@`/=Oc4%Q|ad' );
define( 'LOGGED_IN_SALT',   'Qcm5H{fTRw]YcG?nqnc,lZ4!Cs91&c}$-A(H{7]rKOf|X9Vmi~-IyR{(l j=/,RF' );
define( 'NONCE_SALT',       'iG6T#AKr_!C!]#siMCWd1M e|=sj5jv[ -u.L$7z#4^Jg&|?n-J]#=uVLhAc3vEx' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', true );
define( 'FS_METHOD', 'direct' );


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
