
var project_entries = $('.project_entry');

var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

var onReviewStarRating = function(){
  $('input.project_star').addClass('rating-loading');  
  var $input = $('input.project_star'), count = Object.keys($input).length;
  if (count > 0) {
      $input.rating();
  }  
};


function view_modal_detail(projectInfo){

  console.log(projectInfo);
  set_modal_data(projectInfo);
  set_repository_info(projectInfo.repoInfo);
  set_project_review(projectInfo.reviews);
  set_project_like(projectInfo.like);
  onReviewStarRating();
  set_event_listener(projectInfo);
};

function set_project_like(like){
  if(like){
    $('#project_desc_modal_header_icon .project_like').addClass('like')
  }
}

function set_event_listener(projectInfo){
  donate_event_listener();
}

function set_repository_name(user_name, project_name){
  var _userNames = $('.project_desc_modal_maintainer_name');
  var _projectNames = $('.project_desc_modal_project_name');  

  for(i in _userNames){
    _userNames[i].innerHTML = projectInfo.user_name;
  }

  for(i in _projectNames){
    _projectNames[i].innerHTML = projectInfo.project_name;
  }
}

function set_modal_data(projectInfo){
  if(projectInfo.my_project){
    var dom = $("#modal_header_change_btn");
    dom.removeClass("donate_now_btn");
    dom.addClass("edit_project");
    dom[0].innerHTML = "<span>Edit</span>"
  }else{
    var dom = $("#modal_header_change_btn");
    dom.removeClass("edit_project");
    dom.addClass("donate_now_btn");
    dom[0].innerHTML = "<span>Donate</span>"
  }
  var postData = {
      file_path : 'README.md',
      repository_name : projectInfo.repository_name,
      highlight : true
  }
  var filetype=postData.file_path.split('.').pop()
  switch(filetype){
      case 'textile':
      case 'md':
      case 'mediawiki':
      postData.highlight=true
      $.post("/ajax/repository/code/view", postData, function(data){
        console.log(data)
        $("#readme_viewer").html(data);
      });
  }
}

function set_repository_info(repoInfo){
  global_repository.current_repository_info=repoInfo;

  var _picture = $('#project_desc_modal_project_picture');
  var _star = $('#project_desc_total_rating');
  var _rating_user_count = $('#project_desc_rating_user_count');
  var _project_description = $('#project_desc_modal_description')
  var _like = $('#project_desc_modal_like');
  var _add_to_cart = $('#modal_add_to_cart');
  var _code = $('#project_desc_modal_code a');

  if(repoInfo.repository_id){
    _add_to_cart.data('repositoryid', repoInfo.repository_id);
    _like.data('repositoryid', repoInfo.repository_id);
    _like.attr('like_target_element_id', repoInfo.like_target_element_id);
  }
  if(repoInfo.thumbnail_url){
    _picture.attr('src', repoInfo.thumbnail_url);
  }

  _code.attr('href', '../../'+repoInfo.repository_name+'/'+'dir');
  _rating_user_count[0].innerHTML = repoInfo.review_count + " Users";


  if(repoInfo.review_count>0){
    _star.rating('update', repoInfo.review_point / (repoInfo.review_count));
  }else{
    _star.attr('value', 0);    
  }

  //_project_description[0].innerHTML = repoInfo.repository_description;
}

function set_project_review(reviews){
  var reviewDOM = $('#project_reviews')[0];
  var reviewHTML = "";
  var reviewTemplate = "";

  var i = 0;

  if(reviews){
    console.log(reviews);
    for(i in reviews){
       var tempTemplate = ""
        + '<div class="media">'
        +   '<a class="pull-left" href="#">'
        +     '<img class="media-object" src="/image/add_your_img.png" alt="..." style="width:50px">'
        +   '</a>'
        +   '<div class="media-body">'
        +     '<h4 class="media-heading">'+ reviews[i].review_title+'</h4>'
        +     '<div class="col-xs-10" style="padding-left:0px">'
        +       reviews[i].user_name
        +     '</div>'
        +     '<div class="col-xs-2">'
        +       '<div class="review-rating" style="float:left">'
        +         '<input class="rating project_star" value="'+reviews[i].review_point+'" data-readonly="true" data-show-clear="false" data-show-caption="false" data-size="xs">'
        +       '</div>'
        +     '</div>'
        +   '</div>'
        +   '<pre>'
        +     reviews[i].review_comment
        +   '</pre>'
        + '</div>';

      reviewDOM.innerHTML += tempTemplate;
    }
  }
}

function get_error_handler(err){
  //error handling
  console.log(err);
};

function get_project_data (projectInfo){
  set_repository_name(projectInfo.user_name, projectInfo.project_name);

  var postData = projectInfo;
  var ajaxURL = location.origin;
      ajaxURL += '/ajax/';
      ajaxURL += postData.repository_name;
      ajaxURL += '/detail';

  $.ajax({
    type: "POST",
    url: ajaxURL,
    data: postData,
    success: view_modal_detail,
    error: get_error_handler
  });
};

