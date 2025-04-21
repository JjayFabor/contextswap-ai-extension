chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "displayRewrittenText") {
    alert(`Rewritten:\n\n${request.newText}`);
  }
});
