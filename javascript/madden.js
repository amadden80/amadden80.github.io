var videos = {

    sweep: {        title: "Radiation Patterns Sweep",
                    src: "http://www.youtube.com/embed/aduGdJPVCRg?rel=0"},

    aur: {          title: "Aurlization of Amp",
                    src: "http://www.youtube.com/embed/6uOCFl82v1A?rel=0"},

    sweetspot: {    title: "Radiation Patterns Sweep",
                    src: "http://www.youtube.com/embed/krIhaS9DLTo?rel=0"},

    guitar: {       title: "Guitar Amp Radiation",
                    src: "http://www.youtube.com/embed/lchSjWc8UEg?rel=0"},

    drums: {        title: "Drum Amp Radiation",
                    src: "http://www.youtube.com/embed/fGnuQriyvyA?rel=0"},

    panning: {      title: "Binaural Panning Demo",
                    src: "http://www.youtube.com/embed/9GoxeZXxYxI?rel=0"},

    pd_binaural: {  title: "Binaural in PureData",
                    src: "http://www.youtube.com/embed/4jv8QFTmwqU?rel=0"},

    thanks: {       title: "A Convolver's Thanks",
                    src: "http://www.youtube.com/embed/Q2Rocq_6Dpw"},

    art1:{          title: "Art Fire",
                    src: "http://www.youtube.com/embed/Dzo4CznX_FE"}
}



var websites = [

    { title: "Sonifizer API",
        src: "https://sonifizer.herokuapp.com"},

    { title: "Sonify Data",
        src: "http://www.SonifyData.com"},

    { title: "Audatar",
        src: "http://www.Audatar.com"},

    { title: "WDI-5",
        src: "http://www.wdi5.com"},

    { title: "Blings",
        src: "http://blings.herokuapp.com"},

    { title: "Virtual Haircut",
        src: "https://virtualhaircut.herokuapp.com"}
                    
];



var blinkCnt = 0;

function timeBlink(wait_time)
{
 var nextBlink = Math.random()*wait_time+1000;
 var t=setTimeout(function(wait_time){blink(wait_time)}, nextBlink);
 var o=setTimeout(function(wait_time){unblink(wait_time)}, Math.random()*100+50+nextBlink);
}
function blink(wait_time)
{
  $('#ajm-face').attr('src', 'pageContent/images/blink.png')
  blinkCnt++;
}
function unblink(wait_time)
{
  $('#ajm-face').attr('src', 'pageContent/images/face.png')
  if (blinkCnt < 5) timeBlink(wait_time * blinkCnt);
}



function set_focus_area(e){ 
    var focus_label = e.target
    $(focus_label).siblings().removeClass('label-selected')
    $(focus_label).siblings().addClass('label-non-selected')

    $(focus_label).removeClass('label-non-selected')
    $(focus_label).addClass('label-selected')
    var focus = e.target.getAttribute('data-focus')
    $('#'+focus).show()
    
}


function prepare_video_node(title){
    var vid_node = $("<iframe  class='sub-sub-area' width=100% id='video-player' frameborder='0' allowfullscreen></iframe>");
    var video_object = videos[title]
    vid_node.attr('src', video_object['src']);
    video_object.node = vid_node;
}

function add_video_node(title){
    prepare_video_node(title)
    var vid_stage = $('#video-player-stage')
    vid_stage.empty()
    vid_stage.append(videos[title].node)
}



function fill_website_list(){

    list =  $('#website-list');
    $.each(websites, function(index, site){
        var site_link = $('<a>')
        site_link.attr('href', site.src)
        site_link.text(site.title)
        var site_node = $('<li>').append(site_link)
       list.append(site_node)
    })
}



