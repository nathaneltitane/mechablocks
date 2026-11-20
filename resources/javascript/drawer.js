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

    // drawer opens

    function show ( ) {

    $( ids ).addClass ( classes );

        drawer.removeClass ( 'hide' );

        setTimeout ( function ( ) {

            drawer.addClass ( 'show' );

        }, 250 );

    };

    // drawer closes

    function hide ( ) {

        drawer.removeClass ( 'show' );

        drawer.addClass ( 'hide' );

        setTimeout ( function ( ) {

            $( ids ).removeClass ( classes );

        }, 500 );

    };

    // drawer opens or closes

    function toggle ( ) {

        if ( drawer.hasClass ( 'show' ) ) {

            hide ( );

        }

        else {

            show ( );

        }
    };

    // browse button opens the drawer

    $( '#browse' ).click ( function ( event ) {

        show ( ) ;

    } );

    // click on a section closes it - cards switch modes instead

    $( '.section' ).click ( function ( event ) {

        if ( drawer.hasClass ( 'show' ) && ! $( event.target ).closest ( '.stack' ).length ) {

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

	// finger position before the phone snaps the tap to a link

	$( document ).on ( 'touchstart', '.stack', function ( event ) {

		var touch = event.originalEvent.touches [ 0 ];

		var frame = $( this ).find ( '.frame' ) [ 0 ].getBoundingClientRect ( );

		var edge = $( this ).find ( '.edge' ) [ 0 ].getBoundingClientRect ( );

		$( this ).data ( 'touched', true );

		$( this ).data ( 'touch_image',
			touch.clientX >= frame.left &&
			touch.clientX < edge.left - 15 &&
			touch.clientY >= frame.top &&
			touch.clientY <= frame.bottom
		);

	} );

	// hovering a chip or dash shows its mode - touch fakes a hover first

	$( document ).on ( 'mouseenter', '.stack .chip, .stack .segment', function ( ) {

		var stack = $( this ).closest ( '.stack' );

		if ( ! stack.data ( 'touched' ) ) {

			stack_focus ( stack, $( this ).index ( ) );

		}

	} );

	// leaving the card returns to its own mode

	$( document ).on ( 'mouseleave', '.stack', function ( ) {

		if ( ! $( this ).data ( 'touched' ) ) {

			stack_focus ( $( this ), 0 );

		}

	} );

	// first touch on a chip shows its mode

	$( document ).on ( 'click', '.stack .chip', function ( event ) {

		var stack = $( this ).closest ( '.stack' );

		if ( stack.data ( 'touched' ) && ! $( this ).hasClass ( 'active' ) ) {

			event.preventDefault ( );

			stack_focus ( stack, $( this ).index ( ) );

		}

	} );

	// touch opens the page only from the image

	$( document ).on ( 'click', '.stack .card', function ( event ) {

		var stack = $( this ).closest ( '.stack' );

		if ( stack.data ( 'touched' ) && ! stack.data ( 'touch_image' ) ) {

			event.preventDefault ( );

		}

	} );

	// touch over - mouse hover works again

	$( document ).on ( 'click', '.stack', function ( ) {

		$( this ).data ( 'touched', false );

	} );

    // keyboard

    $( document ).on ( 'keyup', function ( event ) {

        if ( event.key === '#' ) {

            toggle ( );

        }

    } );

} );
