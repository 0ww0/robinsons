(function(){
    $trigger = $('.sidebar-activator');
    $target = $('.sidebar-wrapper');

    $trigger.on('click', function(e){
        $trigger.toggleClass('open');
        $target.toggleClass('open');
    });




    /*---------------------------
        popup hight scroll bar
    -----------------------------*/
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        e.preventDefault();

        $('[data-popup="' + targeted_popup_class + '"]').each(function() {
	        var $this = $(this),
	        	$activeHeight = $this.find('.simplebar-holder'),
	            assetHeight = $activeHeight.height(),
	            activeClass = 'active_height';

	        if (assetHeight >= 250){
	            $activeHeight.addClass(activeClass);
	        } else {
	            $activeHeight.removeClass(activeClass);
	        }
	    });

    });

    

})();
