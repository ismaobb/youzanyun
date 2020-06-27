var timer_isVanBtn = null
var timer_commit = null
var phone = "19916541754";
const ele_field_control = () => document.getElementsByClassName("van-button van-button--danger van-button--large")[0]
// const ele_field_control = () => document.getElementsByClassName("van-field__control")[1]

function fieldControl() {
    const has = ele_field_control() != undefined
    if (has) {
        clearInterval(timer_isVanBtn)
        next()
    }
}

function inputValue(dom, st) {
    var evt = new InputEvent('input', {
        inputType: 'insertText',
        data: st,
        dataTransfer: null,
        isComposing: false
    });

    dom.value = st;
    dom.dispatchEvent(evt);
}

function loop(fn, wait = 200) {
    return setInterval(fn, wait);
}

function isVanBtn() {
    const has = document.getElementsByClassName("van-button")[0].textContent != "零售价购买"
    if (has && timer_isVanBtn) {
        clearInterval(timer_isVanBtn)
        // document.getElementsByClassName("van-button")[0].click()
        document.getElementsByClassName("van-button van-button--default van-button--large van-button--square van-goods-action-button van-goods-action-button--last goods-buttons__big theme__button--main")[0].click();
        timer_isVanBtn = loop(fieldControl, 100)
    } else {
        console.log("setInterval")
    }
}



function next() {
    // 给文本框加粘贴事件，粘贴手机号后自动提交
    // inputValue(ele_field_control(), phone)
    document.getElementsByClassName("van-button van-button--danger van-button--large")[0].click();
}

function commit() {
    console.log("out commit");
    if (document.location.href.search("https://cashier.youzan.com/pay/wsctrade_buy") == 0) {
        console.log("commit");
        document.getElementsByClassName("van-button van-button--danger van-button--normal van-button--round van-submit-bar__button van-submit-bar__button--danger")[0].click()
        clearInterval(timer_commit)
    }
}

function shop() {
    if (document.location.href.search("https://shop18793264.youzan.com/wsctrade/cart") == 0) {
        // 购物车页面，自动提交
        // 这个页面用不到
        try {
            document.getElementsByClassName("bottom-button theme-background-linear van-button van-button--danger van-button--normal van-button--round van-button--square")[0].click()
        } catch (err) {
            // 如果购物车没有商品会提交失败，每隔0.5秒重新加载购物车
            function self() {
                location.reload()
            }
            setTimeout(self, 500)
        }

    }
}


window.onload = function () {
    ///下单页面
    timer_isVanBtn = loop(isVanBtn)
    ///提交页面
    timer_commit = loop(commit, 100)
}