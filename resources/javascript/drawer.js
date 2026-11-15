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

	// focus one mode of a stacked card

	function stack_focus ( stack, index ) {

		var card = stack.find ( '.card' ).eq ( index );

		var label = $( '<div>' ).text ( card.data ( 'title' ) ).html ( ) + ' </br> ' + card.data ( 'pieces' ) + ' PIECES';

		stack.find ( '.card, .segment, .chip' ).removeClass ( 'active' );

		card.addClass ( 'active' );

		stack.find ( '.segment' ).eq ( index ).addClass ( 'active' );

		stack.find ( '.chip' ).eq ( index ).addClass ( 'active' );

		stack.closest ( '.container' ).find ( '.label' ).first ( ).html ( label );

	}

	// hovering a chip or dash shows its mode

	$( document ).on ( 'mouseenter', '.stack .chip, .stack .segment', function ( ) {

		stack_focus ( $( this ).closest ( '.stack' ), $( this ).index ( ) );

	} );

	// leaving the card returns to its own mode

	$( document ).on ( 'mouseleave', '.stack', function ( ) {

		if ( window.matchMedia ( '(hover: hover)' ).matches ) {

			stack_focus ( $( this ), 0 );

		}

	} );

	// first touch on a chip shows its mode

	$( document ).on ( 'click', '.stack .chip', function ( event ) {

		if (
			! $( this ).hasClass ( 'active' ) &&
			! window.matchMedia ( '(hover: hover)' ).matches
		) {

			event.preventDefault ( );

			stack_focus ( $( this ).closest ( '.stack' ), $( this ).index ( ) );

		}

	} );

    // keyboard

    $( document ).on ( 'keyup', function ( event ) {

        if ( event.key === '#' ) {

            toggle ( );

        }

    } );

} );
