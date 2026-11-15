// drawer //

$( document ).ready ( function ( ) {

	var drawer = $( '#drawer' );

	var ids = [
        '#browse-button-label',
        '#paypal-button-label',
        '#color-button-label',
        '#edges-button-label',
        '#wireframe-button-label',
        '#controls-button-label'
    ];

    var classes = [
        'browse-label-color',
        'paypal-label-color',
        'color-label-color',
		'edges-label-color',
		'wireframe-label-color',
        'controls-label-color'
    ];

    var ids = ids.join ( ', ' );

    var classes = classes.join ( ' ' );

    function show ( ) {

    $( ids ).addClass ( classes );

        drawer.removeClass ( 'hide' );

        setTimeout ( function ( ) {

            drawer.addClass ( 'show' );

        }, 250 );

    };

    function hide ( ) {

        drawer.removeClass ( 'show' );

        drawer.addClass ( 'hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    function toggle ( ) {

        if ( drawer.hasClass ( 'show' ) ) {

            hide ( );

        }

        else {

            show ( );

        }
    };

    $( '#browse' ).click ( function ( event ) {

        show ( ) ;

    } );

    $( '.section' ).click ( function ( event ) {

        if ( drawer.hasClass ( 'show' ) ) {

            hide ( );

        }

    } );

    // keyboard

    $( document ).on ( 'keyup', function ( event ) {

        if ( event.key === '#' ) {

            toggle ( );

        }

    } );

} );
