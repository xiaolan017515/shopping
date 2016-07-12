/**
 * Created by drfu on 6/3/16.
 */
import "./popup.less";
var ele = {
    source: $("[data-popup]"),
    shift: {
        x: 0,
        y: 0
    },
    width : 0,
    height: 0
};
var popup = {
    event: {
        click: function (e) {
            e.data.pop.find('button').removeClass('btnClicked');
            $(this).addClass('btnClicked');
            var v = e.currentTarget.value;
            $(e.data.tar).html(v).val(v);
            e.data.pop.removeClass("open");
        }
    },
    method: {
        open: function (e) {
            if(e.currentTarget === e.target) {
                ele.shift.x = this.offsetLeft;
                ele.shift.y = this.offsetTop;
                ele.width = this.offsetWidth;
                ele.height = this.offsetHeight;
            }
            popup.updatePosition(e.target, e.data.pop);
        },
        hide: function (e) {
            //if(e.currentTarget === e.target) {
            //    e.data.pop.removeClass("open");
            //}
        }
    },

    binding: function () {
        $.each(ele.source, function (i, s) {
            var popName = $(s).data("popup"), pop = $(".popup#" + popName);
            $(s).on("focus", {pop: pop}, popup.method.open).on("blur", {pop: pop}, popup.method.hide);
        });
    },
    updatePosition: function (tar, pop) {
        if(pop instanceof $) {
            var sub = $('.subbox > .sub');
            var subNum = pop.find(".subbox").length,
                browserW = $(document.body).width();
            if((browserW - ele.shift.x) < (subNum + 1) * ele.width) {
                sub.css({left: '-100%'});
            }
            pop.css({minWidth: ele.width + "px", left: ele.shift.x + "px", top: (ele.shift.y + ele.height) + "px"});
            pop.addClass("open");
            pop.find("button").on("click", {pop: pop, tar: tar}, popup.event.click);
        }
    }
};

var selector = {
    init: function () {
        var caret = '<i class="ico ico-caret-right"></i>',
            box = $(".subbox");
        $.each(box, function (i, b) {
            $(b).children().first().append(caret);
            $(b).hover(selector.method.show, selector.method.hide);
        });
    },
    method: {
        show: function () {
            $(this).find(".sub").first().addClass("open");
        },
        hide: function () {
            $(this).find(".sub").first().removeClass("open");
        }
    }
};
popup.binding();
selector.init();


