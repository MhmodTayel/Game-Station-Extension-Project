
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message) {
  word = message.text;
}
