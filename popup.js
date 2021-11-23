text = document.getElementById("text");

text.addEventListener("keypress", changeText);

function changeText() {
  let params = {
    active: true,
    currentWindow: true,
  };
  chrome.tabs.query(params, gotTabs);

  function gotTabs(tabs) {
    let message = text.value;
    chrome.tabs.sendMessage(tabs[0].id, message);
  }
}
