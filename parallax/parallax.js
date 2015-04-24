var mattsOpinion = 0.75;
// var andrewsOpinion = 1;

var backgroundMoveRate = andrewsOpinion;



function updateBannerImagePostion(bannerImages){
  bannerImages.each(function(dd, ele){
    imagePad = $(ele).parent();
    var imageStart = imagePad.position().top;
    $(ele).css('top', backgroundMoveRate*($(window).scrollTop()-imageStart));
  })
}


$(window).on("scroll", function(){

  var bannerImages = $('.banner-image');

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


$(function(){
  updateBannerImagePostion();
})
