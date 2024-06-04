chrome.contextMenus.create({
    "title": "今開いてるURLをデコードしてコピーする",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info) {
        // location.hrefは（多分）使えないのでChrome Extensions APIを使う。
        chrome.tabs.getSelected(null, function (tab) {
            const url = decodeURI(tab.url)
            copy(url)
        });
    }
})
chrome.contextMenus.create({
    "title": "リンク先のURLをデコードしてコピーする",
    "type": "normal",
    "contexts": ["all"],
    "onclick": function (info) {
        // URLデコード
        const url = decodeURI(info.linkUrl)
        copy(url)
    }
})

// コピーする関数。Async Clipboard APIは使えなかった。
const copy = (url) => {
    var textarea = document.createElement("textarea")
    textarea.value = url
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.parentElement.removeChild(textarea)
}