// search //

$( document ).ready ( function ( ) {

	var field = $( '#search-field' );

	var chips = $( '#search-chips' );

	var count = $( '#search-count' );

	var models = $( '.model' );

	var series = '';

	// series chips with model counts

	var counts = { };

	models.each ( function ( ) {

		var name = $( this ).data ( 'series' );

		counts [ name ] = ( counts [ name ] || 0 ) + 1;

	} );

	function chip ( name, label ) {

		var button = $( '<button class="search-chip" type="button"></button>' ).text ( label );

		if ( name === series ) {

			button.addClass ( 'search-chip-active' );

		}

		button.click ( function ( ) {

			series = name;

			chips.children ( ).removeClass ( 'search-chip-active' );

			button.addClass ( 'search-chip-active' );

			filter ( );

		} );

		chips.append ( button );

	};

	chip ( '', 'ALL ' + models.length );

	Object.keys ( counts ).sort ( ).forEach ( function ( name ) {

		chip ( name, name + ' ' + counts [ name ] );

	} );

	// show models matching every word and the chosen series

	function filter ( ) {

		var words = field.val ( ).toLowerCase ( ).split ( /\s+/ ).filter ( Boolean );

		var shown = 0;

		models.each ( function ( ) {

			var model = $( this );

			var text = String ( model.data ( 'search' ) ).toLowerCase ( );

			var match = ( ! series || model.data ( 'series' ) === series ) && words.every ( function ( word ) {

				return text.includes ( word );

			} );

			model.toggleClass ( 'search-hidden', ! match );

			if ( match ) {

				shown ++;

			}

		} );

		count.text ( shown ? shown + ( shown === 1 ? ' MODEL' : ' MODELS' ) : 'NO MODELS MATCH YOUR SEARCH' );

	};

	field.on ( 'input', filter );

	// keep typing from toggling the drawer

	field.on ( 'keyup', function ( event ) {

		event.stopPropagation ( );

	} );

	filter ( );

} );
