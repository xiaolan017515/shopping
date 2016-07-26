/**
 * Created by fdr08 on 2016/7/19.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/userinfo.less";
import {core} from "comJs";
import "msg";
import "../lib/drfu.drag";
import "../components/popup";

var orderMange = {
    els: {
        items: $("#items"),
        time: $("#time"),
        order: $(".orderInfo")
    },
    event: {
        chooseTime: function () {
            $(this).children("span").toggleClass("ico-angle-up");
        },
        isCancelOrder: function () {
            var t = orderMange.els.items.children(".item"),
                ico = '<span class="ico ico-times-circle-o"></span>';
            $.each(t, function (i, d) {
                if ($(d).hasClass("cancel")) {
                    $(d).append(ico);
                }
            })
        }
    }
};

var accountMange = {
    els: {
        at: $("#accountTab"),
        account: $(".account"),
        update: $(".update"),
        check: $(".check"),
        code: $("#code"),
        up: $(".updatePwd"),
        gc: $("#getCode"),
        cc: $("#checkCode"),
        sp: $("#savePwd"),
        np: $("#newPwd"),
        newAddr: $("#newAddress"),
        addrBox: $(".newAddress"),
        detailAddr: $("#detailAddr"),
        delAddr: $(".delAddr"),
        input: $(".newAddress input"),
        mask: $(".mask"),
        tel: $("#tel"),
        email: $("#email"),
        username: $("#username"),
        submit: $("#submit"),
        close: $(".ico-close"),
        msgBox: null
    },
    event: {
        update: function () {
            $(this).prev().children("input").addClass("update").prop("readonly", false);
        },
        getCode: function () {
            var v = $(this).prev().val();
            if (!core.debug) {
                $.ajax({

                })
            }
        },
        checkCode: function () {
            var v = accountMange.els.code.val();
            if (!core.debug) {
                $.ajax({

                })
            }
            //验证通过
            accountMange.els.check.addClass("hidden");
            accountMange.els.up.addClass("show");
        },
        savePwd: function () {
            var v = accountMange.els.np.val();
            if (!core.debug) {
                $.ajax({})
            }
        },
        newAddr: function () {
            accountMange.els.addrBox.addClass("show");
            accountMange.els.mask.addClass("show");
        },
        delAddr: function () {
            var _this = $(this);
            $("body").message({
                title: "删除",
                content: "删除该收货地址后将无法恢复",
                button: {
                    submit: "依然删除",
                    cancel: "取消"
                }
            }, "warn", true, false, function () {
                // if (!core.debug) {
                    _this.parent().remove();
                    accountMange.els.msgBox.remove();
                    // $.ajax({
                    //
                    // });
                // }
            }, function () {
                accountMange.els.msgBox.remove();
            }, {
                width: "400px"
            });
            accountMange.els.msgBox = $(".con-msg, .con-mark");
            $(".con-msg").drag();
        },
        submit: function () {
            if (accountMange.event.username && accountMange.event.tel && accountMange.event.email) {
                var _data = {};
                _data.shr_name = accountMange.els.username.val();
                _data.shr_tel = accountMange.els.tel.val();
                _data.shr_province = $("#province option:selected").html();
                _data.shr_city = $("#city option:selected").html();
                _data.shr_area = $("#area option:selected").html();
                _data.shr_address = accountMange.els.detailAddr.val();
                _data.shr_email = accountMange.els.email.val();
                if (!core.debug) {
                    $.ajax({
                        type: 'get',
                        url: '/Home/Order/ajaxAddress',
                        dataType: 'json',
                        data: _data,
                        success: function (data) {
                            if (data.info == 'ok') {
                                $("body").shortMessage(true, false, '收货人信息保存成功，请选择收货人，提交订单！', 1000);
                                accountMange.els.addrBox.removeClass("show");
                                accountMange.els.mask.removeClass("show");
                            }
                        },
                        fail: function (e) {
                            $("body").shortMessage(false, false, e, 1000);
                        }
                    });
                }
            }
        },
        close: function () {
            accountMange.els.addrBox.removeClass("show");
            accountMange.els.mask.removeClass("show");
        },
        username: function () {
            var str = accountMange.els.username.val();
            if (str.trim() == "") {
                accountMange.els.tel.addClass("error");
                $(this).next().addClass("show");
            } else {
                return true;
            }
        },
        tel: function () {
            var reg = /(^\d{11}$)|(^((\+?86)|(\(\+86\)))?(\d{3,4})?(\-|\s)?\d{7,8}((\-|\s)\d{3,4})?$)/ig;
            var str = accountMange.els.tel.val();
            var result = reg.test(str);
            if (!result) {
                accountMange.els.tel.addClass("error");
                $(this).next().addClass("show");
            } else {
                return true;
            }
        },
        email: function () {
            var reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/ig;
            var str = accountMange.els.email.val();
            var result = reg.test(str);
            if (!result) {
                accountMange.els.email.addClass("error");
                $(this).next().addClass("show");
            } else {
                return true;
            }
        },
        focus: function () {
            $(this).removeClass("error");
            $(this).next().removeClass("show");
        }
    }
};

var com = {
    els: {
        tab: $("#tab"),
        dd: $(".dd")
    },
    event: {
        tabClick: function () {
            com.els.dd.removeClass("active");
            $(this).addClass('active');
            com.event.changeBanner($(this));
        },
        changeBanner: function (_this) {
            var isOrder = _this.parent().hasClass("orderTab");
            var _id = false;
            if (isOrder) {
                orderMange.els.order.addClass("active").next().removeClass("active");
                _id = _this.attr("id");
                if (_id === "all" || _id === "done" || _id === "cancel") {
                    $("button.done").addClass("active").siblings().removeClass("active");
                } else {
                    $("." + _id).addClass("active").siblings().removeClass("active");
                }
            } else {
                accountMange.els.account.addClass("active").prev().removeClass("active");
                _id = _this.attr("id");
                $("." + _id).addClass("active").siblings().removeClass("active");
            }
        }
    }
};
/**
 * 订单时间选择
 */
orderMange.els.time.on("click", orderMange.event.chooseTime);
/**
 * 切换面板
 */
com.els.tab.on("click", ".dd", com.event.tabClick);
/**
 * 是否为取消订单
 */
orderMange.event.isCancelOrder();
/**
 * 更新信息
 */
accountMange.els.update.on("click", accountMange.event.update);
/**
 * 检查验证码
 */
accountMange.els.gc.on("click", accountMange.event.getCode);
accountMange.els.cc.on("click", accountMange.event.checkCode);
accountMange.els.sp.on("click", accountMange.event.savePwd);
/**
 * 新增收货地址
 */
accountMange.els.newAddr.click(accountMange.event.newAddr);
accountMange.els.delAddr.click(accountMange.event.delAddr);

accountMange.els.username.blur(accountMange.event.username);
accountMange.els.tel.blur(accountMange.event.tel);
// accountMange.els.email.blur(accountMange.event.email);
accountMange.els.input.focus(accountMange.event.focus);

accountMange.els.submit.click(accountMange.event.submit);
accountMange.els.close.click(accountMange.event.close);
