// contact //

// model id and name filled from the model page - empty elsewhere
// delegated from the document - contact buttons and modal are loaded as modules after the page

$( document ).on ( 'click', "[for='modal-contact']:not(.modal-close):not(.modal-background)", function ( ) {

	var id = $( '.model-id' ).first ( ).text ( ).trim ( ).toUpperCase ( );

	var name = $( '.model-name' ).first ( ).text ( ).trim ( ).toUpperCase ( );

	$( "#contact-modal form input[name='model-id']" ).val ( id );

	$( "#contact-modal form input[name='model-name']" ).val ( name );

} );
