$(function () {
    console.log("加载成功");
    var username = $('#username');
    var password = $("#password");
    var submitBtn = $("#submitBtn");
    var user_lock = false;
    var pass_lock = false;
    $('#username').on('blur', function () {
        $(".good").remove();
        var val = username.val();
        var reg = /^[^\d]\w{6,10}$/;
        if (!reg.test(val)) {
            $("<div class='good'>！请输入以字母开头数字字母下划线7——11位</div>").insertAfter($('#username')).css({
                fontSize:"14px",
                color:"skyblue"
            });
            user_lock = false;
            return ;
        }
        
  
        $.ajax({
            type: "GET",
            url: "../php/chek.php",
            data: {
                username: val,
            },

            success: function (data) {
                $(`<div class='good'>${JSON.parse(data).msg}</div>`).insertAfter($('#username')).css({
                    fontSize:"14px",
                    color:"skyblue"
                });
                user_lock = true;
            },
            error: function (msg) {
                console.log(msg);
                user_lock = false;
            }
        })

    })
    password.on('blur', function () {
        var val = password.val();
        var reg = /^[^\d]\w{6,10}$/;
        $(".nice").remove();
        if (!reg.test(val)) {
            $("<div class='nice'>！请输入以字母开头数字字母下划线7——11位</div>").insertAfter($('#password')).css({
                fontSize:"14px",
                color:"skyblue"
            });
            // alert("请输入不以数字开头的7-11位");
            pass_lock = false;
            return;
        }
        pass_lock = true;
    })
    submitBtn.click(function () {
        if (!(user_lock && pass_lock)) {
            return;
        }
        $.ajax({
            type:"POST",
            url:"../php/regist.php",
            data:{
                username: $("#username").val(), 
                password: $("#password").val(),
            },
            success:function (data){
                alert(JSON.parse(data).msg);
                location.href = "../html/01_login.html";
            },
            error: function (msg) {
                alert(JSON.parse(data).msg);
               
            }
        })
    })
})