( function ( mw, $ ) {

	var sessionStorageName = 'dismissSiteNotice',
		cookieName = 'dismissSiteNotice',
		siteNoticeId = mw.config.get( 'wgSiteNoticeId' ),
		sessionSiteNoticeId = mw.storage.session.get( sessionStorageName );

	// If no siteNoticeId is set, exit.
	if ( !siteNoticeId ) {
		return;
	}

	// If the user has the notice dismissal local storage set, exit.
	if ( sessionSiteNoticeId === siteNoticeId ||
			// HACK: After 30 days, all use of cookies will
			//       expire but before that, keep using it.
			// Once this change is deployed, after a while (30+ days),
			// this can be removed since all cookies would have expired.
			$.cookie( cookieName ) === siteNoticeId ) {
		return;
	}

	// Otherwise, show the notice ...
	mw.util.addCSS( '.client-js .mw-dismissable-notice { display: block; }' );

	// ... and enable the dismiss button.
	$( function () {
		$( '.mw-dismissable-notice-close' )
			.css( 'visibility', 'visible' )
			.find( 'a' )
				.click( function ( e ) {
					e.preventDefault();
					$( this ).closest( '.mw-dismissable-notice' ).hide();
					mw.storage.session.set( sessionStorageName, siteNoticeId );
				} );
	} );

}( mediaWiki, jQuery ) );
