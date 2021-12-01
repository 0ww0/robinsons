/**
 *  Data attribute:                     data-slickjs
 *  Global defaults:                    Yes
 *  Default data attribute parameter:   _settings --> slide
 *
 *  Parameters list for `data-dragger`:
 *
 *      _announceDrag: true     // OPTIONAL, NO GLOBAL DEFAULT
 *      _settings: keyword      // OPTIONAL, NO GLOBAL DEFAULT
 *      _extend: variableName   // OPTIONAL, NO GLOBAL DEFAULT
 *
 *-----------------------------------------------------------------------------
 *
 *  Simple sample:
 *
 *      <div data-slickjs="slide-item">
 *          <div class="slide-item"> ... </div>
 *          <div class="slide-item"> ... </div>
 *          <div class="slide-item"> ... </div>
 *      </div>
 *
 *  Arguments specified through this data attribute will be passed to the
 *  Slick plugin; the exceptions are parameters that start with an underscore,
 *  as listed above.
 *
 *  Setting `_announceDrag` to `true` will cause the carousel to set the
 *  `isDraggingSlick` global variable to `true` whenever the instance is
 *  being dragged.
 *
 *  Pass a corresponding keyword as the value of `_settings` to use one of the
 *  predefined set of parameters in the `variableSettings` variable below.
 *
 *  Pass the string name of a globally available object as the value of `_extend`.
 *  This object will then be extended into the instance's arguments last.
 */
