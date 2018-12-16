function dairy(){

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
      var url = 'https://apis.mapmyindia.com/advancedmaps/v1/1j1qr2ytnl6h8yqsun1y513mkwqpmwyy/geo_code?addr='+arrItems[i];
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
  //console.log(res.sort());
  var convexHull = new ConvexHullGrahamScan();
  for (var i =0;i<res.length;i++){
    convexHull.addPoint(res[i][0],res[i][1] );
  }
  var hullPoints = convexHull.getHull();
  var final = []
  for(var i=0; i< hullPoints.length;i++){
    var ad = []
  ad =[hullPoints[i].x,hullPoints[i].y];
  final.push(ad);
  }
  //console.log(final);
  //poly1(final);
  });

  $.getJSON("static/js/gurgaon-milk-collector-locations.json", function (data) {
    var arrItems = [];
    $.each(data, function (index, value) {

                arrItems.push(value['town'] +' '+ value['sub-district'] + ' '+value['district'] + ' '+value['state']);
    });
    var res = [];
    //console.log(arrItems);

    for (var i=0;i<arrItems.length;i++){
      var res1 = [];
      var url = 'https://apis.mapmyindia.com/advancedmaps/v1/1j1qr2ytnl6h8yqsun1y513mkwqpmwyy/geo_code?addr='+arrItems[i];
      $.ajax({
          url: url,
          async: false,
          success: function(response) {
              res1 = [JSON.stringify(Math.round(response.results[0].lat*1000000)/1000000),JSON.stringify(Math.round(response.results[0].lng*1000000)/1000000)];
              var marker = L.marker(res1, {icon:icon}).addTo(map);
          }
      });
      res.push(res1);
    }
  //console.log(res.sort());
  var convexHull = new ConvexHullGrahamScan();
  for (var i =0;i<res.length;i++){
    convexHull.addPoint(res[i][0],res[i][1] );
  }
  var hullPoints = convexHull.getHull();
  var final = []
  for(var i=0; i< hullPoints.length;i++){
    var ad = []
  ad =[hullPoints[i].x,hullPoints[i].y];
  final.push(ad);
  }
  //console.log(final);
  //poly2(final);
  });

}
function getBoundaries(){

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
      var url = 'https://apis.mapmyindia.com/advancedmaps/v1/1j1qr2ytnl6h8yqsun1y513mkwqpmwyy/geo_code?addr='+arrItems[i];
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
  //console.log(res.sort());
  var convexHull = new ConvexHullGrahamScan();
  for (var i =0;i<res.length;i++){
    convexHull.addPoint(res[i][0],res[i][1] );
  }
  var hullPoints = convexHull.getHull();
  var final = []
  for(var i=0; i< hullPoints.length;i++){
    var ad = []
  ad =[hullPoints[i].x,hullPoints[i].y];
  final.push(ad);
  }
  //console.log(final);
  poly1(final);
  });

  $.getJSON("static/js/gurgaon-milk-collector-locations.json", function (data) {
    var arrItems = [];
    $.each(data, function (index, value) {

                arrItems.push(value['town'] +' '+ value['sub-district'] + ' '+value['district'] + ' '+value['state']);
    });
    var res = [];
    //console.log(arrItems);

    for (var i=0;i<arrItems.length;i++){
      var res1 = [];
      var url = 'https://apis.mapmyindia.com/advancedmaps/v1/1j1qr2ytnl6h8yqsun1y513mkwqpmwyy/geo_code?addr='+arrItems[i];
      $.ajax({
          url: url,
          async: false,
          success: function(response) {
              res1 = [JSON.stringify(Math.round(response.results[0].lat*1000000)/1000000),JSON.stringify(Math.round(response.results[0].lng*1000000)/1000000)];
              var marker = L.marker(res1, {icon:icon}).addTo(map);
          }
      });
      res.push(res1);
    }
  //console.log(res.sort());
  var convexHull = new ConvexHullGrahamScan();
  for (var i =0;i<res.length;i++){
    convexHull.addPoint(res[i][0],res[i][1] );
  }
  var hullPoints = convexHull.getHull();
  var final = []
  for(var i=0; i< hullPoints.length;i++){
    var ad = []
  ad =[hullPoints[i].x,hullPoints[i].y];
  final.push(ad);
  }
  //console.log(final);
  poly2(final);
  });
  function poly1(res) {
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
     poly.bindPopup("Potential Distribution Area").openPopup(); /*binds popup to the polygon*/
   });
   map.addLayer(poly);
   polygons.push(poly);
   map.fitBounds(poly.getBounds());
  }
  function poly2(res) {
  //console.log('Hello');
    var pts = res
   var patArr = [];
   for (var i = 0; i < pts.length; i++) {
     patArr.push(new L.LatLng(pts[i][0], pts[i][1]));
   }
   var poly = new L.polygon(patArr, {
     color: "orange"
   });
   poly.on("mousedown", function(e) { /*mouseup event on polygon P2*/
     getBounds(poly, "Yellow polygon");
   });
   poly.on("click", function(e) { /*click event on polygon P2*/
     poly.bindPopup("Potential Collection Center").openPopup(); /*binds popup to the polygon*/
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
  smarker.setLatLng([lat, lon]);
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


function food(){

  var arrItems = [];

  $.getJSON("static/js/restaurant-locations.json", function (data) {
    var arrItems = [];
    $.each(data, function (index, value) {
                arrItems.push(value['HOTEL-NAME'] +' '+ value['ADDRESS'] + ' '+value['district'] + ' '+value['STATE']);
    });
    //var res = [];
    //console.log(arrItems);

   for (var i=0;i<150;i++){
      var res1 = [];
      var url = 'https://apis.mapmyindia.com/advancedmaps/v1/1j1qr2ytnl6h8yqsun1y513mkwqpmwyy/geo_code?addr='+arrItems[i];
      $.ajax({
          url: url,
          async: false,
          success: function(response) {
              res1 = [JSON.stringify(Math.round(response.results[0].lat*1000000)/1000000),JSON.stringify(Math.round(response.results[0].lng*1000000)/1000000)];
              marker = L.marker(res1).addTo(map);
          }
      });
      //res.push(res1);
    }

  //console.log(res.sort());

  //console.log(final);
  //poly1(final);
  });

}
function getBoundaries1(){
  window.location.href="/car";
}
