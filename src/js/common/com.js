/**
 * Created by fdr08 on 2016/7/3.
 */
import "../../style/css/icomoon.less";
import "../../style/css/base.less";
import "../lib/core";
import "../../style/css/com.less";

function loginClick() {
    let lb = $(".loginBox");
    lb.css({display: "block"}).css({marginLeft: -(lb.width()/2) + "px", marginTop: -(lb.height()/2) + "px"});
    $(".login-mask").css({display: "block"});
}
function closeloginClick() {
    $(".loginBox").css({display: "none"});
    $(".login-mask").css({display: "none"});
}

/**
 * 登录
 */
// $("#login").click(loginClick);
// $("#closeLogin").click(closeloginClick);


let email = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/ig,
    pwd = /^[a-zA-Z0-9_]{6,16}$/ig;

function inputBlur(e) {
    let v = $(this).val(),
        type = $(this).attr("type");
    switch (type) {
        case "text":
            if(!email.test(v) && v != "") {
                $("button.login").prop("disabled", true);
                $(this).parent().css({borderColor: "red"});
                $(this).parent().next().css({display: "block"});
            }else {
                $("button.login").prop("disabled", false);
                $(this).parent().css({borderColor: "rgba(0, 0, 0, 0.18)"});
                $(this).parent().next().css({display: "none"});
            }
            break;
        case "password":
            if(!pwd.test(v) && v != "") {
                $("button.login").prop("disabled", true);
                $(this).parent().css({borderColor: "red"});
                $(this).parent().next().css({display: "block"});
            }else {
                $("button.login").prop("disabled", false);
                $(this).parent().css({borderColor: "rgba(0, 0, 0, 0.18)"});
                $(this).parent().next().css({display: "none"});
            }
            break;
    }

}
/**
 * 验证输入格式
 */
// $(".content").find("input").on("blur", inputBlur);

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