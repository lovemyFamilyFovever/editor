/*
 * @Author: lxc
 * @Date: 2022-05-06 15:01:34
 * @LastEditors: lxc
 * @LastEditTime: 2022-05-12 20:09:18
 * @FilePath: \editor\test\js\tools.js
 * @Description: 
 * 
 * Copyright (c) 2022 by __, All Rights Reserved. 
 */


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