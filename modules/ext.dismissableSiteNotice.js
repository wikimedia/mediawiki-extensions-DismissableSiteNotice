( function ( mw, $ ) {

	var cookieName = 'dismissSiteNotice',
		siteNoticeId = mw.config.get( 'wgSiteNoticeId' );

	if ( !siteNoticeId ) {
		return;
	}

	if ( $.cookie( cookieName ) === siteNoticeId ) {
		mw.util.addCSS( '.mw-dismissable-notice { display: none; }' );
		return;
	}

	$( function () {
		$( '.mw-dismissable-notice-close' )
			.css( 'visibility', 'visible' )
			.find( 'a' )
				.click( function ( e ) {
					e.preventDefault();
					$.cookie( cookieName, siteNoticeId, {
						expires: 30,
						path: '/'
					} );
					$( this ).closest( '.mw-dismissable-notice' ).hide();
				} );
	} );

}( mediaWiki, jQuery ) );
