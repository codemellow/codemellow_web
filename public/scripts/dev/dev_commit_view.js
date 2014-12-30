function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
$(document).ready(function(){
    var unified_load = function(code, commit_hash, minus_start, minus_num, start, plus_num, commit_hash, start_origin, data, end, file_name){
        str="";
        if(code == 1){
            str += '<tr class="diff-line-expand">'
            if(start == 1){
                str += '<td class="expandable-line-num" colspan="2">';
                str +=     '<span class="glyphicon">...</span>';
                str += '</td>';
            }else{
                str += '<td class="expandable-line-num" colspan="2" data-commit-hash='+commit_hash+' data-start=null data-end='+(start-1)+' data-file-name='+file_name+' data-minus-end='+(minus_start-1)+' data-minus-num='+minus_num+' data-plus-num='+plus_num+'>';
                str +=     '<span class="glyphicon glyphicon-asterisk"></span>';
                str += '</td>';
            }
            str +=     '<td class="diff-line-code">';
            str +=         '<span class="diff-line-pre"> @@@ -'+minus_start+','+minus_num+' +'+start+','+plus_num+' @@@</span>'
            str +=     '</td>';
            str += '</tr>'
        }else if(code == 3){
            str += '<tr class="diff-line-expand">'
            str +=     '<td class="expandable-line-num" colspan="2" data-commit-hash='+commit_hash+' data-start='+start_origin+' data-end='+(start-1)+' data-file-name='+file_name+' data-minus-end='+(minus_start-1)+' data-minus-num='+minus_num+' data-plus-num='+plus_num+'>';
            str +=         '<span class="glyphicon glyphicon-asterisk"></span>';
            str +=     '</td>';
            str +=     '<td class="diff-line-code">';
            str +=         '<span class="diff-line-pre"> @@@ -'+minus_start+','+minus_num+' +'+start+','+plus_num+' @@@</span>';
            str +=     '</td>';
            str += '</tr>'                      
        }
        for(i = start, j = 0; i <= end; i++, j++){
            str += '<tr class="diff-line-appended">'
            str +=      '<td class="diff-line-originnum linkable-line-number">'
            str +=      '   <span class="line-num-content">'+(minus_start+j)+'</span>'
            str +=      '</td>'
            str +=      '<td class="diff-line-newnum linkable-line-number">'
            str +=          '<span class="line-num-content">'+(start+j)+'</span>'
            str +=      '</td>'
            str +=      '<td class="diff-line-code">'
            str +=          '<span class="diff-line-pre"><pre>'+data[j]+'</pre></span>'
            str +=      '</td>'
            str +='</tr>'
        }
        if(code == 2 && data.length == 20){
            str += '<tr class="diff-line-expand">'
            str +=     '<td class="expandable-line-num" colspan="2" data-commit-hash='+commit_hash+' data-start='+(end+1)+' data-file-name='+file_name+' data-minus-start='+(minus_start+minus_num)+'>'
            str +=         '<span class="glyphicon glyphicon-asterisk"></span>'
            str +=     '</td>'
            str +=     '<td class="diff-line-code">'
            str +=         '<span class="diff-line-pre"></span>'
            str +=     '</td>'
            str += '</tr>'
        }
        return str;
    }
    var splited_load = function(code, commit_hash, minus_start, minus_num, start, plus_num, commit_hash, start_origin, data, end, file_name){
        str="";
        if(code == 1){
            str += '<tr class="diff-line-expand">'
            if(start == 1){
                str += '<td class="expandable-line-num" colspan="1">';
                str +=     '<span class="glyphicon">...</span>';
                str += '</td>';
            }else{
                str += '<td class="expandable-line-num" colspan="1" data-commit-hash='+commit_hash+' data-start=null data-end='+(start-1)+' data-file-name='+file_name+' data-minus-end='+(minus_start-1)+' data-minus-num='+minus_num+' data-plus-num='+plus_num+'>';
                str +=     '<span class="glyphicon glyphicon-asterisk"></span>';
                str += '</td>';
            }
            str +=     '<td class="diff-line-code" colspan="3">';
            str +=         '<span class="diff-line-pre"> @@@ -'+minus_start+','+minus_num+' +'+start+','+plus_num+' @@@</span>'
            str +=     '</td>';
            str += '</tr>'
        }else if(code == 3){
            str += '<tr class="diff-line-expand">'
            str +=     '<td class="expandable-line-num" colspan="1" data-commit-hash='+commit_hash+' data-start='+start_origin+' data-end='+(start-1)+' data-file-name='+file_name+' data-minus-end='+(minus_start-1)+' data-minus-num='+minus_num+' data-plus-num='+plus_num+'>';
            str +=         '<span class="glyphicon glyphicon-asterisk"></span>';
            str +=     '</td>';
            str +=     '<td class="diff-line-code" colspan="3">';
            str +=         '<span class="diff-line-pre"> @@@ -'+minus_start+','+minus_num+' +'+start+','+plus_num+' @@@</span>';
            str +=     '</td>';
            str += '</tr>'                      
        }
        for(i = start, j = 0; i <= end; i++, j++){
            str += '<tr class="diff-line-appended">'
            str +=      '<td class="diff-line-originnum linkable-line-number">'
            str +=      '   <span class="line-num-content">'+(minus_start+j)+'</span>'
            str +=      '</td>'
            str +=      '<td class="diff-line-code">'
            str +=          '<span class="diff-line-pre"><pre>'+data[j]+'</pre></span>'
            str +=      '</td>'
            str +=      '<td class="diff-line-newnum linkable-line-number">'
            str +=          '<span class="line-num-content">'+(start+j)+'</span>'
            str +=      '</td>'
            str +=      '<td class="diff-line-code">'
            str +=          '<span class="diff-line-pre"><pre>'+data[j]+'</pre></span>'
            str +=      '</td>'
            str +='</tr>'
        }
        if(code == 2 && data.length == 20){
            str += '<tr class="diff-line-expand">'
            str +=     '<td class="expandable-line-num" colspan="1" data-commit-hash='+commit_hash+' data-start='+(end+1)+' data-file-name='+file_name+' data-minus-start='+(minus_start+minus_num)+'>'
            str +=         '<span class="glyphicon glyphicon-asterisk"></span>'
            str +=     '</td>'
            str +=     '<td class="diff-line-code" colspan="3">'
            str +=         '<span class="diff-line-pre"></span>'
            str +=     '</td>'
            str += '</tr>'
        }
        return str;
    }
    var load = function(event){
        var self = $(this);
        var commit_hash = $(this).data('commit-hash');
        var start = $(this).data('start');
        var end = $(this).data('end');
        var file_name = $(this).data("file-name");
        var repository_name = projectHeaderController.getValue('repository_name')
        var minus_end = $(this).data('minus-end');
        var minus_start = $(this).data('minus-start');
        var plus_num = $(this).data('plus-num');
        var minus_num = $(this).data('minus-num');
        var start_origin;
        var code;
        if(commit_hash==undefined && (start == "undefined" || start == null)){
            return;
        }
        if(start==undefined || start=="undefined" || start==null){
            //file end
            code = 1;
            start = end- 19;
            if(start < 1)
                start = 1;
        }else if(end==undefined || end=="undefined" || end==null){
            //file start
            code = 2;
            end = start + 19;
        }else if(end - start + 1 > 20){
            //file middle
            code = 3;
            start_origin = start;
            start = end- 19;
        }else if(end - start +1 <= 20){
            //do not make astarick
            code = 4;
        }
        if(minus_start == undefined || minus_start=="undefined" || minus_start == null){
            minus_start = minus_end - (end-start);
        }
        if(minus_num == undefined || minus_num=="undefined" || minus_num == null){
            minus_num = 0;
        }
        plus_num += (end-start + 1);
        minus_num += (end-start + 1);
        
        var obj = {repository_name: repository_name, commit_hash: commit_hash, start_line: start, end_line:end, file_name: file_name};
        $.post("/get_left_file_contents",obj, function(data){
            data.pop();
            var target = self.parent(), str="";
            end = start+data.length-1;;
            switch(projectHeaderController.getValue('view_mode')){
                case 'unified':
                str = unified_load(code, commit_hash, minus_start, minus_num, start, plus_num, commit_hash, start_origin, data, end, file_name);
                break;
                case 'split': 
                str = splited_load(code, commit_hash, minus_start, minus_num, start, plus_num, commit_hash, start_origin, data, end, file_name);
                break;
            }
            $(str).insertBefore(target);
            target.remove();
            $(".expandable-line-num").unbind('click')
            $(".expandable-line-num").click(load);
        })
    };
    $(".expandable-line-num").click(load);
})
