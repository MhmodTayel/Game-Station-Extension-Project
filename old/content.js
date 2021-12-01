chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message) {
  console.log(message);
}