function put_review_success_handler (isSuccess){
  if(isSuccess){

  }
};

function put_error_handler (err){
  console.log('put error', err);
};


$("#reviewPoint").on("rating.change", function(event, value, caption) {
    projectInfo.reviewInfo.point = value;
});

function put_project_review (){
  if(global_user.status){
    var postData = projectInfo;
    console.log(projectInfo);
    postData.reviewInfo.user_id = global_user.user_id;
    postData.reviewInfo.name = global_user.user_name;
    postData.reviewInfo.title = $('#reviewTitle').val();
    postData.reviewInfo.comment = $('#reviewComment').val();

    var ajaxURL = location.origin;
        ajaxURL += '/ajax/';
        ajaxURL += postData.repository_name;
        ajaxURL += '/review';
        ajaxURL += '/put';

    $.ajax({
      type: "POST",
      url: ajaxURL,
      data: postData,
      success: put_review_success_handler,
      error: put_error_handler
    });  
  }else{
    global_function.login_alert();
  }

  return false;

};

addEvent(project_entries, 'click', function (event) {
  var text;
  event.preventDefault();
  text = 'project_modal';
  projectInfo.like_target_element_id = $(this).data('like-target-id');
  projectInfo.state = "project_modal";
  projectInfo.url = this.parentElement.getAttribute('href');
  projectInfo.user_name = projectInfo.url.split('/')[2];
  projectInfo.project_name = projectInfo.url.split('/')[3];  
  projectInfo.repository_name = projectInfo.user_name + '/' + projectInfo.project_name;

  get_project_data(projectInfo);

  history.pushState(projectInfo, text, projectInfo.url);
  add_recent_vew(projectInfo);
});

var popstateEvent = function(event, aaa){
  // console.log('popstate', event.state);
  
  console.log('popstate', history.state)
  // reportData(event.state || { modal: false } );  
}

addEvent(window, 'hashchange', function (event) {
  console.log('hashchange');
});

addEvent(window, 'pageshow', function (event) {
  // console.log('pageshow');
});

addEvent(window, 'pagehide', function (event) {
  console.log('pagehide');
});


$(window).on('popstate', popstateEvent);

$('#project_desc_modal').on('show', function(e){
  $('#project_desc_modal_body_left_list a:first').tab('show');
});

$('#project_desc_modal').on('hidden', function(e){
  $('#project_desc_modal_home').click();
  if(modal_directView){
    modal_directView = false;
    var marketURL = location.origin + '/market';
    history.pushState({state:'market'}, 'market', marketURL);
  }else{
    history.back();
  }

  $(this).removeData('bs.modal');
});

$('.project_desc_modal_left_catepory_link').on('shown.bs.tab', function(){
  $(window).trigger('resize.modal');


  if($(this).attr('href')=='#project_modal_donate'){
    get_donate_info();
  }
});

$('#project_desc_picture').height($('#project_desc_picture').width());

if(modal_directView){
  get_project_data(projectInfo);
  $('#project_desc_modal').modal('show');
}


$(".deal_now_btn").on('click', function(e){
  if($('#project_desc_modal_deal_now').css('display')=='none'){
    $('#project_desc_modal_basic_info').css('display','none');  
    $('#project_desc_modal_donate_now').css('display', 'none');  
    $('#project_desc_modal_deal_now').css('display','');
  }
});



$('#project_desc_modal_home').on('click', function(){
  if($('#project_desc_modal_basic_info').css('display')=='none'){
    $('#project_desc_modal_donate_now').css('display','none');  
    $('#project_desc_modal_deal_now').css('display', 'none');  
    $('#project_desc_modal_basic_info').css('display','');
  }
});

function donate_event_listener(){
  $(".donate_now_btn").on('click', function(e){
    if($('#project_desc_modal_donate_now').css('display')=='none'){
      $('#project_desc_modal_basic_info').css('display','none');  
      $('#project_desc_modal_deal_now').css('display', 'none');  
      $('#project_desc_modal_donate_now').css('display','');
    }
  });  
}




//deal now part by simdj

$("#project_desc_modal_deal_offer_btn").off('click')
$("#project_desc_modal_deal_offer_btn").on('click',function(){
  global_function.deal_now($("#project_desc_modal_deal_offer_form"));
});
//deal end


//deal donate common

$(".project_desc_modal_return_to_basic_btn").off('click');
$(".project_desc_modal_return_to_basic_btn").on('click', function(e){

  if( $('#project_desc_modal_basic_info').css('display')=='none' ){
    $('.project_desc_modal_body_class').css('display','none');
    $('#project_desc_modal_basic_info').css('display','');
  }

  

})

/*$(window).resize(function(){
  $(".project_entry").height($(".project_entry").width()*1.6)
})*/







