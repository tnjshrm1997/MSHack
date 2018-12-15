var map = new MapmyIndia.Map("map", {

  zoomControl: true,
  hybrid: true,
  search: true,
  location: true
});

var icon = L.icon(
{
iconUrl: 'http://127.0.0.1:5000/static/js/mark.png',
iconRetinaUrl: 'http://127.0.0.1:5000/static/js/mark.png',
iconSize: [70, 50],
popupAnchor: [-3, -15]
});
window.onload = function(){
var arrItems = [];

$.getJSON("static/js/gurgaon-milk-distributor-locations.json", function (data) {
  var arrItems = [];
  $.each(data, function (index, value) {

              arrItems.push(value['town'] +' '+ value['sub-district'] + ' '+value['district'] + ' '+value['state']);
  });
  var res = [];
  //console.log(arrItems);
  for (var i=0;i<arrItems.length;i++){
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
              var k = JSON.parse(this.responseText);
              //console.log(k.results[0].lat)
              //console.log(k.results[0].lng)
              var lat = Math.round(k.results[0].lat*1000000)/1000000;
              var lng = Math.round(k.results[0].lng*1000000)/1000000
              var marker = L.marker([lat,lng]).addTo(map);

           }
      };
    url ="https://apis.mapmyindia.com/advancedmaps/v1/9p5b7mysqg4zp4xxm4l37zrkx7zqnejv/geo_code?addr="+arrItems[i];
    //  console.log(url);
      xhttp.open("POST",url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send("Your JSON Data Here");
  }
});


$.getJSON("static/js/gurgaon-milk-collector-locations.json", function (data) {
  var arrItems1 = [];
  $.each(data, function (index, value) {

              arrItems1.push(value['town'] +' '+ value['sub-district'] + ' '+value['district'] + ' '+value['state']);
  });
  var res = [];
  console.log(arrItems1);
  for (var i=0;i<arrItems1.length;i++){
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
              var k = JSON.parse(this.responseText);
              console.log(k.results[0].lat)
              console.log(k.results[0].lng)
              var lat = Math.round(k.results[0].lat*1000000)/1000000;
              var lng = Math.round(k.results[0].lng*1000000)/1000000
              var marker = L.marker([lat,lng], {icon:icon}).addTo(map);

           }
      };
    url ="https://apis.mapmyindia.com/advancedmaps/v1/9p5b7mysqg4zp4xxm4l37zrkx7zqnejv/geo_code?addr="+arrItems1[i];
      console.log(url);
      xhttp.open("POST",url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send("Your JSON Data Here");
  }
});
}
