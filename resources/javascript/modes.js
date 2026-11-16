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
        '#minifigure'
    ];

    var ids = ids.join ( ', ' );

    if ( $( 'body' ).height() < 1000 ) {

        // mode buttons show

        function show ( ) {

            $( ids ).removeClass ( 'modes-hide' );

            $( ids ).addClass ( 'modes-show' );

        };

        // mode buttons hide

        function hide ( ) {

            $( ids ).removeClass ( 'modes-show' );

            $( ids ).addClass ( 'modes-hide' );

        };

        // mode buttons show or hide

        function toggle ( ) {

            if ( $( ids ).hasClass ( 'modes-show' ) ) {

                hide ( );

            }

            else {

                show ( );

            }
        };

        // hovering the modes hides them

        $( '#modes' ).hover ( function ( event ) {

            hide ( ) ;

        } );

        // hovering the canvas shows modes

        $( '#canvas, #footer' ).hover ( function ( event ) {

            if ( $( ids ).hasClass ( 'modes-hide' ) ) {

                show ( );

            }

        } );

    }

} );
