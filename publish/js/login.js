"use strict";$(function(){console.log("加载成功");var o=$("#username"),e=$("#password"),s=$("#submitBtn");o.on("blur",function(){var s=o.val();$(".good").remove();/^[^\d]\w{6,10}$/.test(s)||$("<div class='good'>！请输入以字母开头数字字母下划线7——11位</div>").insertAfter($("#username")).css({fontSize:"14px",color:"skyblue"})}),e.on("blur",function(){var s=e.val();/[^\d]\w{6,10}$/.test(s)}),s.click(function(){$.ajax({type:"POST",url:"../php/login.php",data:{username:$("#username").val(),password:$("#password").val()},dataType:"json",success:function(s){s.error?alert(s.msg):(alert(s.msg),location.href="../html/03_mi.html")}})})});