// modules //

$( function ( ) {

	// prevent redundant footer load on viewer canvas //

	if ( ! $( '.footer' ).length ) {

		$.get ( '/resources/modules/footer.html', function ( data ) {

			$( '#footer' ).append ( data ) ;

		} ) ;

	}

	// standard //

	$.get ( '/resources/modules/drawer.html', function ( data ) {

		$( '#drawer' ).append ( data ) ;

	} ) ;

	$.get ( '/resources/modules/contact-modal.html', function ( data ) {

		$( '#contact-modal' ).append ( data ) ;

	} ) ;

	$.get ( '/resources/modules/contact.html', function ( data ) {

		$( '#contact' ).append ( data ) ;

	} ) ;

	$.get ( '/resources/modules/shop.html', function ( data ) {

		$( '#shop' ).append ( data ) ;

	} ) ;

	$.get ( '/resources/modules/github.html', function ( data ) {

		$( '#github' ).append ( data ) ;

	} ) ;

	$.get ( '/resources/modules/studworx.html', function ( data ) {

		$( '#studworx' ).append ( data ) ;

	} ) ;

	$.get ( '/resources/modules/l2cu.html', function ( data ) {

		$( '#l2cu' ).append ( data ) ;

	} ) ;

	$.get ( '/resources/modules/donations.html', function ( data ) {

		$( '#donations' ).append ( data ) ;

	} ) ;

	$.get ( '/resources/modules/browse.html', function ( data ) {

		$( '#browse' ).append ( data ) ;

	} ) ;

	// canvas controls //

	if ( $( '#canvas' ).length ) {

		$.get ( '/resources/modules/paypal.html', function ( data ) {

			$( '#paypal' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/color.html', function ( data ) {

			$( '#color' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/colors.html', function ( data ) {

			$( '#colors' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/details.html', function ( data ) {

			$( '#details' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/edges.html', function ( data ) {

			$( '#edges' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/camera.html', function ( data ) {

			$( '#camera' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/minifig.html', function ( data ) {

			$( '#minifig' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/wireframe.html', function ( data ) {

			$( '#wireframe' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/controls.html', function ( data ) {

			$( '#controls' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/baseplate.html', function ( data ) {

			$( '#baseplate' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/grid.html', function ( data ) {

			$( '#grid' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/console.html', function ( data ) {

			$( '#console' ).append ( data ) ;

		} ) ;

		$.get ( '/resources/modules/helper.html', function ( data ) {

			$( '#helper' ).append ( data ) ;

		} ) ;

		// home //

		$.get ( '/resources/modules/home.html', function ( data ) {

			$( '#home' ).append ( data ) ;

		} ) ;

	}

} ) ;
