chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  chrome.tabs.create({ url: "./Games/index.html" });

  // chrome.tabs.sendMessage(tab.id, "test");
}
