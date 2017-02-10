var map, infoWindows = [], markers = [];
$(document).ready(function(){

// sends request to brewerydb for information on breweries
    function findData(locality){
      locality = locality || "Denver"

      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null)
      }
      $.get("http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=f16dad2851cec7f5e563c75bc9a760b1&locality="+locality+"&locationType=micro,macro,nano,cidery", function(result) {
        console.log(result);
      result.data.forEach(function(brewery) {
        // $("ul").append("<li>"+brewery.brewery.name+"</li>")
        var marker = new google.maps.Marker({
          position: {lat: brewery.latitude, lng: brewery.longitude},
          map: map,
          animation: google.maps.Animation.DROP
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
          maxWidth: 400
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
  initMap();


function initMap() {
  var denver = {lat: 39.742043, lng: -104.991531};
    map= new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: denver
  });

  var geocoder = new google.maps.Geocoder();

        document.getElementById('location_button').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
        $("#address").keyup(function(event){
          if(event.keyCode == 13){
        $("#location_button").click();
            }
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });


  // marker.addListener('click', function() {
  //      map.setZoom(8);
  //      map.setCenter(marker.getPosition());
  //    });


  }
});
