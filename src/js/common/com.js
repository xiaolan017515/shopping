/**
 * Created by fdr08 on 2016/7/3.
 */
import "../../style/css/awesome.less";
import "../../style/css/base.less";
import "../../style/css/com.less";
var count = 0;
var core = {
    debug: false,
    reg: {
        "color": /^(#[a-fA-F0-9]{3})|(#[a-fA-F0-9]{6})$/ig,
        "number": /^\-?\d+(\.\d+)?$/ig,
        "positiveNumber": /^\d+(\.\d+)?$/ig,
        "int": /^\-?\d+$/ig,
        "positiveInteger": /^\d+$/ig,
        "ip": /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/ig,
        "host": /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+.?$/ig,
        "url": new RegExp('^((https|http|ftp|rtsp|mms)?://)'
            + '(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
            + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
            + '|' // 允许IP和DOMAIN（域名）
            + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
            + '[a-z]{2,6})' // first level domain- .com or .museum
            + '(:[0-9]{1,4})?' // 端口- :80
            + '((/?)|' // a slash isn't required if there is no file name
            + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$', "ig"),
        "account": /^[a-zA-Z_]\w{2,14}[a-zA-Z0-9_]$/i,
        "email": /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/i,
        "tel": /(^\d{11}$)|(^((\+?86)|(\(\+86\)))?(\d{3,4})?(\-|\s)?\d{7,8}((\-|\s)\d{3,4})?$)/i,
        "pwd": /^[a-zA-Z0-9_]{6,16}$/i,
        "pxsize": /^\d+px$/i
    },
    dealData: {
        /**
         * 清除数据
         * @param obj 对象源，jquery对象
         * @returns {data}
         */
        "clear": function (obj) {
            $.each(obj, function (i, dom) {
                $(dom).find("[name]").each(function (i, d) {
                    var nodeName = d.nodeName, type = d.getAttribute("type"), element = $(d);
                    if (nodeName === "INPUT" && (type === "radio" || type === "checkbox")) {
                        d.checked = false;
                    } else if (nodeName === "DIV") {
                        var control = d.dataset.control;
                        if (control) {
                            eval("element." + control + "('setValue', null)");
                        }
                    } else
                        element.setValue("");
                });
            });
            return this;
        },
        /**
         * 设置元素值
         * @param obj 对象源，jquery对象
         * @param value 值
         */
        "setValue": function (obj, value) {
            $.each(obj, function (i, dom) {
                var val = $.isPlainObject(value) ? $.extend(true, {}, value) : value, target = $(dom);
                if (target.is("input,button,textarea")) {
                    if (target.is("input:radio")) {
                        target.prop("checked", target.val() === val);
                    } else if (target.is("input:checkbox")) {
                        if ($.type(val) !== "array") val = [val];
                        target.prop("checked", val.indexOf(target.val()) >= 0);
                    } else {
                        target.val(val);
                    }
                } else {
                    target.html(val);
                }
            });
            return this;
        },
        /**
         * 进行赋值
         * @param obj 对象源，jquery对象
         * @param data 数据
         * @param clear 是否清除旧数据
         * @returns {*}
         */
        "parse": function (obj, data, clear) {
            // if (clear !== false)
            //     this.clearData(false);
            $.each(obj, function (i, dom) {
                var el = $(dom);
                if ($.isPlainObject(data)) {
                    try {
                        $.each(data, function (key, value) {
                            // if ($.isPlainObject(value)) {
                            //     el.parseData(value, false, (path || "") + key + ".", true);
                            //     core.dealData.parse();
                            // } else {
                            core.dealData.setValue(el.find("[name='{0}']".format(key)), value);
                            // }
                        });
                    } catch (e) {
                        core.logger(e.message);
                    }
                }
            });
            return this;
        },
        /**
         * 序列化数据，如果区域中不包含文件上传功能或未指定必须为FormData格式，则序列化为JSON，否则为FormData对象
         * @param obj 对象源，jquery对象
         * @returns {{hasError: boolean, result: {}}}
         */
        "serialize": function (obj) {
            var rst = {
                hasError: false,
                result: {}
            };
            var t = obj.find("[name]");
            try {
                $.each(t, function (i, d) {
                    var name = $(d).attr("name"), type = $(d).attr("type"), nodeName = d.nodeName;
                    if(nodeName === "INPUT" || nodeName === "BUTTON" || nodeName === "TEXTAREA") {
                        rst.result[name] = $(d).val();
                    }else if(nodeName === "DIV") {
                        rst.result[name] = $(d).html();
                    }
                });
            }catch (e) {
                rst.hasError = true;
                rst.result = e.message;
            }

            return rst;
        }
    },
    logger: function (txt) {
        console.log(++count + "." + txt);
    }
};

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
        cartNum: $(".cart .num"),
        login: $("#login"),
        searchBtn: $("#searchBtn"),
        keywords: $("#keywords")
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
            if(!core.debug) {
                $.ajax({
                    type: "get",
                    url: "/Home/Cart/ajaxGetCart",
                    dataType: "json",
                    success: function success(data) {
                        var html = '', num = 0;
                        if (data && data.length > 0) {
                            var i = 0;
                            for (data; i < data.length; i++) {
                                html += '<div class="li clr-float"><div class="img"><img src="/Public/Uploads/{1}" alt=""></div><div class="desc"><a href="info.html">{2}{4}</a></div><div class="tl-price"><p class="money">{3}</p><p>x<span class="number">{5}</span></p><button id="delCart">删除<button><input type="hidden" value="{0}"/> <input type="hidden" value="{6}"/> <input type="hidden" value="{7}"/> </div> </div>'.format(data[i].goods_id, data[i].sm_logo, data[i].goods_name, data[i].price, data[i].goods_attr_str, data[i].goods_number, data[i].goods_attr_id, data[i].member_id);
                                num += Number(data[i].goods_number);
                            }
                        }
                        common.els.cartNum.html(num);
                        $("#goods").html(html);
                    },
                    fail: function fail(e) {
                        console.log(e);
                    }
                });
            }
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

            var t = $(this).siblings("input");
            var v = [];
            $.each(t, function (i, d) {
                v[i] = $(d).attr('value');
            });
            if(!core.debug) {
                $.ajax({
                    type: "get",
                    url: "/Home/Cart/ajaxDelCart",
                    dataType: "json",
                    data: {'arr': v},
                    success: function success(data) {
                        $(this).parent().parent().remove();
                        common.event.checkCart();
                    },
                    fail: function fail(e) {
                        console.log(e);
                    }
                });
            }
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
        },
        isLogin: function () {
            if(!core.debug) {
                $.ajax({
                    type: "GET",
                    url: "/Home/Member/ajaxChkLogin",
                    dataType: "json",
                    success: function (data) {

                        if (data.ok == 'success') {
                            var html = "<button class='ico ico-user'>" + data.username + "</button><a href='/Home/Member/logout'>[退出]</a>";
                            $("#logInfo").html(html);
                        }
                    }
                });
            }

        },
        login: function () {
            if(!core.debug) {
                var url = window.location.pathname;
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "/Home/Member/saveUrl",
                    data: {'url': url},
                    success: function (data) {
                        location.href = '/Home/Member/login?u=' + data;
                    }
                });
            }
        },
        searchKey: function () {
            if(!core.debug) {
                var keywords = common.els.keywords.val();
                location.href = "/Home/search/Search?keywords=" + keywords;
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
common.els.cart.hover(common.event.cartHover, function () {
});
/**
 * 判断是否登录
 */
common.event.isLogin();
/**
 * 点击登录时，把当前地址存到SESSIO
 */
common.els.login.on("click", common.event.login);

/**
 * 关键字搜索
 */

common.els.searchBtn.on("click", common.event.searchKey);

export {core};
