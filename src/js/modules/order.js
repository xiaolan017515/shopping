/**
 * Created by fdr08 on 2016/7/18.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/order.less";
import "comJs";
import "msg";

import "../lib/distpicker.data"
import "../lib/distpicker"

var verify = {
    els: {
        box: $(".newAddress"),
        tel: $("#tel"),
        email: $("#email"),
        username: $("#username"),
        submit: $("#submit"),
        input: $("input"),
        newAddr: $("#newAddress"),
        detailAddr: $("#detailAddr"),
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
            if (str.trim() == "") {
                verify.els.tel.addClass("error");
                $(this).next().addClass("show");
            } else {
                return true;
            }
        },
        tel: function () {
            var reg = /(^\d{11}$)|(^((\+?86)|(\(\+86\)))?(\d{3,4})?(\-|\s)?\d{7,8}((\-|\s)\d{3,4})?$)/ig;
            var str = verify.els.tel.val();
            var result = reg.test(str);
            if (!result) {
                verify.els.tel.addClass("error");
                $(this).next().addClass("show");
            } else {
                return true;
            }
        },
        email: function () {
            var reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/ig;
            var str = verify.els.email.val();
            var result = reg.test(str);
            if (!result) {
                verify.els.email.addClass("error");
                $(this).next().addClass("show");
            } else {
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
            if (verify.event.username && verify.event.tel && verify.event.email) {
                var shr_name = verify.els.username.val();
                var shr_tel = verify.els.tel.val();
                var shr_province = $("#province option:selected").html();
                var shr_city = $("#city option:selected").html();
                var shr_area = $("#area option:selected").html();
                var shr_address = verify.els.detailAddr.val();
                var shr_email = verify.els.email.val();
                $.ajax({
                    type:'get',
                    url:'/Home/Order/ajaxAddress',
                    dataType:'json',
                    data:{'shr_name':shr_name,'shr_tel':shr_tel,'shr_province':shr_province,'shr_city':shr_city,'shr_area':shr_area,'shr_address':shr_address,'shr_email':shr_email},
                    success:function(data){
                        if(data.info=='ok'){
                            $("body").shortMessage(true, false, '收货人信息保存成功，请选择收货人，提交订单！', 1000);
                            verify.els.box.removeClass("show");
                            verify.els.mask.removeClass("show");
                        }
                    },
                    fail: function (e) {
                        $("body").shortMessage(false, false, e, 1000);
                    }
                });

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


/**
 * 区域选择
 * @type {{els: {province: (*|jQuery|HTMLElement), city: (*|jQuery|HTMLElement)}, event: {proClick: address.event.proClick, cityClick: address.event.cityClick, getArea: address.event.getArea}}}
 */
var address = {
    els: {
        province: $("#province"),
        city: $("#city")
    },
    event: {
        proClick: function () {
            var par = $("#province option:selected").val();
            var area =$("#city");
            address.event.getArea(par,area);
        },
        cityClick: function () {
            var par = $("#city option:selected").val();
            var area =$("#area");
            address.event.getArea(par,area);
        },
        getArea: function (par,area) {
            $.ajax({
                type: "get",
                url: "/Home/Cart/ajaxCity",
                dataType: "json",
                data: {'par': par},
                success: function success(data) {
                    var html='';
                    if(data && data.length > 0){
                        var i = 0;
                        for (data; i < data.length; i++) {
                            html += "<option value='"+data[i].base_id+"'>"+data[i].name+"</option>";
                        }
                    }
                    area.html(html);
                }
            });
        }
    }
};

address.els.province.on("click", address.event.proClick);
address.els.city.on("click", address.event.cityClick);


// var address = {
//     els: {
//         submit: $("#submit"),
//         ca: $('#chooseArea')
//     },
//     event: {
//         save: function () {
//
//             var t = address.els.ca.children("select").find("option:checked"), addr = [];
//             $.each(t, function (i, d) {
//                 addr[i] = $(d).val();
//             });
//             console.log(addr.join(""));
//         }
//     }
// };
// address.els.submit.on("click",address.event.save);




