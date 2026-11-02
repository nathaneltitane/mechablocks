// landing

// center the phone logo between the landing texts

$( document ).ready ( function ( ) {

	var logo = $( '.landing-logo' );

	var head = $( '.landing' );

	var foot = $( '.footing' );

	var phone = window.matchMedia ( '(max-width: 520px), (max-height: 560px)' );

	function place ( ) {

		if ( ! phone.matches ) {

			logo.css ( 'top', '' );

			return;

		}

		var top = head.offset ( ).top + head.outerHeight ( );

		var bottom = foot.offset ( ).top;

		logo.css ( 'top', ( ( top + bottom ) / 2 ) + 'px' );

	};

	// the footing moves up when the footer opens

	new MutationObserver ( place ).observe ( foot [ 0 ], { attributes: true, attributeFilter: [ 'class' ] } );

	$( window ).on ( 'resize', place );

	place ( );

});
