document.getElementById("apply").addEventListener("click", async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: async () => {
        const selection = window.getSelection().toString();
        if (!selection) return alert("Please select some text to rewrite.");

        const newText = `Modified: "This is a sample that changes the selected text"`;

        const ancestor = selection.anchorNode
          ? selection.anchorNode.parentNode
          : document.body;

        const treeWalker = document.createTreeWalker(
          ancestor,
          NodeFilter.SHOW_TEXT,
          null,
          false,
        );

        let node;
        while ((node = treeWalker.nextNode())) {
          node.textContent = node.textContent.replace(selection, newText);
        }
      },
    });
  });
});
