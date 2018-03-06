(function($) {
$(document).ready(function () {
  console.log('test');
  // Footer links collapse on mobile
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 768px)");
    mq.addListener(collapseFooterLinks);
    collapseFooterLinks(mq);
  }

  function collapseFooterLinks(mq){
    if(mq.matches){
      //console.log("window: big");
      $(".cr-section-footer div.collapse").addClass(" show")
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

    } else {
      //console.log("window: small");
      $(".cr-section-footer div.collapse").removeClass("show");
      $(".cr-section-footer a.h6").removeClass("disabled");
      $(".cr-section-footer a.h6").addClass(" dropdown-toggle");
    }
  }

  //Navbar Toggle Animation
  $(".cr-navbar-toggle").click(function(){
    if (!open){
      $(".cr-navtoggle-top").css({
        'transition': 'transform 100ms',
        'transform': 'translateY(10px) rotateZ(45deg)'
      });
      $(".cr-navtoggle-mid").css({
        'transition': 'opacity',
        'opacity': '0'
      });
      $(".cr-navtoggle-bottom").css({
        'transition': 'transform 100ms',
        'transform': 'translateY(-10px) rotateZ(-45deg)'
      });
      open = true;
    }else{
      $(".cr-navtoggle-top").css({
        'transition': 'transform 100ms',
        'transform': 'translateY(0) rotateZ(0)'
      });
      $(".cr-navtoggle-mid").css({
        'transition': 'opacity',
        'opacity': '1'
      });
      $(".cr-navtoggle-bottom").css({
        'transition': 'transform 100ms',
        'transform': 'translateY(0) rotateZ(0)'
      });
      open = false;
    }
  });

});
})( jQuery );
