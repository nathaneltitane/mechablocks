// selections //

document.addEventListener ( 'DOMContentLoaded', function ( ) {

	console.log ( 'selections [ init ] : domcontentloaded' ) ;

	var selections_parent = document.getElementById ( 'selections' ) ;
	var selections = null ;

	if ( ! selections_parent ) {

		console.log ( 'selections [ init ] : abort, #selections missing' ) ;

		return ;

	}

	selections = selections_parent.querySelector ( '.selections' ) ;

	if ( ! selections ) {

		console.warn ( 'selections [ init ] : abort, .selections missing' ) ;

		return ;

	}

	// selections bar hides

	function selections_hide ( ) {

		selections_parent.classList.remove ( 'show' ) ;
		selections.classList.remove ( 'show' ) ;

		selections_parent.classList.remove ( 'peek' ) ;
		selections.classList.remove ( 'peek' ) ;

		selections_parent.classList.add ( 'hide' ) ;
		selections.classList.add ( 'hide' ) ;

	}

	// selections bar shows

	function selections_show ( ) {

		selections_parent.classList.remove ( 'hide' ) ;
		selections.classList.remove ( 'hide' ) ;

		selections_parent.classList.remove ( 'peek' ) ;
		selections.classList.remove ( 'peek' ) ;

		selections_parent.classList.add ( 'show' ) ;
		selections.classList.add ( 'show' ) ;

	}

	// selections tab hides

	function tab_hide ( ) {

		// purge conflicting states

		selections_parent.classList.remove ( 'show' ) ;
		selections.classList.remove ( 'show' ) ;

		selections_parent.classList.remove ( 'peek' ) ;
		selections.classList.remove ( 'peek' ) ;

		// hide tab

		selections_parent.classList.add ( 'peek' ) ;
		selections.classList.add ( 'peek' ) ;

	}

	// selections tab shows

	function tab_show ( ) {

		setTimeout ( function ( ) {

			// purge conflicting states

			selections_parent.classList.remove ( 'show' ) ;
			selections.classList.remove ( 'show' ) ;

			selections_parent.classList.remove ( 'hide' ) ;
			selections.classList.remove ( 'hide' ) ;

			selections_parent.classList.remove ( 'peek' ) ;
			selections.classList.remove ( 'peek' ) ;

			// show tab

			selections_parent.classList.add ( 'peek' ) ;
			selections.classList.add ( 'peek' ) ;

		}, 250 ) ;

	}

	// selections tab opens or closes

	function selections_toggle ( ) {

		if ( open ( ) ) {

			tab_hide ( ) ;

		} else {

			selections_show ( ) ;

		}

		selections_scroll ( ) ;

	}

	// selections tab is open

	function open ( ) {

		return selections_parent.classList.contains ( 'show' ) ;

	}

	// edge arrows follow the scroll

	function selections_scroll ( ) {

		var arrow_left	= document.querySelector ( '#selections-start .arrow' ) ;
		var arrow_right	= document.querySelector ( '#selections-end .arrow' ) ;

		// do not show arrows if load incomplete

		if ( selections.clientWidth <= 0 ) {

			if ( arrow_left ) arrow_left.classList.remove ( 'show' ) ;
			if ( arrow_right ) arrow_right.classList.remove ( 'show' ) ;

			return ;

		}

		// robust overflow check - flex / subpixel / rounding

		var can_scroll = selections.scrollWidth > ( selections.clientWidth + 1 ) ;

		if ( ! can_scroll ) {

			if ( arrow_left ) arrow_left.classList.remove ( 'show' ) ;
			if ( arrow_right ) arrow_right.classList.remove ( 'show' ) ;

			return ;

		}

		var scroll_maximum = selections.scrollWidth - selections.clientWidth ;

		// start

		if ( selections.scrollLeft <= 0 ) {

			if ( arrow_left ) arrow_left.classList.add ( 'show' ) ;
			if ( arrow_right ) arrow_right.classList.remove ( 'show' ) ;

			return ;

		}

		// middle

		// if ( arrow_left ) arrow_left.classList.add ( 'show' ) ;
		// if ( arrow_right ) arrow_right.classList.add ( 'show' ) ;

		// end

		if ( selections.scrollLeft >= scroll_maximum - 1 ) {

			if ( arrow_left ) arrow_left.classList.remove ( 'show' ) ;
			if ( arrow_right ) arrow_right.classList.add ( 'show' ) ;

			return ;

		}

	}

	// tab click

	selections_parent.addEventListener ( 'click', function ( event ) {

		var tab_click = event.target.closest ( '.tab' ) ;
		var tab_pseudo_click = event.target === selections_parent ;

		if ( ! tab_click && ! tab_pseudo_click ) {

			return ;

		}

		selections_toggle ( ) ;

	}, { passive: true } ) ;

	// hide on canvas interaction for viewer pages - no auto-show

	var canvas = document.getElementById ( 'canvas' ) ;

	// event lands on the canvas

	function target ( event ) {

		return canvas && ( event.target === canvas || canvas.contains ( event.target ) ) ;

	}

	// canvas press closes selections

	document.addEventListener ( 'pointerdown', function ( event ) {

		if ( ! canvas ) {

			return ;

		}

		if ( ! target ( event ) ) {

			return ;

		}

		if ( event.pointerType === 'mouse' && event.button !== 0 ) {

			return ;

		}

		// selections_hide ( ) ;

		tab_show ( ) ;

	}, { passive: true } ) ;


	// horizontal scrolling

	selections.addEventListener ( 'wheel', function ( event ) {

		if ( event.deltaY === 0 ) {

			return ;

		}

		event.preventDefault ( ) ;

		selections.scrollLeft += event.deltaY ;

		selections_scroll ( ) ;

	}, { passive: false } ) ;

	// arrows update on scroll

	selections.addEventListener ( 'scroll', function ( ) {

		selections_scroll ( ) ;

	} ) ;

	// arrows update on resize

	window.addEventListener ( 'resize', function ( ) {

		selections_scroll ( ) ;

	} ) ;

	selections_hide ( ) ;

	selections_scroll ( ) ;

	tab_show ( ) ;

} ) ;
