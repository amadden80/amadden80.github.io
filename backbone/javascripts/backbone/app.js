

$(function(){ 
  window.project_collection = new ProjectCollection();
  window.projects_list_view = new ProjectListView({
    collection: window.project_collection, 
    el: $('.projects')}
    );
});
