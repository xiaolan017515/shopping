/**
 * Created by fdr08 on 2016/7/3.
 */
import "../../style/css/awesome.less";
import "../../style/css/base.less";
import "../../style/css/com.less";

function gotoTop(min_height) {
//预定义返回顶部的html代码，它的css样式默认为不显示 
    var gotoTop_html = '<div id="gotoTop" class="ico ico-angle-double-up"></div>';
//将返回顶部的html代码插入页面上id为page的元素的末尾 
    $("body").append(gotoTop_html);
    $("#gotoTop").click(//定义返回顶部点击向上滚动的动画 
        function () {
            $('html,body').animate({scrollTop: 0}, 700);
        });
//获取页面的最小高度，无传入值则默认为400像素
    min_height = min_height ? min_height : 800;
//为窗口的scroll事件绑定处理函数
    $(window).on("scroll", function () {
//获取窗口的滚动条的垂直位置
        var s = $(document).scrollTop();
//当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
        if (s > min_height) {
            $("#gotoTop").fadeIn(100);
        } else {
            $("#gotoTop").fadeOut(200);
        }
    });
}
gotoTop();

/**
 * 导航栏点击事件
 */
// $(".nav").on("click", ">button", function () {
//     $(this).addClass("active").siblings("button").removeClass("active");
// });


// $(".inputSearch").on("click", ">li", function () {
//     var that = $(this).parent();
//     // $.ajax({
//     //     type: "post",
//     //     url: 'url',
//     //     data:"base",
//     //     dataType: "json",
//     //     success: function (data) {
//             that.removeClass("active");
//         // },
//         // fail: function (e) {
//         //     console.log(e);
//         // }
//     // });
// });
// $(".search>input").on("focus", function () {
//    $(".inputSearch").addClass("active");
// });