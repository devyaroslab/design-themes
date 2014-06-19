(function() {
  'use strict';

  var website = openerp.website;
  var _t = openerp._t;

  website.snippet.options.editmarkers = website.snippet.Option.extend({
    on_edit_markers : function() {
      console.log("add Marker");
    },

    start : function() {
      var self = this;
      
      this.$el.find(".js_edit_markers").on("click", _.bind(this.on_edit_markers, this));
      
      this._super();
    },
  });
})();
