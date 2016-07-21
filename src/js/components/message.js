/**
 * Created by drfu on 6/2/16.
 */
import "./message.less";
/**
 * 页面弹框消息
 * @param option[title, content, button[submit, cancel]] 配置信息，包括标题，内容，按钮文本
 * @param type 弹出框类型 （warn/wrong）
 * @param submitFun 提交事件
 * @param cancelFun 取消事件
 * @param mark 遮罩（boolean）
 * @param css 样式设置
 */
$.fn.message = function (option, type, submitFun, cancelFun, mark, css) {
    var defSet = {
        title: "Title",
        content: "content",
        button: {
            submit: "submit",
            cancel: "cancel"
        }
    };
    var opt = $.extend(true, {}, defSet, option),
        box = '<div class="con con-msg"><div class="title">{0}</div><div class="content">{1}</div><div class="commands"><button class="submit" value="{2}">{2}</button><button class="cancel" value="{3}">{3}</button></div></div>'.format(opt.title, opt.content, opt.button.submit, opt.button.cancel);
    this.css({position: "relative"});
    if(mark && (mark === true || mark === "true")) {
        this.append('<div class="con-mark"></div>');
    }

    this.append(box);

    var ele = {
        t: $(".con-msg > .title"),
        h: $(".con-msg")
    };

    if (type && type === "warn") {
        ele.t.css({backgroundColor: "#ffff66"});
    }else if(type && type === "wrong") {
        ele.t.css({backgroundColor: "#eb524e", color: "#ffff66"});
    }
    if(css && $.isPlainObject(css)) {
        ele.h.css(css);
    }

    ele.h.css({marginTop: "-" + ele.h.height() / 2 + "px", marginLeft:  "-" + ele.h.width() / 2 + "px"});
    
    this.find("button.submit").on("click", submitFun);
    this.find("button.cancel").on("click", cancelFun);
};
/**
 * 短消息
 * @param type 消息类型 （true/false）
 * @param mark 遮罩（boolean）
 * @param txt 消息类容，可以为任意文本，包括HTML标签
 * @param duration 显示时长
 * @param css 样式设置
 */
$.fn.shortMessage = function(type, mark, txt, duration, css) {
    var box = '<span class="con con-shortMsg animated swing">{0}</span>'.format(txt);
    this.css({position: "relative"});
    if(mark && (mark === true || mark === "true")) {
        this.append('<div class="con-mark"></div>');
    }

    this.append(box);

    var tar = this.find(".con-shortMsg"),
        _mark = this.find(".con-mark");
    if(type && (type === false || type === "false")) {
        tar.css({backgroundColor: "#ffff66", color: "#c90000"});
    }

    setTimeout(function() {
        tar.fadeOut();
        _mark.fadeOut();
        
    }, duration < 1000 ? 1000 : duration);
    if(css && $.isPlainObject(css)) {
        tar.css(css);
    }
    tar.css({marginTop: "-" + tar.height() / 2 + "px", marginLeft: "-" + tar.width() / 2 + "px"});
};
/**
 * 抛信息窗口
 * @param txt 消息内容
 * @param btn 按钮文字
 * @param mark 遮罩（boolean）
 * @param css 样式设置
 * @param fun 点击函数
 */
$.fn.throwMsg = function (txt, btn, mark, css, fun) {
    var box = '<div class="con con-throw"><div class="content">{0}</div><button>{1}</button></div>'.format(txt, btn);
    this.css({position: "relative"});
    if(mark && (mark === true || mark === "true")) {
        this.append('<div class="con-mark"></div>');
    }
    this.append(box);
    var t = this.find(".con-throw"),
        _btn = this.find("button");
    if(css && $.isPlainObject(css)) {
        t.css(css);
    }
    t.css({marginTop: "-" + t.height() / 2 + "px", marginLeft: "-" + t.width() / 2 + "px"});
    _btn.on("click", fun);
};