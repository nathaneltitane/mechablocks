// background //

$( document ).ready ( function ( ) {

	var count = 186;

	function pad ( str, max ) {

		str = str.toString ( );

		return str.length < max ? pad ( "0" + str, max ) : str;

	}

	var number = pad ( Math.floor ( Math.random ( ) * count ), 3 );

	// randomize images

	$( '#background' ).css (

		'background-image',

		'url("/images/flat/flat-' + number + '.png ")'
	);

	$ ( '#background-overlay' ).css (

		'background-image',

		'url("/images/overlay/overlay-' + number + '.png ")'
	);

});
