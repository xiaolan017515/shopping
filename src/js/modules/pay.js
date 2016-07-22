/**
 * Created by fdr08 on 2016/7/22.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/pay.less";
import "comJs";

var cards = {
    els: {
        c: $("#allCards"),
        nc: $("#newCard")
    },
    event: {
        cardClick: function () {
            $(this).addClass("checked").siblings().removeClass("checked");
        },
        newCard: function () {
            
        }
    }
};
cards.els.c.on("click", ">.card", cards.event.cardClick);
cards.els.nc.on("click", cards.event.newCard);