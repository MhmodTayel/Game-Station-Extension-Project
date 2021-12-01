document.addEventListener("copy", (event) => {
  const selectedText = document.getSelection().toString();

  if (selectedText.length > 0) {
    let message = {
      text: selectedText,
    };
    chrome.runtime.sendMessage(message);
  }
});

chrome.runtime.onMessage.addListener(function (req) {
  console.log(req.message);
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = req.message;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("copy");
  document.body.removeChild(copyFrom);

  
});
