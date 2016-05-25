$(function() {
  var page = 1;
  $('#more-button').hide();
  $('#details-page').hide();
  $(".searchform").submit(function (event) {
    event.preventDefault();
    $('#results').html('');
    page = 1;
    callForResultsPage();
  });

  $('#more-button').click(function() {
    page++;
    callForResultsPage();
  });

  $('#search-page').on('click', 'a', function (event){
    event.preventDefault();
    $('#search-page').hide();
    var imdbID = $(this).data('imdbID');
    //make ajax call
    $.ajax({
      url: 'http://omdbapi.com/',
      method: 'GET',
      data: {
        i: imdbID,
        tomatoes: true
      },
      success: function(data) {
        $('.actors').text(data.Actors);
        $('.title').text(data.Title);
        $('.rated').text(data.Rated);
        $('.year').text(data.Year);
        $('.runtime').text(data.Runtime);
        $('.released').text(data.Released);
        $('.awards').text(data.Awards);
        $('.language').text(data.Language);
        $('.plot').text(data.Plot);
        $('.metascore').text(data.Metascore);
        $('.tomatoconsensus').text(data.tomatoConsensus);
        $('.tomatometer').text(data.tomatoMeter);
        $('.imdbrating').text(data.imdbRating);
        $('.imdblink').attr('href', 'http://imdb.com/title/' + data.imdbID);
        $('.rt').attr('href', data.tomatoURL);
        $('.poster').attr('src', data.Poster)
        .attr('alt', data.Title);
        console.log('details ajax call: ', data);
      }
    });
    $('#details-page').show();
  });
  $('#details-page').on('click', '#back', function(event){
    event.preventDefault();
    $('#search-page').show();
    $('#details-page').hide();
  });

  function callForResultsPage() {
    var search = $(".searchbox").val();
    $.ajax({
      url: 'http://omdbapi.com/',
      method: 'GET',
      data: {
        s: search,
        page: page
      },
      success: function(data) {
        var theCorrectIMDBUrl = "http://imdb.com/title/";
        var arrayOfResults = data.Search;
        for (var i = 0; i < arrayOfResults.length; i++) {
          var arrayElement = arrayOfResults[i];
          var a = $('<a>');
          a.data('imdbID', arrayElement.imdbID);
          a.addClass('result');
          var img = $('<img>').attr('alt', arrayElement.Title);

          if (arrayElement.Poster === 'N/A') {
            //show image not available image
            img.attr('src', 'img-na.png');
          } else {
            img.attr('src', arrayElement.Poster);
          }

          a.append(img);
          $('#results').append(a);
        }
        if (Number(data.totalResults) > arrayOfResults.length) {
          $('#more-button').show();
        }
        console.log('Got the data: ', data);
      }
    });
  }
});
