// modules //

$( function ( ) {

	$.get ( '/modules/head.html', function ( data ) {

		$ ( 'head' ).append ( data );

	} );

	$.get ( '/modules/drawer.html', function ( data ) {

		$( '#drawer' ).append ( data );

	} );

	$.get ( '/modules/navigation.html', function ( data ) {

		$( '#navigation' ).append ( data );

	} );

	$.get ( '/modules/contact.html', function ( data ) {

		$( '#contact' ).append ( data );

	} );

	$.get ( '/modules/color.html', function ( data ) {

		$( '#color' ).append ( data );

	} );

	$.get ( '/modules/colors.html', function ( data ) {

		$( '#colors' ).append ( data );

	} );

	$.get ( '/modules/dimensions.html', function ( data ) {

		$( '#dimensions' ).append ( data );

	} );

	$.get ( '/modules/edges.html', function ( data ) {

		$( '#edges' ).append ( data );

	} );

	$.get ( '/modules/minifig.html', function ( data ) {

		$( '#minifig' ).append ( data );

	} );

	$.get ( '/modules/wireframe.html', function ( data ) {

		$( '#wireframe' ).append ( data );

	} );
	
	$.get ( '/modules/controls.html', function ( data ) {

		$( '#controls' ).append ( data );

	} );
	
	$.get ( '/modules/plane.html', function ( data ) {

		$( '#plane' ).append ( data );

	} );

	$.get ( '/modules/helper.html', function ( data ) {

		$( '#helper' ).append ( data );

	} );

	$.get ( '/modules/footer.html', function ( data ) {

		$( '#footer' ).append ( data );

	} );

} );
