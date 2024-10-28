document.getElementById("findVideosButton").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "findVideos" }, (response) => {
            if (response && response.videos) {
                let textContent = "";
                if (response.videos.length == 0) {
                    textContent = "No Sponsored Video";
                } else {
                    textContent = response.videos.join(", ");
                }
                document.getElementById("result").textContent = textContent;
            } else {
                document.getElementById("result").textContent = "error occurred.";
            }
        });
    });
});

document.getElementById("copyButton").addEventListener("click", () => {
    const copyText = document.getElementById("result");
    navigator.clipboard.writeText(copyText.textContent);
});