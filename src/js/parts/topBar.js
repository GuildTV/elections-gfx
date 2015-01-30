App.parts['topBar'] = {
  setup: function() {
    $('.main').prepend(
      $('<div></div>').addClass('topBar').append(
        $('<div></div>').addClass('container')
          .append(
            $('<div></div>').addClass('col-md-3').append(
              $('<img></img>').addClass('logo').attr('src', 'public/img/logo.png')
            )
          )
          .append(
            $('<div></div>').addClass('col-md-3').text('#guildelections')
          )
          .append(
            $('<div></div>').addClass('col-md-3').text('LIVE')
          )
      )
    );
  },

  render: function() {

  }
}