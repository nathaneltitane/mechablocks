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
        '#minifig-button-label'
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
        'minifig-label-color'
    ];

    var ids = ids.join ( ', ' );

    var classes = classes.join ( ' ' );

    function show () {

        samples.removeClass ( 'samples-hide' );

        setTimeout ( function ( ) {

            samples.addClass ( 'samples-show' );

        }, 250 );

    };

    function hide ( ) {

        samples.removeClass ( 'samples-show' );

        samples.addClass ( 'samples-hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    function toggle ( ) {

        if ( samples.hasClass ( 'samples-show' ) ) {

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

        if ( samples.hasClass ( 'samples-show' ) ) {

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
