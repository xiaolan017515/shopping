/**
 * Created by fdr08 on 2016/7/18.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/pay.less";
import "comJs";

var verify = {
    els: {
        box: $(".newAddress"),
        tel: $("#tel"),
        email: $("#email"),
        username:　$("#username"),
        submit: $("#submit"),
        input: $("input"),
        newAddr: $("#newAddress"),
        mask: $(".mask"),
        close: $(".ico-close"),
        user: $(".addr .name"),
        payMethod: $(".method"),
        uAddr: $("#uAddr"),
        uName: $("#uName"),
        uTel: $("#uTel"),
        gl: $(".goodsList"),
        totalMoney: $("#totalMoney")
    },
    event: {
        username: function () {
            var str = verify.els.username.val();
            if(str.trim() == "") {
                verify.els.tel.addClass("error");
                $(this).next().addClass("show");
            }else {
                return true;
            }
        },
        tel: function(){
            var reg =/(^\d{11}$)|(^((\+?86)|(\(\+86\)))?(\d{3,4})?(\-|\s)?\d{7,8}((\-|\s)\d{3,4})?$)/ig;
            var str = verify.els.tel.val();
            var result = reg.test(str);
            if(!result){
                verify.els.tel.addClass("error");
                $(this).next().addClass("show");
            }else {
                return true;
            }
        },
        email: function () {
            var reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/ig;
            var str = verify.els.email.val();
            var result = reg.test(str);
            if(!result){
                verify.els.email.addClass("error");
                $(this).next().addClass("show");
            }else {
                return true;
            }
        },
        focus: function () {
            $(this).removeClass("error");
            $(this).next().removeClass("show");
        },
        newAddr: function () {
            verify.els.box.addClass("show");
            verify.els.mask.addClass("show");
        },
        submit: function () {
            if(verify.event.username && verify.event.tel && verify.event.email) {
                // $.ajax({
                //
                // })

                verify.els.box.removeClass("show");
                verify.els.mask.removeClass("show");
            }
        },
        close: function () {
            verify.els.box.removeClass("show");
            verify.els.mask.removeClass("show");
        },
        payMethod: function () {
            $(this).addClass("selected").siblings().removeClass("selected")
        },
        user: function () {
            verify.els.user.removeClass("selected");
            $(this).addClass("selected");
            var name = $(this).html();
            var addr = $(this).next().html();
            var tel = $(this).next().next().html();
            verify.els.uName.html(name);
            verify.els.uAddr.html(addr);
            verify.els.uTel.html(tel);
        },
        init: function () {
            var o = verify.els.user.first();  
            o.addClass("selected");
            var name = o.html();
            var addr = o.next().html();
            var tel = o.next().next().html();
            verify.els.uName.html(name);
            verify.els.uAddr.html(addr);
            verify.els.uTel.html(tel);
            verify.event.calcCart();
        },
        calcCart: function () {
            var item = verify.els.gl.find(".item"),
                totalMoney = 0;
            $.each(item, function (i, d) {
                var _money = Number($(d).find(".price").html()) * Number($(d).find(".number span").html());
                totalMoney += _money;
                verify.els.totalMoney.html(totalMoney.toFixed(2));
            })
        }
    }
};

verify.els.username.blur(verify.event.username);
verify.els.tel.blur(verify.event.tel);
// verify.els.email.blur(verify.event.email);
verify.els.newAddr.click(verify.event.newAddr);
verify.els.input.focus(verify.event.focus);
verify.els.submit.click(verify.event.submit);
verify.els.close.click(verify.event.close);
verify.els.payMethod.click(verify.event.payMethod);
verify.els.user.click(verify.event.user);
verify.event.init();

