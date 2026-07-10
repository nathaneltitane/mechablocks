// modules //

$( function ( ) {

	// prevent redundant footer load on viewer canvas //

	if ( ! $( '.footer' ).length ) {

		$.get ( '/modules/footer.html', function ( data ) {

			$( '#footer' ).append ( data ) ;

		} ) ;

	}

	// standard //

	$.get ( '/modules/drawer.html', function ( data ) {

		$( '#drawer' ).append ( data ) ;

	} ) ;

	$.get ( '/modules/contact-modal.html', function ( data ) {

		$( '#contact-modal' ).append ( data ) ;

	} ) ;

	$.get ( '/modules/contact.html', function ( data ) {

		$( '#contact' ).append ( data ) ;

	} ) ;

	$.get ( '/modules/shop.html', function ( data ) {

		$( '#shop' ).append ( data ) ;

	} ) ;

	$.get ( '/modules/github.html', function ( data ) {

		$( '#github' ).append ( data ) ;

	} ) ;

	$.get ( '/modules/donations.html', function ( data ) {

		$( '#donations' ).append ( data ) ;

	} ) ;

	$.get ( '/modules/browse.html', function ( data ) {

		$( '#browse' ).append ( data ) ;

	} ) ;

	// canvas controls //

	if ( $( '#canvas' ).length ) {

		$.get ( '/modules/paypal.html', function ( data ) {

			$( '#paypal' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/color.html', function ( data ) {

			$( '#color' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/colors.html', function ( data ) {

			$( '#colors' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/details.html', function ( data ) {

			$( '#details' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/edges.html', function ( data ) {

			$( '#edges' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/camera.html', function ( data ) {

			$( '#camera' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/minifig.html', function ( data ) {

			$( '#minifig' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/wireframe.html', function ( data ) {

			$( '#wireframe' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/controls.html', function ( data ) {

			$( '#controls' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/baseplate.html', function ( data ) {

			$( '#baseplate' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/grid.html', function ( data ) {

			$( '#grid' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/console.html', function ( data ) {

			$( '#console' ).append ( data ) ;

		} ) ;

		$.get ( '/modules/helper.html', function ( data ) {

			$( '#helper' ).append ( data ) ;

		} ) ;

		// home //

		$.get ( '/modules/home.html', function ( data ) {

			$( '#home' ).append ( data ) ;

		} ) ;

	}

} ) ;
