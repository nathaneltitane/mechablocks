// footer

function footer_init ( ) {

	console.log ( 'footer [ initialize ] : start' ) ;

	var footer_id = document.getElementById ( 'footer' ) ;

	if ( ! footer_id ) {

		console.warn ( 'footer [ initialize ] : abort - #footer missing' ) ;

		return ;
	}

	var initialized = false ;
	var revealed = false ;
	var bootstrap_observer = null ;
	var footer_observer = null ;
	var reveal_timeout = null ;
	var version = Date.now ( ) ;

	function source_version ( source ) {

		var url ;

		if ( ! source ) {

			return source ;
		}

		try {

			url = new URL ( source, document.baseURI ) ;
			url.searchParams.set ( 'footer-version', version ) ;

			return url.href ;
		}

		catch ( error ) {

			console.warn (
				'footer [ cache ] : invalid source',
				'[ ',
				source,
				' ]'
			) ;

			return source ;
		}
	}

	function assets_version ( container ) {

		var asset_list = container.querySelectorAll (
			'img[src], object[data], source[src], video[poster]'
		) ;

		for ( var i = 0 ; i < asset_list.length ; i ++ ) {

			var asset = asset_list [ i ] ;
			var attribute = null ;

			if ( asset.hasAttribute ( 'src' ) ) {

				attribute = 'src' ;
			}

			else if ( asset.hasAttribute ( 'data' ) ) {

				attribute = 'data' ;
			}

			else if ( asset.hasAttribute ( 'poster' ) ) {

				attribute = 'poster' ;
			}

			if ( ! attribute ) {

				continue ;
			}

			var source = asset.getAttribute ( attribute ) ;

			if (
				! source ||
				source.startsWith ( 'data:' ) ||
				source.startsWith ( 'blob:' )
			) {

				continue ;
			}

			asset.setAttribute (
				attribute,
				source_version ( source )
			) ;
		}
	}

	function footer_load ( ) {

		var source = footer_id.dataset.source ;

		if ( ! source ) {

			console.log (
				'footer [ load ] : no data-source, using existing contents'
			) ;

			assets_version ( footer_id ) ;
			initialize ( ) ;

			return ;
		}

		console.log (
			'footer [ load ] : loading',
			'[ ',
			source,
			' ]'
		) ;

		fetch ( source_version ( source ), {

			cache: 'no-store',
			credentials: 'same-origin'

		} )
		.then ( function ( response ) {

			if ( ! response.ok ) {

				throw new Error (
					'Footer request failed: ' +
					response.status +
					' ' +
					response.statusText
				) ;
			}

			return response.text ( ) ;
		} )
		.then ( function ( content ) {

			var template = document.createElement ( 'template' ) ;

			template.innerHTML = content.trim ( ) ;

			assets_version ( template.content ) ;

			footer_id.replaceChildren ( template.content ) ;

			console.log ( 'footer [ load ] : complete' ) ;

			initialize ( ) ;
		} )
		.catch ( function ( error ) {

			console.error (
				'footer [ load ] : failed',
				error
			) ;

			if ( footer_id.children.length > 0 ) {

				console.warn (
					'footer [ load ] : using existing contents'
				) ;

				assets_version ( footer_id ) ;
				initialize ( ) ;
			}
		} ) ;
	}

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

		var arrow_left = document.querySelector (
			'#footer-start .footer-start'
		) ;

		var arrow_right = document.querySelector (
			'#footer-end .footer-end'
		) ;

		if ( ! footer || footer.clientWidth <= 0 ) {

			if ( arrow_left ) {

				arrow_left.classList.remove ( 'footer-right' ) ;
			}

			if ( arrow_right ) {

				arrow_right.classList.remove ( 'footer-left' ) ;
			}

			return ;
		}

		var scroll_maximum =
			footer.scrollWidth -
			footer.clientWidth ;

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

		var asset_list = footer.querySelectorAll (
			'img, object, source, video'
		) ;

		for ( var i = 0 ; i < asset_list.length ; i ++ ) {

			var asset = asset_list [ i ] ;

			if ( asset.dataset.footerAssetBound === 'true' ) {

				continue ;
			}

			asset.dataset.footerAssetBound = 'true' ;

			asset.addEventListener ( 'load', function ( event ) {

				console.log (
					'footer [ asset ] : loaded',
					event.target
				) ;

				scroll_update ( footer ) ;

			}, { once: true } ) ;

			asset.addEventListener ( 'error', function ( event ) {

				console.warn (
					'footer [ asset ] : failed',
					event.target
				) ;

				scroll_update ( footer ) ;

			}, { once: true } ) ;
		}
	}

	function reveal ( footer ) {

		var canvas = document.getElementById ( 'canvas' ) ;

		function reveal_start ( ) {

			if ( reveal_timeout ) {

				clearTimeout ( reveal_timeout ) ;
			}

			reveal_timeout = setTimeout ( function ( ) {

				reveal_timeout = null ;
				revealed = true ;

				show ( ) ;
				scroll_update ( footer ) ;

			}, 2500 ) ;
		}

		if ( ! canvas ) {

			reveal_start ( ) ;

			return ;
		}

		function canvas_ready ( ) {

			if (
				canvas.width > 0 &&
				canvas.height > 0 &&
				canvas.clientWidth > 0 &&
				canvas.clientHeight > 0
			) {

				console.log (
					'footer [ reveal ] : canvas ready'
				) ;

				reveal_start ( ) ;

				return ;
			}

			requestAnimationFrame ( canvas_ready ) ;
		}

		canvas_ready ( ) ;
	}

	function bind ( footer ) {

		console.log ( 'footer [ event ] : bind events' ) ;

		var canvas = document.getElementById ( 'canvas' ) ;

		document.addEventListener (
			'pointerdown',
			function ( event ) {

				if ( ! revealed || ! canvas ) {

					return ;
				}

				if (
					event.target !== canvas &&
					! canvas.contains ( event.target )
				) {

					return ;
				}

				if (
					event.pointerType === 'mouse' &&
					event.button !== 0
				) {

					return ;
				}

				// hide ( ) ;

			},
			{ passive: true }
		) ;

		document.addEventListener (
			'pointerup',
			function ( ) {

				if ( ! revealed || ! canvas ) {

					return ;
				}

				show ( ) ;
				scroll_update ( footer ) ;

			},
			{ passive: true }
		) ;

		document.addEventListener (
			'pointercancel',
			function ( ) {

				if ( ! revealed || ! canvas ) {

					return ;
				}

				show ( ) ;
				scroll_update ( footer ) ;

			},
			{ passive: true }
		) ;

		footer.addEventListener (
			'wheel',
			function ( event ) {

				if ( event.deltaY === 0 ) {

					return ;
				}

				event.preventDefault ( ) ;

				footer.scrollLeft += event.deltaY ;

				scroll ( footer ) ;

			},
			{ passive: false }
		) ;

		footer.addEventListener ( 'scroll', function ( ) {

			scroll ( footer ) ;
		} ) ;

		window.addEventListener ( 'resize', function ( ) {

			scroll_update ( footer ) ;
		} ) ;
	}

	function observe ( footer ) {

		footer_observer = new MutationObserver (
			function ( mutations ) {

				console.log (
					'footer [ observer ] : mutation detected',
					'[ ',
					mutations.length,
					' ]'
				) ;

				assets_bind ( footer ) ;
				scroll_update ( footer ) ;
			}
		) ;

		footer_observer.observe ( footer_id, {

			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: [
				'src',
				'data',
				'poster',
				'class',
				'style'
			]
		} ) ;
	}

	function initialize ( ) {

		if ( initialized ) {

			return ;
		}

		var footer = footer_get ( ) ;

		if ( ! footer ) {

			console.log (
				'footer [ bootstrap ] : waiting for .footer'
			) ;

			return ;
		}

		console.log (
			'footer [ bootstrap ] : footer found'
		) ;

		initialized = true ;

		hide ( ) ;

		bind ( footer ) ;
		assets_bind ( footer ) ;
		observe ( footer ) ;

		scroll_update ( footer ) ;
		reveal ( footer ) ;

		if ( document.fonts && document.fonts.ready ) {

			document.fonts.ready.then ( function ( ) {

				console.log (
					'footer [ font ] : ready'
				) ;

				scroll_update ( footer ) ;
			} ) ;
		}

		if ( bootstrap_observer ) {

			bootstrap_observer.disconnect ( ) ;
			bootstrap_observer = null ;
		}
	}

	hide ( ) ;

	bootstrap_observer = new MutationObserver (
		function ( mutations ) {

			console.log (
				'footer [ bootstrap ] : mutation detected',
				'[ ',
				mutations.length,
				' ]'
			) ;

			initialize ( ) ;
		}
	) ;

	bootstrap_observer.observe ( footer_id, {

		childList: true,
		subtree: true
	} ) ;

	footer_load ( ) ;
}

if ( document.readyState === 'loading' ) {

	document.addEventListener (
		'DOMContentLoaded',
		footer_init,
		{ once: true }
	) ;
}

else {

	footer_init ( ) ;
}
