import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});


App.IndexRoute = Ember.Route.extend({
  model: function() {
    var url = 'localhost:3000/teams.json';
    return Ember.$.getJSON(url).then(function(data) {
      return data.splice(0, 3);
    });
  },
  actions: {
    invalidateModel: function() {
      Ember.Logger.log('Route is now refreshing...');
      this.refresh();
    }
  }
});

App.IndexController = Ember.Controller.extend({
  actions: {
    getLatest: function() {
      Ember.Logger.log('Controller requesting route to refresh...');
      this.send('invalidateModel');
    }
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
