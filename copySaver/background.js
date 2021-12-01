chrome.storage.sync.get(["arr"], function (result) {
  if (!result.arr) {
    chrome.storage.sync.set({
      arr: [],
    });
  }
});

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message) {
  words = message.text;
  chrome.storage.sync.get(["arr"], function (result) {
    result.arr.push(words);
    chrome.storage.sync.set({
      arr: result.arr,
    });
    console.log(result);
  });
}
