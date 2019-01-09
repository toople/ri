/**
 * Main JS file for Scriptor behaviours
 */

/*globals jQuery, document */
(function ($) {
	"use strict";

	$(document).ready(function(){

		// Responsive video embeds
		$('.post-content').fitVids();

		// Scroll to content
		$('.cover .scroll-down').on('click', function(e) {
			$('html, body').animate({'scrollTop': $('.cover').height()}, 800);
			e.preventDefault();
		});

		// Scroll to top
		$('.site-footer .top-link').on('click', function(e) {
			$('html, body').animate({'scrollTop': 0});
			e.preventDefault();
		});

		// Header adjustments
		adjustCover();
		$(window).bind('resize orientationchange', function() {
			adjustCover();
		});

		// Initialize featured posts slider
		var $featSlider = $('#featured-slider'),
			$featCounter = $featSlider.next('.featured-counter');

		$featSlider.on('init reInit', function(event, slick, currentSlide, nextSlide){
			var current = (currentSlide ? currentSlide : 0) + 1;
			$featCounter.find('.total').text(slick.slideCount);
			$featCounter.find('.current').text(current);
		});

		$featSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$featCounter.find('.current').text(nextSlide + 1);
		});

		$featSlider.slick({
			autoplay: true,
			arrows : true,
			dots : false,
			fade : true,
			prevArrow : '<button type="button" class="slick-prev square"><span class="icon-chevron-left" aria-hidden="true"></span><span class="screen-reader-text">Previous</span></button>',
			nextArrow : '<button type="button" class="slick-next square"><span class="icon-chevron-right" aria-hidden="true"></span><span class="screen-reader-text">Next</span></button>',
		});

		$featSlider.fadeIn(600, function(){
			$(this).parent().removeClass('slider-loading');
		});

		// Sidebar
		$('.sidebar-toggle, .overlay').on('click', function(e){
			$('body').toggleClass('sidebar-opened');
			e.preventDefault();
		});

		// Post reading time
		$('.post-template .post').readingTime();

		// Show comments
		if ( typeof disqus_shortname !== 'undefined' ) {
			var disqus_loaded = false;
			$('.comments-title').on('click', function() {
				var _this = $(this),
					icon = $(this).find('span');
				if ( ! disqus_loaded ) {
					$.ajax({
						type: "GET",
						url: "//" + disqus_shortname + ".disqus.com/embed.js",
						dataType: "script",
						cache: true
					});
					icon.removeClass('icon-plus').addClass('icon-close');
					disqus_loaded = true;
				} else {
					$('#disqus_thread').slideToggle();
					if ( icon.hasClass('icon-plus') ) {
						icon.removeClass('icon-plus').addClass('icon-close');
					} else {
						icon.removeClass('icon-close').addClass('icon-plus');
					}
				}
			});
		}

		// Display Instagram feed
		if ( typeof instagram_user_id !== 'undefined' && typeof instagram_access_token !== 'undefined' ) {
			if ( $('#instafeed').length ) {
				var userFeed = new Instafeed({
					get: 'user',
					userId: instagram_user_id,
					accessToken: instagram_access_token,
					limit: 6,
					resolution: 'low_resolution',
					template: '<div class="instagram-item"><a target="_blank" href="{{link}}"><img src="{{image}}" alt="{{caption}}" /></a></div>'
				});
				userFeed.run();
			}
		}
	});

	function adjustCover() {
		if ( $('.cover .scroll-down').is(':hidden') )
			$('.post-header .cover-bg').css({ 'top' : 0 });
		else
			$('.post-header .cover-bg').css({ 'top' : $('.site-header').outerHeight() });
	}

}(jQuery));
