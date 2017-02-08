var map, infoWindows = [];
$(document).ready(function(){

// sends request to brewerydb for information on breweries
  $.get("http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=f16dad2851cec7f5e563c75bc9a760b1&region=colorado&locationType=micro,macro,nano,cidery", function(result) {
console.log(result);
    result.data.forEach(function(brewery) {
      // $("ul").append("<li>"+brewery.brewery.name+"</li>")
      var marker = new google.maps.Marker({
        position: {lat: brewery.latitude, lng: brewery.longitude},
        map: map
      });
      var infowindow = new google.maps.InfoWindow({
        content:
        "<h1 class='nameTag'>"+brewery.brewery.name+"</h1>" +
        "<p class='markerTag'>"+brewery.streetAddress+", "+brewery.locality+", "+brewery.region+" "+brewery.postalCode+"</p>" + 
        "<p class='phoneTag'>"+"Phone: "+brewery.phone+"</p>" +
         "<p class='webTag'>"+"Website: "+brewery.website+"</p>"
      });

      infoWindows.push(infowindow);

      marker.addListener('click', function() {
        for (var i = 0; i < infoWindows.length; i++) {
          infoWindows[i].close()
        }
        infowindow.open(map, marker);
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
