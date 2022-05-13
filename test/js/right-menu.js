/*
 * @Author: lxc
 * @Date: 2022-05-11 11:02:17
 * @LastEditors: lxc
 * @LastEditTime: 2022-05-13 08:54:09
 * @FilePath: \editor\test\js\right-menu.js
 * @Description: 
 * 
 * Copyright (c) 2022 by __, All Rights Reserved. 
 */
function initRightContextMenu() {

    var html = template("rightMenu", {});
    $('body').append(html);

    const layerContainer = document.querySelector('.layerContainer')
    const contentEl = document.querySelector('.contextmenu-content')
    const itemListEl = document.querySelector('.item_list')
    const itemchildrenEl = document.querySelector('.item_children')

    /**
     * 
     * @param {number} x 将要设置的菜单的左上角坐标 x
     * @param {number} y 左上角 y
     * @param {number} w 菜单的宽度
     * @param {number} h 菜单的高度
     * @returns {x, y} 调整后的坐标
     */
    const adjustPos = (x, y, w, h) => {
        const PADDING_RIGHT = 6  // 右边留点空位，防止直接贴边了，不好看
        const PADDING_BOTTOM = 6  // 底部也留点空位
        const vw = document.documentElement.clientWidth
        const vh = document.documentElement.clientHeight
        if (x + w > vw - PADDING_RIGHT) x -= w
        if (y + h > vh - PADDING_BOTTOM) y -= h
        return { x, y }
    }

    const onContextMenu = e => {
        e.preventDefault()
        const rect = contentEl.getBoundingClientRect()
        // console.log(rect)
        const { x, y } = adjustPos(e.clientX, e.clientY, 170, 300)
        // console.log(x, y)
        contentEl.style.display = 'block'
        contentEl.style.left = x + 'px'
        contentEl.style.top = y + 'px'

        hideChildren()
    }

    // 阻止指定元素下的菜单事件
    layerContainer.addEventListener('contextmenu', onContextMenu, false)

    const hideContextMenu = (e) => {
        contentEl.style.display = 'none'
        contentEl.style.top = '99999px'
        contentEl.style.left = '99999px'

        hideChildren()
    }

    //鼠标悬浮时的事件
    itemListEl.addEventListener('mouseover', (e) => {
        e.stopPropagation()
        if (e.target.classList.contains("more_item"))
            showChildren()
        else {
            hideChildren()
        }
    })
    itemchildrenEl.addEventListener('mouseover', (e) => {
        showChildren()
    })

    contentEl.addEventListener('click', (e) => {
        console.log('点击：', e.target.textContent)
        var text = e.target.textContent

        if (!e.target.classList.contains("more_item")) {
            //右键点击文本
            if ($(e.target).hasClass('mdui-text')) {
                if (text == "添加") {

                } else if (text == "编辑") {

                } else if (text == "删除") {

                }
            } else {
                // 右键点击文件夹

                if (text == "添加") {

                } else if (text == "编辑") {

                } else if (text == "删除") {

                }
            }
            hideContextMenu(e)
        }
    })

    function showChildren() {
        const rect = contentEl.getBoundingClientRect();
        // console.log(rect)
        const vw = document.documentElement.clientWidth
        if (rect.left + 360 > vw)
            $('.item_children').css("left", '-173px')
        else
            $('.item_children').css("left", '172px')
        $('.item_children').show()
    }

    function hideChildren() {
        $('.item_children').hide()
    }

    //全局点击，关闭右键菜单
    $("body").on('click', function (e) {
        if ($('.contextmenu-content').length > 0) {
            if (!e.target.classList.contains('more_item')) {
                hideContextMenu();
            }
        }
    })

}