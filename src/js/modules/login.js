/**
 * Created by fdr08 on 2016/7/13.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/login.less";
import {core} from "comJs";
import "msg";

var login = {
    els: {
        main: $(".main"),
        form: $(".form"),
        login: $("#login"),
        email: $("#email"),
        password: $("#password")
    },
    event: {
        check: function (e) {
            let v = $(this).val(), email = login.els.email.hasClass("error"), pwd = login.els.password.hasClass("error"),
                Vpwd = login.els.password.val(), Vemail = login.els.email.val(), type = $(this).attr("type");
            
            switch (type) {
                case "email":
                    if (v != "" && core.reg.email.test(v)) {
                        if(Vpwd != "" && !pwd) {
                            login.els.login.prop("disabled", false).removeClass("notAllowed"); 
                        }
                        
                        $(this).removeClass("error");
                        $(this).next().removeClass("show");
                    } else {
                        login.els.login.prop("disabled", true).addClass("notAllowed");
                        $(this).addClass("error");
                        $(this).next().addClass("show");
                    }
                    break;
                case "password":
                    if (v != "" && core.reg.pwd.test(v)) {
                        if(Vemail != "" && !email) {
                            login.els.login.prop("disabled", false).removeClass("notAllowed"); 
                        }
                       
                        $(this).removeClass("error");
                        $(this).next().removeClass("show");
                    } else {
                        login.els.login.prop("disabled", true).addClass("notAllowed");
                        $(this).addClass("error");
                        $(this).next().addClass("show");
                    }
                    break;
            }

        },
        focus: function () {
            $(this).removeClass("error");
            $(this).next().removeClass("show");
        },
        click: function () {
            // var email = login.els.email.val(), password = login.els.password.val(),
            // var url_search = window.location.search;
            var _data = core.dealData.serialize(login.els.form).result;
            if(_data.email && _data.password) {
                if(!core.debug) {
                    _data.url_search = window.location.search;
                    $.ajax({
                        type: "POST",
                        url: "/Home/Member/ajaxGetLogin",
                        dataType: "json",
                        data: _data,
                        success: function (data) {
                            if (data.ok == 'success') {
                                if (data.info == '/') {
                                    window.document.location.href = "http://www.myshop.com";
                                } else {
                                    window.document.location.href = "http://www.myshop.com" + data.info;
                                }
                            } else if (data.ok == 'error') {
                                login.els.main.shortMessage(false, true, data.info, 1500);
                            }
                        }
                    })
                }
                
            }else {
                login.els.main.shortMessage(false, true, "请输入完整的账号密码", 1500);
            }
        }
    }
};
/**
 * 点击登录
 */
login.els.login.click(login.event.click);
/**
 * Enter登录
 */
$(document).keydown(function(event){
    var keyCode = window.event ? event.keyCode : event.which;
    if (keyCode == 13) {
        login.event.click();
    }
});
/**
 * 失去焦点校验input格式
 */
var isInput = document.createElement('input');
if ('oninput' in isInput) {
    login.els.form.find("input").on("input", login.event.check);
} else {
    login.els.form.find("input").on("propertychange", login.event.check);
}
