/**
 * Created by fdr08 on 2016/7/3.
 */
import "../../style/css/awesome.less";
import "../../style/css/base.less";
import "../../style/css/com.less";

var common = {
    els: {
        body: $("body"),
        top: null,
        num: $(".tl-price .number"),
        price: $(".tl-price .money"),
        goods: $("#goods"),
        sumCart: $(".sumCart"),
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
        calcCart: function () {
            var t = common.els.goods.find(".li"),
                num = 0,
                money = 0;
            $.each(t, function (i ,d) {
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
            
            $(this).parent().parent().remove();
            common.event.checkCart();
        },
        checkCart: function () {
            var li = common.els.goods.children(".li");
            if(li.length === 0) {
                common.els.cartEmpty.addClass("show");
                common.els.sumCart.addClass("hidden");
            }else {
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

