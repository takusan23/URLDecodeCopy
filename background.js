// ServiceWorker で動くバックグラウンドスクリプト。
// DOM は触れません。contents-script.js 参照
//@ts-check

const ID_CURRENT_PAGE = "url_decode_copy_current_page"
const ID_ANCHOR_TAG = "url_decode_copy_anchor_tag"

chrome.contextMenus.create({
    "id": ID_CURRENT_PAGE,
    "title": "今開いてるURLをデコードしてコピーする",
    "type": "normal",
    "contexts": ["all"]
})
chrome.contextMenus.create({
    "id": ID_ANCHOR_TAG,
    "title": "リンク先のURLをデコードしてコピーする",
    "type": "normal",
    "contexts": ["all"]
})

// メニューを押した時
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case ID_CURRENT_PAGE:
            // 今のページの URL デコード
            sendCopyEvent(decodeURI(tab.url))
            break

        case ID_ANCHOR_TAG:
            // リンク先のページの URL デコード
            sendCopyEvent(decodeURI(info.linkUrl))
            break
    }
})

/**
 * Service Worker は DOM に触れないので、content-script 側へイベントを投げて、DOM 使ってコピーしてもらう
 */
function sendCopyEvent(copy) {
    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
        await chrome.tabs.sendMessage(tab.id, { copyValue: copy })
    })();
}