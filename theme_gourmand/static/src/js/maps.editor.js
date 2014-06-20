(function() {
  'use strict';

  var website = openerp.website;
  var _t = openerp._t;
  website.add_template_file('/theme_gourmand/static/src/xml/maps_editor_template.xml');

  website.menu.EditMarkerMenuDialog = website.editor.Dialog.extend({
    template : 'theme_gourmand.markers.dialog.edit',

    on_delete_marker : function() {
      var self = this;
      var el = $(event.target);
      var id = el.parent().data('marker-id');
      if (id) {
        el.closest('tr').remove();
        var filtered_json = $.grep(self.json, function(n, i) {
          return n.id != id
        });
        self.json = filtered_json;
      }
      event.preventDefault();
    },

    on_add_marker : function() {

      event.preventDefault();
    },

    save : function() {
      this.element.data('markers', this.json);
      this.element.attr('data-markers', JSON.stringify(this.json))
      this.element.trigger('changeData');
      this.close();

    },

    init : function(json, c) {
      this.json = json;
      this.c = c;
      this.element = c.$target.find('.gourmand_map_container')
      this._super();
    },
    start : function() {
      var self = this;
      var r = this._super.apply(this, arguments);
      this.$el.find('.js_delete_marker').on('click', _.bind(this.on_delete_marker, this));
      this.$el.find('.js_add_marker').on('click', _.bind(this.on_add_marker, this));
    },

  });

  website.snippet.options.marker = website.snippet.Option.extend({
    on_edit_markers : function() {
      return new website.menu.EditMarkerMenuDialog(this.$target.find('.gourmand_map_container').data('markers'), this).appendTo(document.body);
    },
    start : function() {
      var self = this;
      this.$el.find('.js_edit_markers').on('click', _.bind(this.on_edit_markers, this));
      this._super();
    },
  });
})();
