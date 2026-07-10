// background //

var count = 191;

function pad ( str, max ) {

	str = str.toString ( );

	return str.length < max ? pad ( "0" + str, max ) : str;

}

var number = pad ( Math.floor ( Math.random ( ) * count ), 3 );

var flat = "/images/flat/flat-" + number + ".png";
var overlay = "/images/overlay/overlay-" + number + ".png";

var image_flat = new Image ( );
var overlay_image = new Image ( );

var flat_ready = false;
var overlay_ready = false;
var dom_ready = false;

function apply ( ) {

	if ( flat_ready && dom_ready ) {

		$( '#background' ).css (

			'background-image',

			'url("' + flat + '")'
		);

	}

	if ( overlay_ready && dom_ready ) {

		$( '#background-overlay' ).css (

			'background-image',

			'url("' + overlay + '")'
		);

	}

}

image_flat.onload = function ( ) {

	flat_ready = true;

	apply ( );

};

overlay_image.onload = function ( ) {

	overlay_ready = true;

	apply ( );

};

image_flat.src = flat;
overlay_image.src = overlay;

document.addEventListener ( 'DOMContentLoaded', function ( ) {

	dom_ready = true;

	apply ( );

} );
