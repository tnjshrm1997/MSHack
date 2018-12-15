var map = null;
var polygons = [];
var visbility = false;
var p1 = null;
var poly;
var pts;
window.onload = function() {
  var centre = new L.LatLng(28.549948, 77.268241);
  map = new MapmyIndia.Map('map', {
    center: centre,
    editable: true,
    zoomControl: true,
    hybrid: true
  });
  L.EditControl = L.Control.extend({
    options: {
      position: 'topleft',
      callback: null,
      kind: '',
      html: ''
    },
    onAdd: function(map) {
      var container = L.DomUtil.create('div', 'leaflet-control leaflet-bar'),
        link = L.DomUtil.create('a', '', container);

      link.href = '#';
      link.title = 'Create a new ' + this.options.kind;
      link.innerHTML = this.options.html;
      L.DomEvent.on(link, 'click', L.DomEvent.stop)
        .on(link, 'click', function() {
          window.LAYER = this.options.callback.call(map.editTools);
        }, this);

      return container;
    }
  });
  // add polygon creation/editing control
  L.NewPolygonControl = L.EditControl.extend({
    options: {
      position: 'topleft',
      callback: map.editTools.startPolygon,
      kind: 'polygon',
      html: 'Poly'
    }
  });
  // add rectangle creation/editing control
  L.NewRectangleControl = L.EditControl.extend({
    options: {
      position: 'topleft',
      callback: map.editTools.startRectangle,
      kind: 'rectangle',
      html: 'Rec'
    }
  });

  // add controls to map
  map.addControl(new L.NewPolygonControl());
  map.addControl(new L.NewRectangleControl());


  var deleteShape = function(e) {

    if ((e.originalEvent.ctrlKey || e.originalEvent.metaKey) && this.editEnabled()) {
      this.editor.deleteShapeAt(e.latlng);
    }

  };
  map.on('layeradd', function(e) {
    if (e.layer instanceof L.Path) //delete shape
      e.layer.on('click', L.DomEvent.stop).on('click', deleteShape, e.layer);
  });
  var mk = L.marker(centre, {
    draggable: true
  }).addTo(map);
  mk.on("dragend", function(e) { /*marker events*/
    var pt = e.target._latlng;
    //var contains = p1.getBounds().contains(pt);/*Returns whether wgs point is contained within polygon or not*/
    var contains = isPointInLayer(pt, p1)
    var event_div = document.getElementById("event-log");
    event_div.innerHTML = '';
    event_div.innerHTML = contains ? "Marker is contained within green polygon.</br>" : "Marker is outside of green polygon.</br>" + event_div.innerHTML;
  });

  pts = [
    new L.LatLng(centre.lat - 10 / 1000, centre.lng - 10 / 1000),
    new L.LatLng(centre.lat + 0 / 1000, centre.lng - 10 / 1000),
    new L.LatLng(centre.lat + 10 / 1000, centre.lng - 20 / 1000),
    new L.LatLng(centre.lat + 0 / 1000, centre.lng - 20 / 1000),
    new L.LatLng(centre.lat + 5 / 1000, centre.lng - 5 / 1000),
    new L.LatLng(centre.lat + 15 / 1000, centre.lng - 15 / 1000),
    new L.LatLng(centre.lat + 15 / 1000, centre.lng + 15 / 1000),
    new L.LatLng(centre.lat + 0 / 1000, centre.lng + 0 / 1000),
    new L.LatLng(centre.lat + 10 / 1000, centre.lng + 20 / 1000),
    new L.LatLng(centre.lat - 15 / 1000, centre.lng + 20 / 1000),
    new L.LatLng(centre.lat - 10 / 1000, centre.lng + 0 / 1000)
  ]; /*Array of WGS location object*/
  createGreenPolygon(pts);
  var arrItems = [];
  $.getJSON("static/js/gurgaon-milk-distributor-locations.json", function (data) {
    var arrItems = [];
    $.each(data, function (index, value) {

                arrItems.push(value['town'] +' '+ value['sub-district'] + ' '+value['district'] + ' '+value['state']);
    });
    var res = [];
    //console.log(arrItems);
    for (var i=0;i<1;i++){
      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                var k = JSON.parse(this.responseText);
                console.log(k.results[0].lat)
                console.log(k.results[0].lng)


             }
        };
    	url ="https://apis.mapmyindia.com/advancedmaps/v1/9p5b7mysqg4zp4xxm4l37zrkx7zqnejv/geo_code?addr="+arrItems[i];
        console.log(url);
        xhttp.open("POST",url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send("Your JSON Data Here");
    }
});

}

