// hover

// provide mouse and touch browser hover emulation

$( document ).ready ( function ( ) {

	$( '#background' ).on ( 'mouseenter touchstart', function ( event ) {

		event.preventDefault ( );

		$( '#background-overlay' ).addClass ( 'hover-background-overlay' );

	});

	$( '#background' ).on ( 'mouseleave touchend touchcancel', function ( event ) {

		event.preventDefault ( );

		$( '#background-overlay' ).removeClass ( 'hover-background-overlay' );

	});

});
