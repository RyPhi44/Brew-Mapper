var map, infoWindows = [], markers = [];
$(document).ready(function(){

// sends request to brewerydb for information on breweries
    function findData(postalCode){
      postalCode = postalCode || 80202
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
      $.get("http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=f16dad2851cec7f5e563c75bc9a760b1&postalCode="+postalCode+"&locationType=micro,macro,nano,cidery", function(result) {
        console.log(result);
      result.data.forEach(function(brewery) {
        // $("ul").append("<li>"+brewery.brewery.name+"</li>")
        var marker = new google.maps.Marker({
          position: {lat: brewery.latitude, lng: brewery.longitude},
          map: map
        });
        markers.push(marker)
        var content = "<h1 class='nameTag'>"+brewery.brewery.name+"</h1>"
        if (brewery.streetAddress === undefined) {
          content += "<p class='markerTag'>"+brewery.locality+", "+brewery.region+" "+brewery.postalCode+"</p>"
        }else{
          content += "<p class='markerTag'>"+brewery.streetAddress+", "+brewery.locality+", "+brewery.region+" "+brewery.postalCode+"</p>"
        }

        if (brewery.phone !== undefined) {
          content += "<p class='phoneTag'>"+"Phone: "+brewery.phone+"</p>" ;
        }
        if (brewery.website !== undefined) {
          content += "<a class='webTag' href="+brewery.website+">"+brewery.website+"</a>";
        }

        var infowindow = new google.maps.InfoWindow({
          content,
          maxWidth: 300
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
  }
  document.getElementById("location_button").addEventListener("click", function(){
    // find input box, get value, store variable, pass to findData jquery select input box
    var zipData = $(".zipInput").val()
    findData(zipData)
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
