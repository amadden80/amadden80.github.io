
ProjectListView =  Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderProject);
  },
  renderProject: function(model) {
    model.view = new MonkeyView({ model: model});
    this.$el.prepend(model.view.render().el);
    return this;
  },
  render: function(){
    this.$el.empty;
    this.collection.each(function(project){
      this.$el.append(project.render().el)
    });
    return this;
  }
});