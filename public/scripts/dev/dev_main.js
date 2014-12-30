
function contributing_repo_news_fillup(news_data){
  var news_unit="";
  news_unit+="              <div class='newsfeed_unit'> ";
  news_unit+="                <div class='newsfeed_unit_title'> ";
  news_unit+="                  <span><img src='/image/add_your_img.png' class='img-circle very_very_small_img newsfeed_unit_title_img'></span> ";
  news_unit+="                  <span class='newfeed_unit_title_content'>[newfeed_unit_title_content]</span> ";
  news_unit+="                  <span class='newfeed_unit_title_time'>[newfeed_unit_title_time]</span> ";
  news_unit+="                </div> ";
  news_unit+="                <div class='newsfeed_unit_detail'> ";
  news_unit+="                  <div class='newsfeed_unit_detail_unit'> ";
  news_unit+="                    [detail_bulk] ";                    
  news_unit+="                  </div> ";
  news_unit+="                </div> ";
  news_unit+="              </div> ";

  //console.log(news_data)
  var detail_bulk="";
  var detail='<div class="newsfeed_unit_detail_unit">     <span class="mega-octicon octicon-git-commit"></span>       [detail_data]   </div>'
  for(var i=0;i<news_data.news.length;i++){
    detail_bulk+=detail.replace('[detail_data]', news_data.news[i].message);
  }
  



  news_unit=news_unit
    .replace('[newfeed_unit_title_content]',news_data.news[0].author+' to '+ news_data.repository_name)
    .replace('[newfeed_unit_title_time]', news_data.news[0].date)
    .replace('[detail_bulk]', detail_bulk)


  $("#newsfeed").append(news_unit);
  //<span class="glyphicon glyphicon-user"></span>  data mining go 1 
}

function my_repo_news_fillup(news_data){
  var repository_unit="";
  repository_unit+="              <div class='my_repository_unit'> ";
  repository_unit+="                  <div class='my_repository_unit_user'>{{my_repository_unit_user}}</div> ";
  repository_unit+="                  <a href='/{{my_repository_unit_user}}/{{my_repository_unit_project_name}}'><div class='my_repository_unit_project_name'>{{my_repository_unit_project_name}}</div></a> ";
  repository_unit+="                  <div class='my_repository_unit_log_list'> ";
  repository_unit+="                        [log_bulk] "
  //repository_unit+="                    <div class='my_repository_unit_log'><span class='glyphicon glyphicon-ok'></span> pull req 2</div> ";
  //repository_unit+="                    <div class='my_repository_unit_log'><span class='glyphicon glyphicon-list'></span> pull req 3 </div> ";
  repository_unit+="                  </div> ";
  repository_unit+="                </div> ";


  repository_unit=repository_unit
    .replace(/{{my_repository_unit_user}}/g, news_data.repository_name.split('/')[0])
    .replace(/{{my_repository_unit_project_name}}/g, news_data.repository_name.split('/')[1])


  var log_bulk="";

  var repository_unit_log="<div class='my_repository_unit_log ellipsis'><span class='octicon octicon-git-commit'></span> [log_data]</div> "

  for(var i=0;i<news_data.news.length;i++){
    log_bulk+=repository_unit_log.replace('[log_data]', news_data.news[i].message);
  }

  repository_unit=repository_unit.replace('[log_bulk]',log_bulk);

  $("#my_repository_list").append(repository_unit);


}
function card_fillup(data){
  
  var project_card_html='';
  project_card_html+='            <div class="col-md-6 col-sm-12 project_container">'
  project_card_html+='            <a href="[project_url]">'
  project_card_html+='                <div id="" class="project_entry" data-toggle="modal" data-target="#project_desc_modal">'
  project_card_html+='                  <div>'
  project_card_html+='                        <img src="[image_url]" alt="..." class="project_entry_img">'
  project_card_html+='                  </div>'
  project_card_html+='                  <div class="project_info">'
  project_card_html+='                    <div class="row project_author_row">'
  project_card_html+='                      <div class="col-xs-7 ">'
  project_card_html+='                        <p class="card_maintainer_name long_name_overflow">'
  project_card_html+='                                [card_maintainer_name]'
  project_card_html+='                        </p>'
  project_card_html+='                      </div>'
  project_card_html+='                      <div class="col-xs-5">'
  project_card_html+='                        <div class="card_rating">'
  project_card_html+='                          <div class="star-rating rating-xxs rating-active">'
  project_card_html+='                            <div class="rating-container rating-gly-star" data-content="">'
  project_card_html+='                              <div class="rating-stars" data-content=""></div>'
  project_card_html+='                                <input type="hidden" class="rating form-control" data-show-clear="false" data-show-caption="false" data-size="xss" value="Infinity" style="display: none;">'
  project_card_html+='                              </div>'
  project_card_html+='                            </div>'
  project_card_html+='                        </div>'
  project_card_html+='                      </div>'
  project_card_html+='                    </div>'
  project_card_html+='                    <div class="row">'
  project_card_html+='                      <div class="col-sm-12">'
  project_card_html+='                        <h4 class="margin_bottom_10 card_repository_name long_name_overflow">[card_repository_name]</h4>'
  project_card_html+='                        <p class="card_ellipsis">[card_repository_desc]</p>'
  project_card_html+='                      </div>'
  project_card_html+='                    </div>'
  // project_card_html+='                    <div class="row">'
  // project_card_html+='                      <div class="col-xs-4" style="padding-left: 24px; padding-right:0px;">'
  // project_card_html+='                        <button type="button" class="btn add_to_cart col-xs-12 btn-xs small_button btn-gray-alpha" data-repositoryid="25">Add to cart</button>'
  // project_card_html+='                      </div>'
  // project_card_html+='                      <div class="col-xs-4" style="padding-right:8px;padding-left:10px;">'
  // project_card_html+='                        <button type="button" class="btn col-xs-12 btn-xs small_button deal_now_btn btn-gray-alpha">Deal now</button>'
  // project_card_html+='                      </div>'
  // project_card_html+='                      <div class="col-xs-4" style="padding-left:0px; padding-right: 24px;">'
  // project_card_html+='                        <button type="button" class="btn col-xs-12 btn-xs small_button donate_now_btn btn-pink-alpha">Donate</button>'
  // project_card_html+='                      </div>     '
  // project_card_html+='                    </div>'
  project_card_html+='                  </div>'
  project_card_html+='                </div>'
  project_card_html+='               </a>'
  project_card_html+='            </div>'


  for(var i=0;i<data.length;i++){
    $("#hot_repository_list").append( 
      project_card_html
    .replace('[project_url]','/'+data[i].repository_name)
    .replace('[image_url]','/image/add_your_img.png')
    .replace('[card_maintainer_name]', data[i].repository_name.split('/'[0]))
    .replace('[card_repository_name]', data[i].repository_name.split('/'[1]))
    .replace('[card_repository_desc]', data[i].repository_description)    )
  }


  
}


