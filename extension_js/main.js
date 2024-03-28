function changeVideo(address)
{
    console.log({data: address})
    var classArray = document.getElementsByClassName("video-item");
    var tagArray = classArray[0].getElementsByTagName("iframe");
    tagArray[0].src = address;
}

function getLocalData(){
    let data;
    chrome.storage.sync.get(['url'], res=>{
        console.log(res.url);
        data = res.url;
        fetchData(data);
    })
}

function fetchData(data) {
    console.log(data);
    if(data != null && data != undefined)
    {
        changeVideo(data);
        return;
    }
    console.log("in");
    fetch("chrome-extension://mimblcfdnkoiknndegmbepchjhnkepoe/json/data.json")
        .then(response => response.json())
            .then(value => {
                    changeVideo(value["url"]);
                    chrome.storage.sync.set({'url': value["url"]}, send=>{
                        console.log(send.url)
                    })
                })
}

getLocalData();
// console.log("data: "+target.url);
// changeVideo("https://www.youtube.com/embed/R71hX1R2gb8");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse({response: 'pone-pone from content script'})
    console.log(request);
    chrome.storage.sync.clear();
    chrome.storage.sync.set({'url': request['url']}, send=>{
        console.log("in "+request['url']);
    })
    changeVideo(request['url'])
})