console.log("chrome extention go");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  let paragraphs = document.getElementsByTagName("h1");

  for (ele of paragraphs) {
    ele.innerText = message;
  }
}