var sign_in_check = function(){
  var postobj = {email: $("#login_email").val(), pw: $("#login_password").val()}
  if(postobj.email && postobj.pw && postobj.email!="" && postobj.pw!=""){
    $.post("/dev/login", postobj, function(result){
      console.log(result)
      if(result.result){
          location.href='/dev';
      }else{
        alert("login fail");
      }
    })  
  }
  return false;
}
$("#sign_in").click(sign_in_check);

$("#login_email").keyup(function(e){
  if(e.keyCode==13){
    sign_in_check();
  }
});
$("#login_password").keyup(function(e){
  if(e.keyCode==13){
    sign_in_check();
  }
});







function not_login_user_main_function(){
  $('#main_page_not_login').css('display','')
}




function login_user_main_function(){
  $('#main_page_login').css('display','')


  //profile fill up
  {
    $("#left_profile_user_name").text(global_user.user_name);


    $.get('/ajax/dev/'+global_user.user_name+'/info', function(info){
      global_user.info=info;
      $("#contribution_num").text(global_user.info.contributions)
      $("#repository_num").text(global_user.info.repositories)
      $("#following_num").text(global_user.info.following)
      $("#follower_num").text(global_user.info.followers)



      //contributing fill up
      {
        
        $.post('/news/bulk', {arr:global_user.info.contributing_list}, function(result){

          for(var i=0;i<result.length;i++){
            if(result[i].news.length>0){
               contributing_repo_news_fillup(result[i])
            }
          }



        })
      }


      //my repo fill up
      {
        // http://localhost/simdj/asdf/news
        $.post('/news/bulk', {arr:global_user.info.project_list}, function(result){

          for(var i=0;i<result.length;i++){
            if(result[i].news.length>0){
              my_repo_news_fillup(result[i])
            }
          }


        })
      }






    });
  }

  // neesfeed fill up


  // recommend fill up
  //recommend data
  $.ajax( {
    url : '/dev/recommend'
    , type : 'GET'
    , data : 'user_query='+global_user.user_name
    , success : function(data){
       //console.log(data);
      card_fillup(data)
    }
  });

 
}











global_loading_start = function(){
  if($("#loading").hasClass("hidden")){
    $("#loading").removeClass("hidden")
  }
}

global_loading_end = function(){
  $("#loading").addClass("hidden")
}



















