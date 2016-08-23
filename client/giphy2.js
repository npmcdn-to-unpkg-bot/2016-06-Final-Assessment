var app;
$(function() {

  app = {
    init: function() {
        app.fetch();
    // add listener to the save button
    $('button').on('click', app.savegighy);    
    },
    fetch: function() {
      $.ajax({
        url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
        type: 'GET',
        contentType: 'application/json',
        success: function(res) {
          console.log('giphys: giphys fetched');
          console.log(res.data);
          app.populateGiphys(res.data);
        },
        error: function(data) {
          console.error('giphys: Failed to fetch messages');
        }
      });
    },
    populateGiphys: function(data) {
      console.log('giphys: populateGiphys');
      if (Array.isArray(data)) {
        console.log(data);
        for (var i = 0; i<data.length; i++) {
          app.addGiphy(data[i]);
        };
      }
    },
    addGiphy: function(obj) {
      console.log('giphys: addGiphys');

      var $table = $('#table_giphy');
      var $tr = $('<tr></tr>');
      // create the td for the giphy
      var $td_giphy = $('<td></td>');
      // https://media4.giphy.com/media/90sGm2Ld0Z66Y/200w.gif
      var imgSrc = obj.images.fixed_width.url;
      var $giphy = $('<img src="' + imgSrc + '" class="giphy"/>');
      $td_giphy.html($giphy);

      // create the td for the save button. 
      var $td_save = $('<td></td>');
      var $save = $('<button data_url="' + imgSrc + ' "type="button">Save!</button>');
      $td_save.html($save);

      // append them both to the tr
      $tr.append($td_giphy).append($td_save);
      $tr.appendTo($table);
    },
    clearGiphies: function() {
      $('#table_giphy').html('')
    }
    // savegighy: function(evt) {
    //   var url = $(evt.currentTarget).attr('data_url');
    //   console.log("In ssavegighy url: " + url);
    //   $.ajax({
    //     url: '/savegiphy',
    //     data: {url: url},
    //     type: 'GET',
    //     success: function(res) {
    //       console.log("In ssavegighy success callback");
    //     },
    //     error: function(err) {
    //       console.error(err);
    //     }
    //   });
    // }
}());
