// helper //

$( document ).ready ( function ( ) {

	var helper = $( '.helper' );

	// loaded twice - set up once the helper is on the page

	if ( ! helper.length || window.helper_hide_ ) {

		return;

	}

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

        // console shares the spot

        if ( $( '#console-overlay.shown' ).length && window.console_toggle_ ) {

            window.console_toggle_ ( );

        }

        // drawn see-through first so it fades in

        helper.addClass ( 'hide' );

        helper [ 0 ].offsetWidth;

        helper.removeClass ( 'hide' ).addClass ( 'show' );

    };

    // helper closes

    function hide ( ) {

        if ( ! helper.hasClass ( 'show' ) ) {

            return;

        }

        helper.removeClass ( 'show' ).addClass ( 'hide' );

        setTimeout ( function ( ) {

            if ( helper.hasClass ( 'show' ) ) {

                return;

            }

            helper.removeClass ( 'hide' );

            $( ids ).removeClass ( classes );

        }, 250 );

    };

    // console closes the helper when it opens

    window.helper_hide_ = hide;

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
