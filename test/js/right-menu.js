/*
 * @Author: lxc
 * @Date: 2022-05-11 11:02:17
 * @LastEditors: lxc
 * @LastEditTime: 2022-05-12 17:40:15
 * @FilePath: \editor\test\js\right-menu.js
 * @Description: 
 * 
 * Copyright (c) 2022 by __, All Rights Reserved. 
 */
function initRightMenu() {

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
        const { x, y } = adjustPos(e.clientX, e.clientY, rect.width, rect.height)

        contentEl.style.display = 'block'
        contentEl.style.left = x + 'px'
        contentEl.style.top = y + 'px'
    }

    // 阻止指定元素下的菜单事件
    layerContainer.addEventListener('contextmenu', onContextMenu, false)

    const hideContextMenu = (e) => {
        if (!e.target.classList.contains('add_item')) {
            contentEl.style.display = 'none'
            contentEl.style.top = '99999px'
            contentEl.style.left = '99999px'
        }
    }

    //鼠标悬浮时的事件
    itemListEl.addEventListener('mouseover', (e) => {
        if (e.target.classList.value.indexOf("add_item") > -1) {
            $('.add_item_children').css('display', 'block')
        } else {
            $('.add_item_children').css('display', 'none')
        }
    })

    itemchildrenEl.addEventListener('mouseover', (e) => {
        $('.add_item_children').css('display', 'block')
    })


    contentEl.addEventListener('click', (e) => {
        console.log('点击：', e.target.textContent)
        var text = e.target.textContent

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
    })

}