// modes //

$( document ).ready ( function ( ) {

	var modes = $( '#modes' );

	var ids = [
        '#browse',
        '#paypal',
        '#color',
        '#dimensions',
        '#edges',
        '#wireframe',
        '#controls',
        '#plane',
        '#minifig'
    ];

    var ids = ids.join ( ', ' );

    if ( $( 'body' ).height() < 1000 ) {

        function show ( ) {

            $( ids ).removeClass ( 'modes-hide' );

            $( ids ).addClass ( 'modes-show' );

        };

        function hide ( ) {

            $( ids ).removeClass ( 'modes-show' );

            $( ids ).addClass ( 'modes-hide' );

        };

        function toggle ( ) {

            if ( $( ids ).hasClass ( 'modes-show' ) ) {

                hide ( );

            }

            else {

                show ( );

            }
        };

        $( '#modes' ).hover ( function ( event ) {

            hide ( ) ;

        } );

        $( '#canvas, #footer' ).hover ( function ( event ) {

            if ( $( ids ).hasClass ( 'modes-hide' ) ) {

                show ( );

            }

        } );

    }

} );
