/*
 * @Author: lxc
 * @Date: 2022-05-06 15:55:19
 * @LastEditors: lxc
 * @LastEditTime: 2022-05-06 15:55:19
 * @FilePath: \富文本编辑器wangeditor\test\js\public-method.js
 * @Description: 
 * 
 * Copyright (c) 2022 by __, All Rights Reserved. 
 */
/**
 * Created by xhgx on 2017/5/10.
 */

function Public() {
    return {
        view: function () {
            return {
                //w:可视区域的宽度    h:可视区域的高度
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}



; (function (win) {
    if (win["UDP"]) {
        win["UDP"].Public = Public();
    } else {
        win.UDP = { Public: Public() };
    }
})(window);



