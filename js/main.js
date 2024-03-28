function getData()
{
    var address = document.getElementById("address");
    var value = address.value;
    
    const url = setAddress(value);
    if(url != null || url != undefined)
      sendMsgToContentScript(url);
    address.value = null;
    removeEventListener("click", getData);
}

function setAddress(name)
{
    const url = new SetURL(name);
    return url.getURL();
}

function sendMsgToContentScript(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // since only one tab should be active and in the current window at once
      // the return variable should only have one entry
      let activeTab = tabs[0];
      let activeTabId = activeTab.id; // or do whatever you need
      chrome.tabs.sendMessage(activeTabId, {url: url});
      console.log(activeTabId)
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn").addEventListener("click", getData);
    // document.getElementById("btn").addEventListener("click", sendMsgToContentScript);
});

