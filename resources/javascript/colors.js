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

    function show ( ) {

		$( ids ).addClass ( classes );

        colors.removeClass ( 'colors-hide' );

        setTimeout ( function ( ) {

            colors.addClass ( 'colors-show' );

        }, 250 );

    };

	function hide ( ) {

        colors.removeClass ( 'colors-show' );

        colors.addClass ( 'colors-hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    function toggle ( ) {

        if ( colors.hasClass ( 'colors-show' ) ) {

            hide ( );

        }

        else {

            show ( );

        }
    };

	$( '.color' ).click ( function ( event ) {

        toggle ( );

    } );

	$( '#colors' ).click ( function ( event ) {

		if ( colors.hasClass ( 'colors-show' ) ) {

			hide ( );

		}

	} );

	$( '.colors' ).click ( function ( event ) {

		var color = $ ( this ).data ( 'value' );

		$( "#canvas" ).css ( {

			"background": "linear-gradient(to top, #aaaaaa 10%, " + color + ")"

		});

        hide ( );

    } );

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
