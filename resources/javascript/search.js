// search //

$( document ).ready ( function ( ) {

	var field = $( '#search-field' );

	var chips = $( '#search-chips' );

	var count = $( '#search-count' );

	var clear = $( '#search-clear' );

	var measure = document.createElement ( 'canvas' ).getContext ( '2d' );

	var models = $( '.model' );

	var series = '';

	// model count lives in the search field

	var placeholder = 'SEARCH ALL ' + models.length + ' MODELS...';

	field.attr ( 'placeholder', placeholder );

	// series chips with model counts

	var counts = { };

	models.each ( function ( ) {

		String ( $( this ).data ( 'series' ) ).split ( '|' ).forEach ( function ( name ) {

			counts [ name ] = ( counts [ name ] || 0 ) + 1;

		} );

	} );

	// series filter chip

	function chip ( name, label ) {

		var button = $( '<button class="chip" type="button"></button>' ).text ( label );

		if ( name === series ) {

			button.addClass ( 'active' );

		}

		button.click ( function ( ) {

			series = name;

			chips.children ( ).removeClass ( 'active' );

			button.addClass ( 'active' );

			filter ( );

		} );

		chips.append ( button );

	};

	chip ( '', 'ALL ' + models.length );

	// work in progress chip first

	var pinned = String ( models.has ( '.work-in-progress' ).first ( ).data ( 'series' ) ).split ( '|' ) [ 0 ];

	Object.keys ( counts ).sort ( ).sort ( function ( a, b ) {

		return ( b === pinned ) - ( a === pinned );

	} ).forEach ( function ( name ) {

		chip ( name, name + ' ' + counts [ name ] );

		if ( name === pinned ) {

			chips.children ( ).last ( ).addClass ( 'progress' );

		}

	} );

	// show models matching every word and the chosen series

	function filter ( ) {

		var words = field.val ( ).toLowerCase ( ).split ( /\s+/ ).filter ( Boolean );

		var shown = 0;

		models.each ( function ( ) {

			var model = $( this );

			var text = String ( model.data ( 'search' ) ).toLowerCase ( );

			var match = ( ! series || String ( model.data ( 'series' ) ).split ( '|' ).includes ( series ) ) && words.every ( function ( word ) {

				return text.includes ( word );

			} );

			model.toggleClass ( 'hide', ! match );

			if ( match ) {

				shown ++;

			}

		} );

		// result shown inside the field while filtering

		clear.toggleClass ( 'hide', ! field.val ( ) && ! series );

		count.toggleClass ( 'none', ! shown );

		// series chip alone - result replaces the placeholder

		field.attr ( 'placeholder', series && ! words.length ? '' : placeholder );

		count.text ( ! words.length && ! series ? '' : ( words.length ? ' // ' : '' ) + ( shown ? shown + ( shown === 1 ? ' MODEL' : ' MODELS' ) : 'NO MATCH' ) );

		// result joined right after the typed text

		var style = getComputedStyle ( field [ 0 ] );

		measure.font = style.font;

		count.css ( 'left', field [ 0 ].offsetLeft + parseFloat ( style.paddingLeft ) + measure.measureText ( field.val ( ) ).width - field [ 0 ].scrollLeft );

	};

	// search filters while typing

	field.on ( 'input', filter );

	// clear marker empties the field and resets the series to all

	clear.on ( 'click', function ( ) {

		field.val ( '' );

		chips.children ( ).first ( ).click ( );

		field.focus ( );

	} );

	// keep typing from toggling the drawer

	field.on ( 'keyup', function ( event ) {

		event.stopPropagation ( );

	} );

	filter ( );

} );
