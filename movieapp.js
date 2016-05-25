$(function() {
  var page = 1;
  $('#more-button').hide();
  $('#details-page').hide();
  $(".searchform").submit(function (event) {
    event.preventDefault();
    $('#results').html('');
    page = 1;
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
          var a = $('<a>')
            .attr('href', theCorrectIMDBUrl + arrayElement.imdbID);
          a.data('imdbID', arrayElement.imdbID);
          var img = $('<img>')
            .attr('src', arrayElement.Poster)
            .attr('alt', arrayElement.Title);
          a.append(img);
          $('#results').append(a);
        }
        if (data.totalResults > data.Search.length) {
          $('#more-button').show();
        }
        console.log('Got the data: ', data);
      }
    });
  });
  $('#more-button').click(function() {
    page++;
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
          var a = $('<a>')
            .attr('href', theCorrectIMDBUrl + arrayElement.imdbID);
          //hopefully this works
          a.data('imdbID', arrayElement.imdbID);
          var img = $('<img>')
            .attr('src', arrayElement.Poster)
            .attr('alt', arrayElement.Title);
          a.append(img);
          $('#results').append(a);
        }
        if (data.totalResults > data.Search.length) {
          $('#more-button').show();
        }
        console.log('Got the data: ', data);
      }
    });
  });
  $('body').on('click', 'a', function (event){
    event.preventDefault();
    $('#search-page').hide();
    var imdbID = $(this).data('imdbID');
    console.log(imdbID);
    //make ajax call
    $.ajax({
      url: 'http://omdbapi.com/',
      method: 'GET',
      data: {
        i: imdbID
      },
      success: function(data) {
        $('.actors').text(data.Actors);
        $('.title').text(data.Title);
        $('.rated').text(data.Rated);
        $('.year').text(data.Year);
        $('.poster').attr('src', data.Poster)
        .attr('alt', data.Title);
        console.log('details ajax call: ', data);
      }
    });
    $('#details-page').show();
  });
  $('body').on('click', '#back', function(event){
    event.preventDefault();
    $('#search-page').show();
    $('#details-page').hide();
  });
});
