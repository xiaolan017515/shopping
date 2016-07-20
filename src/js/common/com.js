/**
 * Created by fdr08 on 2016/7/3.
 */
import "../../style/css/awesome.less";
import "../../style/css/base.less";
import "../../style/css/com.less";

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

var common = {
    els: {
        body: $("body"),
        top: null,
        num: $(".tl-price .number"),
        price: $(".tl-price .money"),
        goods: $("#goods"),
        sumCart: $(".sumCart"),
        cart: $("#cart"),
        cartEmpty: $(".cartEmpty"),
        cartNum: $(".cart .num")
    },
    event: {
        gotoTop: function (min_height) {
            var gotoTop_html = '<div id="gotoTop" class="ico ico-angle-double-up"></div>';
            common.els.body.append(gotoTop_html);
            common.els.top = $("#gotoTop");
            common.els.top.click(function () {
                $('html,body').animate({scrollTop: 0}, 700);
            });
            min_height = min_height ? min_height : 800;
            $(window).on("scroll", function () {
                var s = $(document).scrollTop();
                if (s > min_height) {
                    common.els.top.fadeIn(100);
                } else {
                    common.els.top.fadeOut(200);
                }
            });
        },
        cartHover: function () {
            $.ajax({
                type: "get",
                url: "/Home/Cart/ajaxGetCart",
                dataType: "json",
                success: function success(data) {
                    var html = '';
                    if (data && data.length > 0) {
                        var i = 0;
                        for (data; i < data.length; i++) {
                            html += '<div class="li clr-float"><div class="img"><img src="/Public/Uploads/{1}" alt=""></div><div class="desc"><a href="info.html">{2}{4}</a></div><div class="tl-price"><p class="money">{3}</p><p>x<span class="number">{5}</span></p><button id="delCart">删除<button><input type="hidden" value="{0}"/> <input type="hidden" value="{6}"/> <input type="hidden" value="{7}"/> </div> </div>'.format(data[i].goods_id, data[i].sm_logo, data[i].goods_name, data[i].price, data[i].goods_attr_str, data[i].goods_number, data[i].goods_attr_id, data[i].member_id);
                        }
                    } else {
                        html = "<span class='ico ico-sad2'></span>没有找到符合你要求的信息";
                    }
                    $("#goods").html(html);
                },
                fail:function fail(e){
                    console.log(e);
                }
            });
            common.event.calcCart();
        },
        calcCart: function () {
            var t = common.els.goods.find(".li"),
                num = 0,
                money = 0;
            $.each(t, function (i, d) {
                var o = $(d).find(".tl-price");
                var _num = Number(o.find(".number").html());
                num += _num;
                money += Number(o.children(".money").html()) * _num;
            });

            common.els.cartNum.html(num);
            common.els.sumCart.find(".num").html(num);
            common.els.sumCart.find(".money").html(money);
        },
        remove: function () {
            var n = Number(common.els.sumCart.find(".num").html());
            var m = Number(common.els.sumCart.find(".money").html());
            var _m = Number($(this).siblings(".money").html());
            var _n = Number($(this).prev().find(".number").html());

            common.els.sumCart.find(".num").html(n - _n);
            common.els.sumCart.find(".money").html(m - (_m * _n));

            var totalNum = Number(common.els.cartNum.html());
            common.els.cartNum.html(totalNum - _n);

            var t = $(this).siblings("input");var v = [];
            $.each(t, function (i, d) {
                v[i] = $(d).attr('value');
            });
            $.ajax({
                type: "get",
                url: "/Home/Cart/ajaxDelCart",
                dataType: "json",
                data: {'arr': v},
                success: function success(data) {
                },
                fail:function fail(e){
                    console.log(e);
                }
            });

            $(this).parent().parent().remove();
            common.event.checkCart();
        },
        checkCart: function () {
            var li = common.els.goods.children(".li");
            if (li.length === 0) {
                common.els.cartEmpty.addClass("show");
                common.els.sumCart.addClass("hidden");
            } else {
                common.els.cartEmpty.removeClass("show");
                common.els.sumCart.removeClass("hidden");
            }
        }
    }
};
/**
 * 返回顶部
 */
common.event.gotoTop();
/**
 * 检查购物车
 */
common.event.checkCart();
/**
 * 结算购物车数量/总计
 */
common.event.calcCart();
/**
 * 删除购物车，刷新购物车数量/总计
 */
common.els.goods.on("click", ">.li button", common.event.remove);
/**
 * 购物车hover请求数据
 */
common.els.cart.hover(common.event.cartHover);

