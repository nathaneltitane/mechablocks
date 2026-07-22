// footer

function footer_init ( ) {

	console.log ( 'footer [ init ] : start' ) ;

	var footer_id = document.getElementById ( 'footer' ) ;

	if ( ! footer_id ) {

		console.warn ( 'footer [ init ] : abort - #footer missing' ) ;

		return ;
	}

	var initialized = false ;
	var ready = false ;
	var bootstrap_observer = null ;
	var footer_observer = null ;

	function footer_get ( ) {

		return footer_id.querySelector ( '.footer' ) ;
	}

	function hide ( footer ) {

		console.log ( 'footer [ state ] : hide' ) ;

		$('.footing').removeClass('footing-open');

		footer_id.classList.remove ( 'footer-show' ) ;
		footer_id.classList.add ( 'footer-hide' ) ;
	}

	function show ( footer ) {

		console.log ( 'footer [ state ] : show' ) ;

		$( '.footing' ).addClass( 'footing-open' );

		footer_id.classList.remove ( 'footer-hide' ) ;
		footer_id.classList.add ( 'footer-show' ) ;
	}

	// footer slot readiness check

	var slot_identifiers_list = [ 'paypal', 'controls', 'plane', 'dimensions', 'minifig', 'wireframe', 'edges', 'camera', 'color', 'home', 'browse', 'contact', 'shop', 'github', 'donations' ] ;

	var landing_slot_identifiers_list = [ 'home', 'browse', 'contact', 'shop', 'github', 'donations' ] ;

	function slots ( ) {

		var landing = !! document.getElementById ( 'landing' ) ;

		var list = landing ? landing_slot_identifiers_list : slot_identifiers_list ;

		console.log ( 'footer [ slot ] : check start', landing ? '- landing' : '- viewer' ) ;

		for ( var i = 0 ; i < list.length ; i ++ ) {

			var id = list [ i ] ;
			var slot_identifier = document.getElementById ( id ) ;

			if ( ! slot_identifier ) {

				console.warn ( 'footer [ slot ] : missing - ', id ) ;

				return false ;
			}

			console.log ( 'footer [ slot ] : ready - ', id ) ;
		}

		console.log ( 'footer [ slot ] : ready - all' ) ;

		return true ;
	}

	function assets ( footer, callback ) {

		var assets_list = footer.querySelectorAll ( 'img, object' ) ;
		var assets_pending = assets_list.length ;
		var assets_complete = false ;

		console.log ( 'footer [ asset ] : check start', '[ ', assets_pending, ' ]' ) ;

		function complete ( ) {

			if ( assets_complete ) {

				return ;
			}

			assets_complete = true ;

			requestAnimationFrame ( function ( ) {

				requestAnimationFrame ( function ( ) {

					console.log ( 'footer [ asset ] : ready - all' ) ;

					callback ( ) ;
				} ) ;
			} ) ;
		}

		function asset_ready ( asset ) {

			if ( asset.dataset.footerReady === 'true' ) {

				return ;
			}

			asset.dataset.footerReady = 'true' ;

			assets_pending -- ;

			console.log ( 'footer [ asset ] : ready - ', asset, '[ ', assets_pending, ' remaining ]' ) ;

			if ( assets_pending <= 0 ) {

				complete ( ) ;
			}
		}

		if ( assets_pending === 0 ) {

			complete ( ) ;

			return ;
		}

		for ( var i = 0 ; i < assets_list.length ; i ++ ) {

			(function ( asset ) {

				if ( asset.tagName === 'IMG' && asset.complete ) {

					asset_ready ( asset ) ;

					return ;
				}

				if ( asset.tagName === 'OBJECT' && asset.contentDocument ) {

					asset_ready ( asset ) ;

					return ;
				}

				asset.addEventListener ( 'load', function ( ) {

					asset_ready ( asset ) ;

				}, { once: true } ) ;

				asset.addEventListener ( 'error', function ( ) {

					console.warn ( 'footer [ asset ] : failed - ', asset ) ;

					asset_ready ( asset ) ;

				}, { once: true } ) ;

			})( assets_list [ i ] ) ;
		}
	}

	function fonts ( callback ) {

		if ( ! document.fonts || ! document.fonts.ready ) {

			console.log ( 'footer [ font ] : unsupported - skip' ) ;

			callback ( ) ;

			return ;
		}

		console.log ( 'footer [ font ] : pending' ) ;

		document.fonts.ready.then ( function ( ) {

			console.log ( 'footer [ font ] : ready' ) ;

			callback ( ) ;
		} ) ;
	}

	function canvas ( callback ) {

		var canvas = document.getElementById ( 'canvas' ) ;

		if ( ! canvas ) {

			console.log ( 'footer [ canvas ] : missing - skip' ) ;

			callback ( ) ;

			return ;
		}

		console.log ( 'footer [ canvas ] : size pending' ) ;

		function check ( ) {

			if ( canvas.clientWidth > 0 && canvas.clientHeight > 0 ) {

				console.log ( 'footer [ canvas ] : ready - ', 'width : ', canvas.clientWidth, 'height : ', canvas.clientHeight ) ;

				requestAnimationFrame ( function ( ) {

					callback ( ) ;
				} ) ;

				return ;
			}

			requestAnimationFrame ( check ) ;
		}

		check ( ) ;
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

		var can_scroll = footer.scrollWidth > ( footer.clientWidth + 1 ) ;

		if ( ! can_scroll ) {

			if ( arrow_left ) {

				arrow_left.classList.remove ( 'footer-right' ) ;
			}

			if ( arrow_right ) {

				arrow_right.classList.remove ( 'footer-left' ) ;
			}

			return ;
		}

		var scroll_maximum = footer.scrollWidth - footer.clientWidth ;

		if ( footer.scrollLeft <= 0 ) {

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

	function bind ( footer ) {

		console.log ( 'footer [ event ] : bind events' ) ;

		var canvas = document.getElementById ( 'canvas' ) ;

		function target ( event ) {

			var result = canvas && ( event.target === canvas || canvas.contains ( event.target ) ) ;

			console.log ( 'footer [ event ] : target - ', result ) ;

			return result ;
		}

		document.addEventListener ( 'pointerdown', function ( event ) {

			console.log ( 'footer [ event ] : pointer down' ) ;

			if ( ! canvas ) {

				console.warn ( 'footer [ event ] : ignored - no canvas' ) ;

				return ;
			}

			if ( ! target ( event ) ) {

				console.warn ( 'footer [ event ] : ignored - not canvas' ) ;

				return ;
			}

			if ( event.pointerType === 'mouse' && event.button !== 0 ) {

				console.warn ( 'footer [ event ] : ignored - not left mouse' ) ;

				return ;
			}

		}, { passive: true } ) ;

		document.addEventListener ( 'pointerup', function ( ) {

			console.log ( 'footer [ event ] : pointer up' ) ;

			if ( ! canvas ) {

				return ;
			}

			show ( footer ) ;
			scroll ( footer ) ;

		}, { passive: true } ) ;

		document.addEventListener ( 'pointercancel', function ( ) {

			console.log ( 'footer [ event ] : pointer cancel' ) ;

			if ( ! canvas ) {

				return ;
			}

			show ( footer ) ;
			scroll ( footer ) ;

		}, { passive: true } ) ;

		footer.addEventListener ( 'wheel', function ( event ) {

			console.log ( 'footer [ scroll ] : wheel ', event.deltaY ) ;

			if ( event.deltaY === 0 ) {

				return ;
			}

			event.preventDefault ( ) ;

			footer.scrollLeft += event.deltaY ;

			scroll ( footer ) ;

		}, { passive: false } ) ;

		footer.addEventListener ( 'scroll', function ( ) {

			console.log ( 'footer [ scroll ] : scroll' ) ;

			scroll ( footer ) ;
		} ) ;

		window.addEventListener ( 'resize', function ( ) {

			console.log ( 'footer [ scroll ] : resize' ) ;

			scroll ( footer ) ;
		} ) ;
	}

	function footer_ready ( footer ) {

		if ( ready ) {

			return ;
		}

		if ( ! slots ( ) ) {

			console.warn ( 'footer [ state ] : blocked - slots not ready' ) ;

			return ;
		}

		console.log ( 'footer [ state ] : structure ready' ) ;

		assets ( footer, function ( ) {

			fonts ( function ( ) {

				canvas ( function ( ) {

					if ( ready ) {

						return ;
					}

					ready = true ;

					console.log ( 'footer [ state ] : ready' ) ;

					show ( footer ) ;
					scroll ( footer ) ;

					if ( footer_observer ) {

						footer_observer.disconnect ( ) ;
						footer_observer = null ;
					}
				} ) ;
			} ) ;
		} ) ;
	}

	function initialize ( ) {

		if ( initialized ) {

			footer_ready ( footer_get ( ) ) ;

			return ;
		}

		var footer = footer_get ( ) ;

		if ( ! footer ) {

			console.log ( 'footer [ bootstrap ] : waiting for .footer' ) ;

			return ;
		}

		console.log ( 'footer [ bootstrap ] : footer found' ) ;

		initialized = true ;

		hide ( footer ) ;
		bind ( footer ) ;

		footer_observer = new MutationObserver ( function ( mutations ) {

			console.log ( 'footer [ bootstrap ] : footer load detected ', '[ ', mutations.length, ' ]', footer_id ) ;

			footer_ready ( footer ) ;
		} ) ;

		footer_observer.observe ( footer_id, { childList: true, subtree: true, characterData: true, attributes: true } ) ;

		footer_ready ( footer ) ;

		if ( bootstrap_observer ) {

			bootstrap_observer.disconnect ( ) ;
			bootstrap_observer = null ;
		}
	}

	bootstrap_observer = new MutationObserver ( function ( mutations ) {

		console.log ( 'footer [ bootstrap ] : bootstrap load detected ', '[ ', mutations.length, ' ]', footer_id ) ;

		initialize ( ) ;
	} ) ;

	bootstrap_observer.observe ( footer_id, { childList: true, subtree: true } ) ;

	initialize ( ) ;
}

if ( document.readyState === 'loading' ) {

	document.addEventListener ( 'DOMContentLoaded', footer_init ) ;

}

else {

	footer_init ( ) ;
}
