var Project = Backbone.Model.extend({
  initialize: function(attrs) {
    if (attrs.name === ""){this.set('name', 'Monkey')};
  }
});