wordsArr = [];
let container = document.getElementById("container");

chrome.storage.sync.get(["arr"], function (result) {
  if (result.arr) {
    display(result.arr);
  }
});

function display(arr) {
  wordsArr = arr;
  wordsArr.forEach((word, idx) => {
    container.innerHTML += ` <div class="item" index="${idx}">
        <span class="word">${word}</span>
        <span class="close">x</span>
     </div>`;
  });
}

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    let idx = e.target.parentElement.getAttribute("index");
    wordsArr.splice(idx, 1);
    document.querySelector(`.item[index="${idx}"]`).remove();
    chrome.storage.sync.set({ arr: wordsArr });
  }

  if (container.firstElementChild == null) {
    chrome.storage.sync.set({
      arr: [],
    });
    container.innerHTML = `
    <div class="nothing">
    <div class="text">Nothing stored</div>
  </div>`;
  }
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("word")) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: e.target.innerHTML });
    });
    let idx = e.target.parentElement.getAttribute("index");
    wordsArr.splice(idx, 1);
    chrome.storage.sync.set({ arr: wordsArr });
  }
});

/*
document.addEventListener("DOMContentLoaded", () => {
  if (container.firstElementChild == null) {
    console.log("here");
    container.innerHTML = `
    <div class="nothing">
    <div class="text">Nothing stored</div>
  </div>`;
  }
});
*/
