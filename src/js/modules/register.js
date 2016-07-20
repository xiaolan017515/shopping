/**
 * Created by fdr08 on 2016/7/1.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/register.less";
import "comJs";

var register = {
    els: {
        form: $(".form"),
        submit: $("#submit")
    },
    reg: {
        name: /[a-zA-Z\u4e00-\u9fa5]{4,8}/i,
        email: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/i,
        pwd: /^[a-zA-Z0-9_]{6,16}$/i
},
    event: {
        check: function () {
            let v = $(this).val(),
                type = $(this).attr("type");
            switch (type) {
                case "text":
                    if (v != "" && register.reg.name.test(v)){
                        register.els.submit.prop("disabled", false).removeClass("notAllowed");
                        $(this).removeClass("error");
                        $(this).next().removeClass("show");
                    }else {
                        register.els.submit.prop("disabled", true).addClass("notAllowed");
                        $(this).addClass("error");
                        $(this).next().addClass("show");
                    }
                    break;
                case "email":
                    if (v != "" && register.reg.email.test(v)) {
                        register.els.submit.prop("disabled", false).removeClass("notAllowed");
                        $(this).removeClass("error");
                        $(this).next().removeClass("show");
                    } else {
                        register.els.submit.prop("disabled", true).addClass("notAllowed");
                        $(this).addClass("error");
                        $(this).next().addClass("show");
                    }
                    break;
                case "password":
                    if (v != "" && register.reg.pwd.test(v)) {
                        register.els.submit.prop("disabled", false);
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
            // $.ajax({
            //
            // })
        }
    }
};
/**
 * 失去焦点校验input格式
 */
var isInput = document.createElement('input');
if('oninput' in isInput){
    register.els.form.find("input").on("input", register.event.check);
}else{
    register.els.form.find("input").on("propertychange", register.event.check);
}
/**
 * 登录点击事件
 */
register.els.submit.click(register.event.click);