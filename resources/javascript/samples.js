// samples //

$( document ).ready ( function ( ) {

	var samples = $( '.samples' );

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

    function show () {

        samples.removeClass ( 'hide' );

        setTimeout ( function ( ) {

            samples.addClass ( 'show' );

        }, 250 );

    };

    function hide ( ) {

        samples.removeClass ( 'show' );

        samples.addClass ( 'hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    function toggle ( ) {

        if ( samples.hasClass ( 'show' ) ) {

            hide ( );

        }

        else {

            show ( );

        }
    };

    $( '#paypal' ).click ( function ( event ) {

        toggle ( ) ;

    } );

    $( '#samples' ).click ( function ( event ) {

        toggle ( ) ;

    } );

    $( '#canvas' ).click ( function ( event ) {

        if ( samples.hasClass ( 'show' ) ) {

            hide ( );

        }

    } );

    // keyboard

    $( document ).on ( 'keyup', function ( event ) {

        if ( event.key === 'u' ) {

            toggle ( );

        }

    } );

} );
