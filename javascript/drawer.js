// drawer //

$( document ).ready ( function ( ) {

	var drawer = $( '#drawer' );

	var ids = [
        '#navigation-button-label',
        '#paypal-button-label',
        '#color-button-label',
        '#edges-button-label',
        '#wireframe-button-label',
        '#controls-button-label'
    ];

    var classes = [
        'navigation-label-color',
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

        drawer.removeClass ( 'drawer-hide' );

        setTimeout ( function ( ) {

            drawer.addClass ( 'drawer-show' );

        }, 250 );

    };

    function hide ( ) {

        drawer.removeClass ( 'drawer-show' );

        drawer.addClass ( 'drawer-hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    function toggle ( ) {

        if ( drawer.hasClass ( 'drawer-show' ) ) {

            hide ( );

        }

        else {

            show ( );

        }
    };

    $( '.navigation' ).click ( function ( event ) {

        show ( ) ;

    } );

    $( '.section' ).click ( function ( event ) {

        if ( drawer.hasClass ( 'drawer-show' ) ) {

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
