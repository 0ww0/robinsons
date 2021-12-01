(function(){

    //----- OPEN
    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
        e.preventDefault();
        $('body').addClass('noscroll');
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        e.preventDefault();
        $('body').removeClass('noscroll');
    });

    $(document).click(function(e){
        if (!$(e.target).closest("[data-popup-open],[data-popup-open-slider],.popup-inner").length) {
            $("body").find("[data-popup]").fadeOut(350);
            $('body').removeClass('noscroll');
        }
    });


    //----- Carousel Slider Drag "popup"
    var mousedownX = null,
        movementThreshold = 5;

    // Windows Phone 8 does not have touchdown event so use mousedown instead
    $('[data-popup-open-slider]').on("mousedown", function(e) {
        mousedownX = e.pageX;
    });

    $('[data-popup-open-slider]').on("click", function(e) {
        if (!mousedownX || Math.abs(mousedownX - e.pageX) < movementThreshold) {
            //----- OPEN
            var targeted_popup_class = jQuery(this).attr('data-popup-open-slider');
            $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
            e.preventDefault();
            $('body').addClass('noscroll');
        }
    });

})();
