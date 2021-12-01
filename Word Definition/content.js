addEventListener("mouseup", wordSelected);

function wordSelected() {
  let selectedText = getSelection().toString();
  if (selectedText.length > 0) {
    let message = {
      text: selectedText
    };
    chrome.runtime.sendMessage(message);

  } else {
    let defaultMessage = {
      text: "You Didn't Choose Any Word"
    };

    chrome.runtime.sendMessage(defaultMessage);
  }
}
//recive message from popup
chrome.runtime.onMessage.addListener(function (request) {
  start(request.message);
});

function start(src) {
  if (document.getElementById("AudioId")) {
    document.getElementById("AudioId").remove();
  }
  let audio = document.createElement("audio");
  audio.id = "AudioId";
  audio.src = src;
  document.body.appendChild(audio);
  audio.autoplay = true;
}