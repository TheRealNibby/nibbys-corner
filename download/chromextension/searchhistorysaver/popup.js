document.addEventListener('DOMContentLoaded', function() {
  var saveButton = document.getElementById('saveHistory');
  saveButton.addEventListener('click', function() {
    chrome.history.search({text: '', maxResults: 100}, function(data) {
      var historyText = '';
      data.forEach(function(page) {
        historyText += page.url + '\n'; // Adjust for how you want to format the history
      });

      chrome.downloads.download({
        filename: 'search_history.txt',
        url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(historyText)
      });
    });
  });
});