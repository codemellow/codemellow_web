$(document).ready(function(){
  
  // autocomlete function
  $('#classic_search_bt').on('click', function(){
    var postdata = {};
    postdata.msg = $('#classic_search_input').val();
    postdata.page = 1;
    if(postdata.msg != ""){
      $("#search_form").attr('action','/market/classic/'+postdata.msg+'/1');
      $("#search_form").submit();
    }
  }); 
  $('#classic_search_input').keydown(function(e){
    if(e.keyCode == 13){
      $("#classic_search_bt").click();
    }
  });
  $(".repo-name").click(function(){
   $("#project_desc_modal").modal();
  })

  $('.history_toggle').click(function(){
    if($(".modal-content").hasClass('col-sm-12')){

      $(".modal-content").removeClass('col-sm-12');
      $(".modal-content").addClass('col-sm-10');
    }
    else{
      $(".modal-content").addClass('col-sm-12');
      $(".modal-content").removeClass('col-sm-10');
    }
      $(".project_version_tree").css('height',$(".modal-content").css('height') );
      $(".project_version_tree").toggle();
  });
});
