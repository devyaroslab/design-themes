(function() {
  'use strict';

  var center = {};
  var icon = {};
  var geocoder = {};
  var markerBounds = {};
  var map = {};
  var markers = [];
  var website = openerp.website;

  website.openerp_website = {};
  website.snippet.animationRegistry.gourmand_maps = website.snippet.Animation.extend({
    selector : ".gourmand_map",

    start : function() {
      var self = this;
      markers = [];
      markerBounds = new google.maps.LatLngBounds();
      icon = new google.maps.MarkerImage("/theme_gourmand/static/src/img/map_pin.png");
      center = new google.maps.LatLng(10.91, 5.38);
      geocoder = new google.maps.Geocoder();
      self.$el.find('.gourmand_map_container').empty();
      map = new google.maps.Map(self.$el.find('.gourmand_map_container').get(0), {
        scrollwheel : false,
        zoom : 4,
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        styles : [ {
          "featureType" : "landscape",
          "elementType" : "labels",
          "stylers" : [ {
            "visibility" : "off"
          } ]
        }, {
          "featureType" : "transit",
          "elementType" : "labels",
          "stylers" : [ {
            "visibility" : "off"
          } ]
        }, {
          "featureType" : "poi",
          "elementType" : "labels",
          "stylers" : [ {
            "visibility" : "off"
          } ]
        }, {
          "featureType" : "water",
          "elementType" : "labels",
          "stylers" : [ {
            "visibility" : "off"
          } ]
        }, {
          "featureType" : "road",
          "elementType" : "labels.icon",
          "stylers" : [ {
            "visibility" : "off"
          } ]
        }, {
          "stylers" : [ {
            "hue" : "#00aaff"
          }, {
            "saturation" : -100
          }, {
            "gamma" : 2.15
          }, {
            "lightness" : 12
          } ]
        }, {
          "featureType" : "road",
          "elementType" : "labels.text.fill",
          "stylers" : [ {
            "visibility" : "on"
          }, {
            "lightness" : 24
          } ]
        }, {
          "featureType" : "road",
          "elementType" : "geometry",
          "stylers" : [ {
            "lightness" : 57
          } ]
        } ]
      });
      self.initialize();
    },

    on_change_data : function() {
      
      var self = this;
      for ( var i in markers) {
        markers[i].setMap(null);
      }
      self.create_markers();
      
    },

    create_markers : function() {
      var self = this;
      var mk = self.$el.find('.gourmand_map_container').data('markers');
      $.each(mk, function(i, v) {
        self.set_marker(v);
      });
      map.fitBounds(markerBounds);
    },

    initialize : function() {
      var self = this;
      self.create_markers();
      self.$el.find('.gourmand_map_container').on('changeData', _.bind(this.on_change_data, this));
    },

    set_marker : function(m) {
      var latLng = new google.maps.LatLng(m.lat, m.long);
      markerBounds.extend(latLng);
      var marker = new google.maps.Marker({
        position : latLng,
        map : map,
        info : m,
        icon : icon
      });
      markers.push(marker)
    },
  });

})();
