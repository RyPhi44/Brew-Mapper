var map
$(document).ready(function(){

// sends request to brewerydb for information on breweries
  $.get("http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=f16dad2851cec7f5e563c75bc9a760b1&region=colorado&locationType=micro,macro,nano,cidery", function(result) {

    result.data.forEach(function(brewery) {
      // $("ul").append("<li>"+brewery.brewery.name+"</li>")
      var marker = new google.maps.Marker({
        position: {lat: brewery.latitude, lng: brewery.longitude},
        map: map
      });
    });
  })
});

function initMap() {
  var denver = {lat: 39.742043, lng: -104.991531};
    map= new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: denver
  });
}

// When marker is clicked, marker is highlighted and information about selected brewery is added to page
