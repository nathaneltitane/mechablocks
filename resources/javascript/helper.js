// helper //

$( document ).ready ( function ( ) {

	var helper = $( '.helper' );

	var ids = [
        '#browse-button-label',
        '#paypal-button-label',
        '#color-button-label',
        '#dimensions-button-label',
        '#edges-button-label',
        '#wireframe-button-label',
        '#controls-button-label',
        '#plane-button-label',
        '#minifigure-button-label'
    ];

    var classes = [
        'browse-label-color',
        'paypal-label-color',
        'color-label-color',
        'dimensions-label-color',
		'edges-label-color',
		'wireframe-label-color',
        'controls-label-color',
        'plane-label-color',
        'minifigure-label-color'
    ];

    var ids = ids.join ( ', ' );

    var classes = classes.join ( ' ' );

    // helper opens

    function show () {

    $( ids ).addClass ( classes );

        helper.removeClass ( 'hide' );

        setTimeout ( function ( ) {

            helper.addClass ( 'show' );

        }, 250 );

    };

    // helper closes

    function hide ( ) {

        helper.removeClass ( 'show' );

        helper.addClass ( 'hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    // helper opens or closes

    function toggle ( ) {

        if ( helper.hasClass ( 'show' ) ) {

            hide ( );

        }

        else {

            show ( );

        }
    };

    // controls button toggles the helper

    $( '.controls' ).click ( function ( event ) {

        toggle ( ) ;

    } );

    // click on the helper closes it

    $( '.helper' ).click ( function ( event ) {

        if ( helper.hasClass ( 'show' ) ) {

            hide ( );

        }

    } );

    // keyboard

    $( document ).on ( 'keyup', function ( event ) {

        if ( event.key === 'Tab' ) {

            toggle ( );

        }

    } );

} );
