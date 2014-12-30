

var template = '<p>URL: <strong>{url}</strong>, name: <strong>{name}</strong>, location: <strong>{location}</strong></p>';










var wheel_flag = false;
$(window).resize(function(){
  if(!wheel_flag){
    $("#grid_card").height(($(document).height()-50)/2);
    $("#main_carousel").height(($(document).height()-50)/2);
  }
})

$(document).ready(function(){
  var content = $("#content");
  var grid_card = $("#grid_card");
  var carousel = $("#main_carousel");
  var Document = $(document);

  grid_card.height((Document.height()-50)/2);
  carousel.height((Document.height()-50)/2);
  $("#content").one("mousewheel", function(event){main_scroll(event)})
  $(".project_like").on("click", function(event){
    var self = $(this);
    /*event.stopPropagation();
    event.preventDefault();*/
    var post_obj = {repository_id: $(this).data('repositoryid')};
    var like_target_id = self.attr('like_target_element_id');
    if(like_target_id){
      var like_target = $("#"+like_target_id);
    }
    if(like_target.hasClass("like")){
      $.post("/project/like/cancel", post_obj, function(res){
        if(res.result){
          if(like_target_id){
            like_target.removeClass("like")
            self.removeClass("like")
          }
        }else if(res.code == "login"){
          global_function.login_alert();
        }
      })  
    }else{
      $.post("/project/like", post_obj, function(res){
        if(res.result){
          if(like_target_id){
            like_target.addClass("like")
            self.addClass("like")
          }
        }else if(res.code == "login"){
          global_function.login_alert();
        }
      })
    }
    
  })
  $(".project_entry").hover(function(e){
    $(this).find(".btn-gray-alpha").addClass("btn-gray").removeClass("btn-gray-alpha")
    $(this).find(".btn-pink-alpha").addClass("btn-pink").removeClass("btn-pink-alpha")
  }, function(e){
    $(this).find(".btn-gray").removeClass("btn-gray").addClass("btn-gray-alpha")
    $(this).find(".btn-pink").removeClass("btn-pink").addClass("btn-pink-alpha")
  })

  /*$('#myCarousel').on('slide.bs.carousel', function () {
    // start
  })*/
  var scroll_direction = function(event){
    var evt = window.event || event //equalize event object     
      evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
      var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
      return delta;
  }
  var main_scroll = function(event){
    if(!wheel_flag){

      wheel_flag = true;
      //carousel.carousel('pause');
      if(scroll_direction(event) < 0) {
        carousel.height("0%");
        grid_card.height("100%");
        carousel.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(event){
          if(!event.originalEvent || event.originalEvent.propertyName != 'height') return;
          carousel.unbind('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd')
          grid_card.height("auto");
          grid_card.on("mousewheel", function(event){
            if(content.scrollTop() == 0 && scroll_direction(event) > 0) {
              //carousel.carousel('pause');
              carousel.height((Document.height()-50)/2);
              carousel.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(event) {
                if(!event.originalEvent || event.originalEvent.propertyName != 'height') return;
                carousel.unbind('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd')
                  grid_card.height((Document.height()-50)/2);
                  $("#content").one("mousewheel", function(event){main_scroll(event)})
                  wheel_flag = false;
                  //carousel.carousel('cycle')
                }
              )
              grid_card.unbind("mousewheel");
            }
          })
        })
      }else{
        //scroll down
        carousel.height("100%");
        grid_card.height("0%");
        carousel.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(event){
          if(!event.originalEvent || event.originalEvent.propertyName != 'height') return;
          carousel.unbind('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd')
          carousel.on("mousewheel", function(event){
            if(scroll_direction(event) < 0) {
              carousel.height((Document.height()-50)/2);
              grid_card.height((Document.height()-50)/2);
              carousel.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                function(event) {
                  if(!event.originalEvent || event.originalEvent.propertyName != 'height') return;
                  carousel.unbind('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd')
                  $("#content").one("mousewheel", function(event){main_scroll(event)})
                  wheel_flag = false;
                  //carousel.carousel('cycle')
                }
              )
              carousel.unbind("mousewheel");
            }
          })
        })
      }

    }
  }

  var interverId, timeoutId=-1;
  var slide_function = function(){
    var active = $(".main_background.active, #main_carousel>div .item.active");
    var non_active = $(".main_background.non-active, #main_carousel>div .item.non-active");
    non_active.removeClass("hidden")
    var fadeOut, fadeIn;
    fadeOut = "mainLeftFadeOut"
    fadeIn = "mainLeftFadeIn"
    
    active.addClass(fadeOut)
    non_active.addClass(fadeIn);

    active.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
      
      active.removeClass('active');
      active.addClass('non-active');
      active.removeClass(fadeOut)
      active.addClass('hidden');

      non_active.addClass('active');
      non_active.removeClass('non-active');
      non_active.removeClass(fadeIn)
    })
  };
  interverId =  setInterval(slide_function, 5000)
  $("#carousel_left, #carousel_right").click(function(e){
    clearInterval(interverId);
    clearTimeout(timeoutId);
    var active = $(".main_background.active, #main_carousel>div .item.active");
    var non_active = $(".main_background.non-active, #main_carousel>div .item.non-active");
    non_active.removeClass("hidden")
    var fadeOut, fadeIn;
    if($(this).data('slide') == "prev"){
      fadeOut = "mainRightFadeOut"
      fadeIn ="mainRightFadeIn"
    }else {
      fadeOut = "mainLeftFadeOut"
      fadeIn = "mainLeftFadeIn"
    }
    
    active.addClass(fadeOut)
    non_active.addClass(fadeIn);
    var target = $("#main_carousel>div .item.active");
    target.unbind('webkitAnimationEnd oanimationend msAnimationEnd animationend');
    target.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
      active.removeClass('active');
      active.addClass('non-active');
      active.removeClass(fadeOut)
      active.addClass('hidden');

      non_active.addClass('active');
      non_active.removeClass('non-active');
      non_active.removeClass(fadeIn)
      timeoutId= setTimeout(function(){interverId =  setInterval(slide_function, 5000)}, 8000);
    })
  })
})