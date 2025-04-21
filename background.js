chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "contextSwap",
        title: "Rewrite with ContextSwap AI",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "contextSwap") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getSelectedText
        });
    }
});

function getSelectedText() {
    const selection = window.getSelection().toString();
    chrome.runtime.sendMessage({ action: "rewriteText", text: selection });
}

