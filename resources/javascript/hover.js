// hover

// provide mouse and touch browser hover emulation

$( document ).ready ( function ( ) {

	var background = $( '#background' );

	var overlay = $( '#background-overlay' );

	var step = 0;

	// run 0.25s after the layer settles at its opacity

	function settled ( layer, opacity, run ) {

		var current = step;

		function check ( ) {

			if ( current !== step ) {

				return;

			}

			if ( Number ( layer.css ( 'opacity' ) ) === opacity ) {

				setTimeout ( function ( ) {

					if ( current === step ) {

						run ( );

					}

				}, 250 );

				return;

			}

			requestAnimationFrame ( check );

		};

		check ( );

	};

	background.on ( 'mouseenter touchstart', function ( event ) {

		event.preventDefault ( );

		step ++;

		// hand the landing reveal over to the hover fade from where it is

		var reveal = this.getAnimations ( ).filter ( function ( animation ) {

			return animation instanceof CSSAnimation;

		} );

		if ( reveal.length ) {

			var style = getComputedStyle ( this );

			this.style.opacity = style.opacity;

			this.style.transform = style.transform;

			reveal.forEach ( function ( animation ) {

				animation.cancel ( );

			} );

			this.offsetWidth;

			this.style.opacity = '';

			this.style.transform = '';

		}

		background.addClass ( 'hover-background' );

		settled ( background, 1, function ( ) {

			overlay.addClass ( 'hover-background-overlay' );

		} );

	});

	background.on ( 'mouseleave touchend touchcancel', function ( event ) {

		event.preventDefault ( );

		step ++;

		overlay.removeClass ( 'hover-background-overlay' );

		settled ( overlay, 0, function ( ) {

			background.removeClass ( 'hover-background' );

		} );

	});

});
