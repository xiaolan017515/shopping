/**
 * Created by fdr08 on 2016/7/13.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/login.less";
import "comJs";
import "msg";

var login = {
    els: {
        form: $(".form"),
        login: $("#login"),
        email: $("#email"),
        password: $("#password")
    },
    reg: {
        email: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/i,
        pwd: /^[a-zA-Z0-9_]{6,16}$/i
    },
    event: {
        check: function (e) {
            let v = $(this).val(), email = login.els.email.hasClass("error"), pwd = login.els.password.hasClass("error"),
                Vpwd = login.els.password.val(), Vemail = login.els.email.val(), type = $(this).attr("type");
            
            switch (type) {
                case "email":
                    if (v != "" && login.reg.email.test(v)) {
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
                    if (v != "" && login.reg.pwd.test(v)) {
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
            var email = login.els.email.val(), password = login.els.password.val(), url_search = window.location.search;
            // $.ajax({
            //     type: "POST",
            //     url: "/Home/Member/ajaxGetLogin",
            //     dataType: "json",
            //     data: {"email": email, "password": password, "url_search": url_search},
            //     success: function (data) {
            //         if (data.ok == 'success') {
            //             if (data.info == '/') {
            //                 window.document.location.href = "http://www.myshop.com";
            //             } else {
            //                 window.document.location.href = "http://www.myshop.com" + data.info;
            //             }
            //         } else if (data.ok == 'error') {
            //             $("body").shortMessage(false, true, data.info, 1000, {
            //                 width: "200px",
            //                 textAlign: "center"
            //             });
            //         }
            //     }
            // })
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
