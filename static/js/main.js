var map = new MapmyIndia.Map("map", {

  zoomControl: true,
  hybrid: true,
  search: true,
  location: true
});
var marker;
var k;
polygons = [];
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
    var res1 = [];
    var url = 'https://apis.mapmyindia.com/advancedmaps/v1/9p5b7mysqg4zp4xxm4l37zrkx7zqnejv/geo_code?addr='+arrItems[i];
    $.ajax({
        url: url,
        async: false,
        success: function(response) {
            res1 = [JSON.stringify(Math.round(response.results[0].lat*1000000)/1000000),JSON.stringify(Math.round(response.results[0].lng*1000000)/1000000)];
            marker = L.marker(res1).addTo(map);
        }
    });
    res.push(res1);
  }
console.log(res.sort());

poly1(res);
});

$.getJSON("static/js/gurgaon-milk-collector-locations.json", function (data) {
  var arrItems1 = [];
  $.each(data, function (index, value) {

              arrItems1.push(value['town'] +' '+ value['sub-district'] + ' '+value['district'] + ' '+value['state']);
  });
  var res = [];
  //console.log(arrItems1);
  for (var i=0;i<arrItems1.length;i++){
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
              var k = JSON.parse(this.responseText);
            //  console.log(k.results[0].lat)
            //  console.log(k.results[0].lng)
              var lat = Math.round(k.results[0].lat*1000000)/1000000;
              var lng = Math.round(k.results[0].lng*1000000)/1000000
              var marker = L.marker([lat,lng], {icon:icon}).addTo(map);

           }
      };
    url ="https://apis.mapmyindia.com/advancedmaps/v1/9p5b7mysqg4zp4xxm4l37zrkx7zqnejv/geo_code?addr="+arrItems1[i];
    //  console.log(url);
      xhttp.open("POST",url, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send("Done");
  }
});
function poly1(res) {
console.log('Hello');
  var pts = res
 var patArr = [];
 for (var i = 0; i < pts.length; i++) {
   patArr.push(new L.LatLng(pts[i][0], pts[i][1]));
 }
 var poly = new L.polygon(patArr, {
   color: "yellow"
 });
 poly.on("mousedown", function(e) { /*mouseup event on polygon P2*/
   getBounds(poly, "Yellow polygon");
 });
 poly.on("click", function(e) { /*click event on polygon P2*/
   poly.bindPopup("Yellow Polygon").openPopup(); /*binds popup to the polygon*/
 });
 map.addLayer(poly);
 polygons.push(poly);
 map.fitBounds(poly.getBounds());


}

function showCircle()
{

lat = 29.1492;
lon =  75.7217;
radius = 19000;
//smarker.setLatLng([lat, lon]);
currentDiameter = L.circle([lat, lon],
{
color: 'blue',
fillColor: '#FFC0CB',
fillOpacity: 0.5,
radius: radius
});
currentDiameter.addTo(map);
map.fitBounds(currentDiameter.getBounds());
}
showCircle();
function showCircle1()
{

  lat = 28.7752;
  lon =  75.9928;
radius = 15000;
//smarker.setLatLng([lat, lon]);
currentDiameter = L.circle([lat, lon],
{
color: 'blue',
fillColor: '#ff4500',
fillOpacity: 0.5,
radius: radius
});
currentDiameter.addTo(map);
map.fitBounds(currentDiameter.getBounds());
}
showCircle1();
function showCircle2()
{

  lat = 29.3011;
  lon =  76.3458;
radius = 12000;
//smarker.setLatLng([lat, lon]);
currentDiameter = L.circle([lat, lon],
{
color: 'blue',
fillColor: '#cccc00',
fillOpacity: 0.5,
radius: radius
});
currentDiameter.addTo(map);
map.fitBounds(currentDiameter.getBounds());
}
showCircle2();
function showCircle3()
{

  lat = 29.7857;
  lon =  76.3985;
radius = 13000;
//smarker.setLatLng([lat, lon]);
currentDiameter = L.circle([lat, lon],
{
color: 'blue',
fillColor: '#00FFFF',
fillOpacity: 0.5,
radius: radius
});
currentDiameter.addTo(map);
map.fitBounds(currentDiameter.getBounds());
}
showCircle3();
function showCircle4()
{

  lat = 29.5336;
  lon =  75.0177;
radius = 24000;
//smarker.setLatLng([lat, lon]);
currentDiameter = L.circle([lat, lon],
{
color: 'blue',
fillColor: '#4169e1',
fillOpacity: 0.5,
radius: radius
});
currentDiameter.addTo(map);
map.fitBounds(currentDiameter.getBounds());
}
showCircle4();

}
