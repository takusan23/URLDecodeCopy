// Webページ側で実行される JavaScript。DOM に触れます

// ServiceWorker 側から来たイベントを受け取る
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const copyValue = request.copyValue
    copy(copyValue)
})

// コピーする関数。Async Clipboard APIは使えなかった。
function copy(url) {
    var textarea = document.createElement("textarea")
    textarea.value = url
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.parentElement.removeChild(textarea)
}