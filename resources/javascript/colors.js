// colors //

$( document ).ready ( function ( ) {

	var colors = $( '#colors' );

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

    // colors panel opens

    function show ( ) {

		$( ids ).addClass ( classes );

        colors.removeClass ( 'hide' );

        setTimeout ( function ( ) {

            colors.addClass ( 'show' );

        }, 250 );

    };

	// colors panel closes

	function hide ( ) {

        colors.removeClass ( 'show' );

        colors.addClass ( 'hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    // colors panel opens or closes

    function toggle ( ) {

        if ( colors.hasClass ( 'show' ) ) {

            hide ( );

        }

        else {

            show ( );

        }
    };

	// color button toggles the panel

	$( '.color' ).click ( function ( event ) {

        toggle ( );

    } );

	// click on the panel closes it

	$( '#colors' ).click ( function ( event ) {

		if ( colors.hasClass ( 'show' ) ) {

			hide ( );

		}

	} );

	// swatch tints the canvas

	$( '.colors' ).click ( function ( event ) {

		var color = $ ( this ).data ( 'value' );

		$( "#canvas" ).css ( {

			"background": "linear-gradient(to top, #aaaaaa 10%, " + color + ")"

		});

        hide ( );

    } );

	// swatches show their color

	$( '.colors' ).each ( function ( ) {

		var color = $( this ).data ( 'value' );

		$( this ).css ( 'background-color', color );

	});

    // keyboard

    $( document ).on ( 'keyup', function ( event ) {

        if ( event.key === 'q' ) {

            toggle ( );

        }

    } );

});
