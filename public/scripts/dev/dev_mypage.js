
console.log(user_info);

window.addEventListener("load", function(){

//$("#profile_location").
$("#profile_email").text(user_info.user_email);
//$("#profile_url")
//$("#profile_paypal")

$(".user_name").text(user_info.user_name);
$("#contributions_num").text(user_info.contributions)
$("#repositories_num").text(user_info.repositories)
$("#following_num").text(user_info.following)
$("#followers_num").text(user_info.followers)



});


function maintaining_list_refresh(){

var maintaining_panel_html_body=''
maintaining_panel_html_body+='<div class="panel panel-default">'
maintaining_panel_html_body         +='<div class="accordion_heading" role="tab" id="maintaining_accordion_[repository_id]">'
maintaining_panel_html_body           +='<h4 class="panel-title">'
maintaining_panel_html_body             +='<a class="collapsed" data-toggle="collapse" data-parent="#maintaining_accordion" href="#maintaining_collapse_[repository_id]" aria-expanded="false" aria-controls="maintaining_collapse_[repository_id]">'
maintaining_panel_html_body               +='[repository_name]'
maintaining_panel_html_body             +='</a>'
maintaining_panel_html_body           +='</h4>'
maintaining_panel_html_body         +='</div>'
maintaining_panel_html_body         +='<div id="maintaining_collapse_[repository_id]" class="panel-collapse collapse" role="tabpanel" aria-labelledby="maintaining_accordion_[repository_id]">'
maintaining_panel_html_body           +='<div class="panel-body accordion_content">'
maintaining_panel_html_body             +='[content]'             
maintaining_panel_html_body           +='</div>'
maintaining_panel_html_body         +='</div>'
maintaining_panel_html_body       +='</div>'





for(var i=0;i<user_info.project_list.length;i++){
  $("#maintaining_accordion").append(maintaining_panel_html_body.replace(/\[repository_id\]/g, user_info.project_list[i].repository_id).replace('[repository_name]',user_info.project_list[i].repository_name).replace('[content]', user_info.project_list[i].repository_description))
}
$("#maintaining_repositories_wrapper [role|=tabpanel]").first().addClass('in')
}
maintaining_list_refresh();



function contributing_list_refresh(){

var contributing_panel_html_body=''
contributing_panel_html_body+='<div class="panel panel-default">'
contributing_panel_html_body          +='<div class="accordion_heading" role="tab" id="contributing_accordion_[repository_id]">'
contributing_panel_html_body            +='<h4 class="panel-title">'
contributing_panel_html_body              +='<a class="collapsed" data-toggle="collapse" data-parent="#contributing_accordion" href="#contributing_collapse_[repository_id]" aria-expanded="false" aria-controls="contributing_collapse_[repository_id]">'
contributing_panel_html_body                +='[repository_name]'
contributing_panel_html_body              +='</a>'
contributing_panel_html_body            +='</h4>'
contributing_panel_html_body          +='</div>'
contributing_panel_html_body          +='<div id="contributing_collapse_[repository_id]" class="panel-collapse collapse" role="tabpanel" aria-labelledby="contributing_accordion_[repository_id]">'
contributing_panel_html_body            +='<div class="panel-body accordion_content">'
contributing_panel_html_body              +='[content]'             
contributing_panel_html_body            +='</div>'
contributing_panel_html_body          +='</div>'
contributing_panel_html_body        +='</div>'





for(var i=0;i<user_info.contributing_list.length;i++){
  $("#contributing_accordion").append(contributing_panel_html_body.replace(/\[repository_id\]/g, user_info.contributing_list[i].repository_id).replace('[repository_name]',user_info.contributing_list[i].repository_name).replace('[content]', user_info.contributing_list[i].repository_description))
}
$("#contributing_repositories_wrapper [role|=tabpanel]").first().addClass('in')
}
contributing_list_refresh();




function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}







var ctx = document.getElementById("user_sales_chart").getContext("2d");
ctx.canvas.width=($("#mypage_content_graph").css('width').split('px')[0])






var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
var myLineChart = new Chart(ctx).Line(data);

$("#user_sales_chart").css('width','100%')




