$(function () {
    console.log("加载成功")
    var username = $("#username");
    var password = $("#password");
    var submitBtn = $("#submitBtn");
   
    var user_lock = false;
    var pass_lock = false;

    username.on("blur", function () {
        var val = username.val();
        $(".good").remove();
        // 定义正则表达式
        var reg = /^[^\d]\w{6,10}$/;
        if (!reg.test(val)) {
            $("<div class='good'>！请输入以字母开头数字字母下划线7——11位</div>").insertAfter($('#username')).css({
                fontSize:"14px",
                color:"skyblue"
            });
            user_lock = false;
            return;
        }
    })
    password.on("blur", function () {
        var val = password.val();
    
        var reg = /[^\d]\w{6,10}$/;
        if (!reg.test(val)) {

            pass_lock = false;
            return;
        }
        pass_lock = true;
    })
   
    submitBtn.click(function (){
       
        $.ajax({
            type:"POST",
            url:"../php/login.php",
            data:{
                username: $("#username").val(), 
                password: $("#password").val(),
            },
            dataType:"json",
            success:function (data){
                if (!data.error) {
                    
                    // console.log(data);
      
                    // // 提示用户
                    alert(data.msg);
                     // 登录成功 跳转到列表页
                    location.href = "../html/03_mi.html";                   
                } else {
                    alert(data.msg);
                }
                // alert(JSON.parse(data).msg);
                // location.href = "../html/03_mi.html"

            }
        })
    })

})