/**
 * Created by fdr08 on 2016/7/15.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/info.less";
import "comJs";

// String.prototype.format = function (args) {
//     var result = this;
//     if (arguments.length > 0) {
//         if (arguments.length == 1 && typeof (args) == "object") {
//             for (var key in args) {
//                 if (args[key] != undefined) {
//                     var reg = new RegExp("({" + key + "})", "g");
//                     result = result.replace(reg, args[key]);
//                 }
//             }
//         }
//         else {
//             for (var i = 0; i < arguments.length; i++) {
//                 if (arguments[i] != undefined) {
//                     var reg = new RegExp("({)" + i + "(})", "g");
//                     result = result.replace(reg, arguments[i]);
//                 }
//             }
//         }
//     }
//     return result;
// };

var preview = {
    els: {
        at: $(".addTool"),
        sp: $(".smallPic>div"),
        bp: $(".preview"),
        cart: $("#cart"),
        acb: $("#addCartBtn"),
        option: $(".options"),
        group: $(".group"),
        goods: $("#goods"),
        sumCart: $(".sumCart"),
        cartEmpty: $(".cartEmpty"),
        cartNum: $(".cart .num")
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
        },
        hover: function () {
            preview.els.bp.children("img").attr("src", $(this).attr("src"));
        },
        addToCart: function () {
            var v = $(this).prev().children("input").val(),
                span = preview.els.cart.find("span.num");
            var total = Number(span.html()) + Number(v);
            span.html(total);

            var price = preview.els.group.find(".price").html();
            var number = preview.els.at.find("input").val();
            
            var li =  '<div class="li clr-float"><div class="img"><img src="{0}" alt=""></div><div class="desc"><a href="{1}">{2}</a></div><div class="tl-price"><p class="money">{3}</p><p>x<span class="number">{4}</span></p><button>删除</button></div></div>'.format("style/images/5.jpg", "info.html", "索尼（SONY）DSC-TX30 时尚便携式三防数码相机 卡片相机 黑色", price, number);

            preview.els.goods.append(li);
            preview.event.calcCart();
        },
        optionClick: function () {
            $(this).addClass("active").siblings(".option").removeClass("active")
        },
        calcCart: function () {
            var t = preview.els.goods.find(".li"),
                num = 0,
                money = 0;
            $.each(t, function (i ,d) {
                var o = $(d).find(".tl-price");
                var _num = Number(o.find(".number").html());
                num += _num;
                money += Number(o.children(".money").html()) * _num;
            });

            preview.els.cartNum.html(num);
            preview.els.sumCart.find(".num").html(num);
            preview.els.sumCart.find(".money").html(money.toFixed(2));
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
