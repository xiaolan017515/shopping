/**
 * Created by fdr08 on 2016/7/13.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/login.less";
import "comJs";

var login = {
        els: {
            form: $(".form"),
            login: $("#login")
        },
        reg: {
            email: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/i,
            pwd: /^[a-zA-Z0-9_]{6,16}$/i
        },
        event: {
            blur: function (e) {
                let v = $(this).val(),
                    type = $(this).attr("type");
                switch (type) {
                    case "email":
                        if (v != "" && login.reg.email.test(v)) {
                            login.els.login.prop("disabled", false).removeClass("notAllowed");
                            $(this).removeClass("error");
                            $(this).next().removeClass("show");
                        } else {
                            login.els.login.prop("disabled", true).addClass("notAllowed");
                            $(this).addClass("error");
                            $(this).next().addClass("show");
                        }
                        break;
                    case "password":
                        if (v != "" && login.reg.pwd.test(v)) {
                            login.els.login.prop("disabled", false).removeClass("notAllowed");
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
                // $.ajax({
                //
                // })
            }
        }
    };
/**
 * 点击登录
 */
login.els.login.click(login.event.click);
/**
 * 失去焦点校验input格式
 */
var isInput = document.createElement('input');
if('oninput' in isInput){
    login.els.form.find("input").on("input", login.event.blur);
}else{
    login.els.form.find("input").on("propertychange", login.event.focus);
}
