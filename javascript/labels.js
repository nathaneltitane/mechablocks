// labels //

$( document ).ready ( function ( ) {

    var ids = [
        '#navigation-button-label',
        '#paypal-button-label',
        '#color-button-label',
        '#dimensions-button-label',
        '#edges-button-label',
        '#wireframe-button-label',
        '#controls-button-label',
        '#plane-button-label',
        '#minifig-button-label'
    ];

    var ids = ids.join ( ', ' );

    if ( $( 'body' ).height() < 1000 ) {

        $( ids ).removeClass ( 'modes-show' );

        $( ids ).addClass ( 'modes-hide' );

    } else {

        $( ids ).removeClass ( 'modes-hide' );

        $( ids ).addClass ( 'modes-show' );

    }

} );
