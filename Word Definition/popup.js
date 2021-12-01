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
let definitionEle = document.getElementById("definition");
let exampleEle = document.getElementById("example");
let wordEle = document.getElementById("word");
let synonymsElements = document.getElementById("synonyms");
    wordEle.innerText = word;

function getData(data) {
  let definition = data[0].meanings[0].definitions[0].definition;
      example = data[0].meanings[0].definitions[0].example;
      audioSrc = data[0].phonetics[0].audio;
  let synonyms = data[0].meanings[0].definitions[0].synonyms;


  if (synonyms.length > 0) {
    document.getElementById("synonymsid").innerText = "synonyms:";
    synonyms.forEach((synonym) => {
      let li = document.createElement("li");
      li.innerText = synonym;
      synonymsElements.appendChild(li);
    });
  }
  if (example === undefined) {
    exampleEle.innerText = "There's No Example To This Word"
  } else {
    exampleEle.innerText = example;
  }


  definitionEle.innerText = definition;

  function popup() {
    // send message form popup to content
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: audioSrc });
    });
  }

  document.getElementById("play").addEventListener("click", popup);
}
