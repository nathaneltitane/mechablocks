// footer

function footer_init ( ) {

	console.log ( 'footer [ init ] : start' ) ;

	var footer_id = document.getElementById ( 'footer' ) ;

	if ( ! footer_id ) {

		console.warn ( 'footer [ init ] : abort - #footer missing' ) ;

		return ;
	}

	var initialized = false ;
	var bootstrap_observer = null ;
	var footer_observer = null ;

	function footer_get ( ) {

		return footer_id.querySelector ( '.footer' ) ;
	}

	function footing_get ( ) {

		return document.querySelectorAll ( '.footing' ) ;
	}

	function footing_open ( ) {

		var footing_list = footing_get ( ) ;

		for ( var i = 0 ; i < footing_list.length ; i ++ ) {

			footing_list [ i ].classList.add ( 'footing-open' ) ;
		}
	}

	function footing_close ( ) {

		var footing_list = footing_get ( ) ;

		for ( var i = 0 ; i < footing_list.length ; i ++ ) {

			footing_list [ i ].classList.remove ( 'footing-open' ) ;
		}
	}

	function hide ( ) {

		console.log ( 'footer [ state ] : hide' ) ;

		footing_close ( ) ;

		footer_id.classList.remove ( 'footer-show' ) ;
		footer_id.classList.add ( 'footer-hide' ) ;
	}

	function show ( ) {

		console.log ( 'footer [ state ] : show' ) ;

		footing_open ( ) ;

		footer_id.classList.remove ( 'footer-hide' ) ;
		footer_id.classList.add ( 'footer-show' ) ;
	}

	function scroll ( footer ) {

		var arrow_left = document.querySelector ( '#footer-start .footer-start' ) ;
		var arrow_right = document.querySelector ( '#footer-end .footer-end' ) ;

		if ( ! footer || footer.clientWidth <= 0 ) {

			if ( arrow_left ) {

				arrow_left.classList.remove ( 'footer-right' ) ;
			}

			if ( arrow_right ) {

				arrow_right.classList.remove ( 'footer-left' ) ;
			}

			return ;
		}

		var scroll_maximum = footer.scrollWidth - footer.clientWidth ;
		var can_scroll = scroll_maximum > 1 ;

		if ( ! can_scroll ) {

			if ( arrow_left ) {

				arrow_left.classList.remove ( 'footer-right' ) ;
			}

			if ( arrow_right ) {

				arrow_right.classList.remove ( 'footer-left' ) ;
			}

			return ;
		}

		if ( footer.scrollLeft <= 1 ) {

			if ( arrow_left ) {

				arrow_left.classList.add ( 'footer-right' ) ;
			}

			if ( arrow_right ) {

				arrow_right.classList.remove ( 'footer-left' ) ;
			}

			return ;
		}

		if ( footer.scrollLeft >= scroll_maximum - 1 ) {

			if ( arrow_left ) {

				arrow_left.classList.remove ( 'footer-right' ) ;
			}

			if ( arrow_right ) {

				arrow_right.classList.add ( 'footer-left' ) ;
			}

			return ;
		}

		if ( arrow_left ) {

			arrow_left.classList.add ( 'footer-right' ) ;
		}

		if ( arrow_right ) {

			arrow_right.classList.add ( 'footer-left' ) ;
		}
	}

	function scroll_update ( footer ) {

		requestAnimationFrame ( function ( ) {

			requestAnimationFrame ( function ( ) {

				scroll ( footer ) ;
			} ) ;
		} ) ;
	}

	function assets_bind ( footer ) {

		var asset_list = footer.querySelectorAll ( 'img, object' ) ;

		for ( var i = 0 ; i < asset_list.length ; i ++ ) {

			var asset = asset_list [ i ] ;

			if ( asset.dataset.footerAssetBound === 'true' ) {

				continue ;
			}

			asset.dataset.footerAssetBound = 'true' ;

			asset.addEventListener ( 'load', function ( event ) {

				console.log ( 'footer [ asset ] : loaded - ', event.target ) ;

				scroll_update ( footer ) ;

			}, { once: true } ) ;

			asset.addEventListener ( 'error', function ( event ) {

				console.warn ( 'footer [ asset ] : failed - ', event.target ) ;

				scroll_update ( footer ) ;

			}, { once: true } ) ;
		}
	}

	function bind ( footer ) {

		console.log ( 'footer [ event ] : bind events' ) ;

		var canvas = document.getElementById ( 'canvas' ) ;

		document.addEventListener ( 'pointerdown', function ( event ) {

			if ( ! canvas ) {

				return ;
			}

			if ( event.target !== canvas && ! canvas.contains ( event.target ) ) {

				return ;
			}

			if ( event.pointerType === 'mouse' && event.button !== 0 ) {

				return ;
			}

			// hide ( ) ;

		}, { passive: true } ) ;

		document.addEventListener ( 'pointerup', function ( ) {

			if ( ! canvas ) {

				return ;
			}

			show ( ) ;
			scroll_update ( footer ) ;

		}, { passive: true } ) ;

		document.addEventListener ( 'pointercancel', function ( ) {

			if ( ! canvas ) {

				return ;
			}

			show ( ) ;
			scroll_update ( footer ) ;

		}, { passive: true } ) ;

		footer.addEventListener ( 'wheel', function ( event ) {

			if ( event.deltaY === 0 ) {

				return ;
			}

			event.preventDefault ( ) ;

			footer.scrollLeft += event.deltaY ;

			scroll ( footer ) ;

		}, { passive: false } ) ;

		footer.addEventListener ( 'scroll', function ( ) {

			scroll ( footer ) ;
		} ) ;

		window.addEventListener ( 'resize', function ( ) {

			scroll_update ( footer ) ;
		} ) ;
	}

	function observe ( footer ) {

		footer_observer = new MutationObserver ( function ( mutations ) {

			console.log ( 'footer [ observer ] : mutation detected ', '[ ', mutations.length, ' ]' ) ;

			assets_bind ( footer ) ;
			footing_open ( ) ;
			scroll_update ( footer ) ;
		} ) ;

		footer_observer.observe ( footer_id, {

			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: [ 'src', 'href', 'class', 'style' ]
		} ) ;
	}

	function initialize ( ) {

		if ( initialized ) {

			return ;
		}

		var footer = footer_get ( ) ;

		if ( ! footer ) {

			console.log ( 'footer [ bootstrap ] : waiting for .footer' ) ;

			return ;
		}

		console.log ( 'footer [ bootstrap ] : footer found' ) ;

		initialized = true ;

		bind ( footer ) ;
		assets_bind ( footer ) ;
		observe ( footer ) ;

		show ( ) ;
		scroll_update ( footer ) ;

		if ( document.fonts && document.fonts.ready ) {

			document.fonts.ready.then ( function ( ) {

				console.log ( 'footer [ font ] : ready' ) ;

				footing_open ( ) ;
				scroll_update ( footer ) ;
			} ) ;
		}

		if ( bootstrap_observer ) {

			bootstrap_observer.disconnect ( ) ;
			bootstrap_observer = null ;
		}
	}

	bootstrap_observer = new MutationObserver ( function ( mutations ) {

		console.log ( 'footer [ bootstrap ] : mutation detected ', '[ ', mutations.length, ' ]' ) ;

		initialize ( ) ;
	} ) ;

	bootstrap_observer.observe ( footer_id, {

		childList: true,
		subtree: true
	} ) ;

	initialize ( ) ;
}

if ( document.readyState === 'loading' ) {

	document.addEventListener ( 'DOMContentLoaded', footer_init, { once: true } ) ;
}

else {

	footer_init ( ) ;
}
