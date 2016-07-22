/**
 * Created by fdr08 on 2016/7/15.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/cart.less";
import "comJs";
import "msg";
import "../lib/drfu.drag";

var cart = {
    els: {
        at: $(".addTool"),
        atinput: $(".addTool>input"),
        ca: $(".checkAll"),
        cb: $(".checkbox"),
        it: $(".item"),
        op: $(".operate"),
        pay: $("#gotoPay")
    },
    event: {
        addGoods: function () {
            var oper='', cart_id = $(this).parents(".item").attr("id"),
                t = $(this).hasClass("reduce"),
                v = $(this).siblings("input").val();
            if (t) {
                if (v == 1) {
                    $(this).siblings("input").val(1);
                } else {
                    $(this).siblings("input").val(--v);
                    oper = 'reduce';
                }
            } else {
                $(this).siblings("input").val(++v);
                oper = 'add';
            }
            $.ajax({
                type:'get',
                url:'/Home/Cart/ajaxUpdateCart',
                dataType:'json',
                data:{'oper':oper,'cart_id':cart_id},
                success:function success(data){
                    cart.event.calcMoney($(this), Number(v));
                    cart.event.calcAllMoney();
                },
                fail:function fail(e){
                    $("body").shortMessage(true, false, e, 2000);
                }
            });

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
         * 点击计算商品价格
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
        isDelete: function () {
            /**
             * 点击删除
             */
            var _this = $(this);
            $("body").message({
                title: "删除",
                content: "<span class='ico ico-warning'></span>您可以直接删除该商品或者删除并添加到收藏夹",
                button: {
                    submit: "直接删除",
                    cancel: "添加到收藏夹"
                }
            }, "warn", function () {
                var cart_id = $(this).parent().parent().attr('id');
                $.ajax({
                    type: "get",
                    url: "/Home/Cart/ajaxDelCart",
                    dataType: "json",
                    data: {'cart_id': cart_id},
                    success: function success(data) {
                        if(data.info=='ok'){
                            _this.parent().parent().remove();
                            cart.event.isCheckedAll();
                            cart.event.calcAllMoney();
                            $(".con-msg, .con-mark").remove();
                        }
                    },
                    fail:function fail(e){
                        $("body").shortMessage(false, true, e, 2000);
                    }
                });

            }, function () {
                /**
                 * 添加到收藏
                 */
                // $.ajax({
                //     url: "",
                //     data: "",
                //     type: "",
                //     success: function (data) {
                //
                //
                //
                _this.parent().parent().remove();
                cart.event.isCheckedAll();
                cart.event.calcAllMoney();
                $(".con-msg, .con-mark").remove();
                //     },
                //     fail: function (e) {
                //         $("body").shortMessage(false, true, e, 1000);
                //     }
                // })
            }, true, {
                width: "400px"
            });
            
            $(".con-msg").drag(true);
            
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
        },
        topay: function () {
            var goods = $("#lists>.item").find("input[type=checkbox]"),
                temp = [];
            $.each(goods, function (i, d) {
                if ($(d).prop("checked")) {
                    temp.push($(goods[i]).parent().parent().attr("id"));

                }
            });
            if (temp.length === 0) {
                alert("请至少选择一件商品！");
            } else {
                $.ajax({
                    type: "get",
                    url: "/Home/Cart/ajaxCartOrder",
                    dataType: "json",
                    data: {'cart_id': temp},
                    success: function success(data) {
                        if(data.info=='ok'){
                            window.location.href = '/Home/Cart/pay';
                        }
                    },
                    fail:function fail(e){
                        console.log(e);
                    }
                });

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
cart.els.op.on("click", "button", cart.event.isDelete);
/**
 * 提交订单
 */
cart.els.pay.on("click", cart.event.topay);
