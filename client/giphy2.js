var app;
$(function() {

  app = {
    url: 'http://api.giphy.com/v1/gifs/search?q=cat&limit=10&api_key=dc6zaTOxFJmzC',
    init: function() {
      app.fetch();
    },
    fetch: function(url, q) {
      $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
          console.log('giphys: Giphys fetched');

          // Don't bother if we have nothing to work with
          if (!data.results || !data.results.length) { return; }
          console.log(data);
        },
        error: function(data) {
          console.error('giphys: Failed to fetch messages');
        }
      });
    },
    populateGiphys: function(data) {

      if (Array.isArray(data)) {
        console.log(data);
      }
    }
  }  
}());
