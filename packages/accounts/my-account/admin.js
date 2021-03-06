/**
 * Display account settings
 */
ReactiveTemplates.request('myAccount.index');
ReactiveTemplates.request('myAccount.password');
ReactiveTemplates.request('myAccount.profile');

/**
 * Register the route
 */
Router.route('/admin/my-account', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('myAccount.index'));
}, { name: 'myAccount.index' });
orion.accounts.addProtectedRoute('myAccount.index');

/**
 * Allow password change
 */
AccountsTemplates.configure({
  enablePasswordChange: true
});

/**
 * Register the route
 */
Router.route('/admin/my-account/change-password', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('myAccount.password'));
}, { name: 'myAccount.password' });
orion.accounts.addProtectedRoute('myAccount.password');

/**
 * To update the profile
 */
Router.route('/admin/my-account/profile', function () {
  this.layout(ReactiveTemplates.get('layout'));
  this.render(ReactiveTemplates.get('myAccount.profile'));
}, { name: 'myAccount.profile' });
orion.accounts.addProtectedRoute('myAccount.profile');

/**
 * Create the template events account settings
 */
if (Meteor.isClient) {
  /**
   * Register the link
   */
  Tracker.autorun(function () {
    orion.links.add({
      identifier: 'myAccount',
      title: (Meteor.user() && Meteor.user().profile && Meteor.user().profile.name) || 'Account',
      activeRouteRegex: 'myAccount'
    });
    orion.links.add({
      index: 20,
      identifier: 'myAccount-index',
      parent: 'myAccount',
      title: i18n('accounts.myAccount.title'),
      routeName: 'myAccount.index',
      activeRouteRegex: 'myAccount.index'
    });
    orion.links.add({
      index: 50,
      identifier: 'myAccount-updateProfile',
      parent: 'myAccount',
      title: i18n('accounts.updateProfile.title'),
      routeName: 'myAccount.profile',
      activeRouteRegex: 'myAccount.profile'
    });
    orion.links.add({
      index: 100,
      identifier: 'myAccount-changePassword',
      parent: 'myAccount',
      title: i18n('accounts.changePassword.title'),
      routeName: 'myAccount.password',
      activeRouteRegex: 'myAccount.password'
    });
  });

  ReactiveTemplates.events('myAccount.index', {
    'click .logout': function() {
      return Meteor.logout();
    }
  });

  ReactiveTemplates.helpers('myAccount.profile', {
    getDoc: function() {
      return Meteor.user();
    },
    getSchema: function() {
      return orion.accounts.profileSchema;
    }
  });
}
