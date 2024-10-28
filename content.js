chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "findVideos") {
        let videoSources = [];
        const articles = getAllArticles();
        for (let i = 0; i < articles.length; i++) {
            if (isArticleSponsoredElement(articles[i])) {
                const videos = articles[i].querySelectorAll("video");
                videos.forEach(video => {
                    videoSources.push(video.src);
                });
            } else {
                if (i > 0) {
                    articles[i].remove();
                }
            }
        }
        sendResponse({ videos: videoSources });
    }
    return true; // Indicate that the response will be sent asynchronously
});

const sponsorTexts =
    [
        "Sponsored",
        "Promotional content",
        "Paid partnership",
        "Được tài trợ",
    ]

function getAllArticles() {
    const elements = document.querySelectorAll('div');
    const articles = [];
    elements.forEach(element => {
        const parentArticle = element.closest('article');
        if (parentArticle) {
            articles.push(parentArticle);
        }
    });

    return [...new Set(articles)]
}

function isArticleSponsoredElement(article) {
    const elements = article.querySelectorAll('div');
    elements.forEach(element => {
        if (sponsorTexts.some(sponsorText => element.textContent.toLowerCase().includes(sponsorText.toLowerCase()))) {
            return true;
        }
    });
    return false;
}

function findSponsoredElements() {
    const elements = document.querySelectorAll('div');
    const sponsoredElements = [];

    elements.forEach(element => {
        if (sponsorTexts.some(sponsorText => element.textContent.toLowerCase().includes(sponsorText.toLowerCase()))) {
            const parentArticle = element.closest('article');
            if (parentArticle) {
                sponsoredElements.push(parentArticle);
            }
        }
    });

    return [...new Set(sponsoredElements)]
}
