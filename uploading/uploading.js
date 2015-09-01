
var interfaceData = {
    cssUrl:"uploading.css",        //设置默认皮肤样式
    httpStr:"php/uploading.php"     //接口路径
}
var csss = ["uploading.css","uploading2.css","uploading3.css","uploading4.css"];//自动切换皮肤
var idd = 0;
var file=[];
var file4= [];
var j = 1;
var j2 =1;
var k = 0;
var fileNum;
var fasti = 0 ;
var fasti2 = 0 ;
$(document).ready(function(){
    uCss();
    uIndex();
    $("#uploading").click(function(){
        $(".u-index").show();
    });
    $(".u-header-btn2").click(function(){
        var a = $(".u-wenJ");
        if(a.length>0){
            for(var i=0;i< a.length;i++){
                if($(".u-wenJ").eq(i).children().eq(4).children().eq(0).children().length==2){
                    $(".u-alertc-1").text("您有文件正在上传,确认退出吗?")
                }else{
                    $(".u-alertc-1").text("确认退出吗?")
                }
            }
        }
        $(".u-alertb").show();
        $(".u-alertc").show();
    });
    $("#yes").click(function(){
        $(".u-alertb").hide();
        $(".u-alertc").hide();
        $(".u-index").hide();
    });
    $("#no").click(function(){
        $(".u-alertb").hide();
        $(".u-alertc").hide();
    });
    $("#u-shangchuan").click(function(){
        $("#u-some").click();
    });
    $("#u-some").change(function(){    
         var tes = 0;        
        var  file3 = $('#u-some').get(0).files;
        huoq(file3);
    });
    $(".u-caozuo2").live("click",function(){
        var a=$('.u-caozuo2').index(this);
        file.splice(a,1);
        $(this).parent().parent().remove();
        if($(".u-wenJ").length==1){
            $(".u-wenJ").remove();
            $(".u-bj").show();
            idd = 0;
        }
    });
    $("#u-clear").live("click",function(){
        file = [];
        $(".u-wenJ").remove();
        $(".u-bj").show();
        idd = 0;
    });
    $("#u-ids1").live("click",function(){
       if($("#u-ids1").attr("checked")){
           $(".u-ids").attr("checked","true");
       }else{
           $(".u-ids").removeAttr("checked");
       }
    });
    $("#quxiao").live("click",function(){
        var b=0;
        var a = $(".u-ids");
        for(var i = 0;i< a.length;i++){
            if(a.eq(i).attr("id")!="u-ids1"){
            if(a.eq(i).attr("checked")){
                var c=$('.u-ids').index(a.eq(i));
                file.splice(c-1,1);
                b++;
                a.eq(i).parent().parent().remove();
            }
          }
        }
        if($(".u-ids").length==1){
            $(".u-ids").parent().parent().remove();
            $(".u-bj").show();
            idd=0;
        }
        if(b==0){
            alert("请选择需要取消上传的文件");
        }
    });
    $(".u-caozuo1").live("click",function(){
        var a = $(this).attr("title");
        if(a=="开始上传该文件"){
            var a =$(this).parent().parent().children().eq(4).text();
            if(a=="文件已存在"){
                alert("不能上传同名文件!")
            }else if(a=="不能上传0字节文件"){
                alert("不能上传0kb文件!")
            }else {
                $(this).parent().parent().children().eq(4).text("");
                $(this).parent().parent().children().eq(4).append(jindu);
                $(this).parent().parent().children().eq(5).children().eq(0).addClass("u-caozuo-b");
                $(this).parent().parent().children().eq(5).children().eq(0).attr("title", "暂停");
                var c = $('.u-caozuo1').index(this);
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener("progress", function h1(evt) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(4).children().eq(0).children().eq(0).width(percentComplete.toString() + "%");
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(4).children().eq(0).children().eq(1).text(percentComplete.toString() + "%");
                }, false);
                xhr.addEventListener("load", function h2(evt) {
                    var aa = evt.target.responseText;
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(4).children().remove();
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(4).text("");
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(4).append(shangcok(aa));
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(5).children().eq(0).removeClass("u-caozuo-b");
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(5).children().eq(0).addClass("u-caozuo-ok");
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(5).children().eq(0).attr("title", "上传成功");
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(5).children().eq(1).attr("title", "删除记录");
                    $('.u-caozuo1').eq(c).parent().parent().children().eq(0).children().eq(0).removeAttr("checked");
                }, false);
                xhr.addEventListener("error", uploadFailed, false);
                xhr.addEventListener("abort", uploadCanceled, false);
                xhr.open("post", "php/uploading.php", true);
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                var fd = new FormData();
                fd.append('files', file[c]);
                xhr.send(fd);
            }
        }
        if(a=="暂停"){
            $(this).parent().parent().children().eq(4).children().eq(0).children().eq(1).text("暂停")
            $(this).parent().parent().children().eq(5).children().eq(0).removeClass("u-caozuo-b");
            $(this).parent().parent().children().eq(5).children().eq(0).addClass("u-caozuo-z");
            $(this).parent().parent().children().eq(5).children().eq(0).attr("title","继续上传");
        }
        if(a=="继续上传"){
            $(this).parent().parent().children().eq(4).children().eq(1).text("");
            $(this).parent().parent().children().eq(5).children().eq(0).removeClass("u-caozuo-z");
            $(this).parent().parent().children().eq(5).children().eq(0).addClass("u-caozuo-b");
            $(this).parent().parent().children().eq(5).children().eq(0).attr("title","暂停");
        }
        if(a=="上传成功"){
            var a=$('.u-caozuo1').index(this);
            file.splice(a,1);
            $(this).parent().parent().remove();
            if($(".u-wenJ").length==1){
                $(".u-wenJ").remove();
                $(".u-bj").show();
                idd = 0;
            }
        }
    });
    $("#starS").live("click",function() {

        var b = 0;
        var a = $(".u-ids");
        for (var i = 0; i < a.length; i++) {
            if (a.eq(i).attr("id") != "u-ids1") {
                if (a.eq(i).attr("checked")) {
                    if (a.eq(i).parent().parent().children().eq(2).text() == "0KB") {
                        alert("不能上传0KB文件!");
                        a.eq(i).parent().parent().remove();
                        continue;
                    }
                    if (a.eq(i).parent().parent().children().eq(4).find("p").text() == "文件已存在") {
                        alert("不能上传同名文件!");
                        a.eq(i).parent().parent().remove();
                        continue;
                    }
                    if (a.eq(i).parent().parent().children().eq(4).find("p").text() == "上传成功") {
                        alert("不能重复上传!");
                        a.eq(i).parent().parent().remove();
                        continue;
                    }
                    var c = $('.u-ids').index(a.eq(i));
                    file4.push(file[c - 1]);
                    b++;
                    a.eq(i).parent().parent().children().eq(4).text("");
                    a.eq(i).parent().parent().children().eq(4).append(jindu);
                    a.eq(i).parent().parent().children().eq(5).children().eq(0).addClass("u-caozuo-b");
                    a.eq(i).parent().parent().children().eq(5).children().eq(0).attr("title", "暂停");
                }
            }
        }
        if (b == 0) {
            alert("请选择需要上传的文件");
            return;
        }
        //上传
        fileNum=file4.length;
        fasti = fastIds(j);
        uploadFile(file4[0]);
    });
    $(".u-header-btn3").live("click",function(){
        var a = $("head").children(":last").attr("href");
        for(var i = 0 ; i< csss.length ;i++){
            if(a=="css/"+csss[i]){
                if(i==csss.length-1){
                interfaceData.cssUrl=csss[0];
                }else{
                interfaceData.cssUrl=csss[i+1];
                }
            }
        }
        $("head").children(":last").remove();
        uCss();
    });
});
//调用样式
//判断 选择的ids低级次出现
function fastIds(h){
    var h2 = 1;
    for(var i = 0;i< $(".u-ids").length;i++){
        if($(".u-ids").eq(i).attr("id")!="u-ids1"){
            if($(".u-ids").eq(i).attr("checked")){
                if(h2==h){
                    return i;
                 }else{
                    h2++;
                }
                }
            }
    }
}
function uploadFile(file){
    if(k<fileNum){
//        if(file.size<1024*5*1024) {
            var fd = new FormData();
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress",uploadProgress, false);
            xhr.addEventListener("load",uploadComplete, false);
            xhr.addEventListener("error", uploadFailed, false);
            xhr.addEventListener("abort", uploadCanceled, false);
            xhr.open("post", interfaceData.httpStr , true);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            fd.append('files', file);
            xhr.send(fd);
//        }else{
//           //大文件上传
//             var ff =[];
//             var lens = file.size;
//              for (var i=0;i*1024*1024*3<lens;i++) {
//                  ff[i] = file.slice(i*1024*1024,(i+1)*1024*1024*3);
//               }
//               var flen = ff.length;
//               for(var z=0;z<flen;z++){
//                  var fd = new FormData();
//                  var xhr = new XMLHttpRequest();
//                   xhr.upload.addEventListener("progress", uploadProgress, false);
//                   xhr.addEventListener("load", uploadComplete, false);
//                   xhr.addEventListener("error", uploadFailed, false);
//                   xhr.addEventListener("abort", uploadCanceled, false);
//                   xhr.open("post", "php/uploading.php", true);
//                   xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//                   xhr.setRequestHeader("ONEST_SIGNATURE", "3cd6f8a23d8be4c01ae8daf09d861cf2");
//                   xhr.setRequestHeader("Cookie", "username=13871484613; keyword=55f65d7e7437d432495d6411f116bc47");
//                   xhr.setRequestHeader("FD", "5407c8eb0f52180804000d2f");
//                   xhr.setRequestHeader("ONEST_USERNAME", "13871484613");
//                   xhr.setRequestHeader("MOD", "webfileupload");
//                   xhr.setRequestHeader("X-File-Size", ff[z].size);
//                   xhr.setRequestHeader("X-File-Type", ff[z].type);
//                   xhr.setRequestHeader("FDINDEX", z);
//                   xhr.setRequestHeader("FDTOTAL", flen);
//                   fd.append('files', ff[z]);
//                   xhr.send(fd);
//            }
//        }
    }else{
        file4 = [];
        j = 1;
        j2 =1;
         k = 0;
        fasti = 0 ;
        fasti2 = 0 ;
    }
}
function uCss(){
    $("head").append("<link>");
    css = $("head").children(":last");
    css.attr({
        rel: "stylesheet",
        type: "text/css",
        href: "css/"+interfaceData.cssUrl
    });
    var a = 8 ;
}
//操作功能按钮
function ids(idd){
    return "<input type='checkbox' name='ids' class='u-ids' id='u-ids"+idd+"'>";
 }
