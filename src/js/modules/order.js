/**
 * Created by fdr08 on 2016/7/15.
 */
import "../../style/css/awesome.less";
import "../../style/css/base.less";
import "../../style/css/com.less";
import "../../style/css/order.less";
import "../common/com";

var cart = {
    els: {
        at: $(".addTool"),
        atinput: $(".addTool>input"),
        ca: $(".checkAll"),
        cb: $(".checkbox"),
        it: $(".item"),
        op: $(".operate")

    },
    event: {
        addGoods: function () {
            var t = $(this).hasClass("reduce"),
                v = $(this).siblings("input").val();
            if (t) {
                if (v == 1) {
                    $(this).siblings("input").val(1);
                } else {
                    $(this).siblings("input").val(--v);
                }
            } else {
                $(this).siblings("input").val(++v);
            }
            cart.event.calcMoney($(this), Number(v));
            cart.event.calcAllMoney();
        },
        inputGoodNum: function () {
            var v = $(this).val();
            cart.event.calcMoney($(this), v);
            cart.event.calcAllMoney();
        },
        checkAll: function () {
            var checked = $(this).prop("checked");
            if (checked) {
                $(".checkbox").children("input").prop("checked", true);
            } else {
                $(".checkbox").children("input").prop("checked", false);
            }
        },
        /**
         * 计算商品价格
         * @param t 事件触发源
         * @param v input的value值
         */
        calcMoney: function (t, v) {
            var price = Number(t.parent().parent().prev().text());
            t.parent().parent().next().text(parseFloat(price * v).toFixed(2));
        },
        calcAllMoney: function () {
            var goods = $("#lists>.item").find("input[type=checkbox]"),
                sum = 0;
            $.each(goods, function (i, d) {
                if ($(d).prop("checked")) {
                    sum += Number($(d).parent().siblings(".money").text());
                }
            });
            $("#sumMoney>strong").html(sum.toFixed(2));
        },
        deleteGoods: function () {
            $(this).parent().parent().remove();
            cart.event.isCheckedAll();
            cart.event.calcAllMoney();
        },
        isCheckedAll: function () {
            var goods = $("#lists>.item").find("input[type=checkbox]"),
                temp = [];
            $.each(goods, function (i, d) {
                if ($(d).prop("checked")) {
                    temp.push(goods[i]);
                }
            });
            if (temp.length == goods.length) {
                $(".checkAll>input").prop("checked", true);
            } else {
                $(".checkAll>input").prop("checked", false);
            }
        }
    }
};
/**
 * 修改商品数量
 */
cart.els.at.on("click", ">span", cart.event.addGoods);
/**
 * 输入商品数量自动更新小计
 */
cart.els.atinput.on("input", cart.event.inputGoodNum);
/**
 * 商品全选
 */
cart.els.ca.on("click", "input", cart.event.checkAll);
/**
 * 复选框切换计算总价
 */
cart.els.cb.on("click", "input", cart.event.calcAllMoney);
/**
 * 复选框点击判断是否全选
 */
cart.els.it.on("click", "input", cart.event.isCheckedAll);
/**
 * 删除购物车商品
 */
cart.els.op.on("click", "button", cart.event.deleteGoods);