function set_window_style(){

        var video_focus = $('#videos-focus')
        var publications_focus = $('#publications-focus')
        var web_development_focus = $('#web_development-focus')
        var video_player_stage = $('#video-player-stage')
    
    if ($(window).width() < 768){

        video_player_stage.empty()

        video_player_stage
        video_player_stage_links = $('<ul class="square">')

        $.each(videos, function(index, value){
            var vide_nod = $("<li><a target='_blank' href='" + value.src +"' > " + value.title + "<br></a></li>")    
            video_player_stage_links.append(vide_nod)
        })
        video_player_stage.append(video_player_stage_links)

        $('.area-label').hide()
        $('.small-label').remove()

        publications_title = $("<h3 class='small-label'>").text('Publications')
        websites_title = $("<h3 class='small-label'>").text('Websites')
        videos_title = $("<h3 class='small-label'>").text('Videos')

        $('#focus-area').append([   publications_title,
                                    publications_focus, 
                                    websites_title,
                                    web_development_focus,
                                    videos_title, 
                                    video_player_stage])

        video_focus.hide()
        publications_focus.show()
        web_development_focus.show()
        video_player_stage.show()
    }
    else{

        video_player_stage.empty()
        $('.area-label').show()
        $('.small-label').remove()

        $('#focus-area').append([  publications_focus, 
                                    video_focus,
                                    web_development_focus])

        video_focus.hide()
        publications_focus.hide()
        web_development_focus.hide()

        video_player_stage.show()

        video_focus.append(video_player_stage)
        
    }

}



$(function(){


    $('#ajm-face').on('mouseenter', function(){
        $('#ajm-face').attr('src', 'pageContent/images/ahh.png')
    })
    $('#ajm-face').on('mouseleave', function(){
        $('#ajm-face').attr('src', 'pageContent/images/face.png')
    })

    $('#ajm-face').on('click', function(){
        $('#ajm-face').attr('src', 'pageContent/images/ahh.png')
        setTimeout(function(){
            $('#ajm-face').attr('src', 'pageContent/images/face.png')
            }, 1000)
    })


    timeBlink(1000)



    $('.area-label').mouseenter(function(e){
        $('.focus-area').hide()
        set_focus_area(e)
    })

    $('.sub-area-label').mouseenter(function(e){
        $('.sub-area').hide()
        set_focus_area(e)
    })

    $('.sub-sub-area-label').mouseenter(function(e){
        $('.sub-sub-area').hide()
        var videl_label = e.target
        var video_title = e.target.getAttribute('data-video')
        add_video_node(video_title)
    })


    fill_website_list()



    $('.area-label').on('click', function(e){
        $('.focus-area').hide()
        set_focus_area(e)
    })
    $('.sub-area-label').on('click', function(e){
        $('.sub-area').hide()
        set_focus_area(e)
    })
    $('.sub-sub-area-label').on('click', function(e){
        $('.sub-sub-area').hide()
        var videl_label = e.target
        var video_title = e.target.getAttribute('data-video')
        add_video_node(video_title)
    })






    $('#videos-focus-label').mouseenter(function(e){
        $('#down-left-arrow').show()
        $('#video-sub-sub-focus-area').append($('<div id="video-player-stage"></div>'))
        $('#video_player_stage').show()
        $('#video_player_stage').text(" ")
    })
    $('.sub-video-label').mouseenter(function(e){
        $('#down-left-arrow').remove()
        $('#left-right-arrow').fadeIn(100)
    })
    $('#sub-area-videos').mouseenter(function(e){
        $('#left-right-arrow').fadeOut(100)
    })
    $('#videos-focus-label').on('click', function(e){
        $('#down-left-arrow').show()
    })
    $('.sub-video-label').on('click', function(e){
        $('#down-left-arrow').remove()
        $('#left-right-arrow').fadeIn(100)
    })
    $('#sub-area-videos').on('click', function(e){
        $('#left-right-arrow').fadeOut(100)
    })





    
    $('.sub-sub-area').hide()  
    $('.sub-area').hide()  
    $('.focus-area').hide()  
    $('.video-arrow').hide()

    if ($(window).width() < 768){
        set_window_style()
    }
    
    $(window).resize(set_window_style)

 

})
