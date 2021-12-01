//Navbar

(function(){
    var $trigger = $('.js-dropdown-trigger'),
        $dropdown = $('.js-dropdown-submenu'),
        $hamburger = $('.js-hamburger-menu'),
        $navigation = $('.js-navigation-menu'),
        $search = $('.search'),
        $searchBlock = $('.brand-searchbar'),
        $body = $('body'),
        isMobile = ($(window).width() < 801);

        $hamburger.on('click', function(e){
            $navigation.toggleClass('brand-active');
            $body.toggleClass('noscroll');
            $hamburger.toggleClass('open');

            if($searchBlock.hasClass('search-active')){
                $searchBlock.removeClass('search-active');
                $search.removeClass('open');
            }
        });

        $search.on('click', function(e){
            if($navigation.hasClass('brand-active')){
                $navigation.removeClass('brand-active');
                $body.removeClass('noscroll');
                $hamburger.removeClass('open');
                $searchBlock.toggleClass('search-active');
                $search.toggleClass('open');
            }
            else{
                $searchBlock.toggleClass('search-active');
                $search.toggleClass('open');
            }
        });


        function menu() {
            $trigger.each(function(){
                var $this = $(this);

                $this.on('click',function(){
                    if(isMobile) {
                        $trigger.not(this).children($dropdown).removeClass('sub-active');
                        $this.children($dropdown).toggleClass('sub-active');
                    }
                });
            });
            $trigger.hover(
                function(e){
                    if(!isMobile) {
                        $(this).find($dropdown).addClass('sub-active');
                    }
                },
                function(e){
                    if(!isMobile) {
                        $(this).find($dropdown).removeClass('sub-active');
                    }
                }
            );
        }

        menu();

        $(window).on('resize', function(e){
            isMobile = ($(window).width() < 801);
       });

       $(window).scroll(function(){
            var $this = $(this),
                $topPos = $this.scrollTop();


            if($topPos > 250){
                $('.brand-header').addClass('slim');
            }
            else{
                $('.brand-header').removeClass('slim');
            }
       });
})();
