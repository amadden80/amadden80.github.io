
var aliciarray = [
  // "I wish. I write words",
  "I wish. I write words.",
    "I wish. I write words.",
    "I wish. I write words.",
  "I wish. I write words.",
  "I wish. I write words..",
  "I wish. I write words...",
    "I wish. I write words...",
  "I wish. I write words..",
  "I wish. I write words.",
  "I wish. I write words",
  "I wish I write words",
    "I wish I write words",
    "I wish a write words",
  "A wish a write words",
  "A lwish a write words",
  "Alwish a write words",
  "Alish a write words",
  "Alich a write words",
  "Alicih a write words",
  "Aliciha write words",
  "Alicia write words",
  "Alicia writes words",
    "Alicia writes words",
    "Alicia writes words",
  "Alicia Writes words",
    "Alicia Writes words",
    "Alicia Writs words",
  "Alicia Wrigts words",
  "Alicia Wrights words",
    "Alicia Wrights words",
    "Alicia Wrights words",
  "Alicia Wright's words",
    "Alicia Wright's words",
    "Alicia Wright's words",
    "Alicia Wright's words",
  "Alicia Wright's word",
  "Alicia Wright's wor",
  "Alicia Wright's wo",
  "Alicia Wright's w",
  "Alicia Wright's ",
  "Alicia Wright's p",
  "Alicia Wright's po",
  "Alicia Wright's poe",
  "Alicia Wright's poem",
  "Alicia Wright's poems",
    "Alicia Wright's poems",
    "Alicia Wright's poems",
  "Alicia Wright's poems.",
];





  function typer(cssSelector, delayTime, textArray, variableSpeed, setSpeed){
    if (textArray.length > 0){
      $(cssSelector).text(textArray.shift());
      setTimeout(function(){
        typer(cssSelector, Math.random()*variableSpeed+setSpeed, textArray, variableSpeed, setSpeed);
      }, delayTime)
    }
  }



$(function(){

  $(window).on("scroll", function(){
    if ($(window).scrollTop() <= parseInt($('img.bouquet').css('height'))){
      var opacityLevel = Math.abs($(window).scrollTop()/(parseInt($('img.bouquet').css('height'))+100)-1);
      $('.hi-cute-text').css('opacity', opacityLevel);
    }
  })

  typer('.hi-cute-text', 1000, aliciarray, 200, 150);
})


