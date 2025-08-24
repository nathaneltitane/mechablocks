// hover

// provide touch screen browser hover emulation

$( document ).ready ( function ( ) {

    $( '#background' ).bind ( 'touchstart', function ( event ) {

        event.preventDefault ( );

        $( '#background-overlay' ).addClass ( 'hover-background-overlay' );

    });

        $( '#background' ).bind ( 'touchend', function ( event ) {

        event.preventDefault ( );

        $( '#background-overlay' ).removeClass ( 'hover-background-overlay' );

    });

});
