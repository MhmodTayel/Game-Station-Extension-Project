let bgPage = chrome.extension.getBackgroundPage();
let word = bgPage.word;

let xhr = new XMLHttpRequest();

xhr.open("get", `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    getData(response);
  }
};

xhr.send();

function getData(data) {}

function popup() {
  // send message form popup to content
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: audioSrc });
  });
}

// document.getElementById("play").addEventListener("click", popup);
