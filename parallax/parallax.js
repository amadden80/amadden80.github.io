
var backgroundMoveRate = 0.5;



function updateBannerImagePostion(bannerImages){
  bannerImages.each(function(dd, ele){
    imagePad = $(ele).parent();
    var imageStart = imagePad.position().top;
    $(ele).css('top', backgroundMoveRate*($(window).scrollTop()-imageStart));
  })
}


$(function(){
  var bannerImages = $('.banner-image');
  updateBannerImagePostion(bannerImages);

  $(window).on("scroll", function(){

    var opacityLevel = $(window).scrollTop()/$(window).height();

    $('.information-block').css("backgroundColor", "rgba(100,0,0,"+opacityLevel+")")
    $(".hi").css("opacity", opacityLevel*2);

    $(".left-head").css("right", .75*$(window).scrollTop());
    $(".hi").css("left", $(window).scrollTop());

    if($(window).scrollTop() % 10){
      $(".left-head").attr('src', 'images/face.png')
    } else{
      $(".left-head").attr('src', 'images/ahh.png')
    }

    updateBannerImagePostion(bannerImages);

});

})
