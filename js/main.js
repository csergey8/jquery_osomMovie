var osomMovie = {};


osomMovie.database = [];

osomMovie.init = function() {
  osomMovie.filterSlider();
  osomMovie.getTypes();
  osomMovie.getDirectors();
  osomMovie.generateMarkup();
}


osomMovie.loadAssets = function() {
  $.getJSON("db/movies.json", function(data) {
    osomMovie.database = data;
    osomMovie.init();
  })
} 


osomMovie.filterSlider = function() {
  $('.filter.open').on('click', function() {
    $('.filter_container').slideToggle(300, function() {
      var btn = $(this).prev();

      if(btn.hasClass('active')) {
        $('.filter.open').find('.btn').text('Filter by');
        btn.removeClass('active');  
      } else {
        $('.filter.open').find('.btn').text('Close');
        btn.addClass('active');  
      }
    })
  })
}

osomMovie.getTypes = function() {
  var types = [];
  $.each(osomMovie.database, function(index, elem) {
    if($.inArray(osomMovie.database[index].type, types)) {
      var typeValue = osomMovie.database[index].type;
      types.push(typeValue);
      $('#categories').append(`<option value=${typeValue}>${typeValue}</option>`)
    }
    
  })
}

osomMovie.getDirectors = function() {
  var directors = [];
  $.each(osomMovie.database, function(index, elem) {
    if($.inArray(osomMovie.database[index].director, directors)) {
      var directorValue = osomMovie.database[index].director;
      directors.push(directorValue);
      $('#directors').append(`<option value=${directorValue}>${directorValue}</option>`)
    }
    
  })
}

osomMovie.generateMarkup = function() {
  var template = '';

  $.each(osomMovie.database, function(index) {

    template += `<div class="movie_item" data-id="${osomMovie.database[index].id}">`;
    template +=   '<div class="header">';
    template +=     '<div class="left">';
    template +=       `<img src="images/movies/${index + 1}.jpg" alt="">`;
    template +=    '</div>';
    template +=     '<div class="right">';
    template +=       `<h3>${osomMovie.database[index].title}</h3>`;
    template +=      '<div class="node">';
    template +=         `<span>Year: </span> ${osomMovie.database[index].year}`;
    template +=      '</div>';
    template +=       '<div class="node">';
    template +=         `<span>Director: </span> ${osomMovie.database[index].director}`;
    template +=       '</div>';
    template +=       '<div class="node">';
    template +=        `<span>Type: </span> ${osomMovie.database[index].type}`;
    template +=       '</div>';
    template +=       '<div class="show_desc">';
    template +=         'See description';
    template +=      '</div>';
    template +=     '</div>';
    template +=   '</div>';
    template +=   '<div class="description">';
    template +=     `<strong>Description:</strong> ${osomMovie.database[index].desc}`;
    template +=   '</div>';
    template += '</div>';
  })

  $('.movies_content').append(template);
  osomMovie.showDescription();
  osomMovie.startFilter();
}

osomMovie.showDescription = function() {
  $('.show_desc').on('click', function() {
    var $this = $(this);
    var parent = $(this).parents().eq(2);
    var element = parent.find('.description');
    console.log(element);
    element.slideToggle(200, function() {
      if($this.hasClass('active')){
        $this.text('See Description');
        $this.removeClass('active');
      } else {
        $this.text('Hide Description');
        $this.addClass('active');
      }
    })
  })
}

osomMovie.startFilter = function() {
  $('select').on('change', function() {
    var db = osomMovie.database;
    var type = $('#categories').val();
    var director = $('#directors').val(); 
    var results = [];


    $.each(db, function(index) {
      if(db[index].type === type) {
        results.push(db[index].id)
      }
      if(db[index].director === director) {
        results.push(db[index].id)
      }
    })
    
    if(results.length < 0) {
      $('.movie_item').show();
    } else {
      var uniqueArray = [];
      $.each(results, function(i, el) {
        if($.inArray(el, uniqueArray) == -1) uniqueArray.push(el)
      })
      $('.movie_item').hide();
      $.each(uniqueArray, function(i, e) {
        $(`div[data-id="${e}"]`).show();
      })
    }
  })
}


osomMovie.loadAssets();