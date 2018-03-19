/**
* This JS file is for additional new JS built over the existing theme
* ...so as to avoid breaking anything unexpectedly
*/
(function($) {

  var $body = $('body');

  $(document).ready(function() {

    /**
    * Dropdown menu
    *//*
    var triggers = document.querySelectorAll(
      '.main-nav li.menu-item-has-children'
    );
    var background = document.querySelector('.dropdownBackground');
    var nav = document.querySelector('.main-nav');

    function handleEnter() {
      this.classList.add('trigger-enter');
      setTimeout(
        () =>
        this.classList.contains('trigger-enter') &&
        this.classList.add('trigger-enter-active'),
        150
      );
      background.classList.add('open');

      var dropdown = this.querySelector('.main-nav .sub-menu');
      var dropdownCoords = dropdown.getBoundingClientRect();
      var navCoords = nav.getBoundingClientRect();

      var coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top + 5,
        left: dropdownCoords.left - navCoords.left
      };

      background.style.setProperty('width', `${coords.width}px`);
      background.style.setProperty('height', `${coords.height}px`);
      background.style.setProperty(
        'transform',
        `translate(${coords.left}px, ${coords.top}px)`
      );
    }

    function handleLeave() {
      this.classList.remove('trigger-enter', 'trigger-enter-active');
      background.classList.remove('open');
    }

    triggers.forEach(trigger =>
      trigger.addEventListener('mouseenter', handleEnter)
    );
    triggers.forEach(trigger =>
      trigger.addEventListener('mouseleave', handleLeave)
    );

    // Mobile slide out menus
    /*$('#mobile-nav').mmenu({
      slidingSubmenus: false,
      offCanvas: {
        position: 'right'
      }
    });
    var MobileNavAPI = $('#mobile-nav').data('mmenu');
    $('#mobile-close-button').click(function() {
      MobileNavAPI.close();
    });

    /**
    * Set height on sidebar
    *//*
    var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var $sidebar = $('.bs-docs-sidebar');

    $sidebar.css('max-height', `${viewportHeight - 100}px`);

    /**
    * Navigation
    */

    // Responsive Navigation Stuff

    var mainNavOpen = false;
    var sideNavOpen = false;

    if (matchMedia) {
      const mq = window.matchMedia("(min-width: 768px)");
      mq.addListener(responsiveNavigation);
      responsiveNavigation(mq);
    }
    // formerly known as "collapseFooterLinks"
    function responsiveNavigation(mq){
      if(mq.matches){
        //console.log("window: big");

        $(".cr-section-footer div.collapse").addClass(" show");
        $(".cr-section-footer a.h6").addClass(" disabled");
        $(".cr-section-footer a.h6").removeClass("dropdown-toggle");

        $('.navbar-nav .dropdown').hover(function() {
          $(this).find('.dropdown-menu').first().stop(true, true).delay(150).slideDown(200);
        }, function() {
          $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp(200);
        });

        $('.navbar-nav .dropdown > a').click(function(){
          location.href = this.href;
        });


        $('#nav-side').removeClass('cr-sidenav-up').addClass('cr-sidenav-down');



        //$('.bs-docs-sidenav.bs-sidenav').hide();


      } else {
        //console.log("window: small");
        //$('.bs-docs-sidenav.bs-sidenav').show();
        $('#nav-side').removeClass('cr-sidenav-down').addClass('cr-sidenav-up');


        $(".cr-section-footer div.collapse").removeClass("show");
        $(".cr-section-footer a.h6").removeClass("disabled");
        $(".cr-section-footer a.h6").addClass(" dropdown-toggle");

      }
    }

    //Navbar Toggle Animation
    $("#nav-main .cr-navbar-toggle").click(function(){
      if (!mainNavOpen){
        $(this).find(".cr-navtoggle-top").css({
          'transition': 'transform 100ms',
          'transform': 'translateY(10px) rotateZ(45deg)'
        });
        $(this).find(".cr-navtoggle-mid").css({
          'transition': 'opacity',
          'opacity': '0'
        });
        $(this).find(".cr-navtoggle-bottom").css({
          'transition': 'transform 100ms',
          'transform': 'translateY(-10px) rotateZ(-45deg)'
        });
        mainNavOpen = true;
      }else{
        $(this).find(".cr-navtoggle-top").css({
          'transition': 'transform 100ms',
          'transform': 'translateY(0) rotateZ(0)'
        });
        $(this).find(".cr-navtoggle-mid").css({
          'transition': 'opacity',
          'opacity': '1'
        });
        $(this).find(".cr-navtoggle-bottom").css({
          'transition': 'transform 100ms',
          'transform': 'translateY(0) rotateZ(0)'
        });
        mainNavOpen = false;
      }
    });

    //Side Nav Toggle Animation
    $("#nav-main .cr-navbar-toggle-docs").click(function(){
      if (!sideNavOpen){
        openSideNav();
      }else{
        closeSideNav();
      }
    });

    function closeSideNav(){
      $(this).find(".cr-navtoggle-top").css({
        'transition': 'transform 100ms',
        'transform': 'translateY(0) rotateZ(0)'
      });
      $(this).find(".cr-navtoggle-mid").css({
        'transition': 'opacity',
        'opacity': '1'
      });
      $(this).find(".cr-navtoggle-bottom").css({
        'transition': 'transform 100ms',
        'transform': 'translateY(0) rotateZ(0)'
      });
      sideNavOpen = false;
    }

    function openSideNav(){
      $(this).find(".cr-navtoggle-top").css({
        'transition': 'transform 100ms',
        'transform': 'translateY(10px) rotateZ(45deg)'
      });
      $(this).find(".cr-navtoggle-mid").css({
        'transition': 'opacity',
        'opacity': '0'
      });
      $(this).find(".cr-navtoggle-bottom").css({
        'transition': 'transform 100ms',
        'transform': 'translateY(-10px) rotateZ(-45deg)'
      });
      sideNavOpen = true;
    }


    // Navigation hide on scroll down and appear on scroll up
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.cr-section-top').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
      if(!sideNavOpen){
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.cr-section-top').removeClass('cr-nav-down').addClass('cr-nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('.cr-section-top').removeClass('cr-nav-up').addClass('cr-nav-down');
            }
        }
        lastScrollTop = st;
      }
    }

    $(document).on('click', 'a[href^="#"]', function (event) {
      closeSideNav();
      $('#nav-side-dropdown').removeClass('show');
    });


  });

})(jQuery);
