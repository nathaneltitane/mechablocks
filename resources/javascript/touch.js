// touch //

document.addEventListener ( 'DOMContentLoaded', function ( ) {

	const wrapper = document.getElementById ( 'paypal-button-icon' )

	const link = wrapper.querySelector ( 'a' )

	var previewVisible = false

	wrapper.addEventListener ( 'click', function ( e ) {

		if ( !previewVisible ) {

			e.preventDefault ( )

			showPreview ( )

			previewVisible = true

			setTimeout ( function ( ) {

				previewVisible = false

			}, 5000 )

		} else {

			window.location.href = link.href
		}

	})

})

