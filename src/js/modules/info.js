/**
 * Created by fdr08 on 2016/7/15.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/info.less";
import "comJs";

var preview = {
    els: {
        at: $(".addTool"),
        sp: $(".smallPic>div"),
        bp: $(".preview"),
        cart: $("#cart"),
        acb: $("#addCartBtn"),
        option: $(".options")
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
        hover: function () {
            preview.els.bp.children("img").attr("src", $(this).attr("src"));
            console.log($(this).attr("src"));
        },
        addToCart: function () {
            var v = $(this).prev().children("input").val(),
                span = preview.els.cart.find("span.num");
            var total = Number(span.html()) + Number(v);
            span.html(total);
        },
        optionClick: function () {
            $(this).addClass("active").siblings(".option").removeClass("active")
        }
    }
};
/**
 * 修改商品数量
 */
preview.els.at.on("click", ">span", preview.event.addGoods);
/**
 * 切换预览图
 */
preview.els.sp.on("mouseover", ">img", preview.event.hover);
/**
 * 添加到购物车
 */
preview.els.acb.on("click", preview.event.addToCart);

preview.els.option.on("click", ">.option", preview.event.optionClick);
