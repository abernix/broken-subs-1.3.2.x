const FunTimes = new Mongo.Collection('funtimes');

if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Fill empty DB with fun
    if ( ! FunTimes.find({}).count() ) {
      FunTimes.insert({funAmount: Math.random() });
    }
  });

  // Super fun publish.
  Meteor.publish('funtimes', function() {
    return FunTimes.find({});
  });
}


FlowRouter.route('/', {
  name: 'home',
  subscriptions() {
    this.register('myFunTimes', Meteor.subscribe('funtimes'));
  },
  action(params) {
  }
});