






























// $(document).ready(function(){
//
//   function findData(postalCode){
//     postalCode = postalCode || 80202
// }
//
// $.get("http://galvanize-cors-proxy.herokuapp.com/http://api.brewerydb.com/v2/locations/?key=f16dad2851cec7f5e563c75bc9a760b1&postalCode="+postalCode+"&locationType=micro,macro,nano,cidery", function(result) {
//   console.log(result);
// result.data.forEach(function(brewery) {
//
//   var content = "<h1 class='nameTag'>"+brewery.brewery.name+"</h1>" +
//     "<p class='markerTag'>"+brewery.streetAddress+", "+brewery.locality+", "+brewery.region+" "+brewery.postalCode+"</p>"
//   if (brewery.phone !== undefined) {
//     content += "<p class='phoneTag'>"+"Phone: "+brewery.phone+"</p>" ;
//   }
//   if (brewery.website !== undefined) {
//     content += "<a class='webTag' href="+brewery.website+">"+brewery.website+"</a>";
//   }
//   document.getElementById("brewery_button").addEventListener("click", function(){
//     // find input box, get value, store variable, pass to findData jquery select input box
//     var brewData = $(".searchBox").val()
//     findData(zipData)
//       })
//     }
//   }
// }
