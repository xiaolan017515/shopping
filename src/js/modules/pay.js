/**
 * Created by fdr08 on 2016/7/22.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/pay.less";
import "comJs";
import "msg";
// import "../lib/qrcode.min"

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

// 二维码
// var qr = new QRCode('qrCode', {
//     text: '该二维码是自动生成的，替换为支付地址',
//     width: 300,
//     height: 300,
//     colorDark : '#000000',
//     colorLight : '#ffffff',
//     correctLevel : QRCode.CorrectLevel.H
// });