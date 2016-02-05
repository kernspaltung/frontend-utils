var Scroller = function() {

	this.wasIntroScrolled = false;
	this.wasScrolled = [];
	this.functions = [];

	var scroller = this;

	this.viewScroll = 0;

	this.parent=0;

	this.doScroll = function( elem_id, in_fn, out_fn ) {
		
		if( typeof( scroller.functions[elem_id] ) == "undefined" ) {
			scroller.functions[ elem_id ] = { 'in_fn': in_fn, 'out_fn': out_fn };
			scroller.wasScrolled[ elem_id ] = false;
	 	} else {

	 		var elem = $('#'+elem_id);

	 		if( this.isScrolledIntoView( '#'+elem_id ) ) {

		 		if( ! scroller.wasScrolled[ elem_id ] ) {
		 			scroller.functions[ elem_id ].in_fn( true );
	 				scroller.wasScrolled[ elem_id ] = true;
		 		}

	 		} else { 			
		 		
		 		if( scroller.wasScrolled[ elem_id ] ) {
	 				scroller.functions[ elem_id ].out_fn( true );
	 				scroller.wasScrolled[ elem_id ] = false;
		 		}
				scroller.functions[ elem_id ].out_fn( false );

	 		}
 		}

 	}

 	this.scrollTo = function ( target, parent ) {

		var targetDivScroll = target.offset().top;
		var parentTop  = parent.offset().top;
		var currScroll = parent.scrollTop();

		var targetY = currScroll - parentTop + targetDivScroll;

		parent.stop().animate({
			scrollTop: targetY
		}, 1000, 'swing');
	}

	this.isScrolledIntoView = function ( elem )
	{
	    var $elem = $(elem);
	    var $window = $(window);

	    var docViewTop = $window.scrollTop();
	    var docViewBottom = docViewTop + $window.height();

	    var elemTop = $elem.offset().top;
	    var elemBottom = elemTop + $elem.height();

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}



}