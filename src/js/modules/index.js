/**
 * Created by fdr08 on 2016/7/12.
 */
import "awesome";
import "base";
import "comCss";
import "../../style/css/index.less";
import "comJs";

var waterFall = {
    maxH: 0,
    els: {},
    event: {
        load: function () {
            waterFall.event.waterfall('showmore', 'pin');
            var dataInt = {'data': [{'src': '1.jpg'}, {'src': '2.jpg'}, {'src': '3.jpg'}, {'src': '4.jpg'}]};
            document.getElementById("showmore").style.height = waterFall.maxH + "px";
        },
        /*document.getElementById(parent)
         parend 父级id
         pin 元素id
         */
        waterfall: function (parent, pin) {
            var oParent = document.getElementById(parent);
            var aPin = waterFall.event.getClassObj(oParent, pin);
            var iPinW = aPin[0].offsetWidth;
            var num = Math.floor(oParent.offsetWidth / iPinW);
            oParent.style.cssText = 'width:' + iPinW * num + 'px;margin:0 auto;';

            var pinHArr = [];
            for (var i = 0; i < aPin.length; i++) {
                var pinH = aPin[i].offsetHeight;
                if (i < num) {
                    pinHArr[i] = pinH;
                } else {
                    var minH = Math.min.apply(null, pinHArr);
                    var minHIndex = waterFall.event.getminHIndex(pinHArr, minH);
                    aPin[i].style.position = 'absolute';
                    aPin[i].style.top = minH + 'px';
                    aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';
                    pinHArr[minHIndex] += aPin[i].offsetHeight;
                    waterFall.maxH = Math.max.apply(null, pinHArr);
                }
            }
        },

        /****
         *通过父级和子元素的class类 获取该同类子元素的数组
         */
        getClassObj: function (parent, className) {
            var obj = parent.getElementsByTagName('*');
            var pinS = [];
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].className == className) {
                    pinS.push(obj[i]);
                }
            }
            return pinS;
        },
        /****
         *获取 pin高度 最小值的索引index
         */
        getminHIndex: function (arr, minH) {
            for (var i in arr) {
                if (arr[i] == minH) {
                    return i;
                }
            }
        }
    }
};

window.onload = waterFall.event.load();

