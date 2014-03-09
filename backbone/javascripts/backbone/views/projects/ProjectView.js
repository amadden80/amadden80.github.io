ProjectView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('project-view-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});