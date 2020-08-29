$(function () {
    console.log("加载成功")
    // 获取元素
    var $box = $("#box");
    var $leftBtn = $("#leftBtn");
    var $rightBtn = $("#rightBtn");
    var $carousel = $("#carousel");

    var $cirs = $("#cirs li");

    // 获取第一个元素复制后放入最后
    $carousel.children("li:first-child").clone().appendTo($carousel);

    // 获取宽度
    var width = $box.width();
    // 定义信号量
    var idx = 0;

    $rightBtn.click(function () {
        idx++;
        $carousel.stop(true, true).animate({
            left: -idx * width
        }, 2000, "linear", function () {
            if (idx >= 5) {
                $(this).css("left", 0);
                idx = 0;
            }
            change();
        });
    });



    $leftBtn.click(function () {
        idx--;
        if (idx < 0) {
            idx = 5;
            $carousel.css("left", -idx * width);
            idx--
        }
        $carousel.stop().animate({ left: -idx * width }, 2000, function () {
            change()
        });
    })


    // 1 通过 index方法获取当前li的序号
    // $cirs.click(function() {
    //     var index = $(this).index(); // index有一个问题 它获取的不是你选择的元素
    //     console.log("当前点击到的是第" + index + "个小圆点");

    // })


    // 2 循环绑定事件  利用的是作用域分隔的原理 
    $cirs.each(function (index, value) {
        // 该循环的函数第一个参数是循环的目标的索引  第二个才是成员
        $(value).click(function () {
            if (index === idx) {
                return;
            }
            idx = index;
            $carousel.animate({ left: -index * width }, 2000, function () {
                change();
            })
        });
    });

    // 小圆点的样式 
    function change() {
        $cirs.each(function (index, value) {
            if (index === idx) {
                $(value).addClass("active");
            } else {
                $(value).removeClass("active");
            }
        })
    }



    var timer = setInterval(function () {
        $rightBtn.trigger("click");
    }, 4000)


    $box.mouseenter(function () {
        clearInterval(timer);
    });

    $box.mouseleave(function () {
        timer = setInterval(function () {
            $rightBtn.trigger("click");
        }, 4000);
    });

    var  Array = [];
    $.ajax({
        type: 'GET',
        url: "../php/goodlist2.php",
        success: function (data) {
            if (JSON.parse(data)) {
                // 如何渲染这12条数据
                Array = JSON.parse(data);
                console.log(Array);
                var str = ` <ul  style="width:100%" class="row wrap-column list-group list-group-horizontal-sm">`;
                // 循环12条li出来
                $.each(JSON.parse(data), function (i, n) {
                    str += `
                    <li class="col col-4 list-group-item " style="padding: 0 10px; border: none">
                        <div class="card" >
                            <img src="${n.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text"><a href="./detail.html?id=${n.product_id}">${n.name}</a></p>
                                <p class="d-flex justify-content-between align-items-center card-text"><span>￥${n.del} </span><button type="button" data-id="${n.product_id}" class="btn btn-primary">加入购物车</button></p>
                            </div>
                        </div>
                    </li>
                    `;
                })
                str += `</ul>`;
                $("#paginationContainer").append(str);
                return str;
            } else {
                throw new Error("请求失败");
            }
        },

    })

    paginationContainer.onclick = function (e) {
        //通过e.target判定触发事件的元素是否是加入购物车按钮
        if (e.target.tagName.toLowerCase() === "button") {
            var goodsID = e.target.getAttribute("data-id");
            // 说明点到的是按钮
            console.log("当前点的是按钮，商品id是" + goodsID);
            // 哪个方法可以实现数组查询功能 
            var goodsInfo = Array.find((n) => {
                console.log(n);
                return n.product_id === goodsID;
            })
            // 1 先把本地存储中的数组取出来 
            var shoppingCartString = localStorage.getItem("04_shoppingcar") || "[]" ;
            // 2 转为数组
            var shoppingCartArr = JSON.parse(shoppingCartString);
            // 先判断数组里是否已经有这个对象 
            console.log(shoppingCartArr);
            var isExists  = shoppingCartArr.find(n => n.product_id === goodsID);
            // 根据判定结果执行不同的业务逻辑
            if (isExists) {
                isExists.count++;
            } else {
                // 3 往数组里加入选中的这个对象
              
                goodsInfo.count = 1;
                shoppingCartArr.push(goodsInfo);
            }
            console.log(isExists);
            // 4 回转成字符串并存到本地存储里
            localStorage.setItem("04_shoppingcart", JSON.stringify(shoppingCartArr));
            // 跳转到购物车页面
            location.href = "./04_shoppingcar.html";
        }
        // if (e.target.tagName.toLowerCase() === "button") {

        //     var shoppingCartString = localStorage.getItem("shoppingCart") || "[]" ;
        //             console.log(shoppingCartString);
        //     // location.href = "./04_shoppingcar.html"
        // }
    }

});