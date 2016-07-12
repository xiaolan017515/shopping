/**
 * Created by drfu on 2016/1/25.
 */

(function (root, factory) {
    var core = factory(root);
    if (typeof define === 'function' && define.amd) {
        // AMD
        // define([], factory);
        define('core', function () {
            return core;
        });
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = core;
    } else {
        // Browser globals
        root.core = core;
    }
})(this, function () {

    //------------------------------------------------------------------------------------------prototype-----------------------------------------------------------------------------------------

    /*
     * 删除指定元素
     * obj: 要删除的元素，
     * model: 模式，true（默认）表示删除全部；false表示删除第一个
     *
     * 返回值: Array
     */
    // Array.prototype.remove = function (obj, model) {
    //     model = model === false ? false : true;
    //     for (var i = 0; i < this.length; ++i) {
    //         if (this[i] == obj) {
    //             this.splice(i, 1);
    //             if (!model) {
    //                 break;
    //             }
    //         }
    //     }
    //     return this;
    // };

    /**
     * 格式化字符串
     * @param args
     * @returns {String}
     */
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


    /**
     * 获取URL中的参数值
     * @param key 参数名
     * @returns {Array|{index: number, input: string}|*}
     */
    // String.prototype.getParameter = function (key) {
    //     var re = new RegExp(key + '=([^&]*)(?:&)?');
    //     return this.match(re) && this.match(re)[1];
    // };

    /**
     * 转换为货币格式
     * @param places 小数位
     * @param symbol 货币单位
     * @param thousand 千位分隔符
     * @param decimal 小数位分隔符
     * @returns {string}
     */
    // Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    //     places = !isNaN(places = Math.abs(places)) ? places : 2;
    //     symbol = symbol !== undefined ? symbol : "¥";
    //     thousand = thousand || ",";
    //     decimal = decimal || ".";
    //     var number = this,
    //         negative = number < 0 ? "-" : "",
    //         i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    //         j = (j = i.length) > 3 ? j % 3 : 0;
    //     return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    // };

    /**
     * author: meizz
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     * @param fmt
     * @returns {*}
     * @constructor
     */
    // Date.prototype.format = function (fmt) {
    //     fmt = fmt || config.formats.date;
    //     var o = {
    //         "M+": this.getMonth() + 1,                 //月份
    //         "d+": this.getDate(),                    //日
    //         "h+": this.getHours(),                   //小时
    //         "m+": this.getMinutes(),                 //分
    //         "s+": this.getSeconds(),                 //秒
    //         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    //         "S": this.getMilliseconds()             //毫秒
    //     };
    //     if (/(y+)/.test(fmt))
    //         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    //     for (var k in o)
    //         if (new RegExp("(" + k + ")").test(fmt))
    //             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    //     return fmt;
    // };

    /**
     * 对Date的扩展，为当前Date加上指定的时间长度（可以为负数）
     * @param value 值
     * @param key 值类别
     */
    // Date.prototype.add = function (value, key) {
    //     if (value) {
    //         switch (key) {
    //             case "S":
    //             case "milliseconds":
    //                 this.setTime(this.getTime() + value);
    //                 break;
    //             case "s":
    //             case "seconds":
    //                 this.setTime(this.getTime() + value * 1000);
    //                 break;
    //             case "m":
    //             case "minutes":
    //                 this.setTime(this.getTime() + value * 60000);
    //                 break;
    //             case "h":
    //             case "hours":
    //                 this.setTime(this.getTime() + value * 3600000);
    //                 break;
    //             case "M":
    //             case "months":
    //                 this.setMonth(this.getMonth() + value);
    //                 break;
    //             case "q":
    //             case "quarters":
    //                 this.setMonth(this.getMonth() + value * 3);
    //                 break;
    //             case "Y":
    //             case "years":
    //                 this.setFullYear(this.getFullYear() + value);
    //                 break;
    //             case "w":
    //             case "weeks":
    //                 this.setDate(this.getDate() + value * 7);
    //             default:
    //                 this.setDate(this.getDate() + value);
    //                 break;
    //         }
    //     }
    //     return this;
    // };

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    var count = 0;
    function logger(txt) {
        console.log(++count + "." + txt);
    }

    //常量定义
    var _body = $(document.body);

    /**
     * 定义正则表达式
     * @type {{color: RegExp, number: RegExp, int: RegExp, account: RegExp}}
     * @private
     */
    var regexps = {
        "color": /^(#[a-fA-F0-9]{3})|(#[a-fA-F0-9]{6})$/ig,
        "number": /^\-?\d+(\.\d+)?$/ig,
        "positiveNumber": /^\d+(\.\d+)?$/ig,
        "int": /^\-?\d+$/ig,
        "positiveInteger": /^\d+$/ig,
        "account": /^[a-zA-Z_]\w{2,14}[a-zA-Z0-9_]$/ig,
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
        "mail": /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/ig,
        "tel": /(^\d{11}$)|(^((\+?86)|(\(\+86\)))?(\d{3,4})?(\-|\s)?\d{7,8}((\-|\s)\d{3,4})?$)/ig,
        "pass": /^[a-zA-Z0-9_]{6,16}$/ig,
        "pxsize": /^\d+px$/ig
    };

    /**
     * 生成UUID
     * @type {{get: uuid.get, short: uuid.short}}
     */
    window.uuid = {
        /**
         * 创建一个新的UUID
         * @returns {string}
         */
        get: function () {
            var d = new Date().getTime();
            var _uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
            return _uuid;
        },
        /**
         * 创建一个短格式的UUID
         * @returns {XML|void|string}
         */
        short: function (header) {
            return (header || "") + uuid.get().replace(/\-/ig, "");
        }
    };


    /**
     * 数据处理对象
     * @type {{clear: _data."clear", parse: _data."parse"}}
     * @private
     */
    var _data = {
        /**
         * 清除数据
         * @returns {$}
         */
        "clear": function () {
            this.each(function (i, dom) {
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
         * @param value 值
         */
        "setValue": function (value) {
            this.each(function (i, dom) {
                var val = $.isPlainObject(value) ? $.extend(true, {}, value) : value, target = $(dom), t_formatter = target.attr("data-format");
                if (t_formatter) {
                    try {
                        val = eval(t_formatter + "(val)");
                    } catch (e) {
                        logger(e);
                    }
                }
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
         * 获取元素的值
         */
        "getValue": function (fileElements) {
            var ds = {};
            this.each(function (j, element) {
                var path = element.getAttribute("name"), settable = true,
                    type = element.getAttribute("type"), nodeName = element.nodeName;

                if ((type === "radio" || type === "checkbox") && element.checked !== true)
                    settable = false;

                if (settable) {
                    var d = ds, dpa = _data_path_analysis(d, path);
                    if (dpa.section) {
                        var section = dpa.section, d = dpa.data;
                        /*var sections = path.split("."), sectionCount = sections.length,
                         sectionIndex = 0, section = path, d = ds;*/
                        /*
                         if (sectionCount > 1) {
                         while (sectionIndex < sectionCount - 1) {
                         section = sections[sectionIndex];
                         if (!(section in d)) {
                         d[section] = {};
                         }
                         d = d[section];
                         sectionIndex++;
                         }
                         section = sections[sectionIndex];
                         }*/

                        if ("INPUT,TEXTAREA,BUTTON".indexOf(nodeName) < 0) {
                            if (element.dataset.control) {
                                var controlValue = eval("$(element)." + element.dataset.control + "('getValue')");
                                d[section] = controlValue.value || null;
                            } else {
                                d[section] = element.innerHTML;
                            }
                        } else if (type === "checkbox") {
                            if ($.type(d[section]) !== "array")
                                d[section] = [];

                            d[section].push(element.value);
                        } else if (type === "file") {
                            if (fileElements && $.type(fileElements) === "array") {
                                fileElements.push(element);
                            } else {
                                d[section] = element.files;
                            }
                        } else {
                            d[section] = element.value;

                            if (element.dataset.displayPath) {
                                var dpD = ds, dpa = _data_path_analysis(dpD, element.dataset.displayPath);
                                if (dpa.section) {
                                    dpa.data[dpa.section] = element.innerHTML;
                                }
                            }
                        }
                    }
                }
            });

            return ds;
        },
        /**
         * 进行赋值
         * @param data 数据
         * @param clear 是否清除旧数据
         * @param path 路径
         * @returns {*}
         */
        "parse": function (data, clear, path) {
            if (clear !== false)
                this.clearData(false);
            this.each(function (i, dom) {
                var el = $(dom);
                if ($.isPlainObject(data)) {
                    try {
                        $.each(data, function (key, value) {
                            if ($.isPlainObject(value)) {
                                el.parseData(value, false, (path || "") + key + ".", true);
                            } else {
                                el.find("[name='{0}{1}']".format(path || "", key)).setValue(value, true);
                                //.val(String(value));
                            }
                        });
                    } catch (e) {
                        logger(e.message);
                    }
                }
            });
            return this;
        },
        /**
         * 序列化数据，如果区域中不包含文件上传功能或未指定必须为FormData格式，则序列化为JSON，否则为FormData对象
         * @param verify 是否进行数据验证，默认为true
         * @param formdata 指定是否转为formdata对象, 默认为不转换（若区域中有文件上传控件，则无视该参数强制转为formdata）
         * @returns {{hasError: boolean, result: {}}}
         */
        "serialize": function (verify, formdata) {
            var result = {
                error: null,
                data: null
            };

            this.each(function (i, dom) {
                var errorMessages;
                // if (verify !== false) {
                //     errorMessages = $(dom).find("[name]").verify(true);
                // }

                if (errorMessages && errorMessages.length > 0) {
                    result.error = errorMessages;
                } else {
                    var box = $(dom), elements = box.find("[name]");
                    if (elements.length > 0) {
                        var fileElements = [];
                        result.data = _data.getValue.call(elements, fileElements);

                        /*elements.each(function (j, element) {
                         var path = element.getAttribute("name"), settable = true,
                         type = element.getAttribute("type"), nodeName = element.nodeName;

                         if ((type === "radio" || type === "checkbox") && element.checked !== true)
                         settable = false;

                         if (settable && /^(([a-zA-Z0-9_])+\.)*[a-zA-Z0-9_]+$/ig.test(path)) {
                         var sections = path.split("."), sectionCount = sections.length,
                         sectionIndex = 0, section = path, d = result.data;

                         if (sectionCount > 1) {
                         while (sectionIndex < sectionCount - 1) {
                         section = sections[sectionIndex];
                         if (!(section in d)) {
                         d[section] = {};
                         }
                         d = d[section];
                         sectionIndex++;
                         }
                         section = sections[sectionIndex];
                         }

                         if ("INPUT,TEXTAREA,BUTTON".indexOf(nodeName) < 0) {
                         if (element.dataset.control) {
                         var controlValue = eval("$(element)." + element.dataset.control + "('getValue')");
                         d[section] = controlValue.value || null;
                         }
                         } else if (type === "checkbox") {
                         if ($.type(d[section]) !== "array")
                         d[section] = [];

                         d[section].push(element.value);
                         } else if (type === "file") {
                         fileElements.push(element);
                         } else {
                         d[section] = element.value;
                         }
                         }
                         });*/

                        if (fileElements.length > 0) formdata = true;

                        if (formdata === true) {
                            var fd = new FormData();

                            $.each(result.data, function (k, v) {
                                if ($.isPlainObject(v))
                                    fd.append(k, new Blob([JSON.stringify(v)], {type: "application/json"}));
                                else
                                    fd.append(k, v);
                            });
                            $.each(fileElements, function (m, el) {
                                var name = el.getAttribute("name");
                                if (name && el.files && el.files.length > 0) {
                                    for (var n = 0, nn = el.files.length; n < nn; n++) {
                                        fd.append(name, el.files[n]);
                                    }
                                }
                            });
                            result.data = fd;
                        }
                    }
                }
            });

            return result;
        }
    };
    
    //---------------------------------------------------language----------------------------------------------------------
    //
    // var _language = {
    //     "install": function () {
    //         var doms = this.find("[data-lang]"),
    //             tooltip = this.find("[data-tooltip]");
    //         $.each(doms, function (i, dom) {
    //             var la = $(dom).attr("data-lang");
    //             $(dom).val(eval(la)).html(eval(la));
    //         });
    //     }
    // };
    
    //
    // var drag = {
    //     init: function () {
    //         _body.on("dragstart", "[data-drag=true]", drag.events.dragstart)
    //             .on("dragend", "[data-drag=true]", drag.events.dragend);
    //     },
    //     original: {
    //         x: 0,
    //         y: 0
    //     },
    //     events: {
    //         dragstart: function (e) {
    //             var ev = e || window.event;
    //             ev.currentTarget.classList.add("dragging");
    //             ev.originalEvent.dataTransfer.effectAllowed = "move";
    //             drag.original = {
    //                 "x": ev.screenX,
    //                 "y": ev.screenY
    //             };
    //             _body.unbind("dragover.move").bind("dragover.move", drag.events.dragover);
    //         },
    //         dragend: function (e) {
    //             var ev = e || window.event;
    //             ev.currentTarget.classList.remove("dragging");
    //             ev.currentTarget.dataset.moved = true;
    //             var rx = ev.screenX - drag.original.x, ry = ev.screenY - drag.original.y, el = $(ev.currentTarget);
    //             el.css({
    //                 x: parseInt(el.css("x")) + rx,
    //                 y: parseInt(el.css("y")) + ry
    //             });
    //             _body.unbind("dragover.move");
    //         },
    //         dragover: function (e) {
    //             var ev = e || window.event;
    //             ev.originalEvent.dataTransfer.dropEffect = "copy";
    //             return false;
    //         }
    //     }
    // };

    // var tooltip = {
    //     "size": {
    //         "width": 0,
    //             "height": 0
    //     },
    //     /**
    //      * 工具提示承载元素
    //      */
    //     "element": null,
    //     /**
    //      * 初始化工具
    //      */
    //     "init": function (_body) {
    //         if (tooltip.element === null) {
    //             tooltip.element = $("<div class='tooltip'></div>");
    //             _body.append(tooltip.element);
    //
    //             //注册事件
    //             _body.off("mouseenter.tooltip", "[data-tooltip]").on("mouseenter.tooltip", "[data-tooltip]", tooltip.show);
    //             _body.off("mouseleave.tooltip mousedown.tooltip", "[data-tooltip]").on("mouseleave.tooltip mousedown.tooltip", "[data-tooltip]", tooltip.hide);
    //         }
    //     },
    //     /**
    //      * 计算提示框位置
    //      * @param x
    //      * @param y
    //      * @returns {{left: *, top: *}}
    //      */
    //     "position": function (x, y) {
    //         var pos = {
    //             "left": x,
    //             "top": y + 30
    //         };
    //         var _tw = tooltip.element.outerWidth();
    //         var _th = tooltip.element.outerHeight();
    //
    //         if (pos.left + _tw > document.body.scrollWidth - 10)
    //             pos.left = tooltip.size.width - 10 - _tw;
    //         if (pos.top + _th > document.body.scrollHeight - 10)
    //             pos.top -= (_th + 40);
    //         return pos;
    //     },
    //     /**
    //      * 显示工具提示
    //      */
    //     "show": function (e) {
    //         if (tooltip.element) {
    //             var message = e.currentTarget.dataset.tooltip;
    //             if (message) {
    //                 tooltip.element.html(eval(message));
    //                 tooltip.element.css(tooltip.position(e.pageX, e.pageY)).stop(true, true).fadeIn("fast");
    //                 $(e.currentTarget).unbind("mousemove.tooltip").bind("mousemove.tooltip", tooltip.moving);
    //             }
    //         }
    //     },
    //     /**
    //      * 移动工具提示元素
    //      * @param e
    //      */
    //     "moving": function (e) {
    //         if (tooltip.element) {
    //             tooltip.element.css(tooltip.position(e.pageX, e.pageY));
    //         }
    //     },
    //     /**
    //      * 显示工具提示
    //      */
    //     "hide": function (e) {
    //         if (tooltip.element) {
    //             $(e.currentTarget).unbind("mousemove.tooltip");
    //             tooltip.element.stop(true, true).fadeOut("fast");
    //         }
    //     }
    // };
    //
    // tooltip.init($("body"));
    //$("body").installLanguage();
    // drag.init();
    $.fn.setValue = _data.setValue;
    $.fn.getValue = _data.getValue;
    $.fn.clearData = _data.clear;
    $.fn.parseData = _data.parse;
    $.fn.serializeData = _data.serialize;
    // $.fn.installLanguage = _language.install;
});
