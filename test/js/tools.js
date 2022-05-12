/*
 * @Author: lxc
 * @Date: 2022-05-06 15:01:34
 * @LastEditors: lxc
 * @LastEditTime: 2022-05-12 17:29:18
 * @FilePath: \editor\test\js\tools.js
 * @Description: 
 * 
 * Copyright (c) 2022 by __, All Rights Reserved. 
 */



// Extend menu
class MyMenu {
    constructor() {
        this.title = '打开模板列表'
        this.iconSvg = '<svg t="1651821258875" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1948" width="48" height="48"><path d="M64 127.712C64 92.512 92.864 64 128.288 64h255.424C419.232 64 448 92.8 448 127.712V896.32c0 35.2-28.864 63.712-64.288 63.712H128.32C92.768 960 64 931.2 64 896.288V127.68z m64 32.32v703.936c0 17.728 14.272 32.032 31.904 32.032h192.192c17.408 0 31.904-14.336 31.904-32V160c0-17.696-14.272-32-31.904-32H159.904C142.496 128 128 142.336 128 160z m384-31.744C512 92.768 540.704 64 576.192 64h319.616C931.264 64 960 92.864 960 128.288v255.424c0 35.52-28.704 64.288-64.192 64.288h-319.616A64.288 64.288 0 0 1 512 383.712V128.32z m64 31.616v192.192a32 32 0 0 0 31.84 31.904h256.32c17.28 0 31.84-14.272 31.84-31.904V159.904A32 32 0 0 0 864.16 128h-256.32c-17.28 0-31.84 14.272-31.84 31.904z m-64 416.288c0-35.456 28.704-64.192 64.192-64.192h319.616c35.456 0 64.192 28.704 64.192 64.192v319.616A64.16 64.16 0 0 1 895.808 960h-319.616A64.16 64.16 0 0 1 512 895.808v-319.616z m64 31.68v256.288c0 17.28 14.272 31.84 31.84 31.84h256.32c17.28 0 31.84-14.272 31.84-31.84v-256.32c0-17.28-14.272-31.84-31.84-31.84h-256.32c-17.28 0-31.84 14.272-31.84 31.84z" fill="#333333" p-id="1949"></path></svg>'
        this.tag = 'button'
    }
    getValue(editor) {
        return ' hello '
    }
    isActive(editor) {
        return false // or false
    }
    isDisabled(editor) {
        return false // or true
    }
    exec(editor, value) {
        // editor.insertText(value);

        if ($('#layer_model').length == 0) {
            layer_template.show();
        }
    }
}
const myMenuConf = {
    key: 'myMenu',
    factory() {
        return new MyMenu()
    }
}

//递归 在array中根据id获取特定值
function getArrayValue(array, id) {
    var result = null;
    for (var i = 0; i < array.length; i++) {
        if (result !== null) {
            break;
        }
        if (array[i].type == "folder") {
            result = getArrayValue(array[i].children, id);
        } else {
            if (id == array[i].id) {
                result = array[i].content;
                break;
            }
        }
    }
    return result;
}