var caozuo ="<div class='u-btn u-caozuo1' title='开始上传该文件'></div><div class='u-btn u-caozuo2' title='取消上传该文件'></div>";
var tongm  ="<p style='color:red;margin-left: 40%;'>文件已存在</p>";
var tongm2 ="<p style='color:red;margin-left: 40%;'>不能上传0字节文件</p>";
var jindu  ="<div class='u-jindu'><div class='u-jinduing'></div><p>0%</p></div>";//<p>0kb/s</p>
//设置窗口样子
function shangcok(a){
    return "<p style='color:deepskyblue;width: 90%;text-align: center'>"+a+"</p>";
}
function uIndex(){
    $("body").append("<input type='file' id='u-some' class='u-some' multiple='multiple'>"+
        "<div class='u-index'>" +
            "<img src='img/up_file.png' class='u-bj'/>" +
          " <div class='u-header'>" +
            "<div class='u-btn u-header-btn u-header-btn1' title='选择添加文件' id='u-shangchuan'><i class='u-i1'></i><p>添加文件</p></div>" +
            "<div class='u-btn u-header-btn' title='开始上传列表中的所有文件' id='starS'><i class='u-i2'></i><p>开始上传</p></div>" +
            "<div class='u-btn u-header-btn' title='取消所有待上传的文件' id='quxiao'><i class='u-i3'></i><p>取消上传</p></div>" +
            "<div class='u-btn u-header-btn' title='清空所有已下载的文件' id='u-clear'><i class='u-i4'></i><p>清空列表</p></div>" +
            "<div class='u-btn u-header-btn2' title='退出上传界面'></div>" +
            "<div class='u-btn u-header-btn3' title='点击跟换皮肤'></div>" +
          " </div>" +
         "<div class='u-conten' id='drop_area'>" +
        "</div>" +
        "</div>"+
        "<div class='u-alertb'>"+"</div>" +
        "<div class='u-alertc'>" +
        "<div class='u-alertc-1'>确认退出吗?</div>" +
        "<div class='u-alertc-2'><input type='button' value='取消'id='no'/><input type='button' value='确认' id='yes'/></div>" +
        "</div>" +
        "" );

}
function wenjian(i,a,b,c,d,e){
    $(".u-conten").append("" +
        "<div class='u-wenJ'>" +
           "<div class='u-wenJ-cen u-wenJ-ids'>"+i+"</div>" +
           "<div class='u-wenJ-cen u-wenJ-name'>"+a+"</div>" +
           "<div class='u-wenJ-cen u-wenJ-bs'>"+b+"</div>" +
           "<div class='u-wenJ-cen u-wenJ-loca'>"+c+"</div>" +
           "<div class='u-wenJ-cen u-wenJ-sta'>"+d+"</div>" +
           "<div class='u-wenJ-cen u-wenJ-ope'>"+e+"</div>" +
        "</div>" +
        "");
}
$(function(){
    //阻止浏览器默认行。
    $(document).on({
        dragleave:function(e){    //拖离
            e.preventDefault();
        },
        drop:function(e){  //拖后放
            e.preventDefault();
        },
        dragenter:function(e){    //拖进
            e.preventDefault();
        },
        dragover:function(e){    //拖来拖去
            e.preventDefault();
        }
    });
    var box = document.getElementById('drop_area'); //拖拽区域
    box.addEventListener("drop",function(e){
        e.preventDefault(); //取消默认浏览器拖拽效果
         var  file2 = e.dataTransfer.files; //获取文件对象
        huoq(file2);
    },false);
});
function huoq(f){
    if(f.length == 0){
        return false;
    }
    var tes = 0;
    for(var j=0;j<f.length;j++){
        file.push(f[j]);
        idd++;
        if (f[j]) {
            var fileSize = 0;
            if (f[j].size > 1024 * 1024) fileSize = (Math.round(f[j].size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            else fileSize = (Math.round(f[j].size * 100 / 1024) / 100).toString() + 'KB';
            //  console.log(file.name, fileSize, file.type); 
            if ($(".u-wenJ").length == 0) {
                $(".u-bj").hide();
                wenjian(ids(idd)+"全选","文件名", "文件大小", "上传目录", "状态", "操作");
                idd++;
            }
            var ll = $(".u-wenJ");
            for (var i = 0; i < ll.length; i++) {
                if (ll.eq(i).find(".u-wenJ-name").text() == f[j].name) {
                    tes=1;
                    break;
                }
            }
            if(fileSize=="0KB"){
                tes=2;
            }
            var type =  f[j].type.split("/")[1];
            switch (tes){
                case 0:
                    wenjian(ids(idd),f[j].name, fileSize, "默认目录", "等待上传", caozuo);
                    break;
                case 1:
                    wenjian(ids(idd),f[j].name, fileSize, "默认目录", tongm, caozuo);
                    tes=0;
                    break;
                case 2:
                    wenjian(ids(idd),f[j].name, fileSize, "默认目录", tongm2, caozuo);
                    tes=0;
                    break;
            }
        }

    }
}
//显示下载进度
function uploadProgress(evt) {
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    for (var i = 0; i < $(".u-ids").length; i++) {
        if ($(".u-ids").eq(i).attr("id") != "u-ids1") {
            if ($(".u-ids").eq(i).attr("checked")) {
                $(".u-ids").eq(fasti).parent().parent().children().eq(4).children().eq(0).children().eq(0).width(percentComplete.toString() + "%");
                $(".u-ids").eq(fasti).parent().parent().children().eq(4).children().eq(0).children().eq(1).text(percentComplete.toString() + "%");
            }
        }
    }
}
function uploadComplete(evt) {
    var cg = evt.target.responseText;
    fasti2 = fastIds(j2);
    $(".u-ids").eq(fasti2).parent().parent().children().eq(4).children().remove();
    $(".u-ids").eq(fasti2).parent().parent().children().eq(4).text("");
    $(".u-ids").eq(fasti2).parent().parent().children().eq(4).append(shangcok(cg));
    $(".u-ids").eq(fasti2).parent().parent().children().eq(5).children().eq(0).removeClass("u-caozuo-b");
    $(".u-ids").eq(fasti2).parent().parent().children().eq(5).children().eq(0).addClass("u-caozuo-ok");
    $(".u-ids").eq(fasti2).parent().parent().children().eq(5).children().eq(0).attr("title", "上传成功");
    $(".u-ids").eq(fasti2).removeAttr("checked");
    k++;
    fasti = fastIds(j);
    //加载下一个文档
    uploadFile(file4[k]);
}
function uploadFailed(evt) {
    alert("上传失败!");
}
function uploadCanceled(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
}

