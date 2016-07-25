/**
 * Created by fdr08 on 2016/7/15.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/info.less";
import {core} from "comJs";
import "msg";

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
        cartNum: $(".cart .num"),
        md: $('span.moreData')
    },
    event: {
        addGoods: function () {
            var oper = '';
            var cart_id = $(this).parents(".item").attr("id");
            var t = $(this).hasClass("reduce"),
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
            if (!core.debug) {
                $.ajax({
                    type: 'get',
                    url: '/Home/Cart/ajaxUpdateCart',
                    dataType: 'json',
                    data: {'oper': oper, 'cart_id': cart_id},
                    success: function (data) {

                    },
                    fail: function (e) {
                        $("body").shortMessage(false, true, "服务器可能开小差了，重新试试呢~", 1500);
                    }
                });
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

            // var price = preview.els.group.find(".price").html();
            // var number = preview.els.at.find("input").val();

            // var li =  '<div class="li clr-float"><div class="img"><img src="{0}" alt=""></div><div class="desc"><a href="{1}">{2}</a></div><div class="tl-price"><p class="money">{3}</p><p>x<span class="number">{4}</span></p><button>删除</button></div></div>'.format("style/images/5.jpg", "info.html", "索尼（SONY）DSC-TX30 时尚便携式三防数码相机 卡片相机 黑色", price, number);
            //
            // preview.els.goods.append(li);
            // preview.event.calcCart();
            var num = $("#num").html(), url = window.location.href,
                cartNum = $("#cartNum").attr('value'),
                goods = $('.getGoodsId').attr('id'),
                t = $(".group").find('span.active'), data = [];
            $.each(t, function (i, d) {
                data[i] = $(d).attr('data');
            });
            if (!core.debug) {
                $.ajax({
                    type: "post",
                    url: "/Home/Cart/ajaxAddCart?goods=" + goods,
                    dataType: "json",
                    data: {'arr': data, 'cartNum': cartNum},
                    success: function (data) {
                        if (data.info == 'ok') {

                        }
                    },
                    fail: function () {
                        $("body").shortMessage(false, true, "添加失败，请重新添加", 1500);
                    }
                });
            }
        },
        optionClick: function () {
            $(this).addClass("active").siblings(".option").removeClass("active")
        },
        calcCart: function () {
            var t = preview.els.goods.find(".li"),
                num = 0,
                money = 0;
            $.each(t, function (i, d) {
                var o = $(d).find(".tl-price");
                var _num = Number(o.find(".number").html());
                num += _num;
                money += Number(o.children(".money").html()) * _num;
            });

            preview.els.cartNum.html(num);
            preview.els.sumCart.find(".num").html(num);
            preview.els.sumCart.find(".money").html(money.toFixed(2));
        },
        getPriceNum: function () {
            var t = $(".group").find('span.active'), data = [],
                goods = $('.getGoodsId').attr('id');
            $.each(t, function (i, d) {
                data[i] = $(d).attr('data');
            });
            if(!core.debug) {
                $.ajax({
                    type: "post",
                    url: "/Home/Index/ajaxNum?goods=" + goods,
                    dataType: "json",
                    data: {'arr': data},
                    success: function success(data) {
                        var html = '';
                        if (data && data.length > 0) {
                            var i = 0;
                            for (data; i < data.length; i++) {
                                html += data[i].goods_number;
                            }
                        }
                        $("#num").html(html);
                    }
                });
            }
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

//获取库存量及配置的价格
preview.event.getPriceNum();
preview.els.option.on("click", "span.moreData", preview.event.getPriceNum);

