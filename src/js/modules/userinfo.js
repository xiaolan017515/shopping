/**
 * Created by fdr08 on 2016/7/19.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/userinfo.less";
import {core} from "comJs";
import "msg";
import "../components/popup";


var userInfo = {
    els: {
        time: $("#time")
    },
    event: {
        chooseTime: function () {
            $(this).children("span").toggleClass("ico-angle-up");
        }
    }
};
userInfo.els.time.on("click", userInfo.event.chooseTime);