(function() {
    if(!('slick' in $())) { // Only run if Slick is available
        console.error('_slick.js: SlickJS is not available.');
    } else {
        var globalDefaults = {
                useCSS: true,
                useTransform: true,
                cssEase: 'cubic-bezier(0.19, 1, 0.22, 1)',
                speed: 600
            };
        var variableSettings = {
                'mainCarousel': {
                    adaptiveHeight: true,
                    appendDots: '.carousel-dots',
                    customPaging : function(slider, i) {
                        var title = $(slider.$slides[i]).data('title');
                        return $([
                           '<button type="button" data-role="none" role="button" tabindex="0">',
                              title,
                           '</button>'
                       ].join(''));
                    },
                    arrows: true,
                    autoplay: true,
                    autoplaySpeed: 10000,
                    dots: true,
                    slide: '.carousel-item',
                },
                'arrivalCarousel': {
                    adaptiveHeight: true,
                    arrows: true,
                    appendDots: '.arrival-dots',
                    appendArrows: '.arrival-dots',
                    centerMode: true,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: false,
                    autoplaySpeed: 10000,
                    dots: true,
                    slide: '.arrival-item',
                    responsive: [
                        {
                            breakpoint: 1201,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        },
                    ]
                },
                'inStoreCarousel': {
                    centerMode: true,
                    centerPadding: "200px",
                    adaptiveHeight: true,
                    arrows: true,
                    autoplay: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    autoplaySpeed: 10000,
                    dots: false,
                    slide: '.instore-item',
                    responsive: [
                        {
                            breakpoint: 480,
                            settings: {
                                centerPadding: "40px",
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 640,
                            settings: {
                                centerPadding: "80px",
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 800,
                            settings: {
                                centerPadding: "50px",
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                centerPadding: "70px",
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 1400,
                            settings: {
                                centerPadding: "80px",
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }
                    ]
                },
                'bannerCarousel': {
                    adaptiveHeight: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: false,
                    autoplaySpeed: 10000,
                    dots: false,
                    slide: '.banner-item',
                },
                'storeEvent': {
                    adaptiveHeight: true,
                    arrows: true,
                    autoplay: false,
                    autoplaySpeed: 10000,
                    dots: true,
                    slide: '.event-item',
                },
                'offersCarousel': {
                    adaptiveHeight: true,
                    appendDots: '.offers-dots',
                    appendArrows: '.offers-dots',
                    arrows: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoplay: false,
                    autoplaySpeed: 10000,
                    dots: true,
                    slide: '.offers-item',
                    responsive: [
                        {
                            breakpoint: 481,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        }
                    ]
                },
            };
         var $win = $(window);
         var $slickInstances = $('[data-slickjs]');
         var autoplayInstances = [];

        $slickInstances.each(function(instanceIndex) {
            var $instance = $(this);
            var dataArgs = $instance.dataArgs('slickjs')[0];
            var slickArgs = {};

            if(typeof dataArgs === 'string' && dataArgs) {
                if(variableSettings[dataArgs]) {
                    slickArgs = variableSettings[dataArgs];
                } else {
                    slickArgs = { slide: dataArgs };
                }
            } else if(typeof dataArgs === 'object') {
                if(typeof dataArgs._settings === 'string'
                && dataArgs._settings
                && variableSettings[dataArgs._settings]) {
                    slickArgs = variableSettings[dataArgs._settings];
                } else {
                    slickArgs = dataArgs;
                }

                if(typeof dataArgs._extend === 'string'
                && dataArgs._extend
                && typeof window[dataArgs._extend] === 'object') {
                    $.extend(slickArgs, window[dataArgs._extend]);
                }
            }

            var pluginArgs = $.extend({}, globalDefaults, publicClone(slickArgs));

            if(typeof pluginArgs.slide !== 'string' || pluginArgs.slide === '') {
                console.error('_slick.js: `slide` argument missing.');
                $slickInstances = $slickInstances.not($instance);
                return;
            }

            var $slides = $instance.find(pluginArgs.slide);

            if($slides.length < 2) {
                $slickInstances = $slickInstances.not($instance);
                return;
            }

            $instance.slick(pluginArgs);

            // Pause autoplay if the instance is out of view.
            if(pluginArgs.autoplay) {
                autoplayInstances.push($instance);
            }

            /*
             * Dynamically toggle classes between slides by adding the
             * `data-slickjs-class` attribute to the slides.
             *
             * Useful when the Slick elements require slightly different
             * styles depending on the selected slide.
             */
            if($slides.filter('[data-slickjs-class]').length) {
                $instance.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
                    if($slides.eq(currentSlide).data('slickjs-class')) {
                        $instance.removeClass($slides.eq(currentSlide).data('slickjs-class'));
                    }
                    if($slides.eq(nextSlide).data('slickjs-class')) {
                        $instance.addClass($slides.eq(nextSlide).data('slickjs-class'));
                    }
                });
            }

            /*
             * For certain instances, it is very easy to accidentally trigger
             * a click on a button / link, because SlickJS does not handle that
             * scenario by default.
             *
             * So, we need our own way to know that the Slick instance is being
             * dragged, so that we can properly handle accidental clicks.
            */
            if(slickArgs._announceDrag === true) {
                var startPos;
                var mouseDown = false;
                var mouseMoved = false;
                var dragTimer;

                $instance.on('mousedown', function(e) {
                    clearTimeout(dragTimer);

                    startPos = {
                        x: e.screenX,
                        y: e.screenY
                    };

                    /*
                     * It's possible for the mouse to exit the instance area,
                     * that's why the mousemove and mouseup handlers have to be
                     * attached to the window instead.
                     */
                    $win.on('mousemove.slickDrag', function(ev) {
                        var moveDist = (
                                Math.abs(startPos.x - ev.screenX)
                                + Math.abs(startPos.y - ev.screenY)
                             )*0.5;

                        if(moveDist > 5) {
                            isDraggingSlick = true;
                            $win.off('mousemove.slickDrag');
                        }
                    });

                    $win.on('mouseup.slickDrag', function() {
                        $win.off('mousemove.slickDrag mouseup.slickDrag');

                        dragTimer = setTimeout(function() {
                            isDraggingSlick = false;
                        }, 50);
                    });
                });
            }
        });

        if($slickInstances.length) {
            $win.on('reflow.slick', function() {
                $slickInstances.slick('setPosition');
            });
        }

        // Pause autoplay if the instance is out of view.
        if(autoplayInstances.length) {
            $win.on('scroll.slick', throttle(function() {
                var topOfWindow = $win.scrollTop();
                var bottomOfWindow = topOfWindow + $win.outerHeight();

                $(autoplayInstances).each(function() {
                    var $thisCarousel = $(this);
                    var topOfCarousel = $thisCarousel.offset().top;
                    var bottomOfCarousel = topOfCarousel + $thisCarousel.outerHeight();
                    var carouselOutOfView = bottomOfCarousel < (topOfWindow+150)
                                            || topOfCarousel > (bottomOfWindow-150);

                    if(carouselOutOfView) {
                        if(!$thisCarousel.hasClass('is-paused')) {
                            $thisCarousel.addClass('is-paused');
                            $thisCarousel.slick('slickPause');
                        }
                    } else {
                        if($thisCarousel.hasClass('is-paused')) {
                            $thisCarousel.removeClass('is-paused');
                            $thisCarousel.slick('slickPlay');
                        }
                    }
                });
            }));
        }
    }


    //Calculate the carousel-dot depend on the children its have

    var $carouselDots = $('.carousel-dots .slick-dots').children('li');
        $carouselDots.width(100 / $carouselDots.length + '%');

})();
