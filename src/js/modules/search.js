/**
 * Created by fdr08 on 2016/7/6.
 */
import "../../style/css/icomoon.less";
import "../../style/css/base.less";
import "../../style/css/com.less";
import "../../style/css/search.less";
import "../common/com";

function init() {
    /**
     * 条件选项过多自动折叠
     */
    var t =  $(".condition"), fold = $(".expand"), h = t.height();
    if(h > 220) {
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
    }else {
        t.removeClass("autoExpand");
    }
}
init();



/**
 * 开启多选模式
 */
$(".checkmore").on("click", function () {
   var open = !$(this).parent().hasClass("checkMode");
    if(open) {
        $(".select>span").removeClass("active").unbind("click");
        $(this).children("button").html("确定");
        $(this).parent().addClass("checkMode");
    }else {
        $(this).children("button").html("多选");
        $(this).parent().removeClass("checkMode");
        $(".select>span").on("click", radioEvent);
    }
});

/**
 * 条件删选
 */
$(".select>span").on("click", radioEvent);

function radioEvent() {
    $(this).addClass("active").siblings("span").removeClass("active");
}

/**
 * 删选结果排序
 */
$(".sortGroup>button").on("click", function () {
    $(this).toggleClass("active").siblings("span").toggleClass("ico-sort-amount-desc");
});