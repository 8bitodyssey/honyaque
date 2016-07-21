<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package honyaque
 */

?>

		<?php do_action( 'honyaque_after_content' ); ?>
	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<?php do_action( 'honyaque_before_footer' ); ?>
		<div class="site-info">
			<?php do_action( 'honyaque_footer' ); ?>
		</div><!-- .site-info -->
		<?php do_action( 'honyaque_after_footer' ); ?>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php do_action( 'honyaque_after_body' ); ?>

<?php wp_footer(); ?>

</body>
</html>
