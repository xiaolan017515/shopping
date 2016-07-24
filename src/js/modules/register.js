/**
 * Created by fdr08 on 2016/7/1.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/register.less";
import {core} from "comJs";
import "msg";

var register = {
    els: {
        main: $(".main"),
        form: $(".form"),
        submit: $("#submit"),
        username: $("#username"),
        email: $("#email"),
        password: $("#password")
    },
    event: {
        check: function () {
            let v = $(this).val(),
                username = register.els.username.hasClass("error"), email = register.els.email.hasClass("error"), pwd = register.els.password.hasClass("error"),
                Vusername = register.els.username.val(), Vemail = register.els.email.val(), Vpwd = register.els.password.val(),
                type = $(this).attr("type");
            switch (type) {
                case "text":
                    if (v != "" && core.reg.account.test(v)) {
                        if(!email && Vemail != "" && !pwd && Vpwd) {
                            register.els.submit.prop("disabled", false).removeClass("notAllowed");
                        }
                        $(this).removeClass("error");
                        $(this).next().removeClass("show");
                    } else {
                        register.els.submit.prop("disabled", true).addClass("notAllowed");
                        $(this).addClass("error");
                        $(this).next().addClass("show");
                    }
                    break;
                case "email":
                    if (v != "" && core.reg.email.test(v)) {
                        if(!username && Vusername != "" && !pwd && Vpwd) {
                            register.els.submit.prop("disabled", false).removeClass("notAllowed");
                        }
                        
                        $(this).removeClass("error");
                        $(this).next().removeClass("show");
                    } else {
                        register.els.submit.prop("disabled", true).addClass("notAllowed");
                        $(this).addClass("error");
                        $(this).next().addClass("show");
                    }
                    break;
                case "password":
                    if (v != "" && core.reg.pwd.test(v)) {
                        if(!email && Vemail != "" && !username && Vusername) {
                            register.els.submit.prop("disabled", false).removeClass("notAllowed");
                        }
                        
                        $(this).css({borderColor: "rgba(0, 0, 0, 0.18)"});
                        $(this).next().css({display: "none"});
                    } else {
                        register.els.submit.prop("disabled", true);
                        $(this).css({borderColor: "red"});
                        $(this).next().css({display: "block"});
                    }
                    break;
            }
        },
        focus: function () {
            $(this).removeClass("error");
            $(this).next().removeClass("show");
        },
        click: function () {
            // var username = register.els.username.val(), email = register.els.email.val(), password = register.els.password.val();
            var _data = core.dealData.serialize(register.els.form).result;
            
            if(_data.username && _data.email && _data.password) {
                if(!core.debug) {
                    $.ajax({
                        type: "POST",
                        url: "/Home/Member/ajaxGetRegister",
                        dataType: "json",
                        data: _data,
                        success: function (data) {
                            if (data.ok == 'success') {
                                window.location.href = "www.myshop.com/index.php/Home/Member/registered/email/" + data.info

                            } else if (data.ok == 'error') {
                                register.els.main.shortMessage(false, true, data.info, 1500);
                            }
                        }
                    })
                }
            }else {
                register.els.main.shortMessage(false, true, "请输入完整的注册账号信息", 1500);
            }
        }
    }
};
/**
 * 失去焦点校验input格式
 */
var isInput = document.createElement('input');
if ('oninput' in isInput) {
    register.els.form.find("input").on("input", register.event.check);
} else {
    register.els.form.find("input").on("propertychange", register.event.check);
}
/**
 * 注册点击事件
 */
register.els.submit.click(register.event.click);
/**
 * Enter注册
 */
$(document).keydown(function(event){
    var keyCode = (navigator.appname == "Netscape") ? event.keyCode : event.which;
    if (keyCode == 13) {
        register.event.click();
    }
});
