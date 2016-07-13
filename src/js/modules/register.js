/**
 * Created by fdr08 on 2016/7/1.
 */
import "../../style/css/icomoon.less";
import "../../style/css/base.less";
import "../../style/css/com.less";
import "../common/com";
import "../../style/css/register.less";

let name = /[a-zA-Z\u4e00-\u9fa5]{3,8}/ig,
    email = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/ig,
    pwd = /^[a-zA-Z0-9_]{6,16}$/ig;

function inputBlur() {
    let v = $(this).val(),
        type = $(this).attr("type");
    switch (type) {
        case "text":
            if(!name.test(v) && v != "") {
                $(".form>.submit").prop("disabled", true);
                $(this).css({borderColor: "red"});
                $(this).next().css({display: "block"});
            }else {
                $(".form>.submit").prop("disabled", false);
                $(this).css({borderColor: "rgba(0, 0, 0, 0.18)"});
                $(this).next().css({display: "none"});
            }
            break;
        case "email":
            if(!email.test(v) && v != "") {
                $(".form>.submit").prop("disabled", true);
                $(this).css({borderColor: "red"});
                $(this).next().css({display: "block"});
            }else {
                $(".form>.submit").prop("disabled", false);
                $(this).css({borderColor: "rgba(0, 0, 0, 0.18)"});
                $(this).next().css({display: "none"});
            }
            break;
        case "password":
            if(!pwd.test(v) && v != "") {
                $(".form>.submit").prop("disabled", true);
                $(this).css({borderColor: "red"});
                $(this).next().css({display: "block"});
            }else {
                $(".form>.submit").prop("disabled", false);
                $(this).css({borderColor: "rgba(0, 0, 0, 0.18)"});
                $(this).next().css({display: "none"});
            }
            break;
    }

}

$(".form").find("input").on("blur", inputBlur);
// $("#login").click(loginClick);
// $("#closeLogin").click(closeloginClick);