/**
 * Created by fdr08 on 2016/7/21.
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
    var drag = {
        pos: {
            boxLeft: 0,
            boxTop: 0,
            mouseX: 0,
            mouseY: 0,
            shiftX: 0,
            shiftY: 0,
            screenX: 0,
            screenY: 0,
            width: 0,
            height: 0
        },
        mousedown: function (e) {
            var ev = e || window.event,
                $this = ev.data._this;
            drag.pos.screenX = $(window).width();
            drag.pos.screenY = $(window).height();
            
            drag.pos.width = $this.width();
            drag.pos.height = $this.height();
            
            
            drag.pos.boxLeft = $this.offset().left;
            drag.pos.boxTop = $this.offset().top;
            drag.pos.mouseX = ev.pageX;
            drag.pos.mouseY = ev.pageY;
            $this.on("mousemove", {_this: $this}, drag.mousemove);
        },
        mousemove: function (e) {
            var ev = e || window.event;
            drag.pos.shiftX = ev.pageX;
            drag.pos.shiftY = ev.pageY;
            var shiftLeft = drag.pos.shiftX - drag.pos.mouseX,
                shiftTop = drag.pos.shiftY - drag.pos.mouseY,
                left = drag.pos.boxLeft + shiftLeft,
                top = drag.pos.boxTop + shiftTop;
            ev.data._this.css({margin: "0"});
            
            var xIsOut = drag.pos.width + left,
                yIsOut = drag.pos.height + top;
            
            if(yIsOut <= drag.pos.screenY && yIsOut >=0 && xIsOut <= drag.pos.width) {
                ev.data._this.css({left: "0", top: top + "px"});
            }else if(yIsOut <= drag.pos.height && xIsOut >=0 && xIsOut <= drag.pos.screenX) {
                ev.data._this.css({left: left + "px", top: "0"});
            }else if(yIsOut <= drag.pos.height && xIsOut <= drag.pos.width) {
                ev.data._this.css({left: "0", top: "0"});
            }else if(yIsOut >= 0 && xIsOut >=0 && yIsOut <= drag.pos.screenY &&xIsOut <= drag.pos.screenX) {
                ev.data._this.css({left: left + "px", top: top + "px"});
            }
        },
        mouseup: function (e) {
            var ev = e || window.event;
            ev.data._this.unbind("mousemove");
        }
    };
    $.fn.drag = function () {
        this.children(".title").on("mousedown", {_this: this}, drag.mousedown).on("mouseup", {_this: this}, drag.mouseup);
    };
});