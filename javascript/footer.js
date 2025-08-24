// footer //

$ ( document ) .ready ( function ( ) {

	var canvas = document.getElementById ( 'canvas' ) ;

	var footer = document.getElementById ( 'footer' ) ;

	var isMouseOrTouchActive = false;

	var resetTimeout;

	function hide ( ) {

		footer.style.marginBottom = '-80px';

	}

	function show ( ) {

		footer.style.marginBottom = '0px';

	}

	function showWithTimeout ( ) {

		clearTimeout ( resetTimeout ) ;

		resetTimeout = setTimeout ( function ( ) {

			isMouseOrTouchActive = false;

			show ( ) ;

		}, 4000 ) ;

	}

	canvas.addEventListener ( 'mousemove', function ( event ) {

		if ( !isMouseOrTouchActive ) {

			isMouseOrTouchActive = true;

			showWithTimeout ( ) ;

			hide ( ) ;

		}

	} ) ;

		canvas.addEventListener ( 'mouseenter', function ( event ) {

		if ( !isMouseOrTouchActive ) {

			isMouseOrTouchActive = true;

			showWithTimeout ( ) ;

			hide ( ) ;

		}

	} ) ;

	canvas.addEventListener ( 'touchstart', function ( event ) {

		if ( !isMouseOrTouchActive ) {

			isMouseOrTouchActive = true;

			showWithTimeout ( ) ;

			hide ( ) ;

		}

	} ) ;

} ) ;