//register
  {
    //register
    $("#register").on('click', function(){
      if($("#information").hasClass("hidden")){
        $("#information").removeClass("hidden");
      }else{
        console.log('register verify start');
        var birth = {date: $("#date>option:selected").val(), month:$("#month>option:selected"), year: $("#year>option:selected").val()}
        if($("#sex>option:selected").val()=="Title"){
          $("#sex").focus(); return;
        }
        if(birth.date == "dd" && birth.month == "mm" && birth.year == "yyyy"){
          $("#date").focus(); return;
        }else{
          birth = birth.year + "-" + birth.month + "-" + birth.date;
        }
        if($("#information>div>div.has-error").length == 0 
          && $("#information>div>div.has-success").length == 6){
          global_loading_start();
          var postobj = {
            sex: $("#sex>option:selected").val(),
            name: $("#name").val(),
            surname: $("#surname").val(),
            email: $("#email").val(),
            pw: $("#password").val(),
            type: $("[name=optionsRadios]:checked").val(),
            birth: birth
          }
          $.post("/join", postobj, function(result){
            global_loading_end();
            if(result.err){
              alert(const_err_msg[result.msg]);
            }else{
              location.href = "/market/verification";
            }
          })
        }else{
          if($("#information>div>div.has-error").length == 0){
            alert("Please fill blank")  
          }else{
            $("#information>div>div.has-error")[0].focus(); 
          }
          return;
        }
      }
      
    })
    $("#name").focusout(function(){
      if(/^[A-Za-z\s]*$/g.test($(this).val())){
        $(this).parent().addClass("has-success");
        $(this).parent().removeClass("has-error");
      }else{ /*has-warning */
        $(this).parent().addClass("has-error");
        $(this).parent().removeClass("has-success");
      }
    })
    $("#surname").focusout(function(){
      if(/^[A-Za-z\s]*$/g.test($(this).val())){
        $(this).parent().addClass("has-success");
        $(this).parent().removeClass("has-error");
      }else{ /*has-warning */
        $(this).parent().addClass("has-error");
        $(this).parent().removeClass("has-success");
      }
    })
    $("#email").focusout(function(){
      var self = $(this);
      if(/^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test($(this).val())){
        $.post("/duplicate_check", {email: self.val()}, function(result){
          //console.log(result);
          if(result){
            self.parent().addClass("has-success");
            self.parent().removeClass("has-error");
          }else{
            self.parent().addClass("has-error");
            self.parent().removeClass("has-success");
            self.val("duplicated")
          }
        });
      }else{ /*has-warning */
        self.parent().addClass("has-error");
        self.parent().removeClass("has-success");
      }
    })
    $("#confirm_email").focusout(function(){
      if(/^([0-9a-zA-Z]+[-._+&amp;])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/.test($(this).val())
        && $(this).val()==$("#email").val()){
        $(this).parent().addClass("has-success");
        $(this).parent().removeClass("has-error");
      }else{ /*has-warning */
        $(this).parent().addClass("has-error");
        $(this).parent().removeClass("has-success");
      }
    })
    /*$("#password").focusout(function(){
      var pw = $(this).val();
      if(/[!@#]+/.test(pw)&& /[0-9a-z]+/.test(pw) && pw.length >= 8){
        $(this).parent().addClass("has-success");
        $(this).parent().removeClass("has-error");
      }else{ has-warning
        $(this).parent().addClass("has-error");
        $(this).parent().removeClass("has-success");
      }
    })*/
    $("#password").keyup(function(){
      var passwd = $(this).val();
      var score = 0;
      var email_regex = new RegExp($("#email").val().substr(0, $("#email").val().indexOf('@')),"i");
      if(passwd.search(email_regex) == -1 && passwd.indexOf($("#surname").val()) == -1)
        score += 25;
      if(/[!@#]+/.test(passwd)) score += 25;
      if(/[0-9a-z]+/.test(passwd)) score += 25;
      if(passwd.length >= 8) score += 25;
      $(this).parent().addClass("has-success");
      $(this).parent().removeClass("has-error");
      if(score <= 50){
        $("#power_of_password").removeClass("progress-bar-warning")
        $("#power_of_password").removeClass("progress-bar-success")
        $("#power_of_password").addClass("progress-bar-danger")
        $(this).parent().addClass("has-error");
        $(this).parent().removeClass("has-success");
      }else if(score <= 75){
        $("#power_of_password").addClass("progress-bar-warning")
        $("#power_of_password").removeClass("progress-bar-success")
        $("#power_of_password").removeClass("progress-bar-danger")
      }else{
        $("#power_of_password").removeClass("progress-bar-warning")
        $("#power_of_password").addClass("progress-bar-success")
        $("#power_of_password").removeClass("progress-bar-danger")
      }
      $("#power_of_password").attr('aria-valuenow', score);
      $("#power_of_password").attr('aria-valuenow', score);
      $("#power_of_password").css('width', score+"%");
      
    })
    $("#confirm_password").keyup(function(){
      var pw = $(this).val();
      if(/[!@#]+/.test(pw)&& /[0-9a-z]+/.test(pw) && pw.length >= 8 && $("#password").val() == pw){
        $(this).parent().addClass("has-success");
        $(this).parent().removeClass("has-error");
      }else{ /*has-warning */
        $(this).parent().addClass("has-error");
        $(this).parent().removeClass("has-success");
      }
    })
    $("#find_password_email").keydown(function(e){
      if(e.keyCode == 13){
        $("#find_password_button").trigger("click");
      }
    })
    $("#find_password_button").on('click', function(){
      global_loading_start();
      var email = $("#find_password_email").val();
      $.post("/find_password", {email: email}, function(result){
        global_loading_end();
        alert(result.result);
      })
    })
  }