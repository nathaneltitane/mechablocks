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

    $( ids ).addClass ( classes );

        helper.removeClass ( 'helper-hide' );

        setTimeout ( function ( ) {

            helper.addClass ( 'helper-show' );

        }, 250 );

    };

    function hide ( ) {

        helper.removeClass ( 'helper-show' );

        helper.addClass ( 'helper-hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    function toggle ( ) {

        if ( helper.hasClass ( 'helper-show' ) ) {

            hide ( );

        }

        else {

            show ( );

        }
    };

    $( '.controls' ).click ( function ( event ) {

        toggle ( ) ;

    } );

    $( '.helper' ).click ( function ( event ) {

        if ( helper.hasClass ( 'helper-show' ) ) {

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
