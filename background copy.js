// Listen for right-click events on the page.
document.addEventListener("contextmenu", handleContextMenu);

function handleContextMenu(event) {
    // Retrieve the URL of the currently highlighted tab.
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        var url = activeTab.url;

        // Send the URL to the PyLoad API server.
        sendUrlToPyLoad(url);
    });
}

function sendUrlToPyLoad(url) {
    var pyloadApiUrl = "http://pyload.example.com/api/addPackage";

    // Make a POST request to the PyLoad API.
    fetch(pyloadApiUrl, {
        method: "POST",
        body: JSON.stringify({ url: url }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            // Check the status of the response.
            if (response.status === 200) {
                // If the request was successful, display a notification to the user.
                chrome.notifications.create(null, {
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "Send URL to PyLoad",
                    message: "The URL was sent to the PyLoad server successfully."
                });
            }
        })
        .catch(function (error) {
            // TODO: Handle any errors that occur.
        });
}