function createGreenPolygon(pts) {
  p1 = new L.polygon(pts, {
    color: "green",
    draggable: true
  }); /**craetes a polygon with color:green*/
  p1.on("click", function(e) { /*click event on polygon P1*/
    p1.bindPopup("Green Polygon").openPopup(); /*binds popup to the polygon*/
  });
  map.addLayer(p1); /*add the polygon to map*/
  p1.on("mousedown", function(e) { /*mouseup event on polygon P1*/
    getBounds(p1, "Green polygon");
  });

}

function getBounds(poly, name) {
  if (poly) {
    var event_div = document.getElementById("event-log");
    event_div.innerHTML = '';
    var bounds = poly.getBounds(); /*Returns the bounding box of this polygon in WGS coordinates. */
    var centroidPoint = bounds.getCenter(); /*Returns the position of the polygon, as the centroid point, calculated from points. */
    event_div.innerHTML = "" + name + ":</br> north east lat:" + bounds.getNorthEast().lat +
      "</br> north east lng:" + bounds.getNorthEast().lng + "</br>south west lat:" +
      bounds.getSouthWest().lat + "</br>south west lng:" + bounds.getSouthWest().lng +
      "</br>centroid lat:" + centroidPoint.lat + "</br>centroid lng:" + centroidPoint.lng + "</br>" + event_div.innerHTML;;
  }
}
$("#mapmyindia_create_polygon_noneditable").click(function() {
  var pts = [
    [28.537761365930866, 77.23729848861694],
    [28.540348581406143, 77.24914312362671],
    [28.54466989069459, 77.25163221359253],
    [28.55483510701891, 77.2426414489746],
    [28.558365431752108, 77.23888501524925],
    [28.547761143855222, 77.22729787230492]
  ];
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
});

$("#mapmyindia_remove_polygons").click(function() {
  var polylength = polygons.length;
  if (polylength > 0) {
    for (var i = 0; i < polylength; i++) {
      map.removeLayer(polygons[i]); /* remove Polygon layer from map*/
    }
  }
  delete polygons;
  poly = '';
  polygons = [];
  map.closePopup();
});

$("#mapmyindia_create_polygons_editable").click(function() {
  var pts = [
    [28.52780776983775, 77.29849576950073],
    [28.53175256029762, 77.30218648910522],
    [28.53471694723318, 77.31282949447632],
    [28.536061262155137, 77.30761528015137],
    [28.538385790782893, 77.30068311095238],
    [28.53433992331669, 77.29484662413597]
  ];
  var patArr = [];
  for (var i = 0; i < pts.length; i++) {
    patArr.push(new L.LatLng(pts[i][0], pts[i][1]));
  }
  if (!poly) {
    poly = new L.polygon(patArr, {
      color: 'red',
      draggable: true
    }).addTo(map);
    /**polygon events**/
    poly.on("mousedown", function(e) { /*mouseup event on polygon P1*/
      getBounds(poly, "Red polygon");
    });
    poly.on("click", function(e) { /*click event on polygon*/
      poly.bindPopup("Red Polygon").openPopup(); /*binds popup to the polygon*/
    });
    poly.enableEdit();
    poly.on('dblclick', L.DomEvent.stop).on('dblclick', poly.toggleEdit);
    polygons.push(poly);
  }
  map.fitBounds(poly.getBounds());
});

$("#mapmyindia_geometry_of_green_polygon").click(function() {

  var points = p1.getLatLngs(); /*provide the current geometry of the polygon*/
  var len = points[0].length;
  if (len > 0) {
    var event_div = document.getElementById("event-log");
    event_div.innerHTML = '';
    var s = "Geometry:</br>[";

    for (var i = 0; i < len; i++) {
      s += "[" + points[0][i].lat + "," + points[0][i].lng;
      s += (len - 1) != i ? "]</br>," : "]]</br>";
    }
    event_div.innerHTML = s + event_div.innerHTML;
  } else {
    createGreenPolygon(pts);
    mapmyindia_geometry_of_green_polygon();
  }
  map.fitBounds(p1.getBounds())
});

function isPointInLayer(pt, layer) {
  var within = false;
  var x = pt.lat,
    y = pt.lng;
  for (var ii = 0; ii < layer.getLatLngs().length; ii++) {
    var polyPoints = layer.getLatLngs()[ii];
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
      var xi = polyPoints[i].lat,
        yi = polyPoints[i].lng;
      var xj = polyPoints[j].lat,
        yj = polyPoints[j].lng;

      var intersect = ((yi > y) != (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect)
        within = !within;
    }
  }
  return within;
};
