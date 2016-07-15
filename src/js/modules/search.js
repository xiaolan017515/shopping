/**
 * Created by fdr08 on 2016/7/6.
 */
import "../../style/css/awesome.less";
import "../../style/css/base.less";
import "../../style/css/com.less";
import "../../style/css/search.less";
import "../common/com";

var condition = {
    els: {
        cm: $(".checkmore"),
        sp:　$(".select>span"),
        st:　$(".sort")
    },
    event: {
        init: function () {
                var t = $(".condition"), fold = $(".expand"), h = t.height();
                if (h > 220) {
                    t.css({height: "200px"});
                    t.addClass("autoExpand");
                    fold.on("click", function () {
                        var fold = !$(this).hasClass("fold");
                        if (fold) {
                            t.css({height: h + "px"});
                            $(this).css({top: (h - 1) + "px"}).children(".tips").html('收起');
                            $(this).addClass("fold");
                        } else {
                            t.css({height: "200px"});
                            $(this).css({top: "199px"}).children(".tips").html('更多');
                            $(this).removeClass("fold");
                        }
                    })
                } else {
                    t.removeClass("autoExpand");
                }
            },
        radio: function () {
            $(this).addClass("active").siblings("span").removeClass("active");
            var _id = $(this).parent().parent().attr("id");
            var v = $(this).text(),
                group = '<div class="group">' +
                    '<span class="val">' + v + '</span>' +
                    '<span id="parent-' + _id + '" class="ico ico-close"></span>' +
                    '>' +
                    '</div>';
            $(".hasSelected").append(group);
            /**
             * 移除已筛选条件栏
             */
            $(this).parent().parent().css({display: "none"});
            /**
             * 删除筛选条件
             */
            $(".ico").on("click", function () {
                var id = $(this).attr("id").replace("parent-", "");
                $(this).parent().remove();
                $("#" + id).css({display: "block"}).children(".select").children("span").removeClass("active");
            })
        },
        checkbox: function () {
            var open = !$(this).parent().hasClass("checkMode"),
                span = $(this).prev().find("span");
            if (open) {
                span.removeClass("active");
                span.unbind("click");
                $(this).children("button").html("确定");
                $(this).parent().addClass("checkMode");
            } else {
                var t = span.find('input:checked').parent();
                if (t && t.length > 0) {

                    var v = "", group = '';
                    var _id = $(this).parent().attr("id");
                    $.each(t, function (i, d) {
                        v += $(d).text();
                    });
                    group = '<div class="group">' +
                        '<span class="val">' + v + '</span>' +
                        '<span id="parent-' + _id + '" class="ico ico-close"></span>' +
                        '>' +
                        '</div>';
                    $(".hasSelected").append(group);
                    /**
                     * 移除已筛选条件栏
                     */
                    $(this).parent().css({display: "none"});
                    /**
                     * 删除筛选条件
                     */
                    var $that = $(this);
                    $(".ico").on("click", function () {
                        var id = $(this).attr("id").replace("parent-", "");
                        $(this).parent().remove();
                        $("#" + id).css({display: "block"}).children(".select").children("span").removeClass("active");

                        $that.children("button").html("多选");
                        $that.parent().removeClass("checkMode");
                    });

                    span.on("click", radioEvent);
                } else {
                    $(this).children("button").html("多选");
                    $(this).parent().removeClass("checkMode");
                }
            }
        },
        sort: function () {
            $(this).toggleClass("active").children("span").toggleClass("ico-sort-asc");
        }
    }
};
/**
 * 初始化筛选项，条件选项过多自动折叠
 */
condition.event.init();
/**
 * 多选模式
 */
condition.els.cm.on("click", condition.event.checkbox);
/**
 * 单选模式
 */
condition.els.sp.on("click", condition.event.radio);
/**
 * 删选结果排序
 */
condition.els.st.on("click", ">.group", condition.event.sort);

