'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'social-auth'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.Base.extend({

  initializing: {
    compose: function (args) {
      this.composeWith('jhipster:modules',
        {
          options: {
            jhipsterVar: jhipsterVar,
            jhipsterFunc: jhipsterFunc
          }
        },
        this.options.testmode ? {local: require.resolve('generator-jhipster/generators/modules')} : null
      );
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log('Welcome to the ' + chalk.red('JHipster social-auth') + ' generator! ' + chalk.yellow('v' + packagejs.version + '\n'));
    }
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'message',
      message: 'Please put something',
      default: 'hello world!'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    writeTemplates : function () {
      this.baseName = jhipsterVar.baseName;
      this.packageName = jhipsterVar.packageName;
      this.angularAppName = jhipsterVar.angularAppName;
      var javaDir = jhipsterVar.javaDir;
      var resourceDir = jhipsterVar.resourceDir;
      var webappDir = jhipsterVar.webappDir;

      this.message = this.props.message;

      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      this.log('message=' + this.message);

      this.template('src/main/java/package/config/social/_SocialConfiguration.java', javaDir + 'config/social/SocialConfiguration.java');
      this.template('src/main/java/package/domain/_SocialUserConnection.java', javaDir + 'domain/SocialUserConnection.java');
      this.template('src/main/java/package/repository/_CustomSocialConnectionRepository.java', javaDir + 'repository/CustomSocialConnectionRepository.java');
      this.template('src/main/java/package/repository/_CustomSocialUsersConnectionRepository.java', javaDir + 'repository/CustomSocialUsersConnectionRepository.java');
      this.template('src/main/java/package/repository/_SocialUserConnectionRepository.java', javaDir + 'repository/SocialUserConnectionRepository.java');
      this.template('src/main/java/package/security/social/_CustomSignInAdapter.java', javaDir + 'security/social/CustomSignInAdapter.java');
      this.template('src/main/java/package/security/social/_package-info.java', javaDir + 'security/social/package-info.java');
      this.template('src/main/java/package/service/_SocialService.java', javaDir + 'service/SocialService.java');
      this.template('src/main/java/package/web/rest/_SocialController.java', javaDir + 'web/rest/SocialController.java');
      this.template('src/main/resources/config/liquibase/_fortunes.csv', resourceDir + 'config/liquibase/fortunes.csv');


      // this.template('src/main/webapp/scripts/app/fortune/_fortune.controller.js', webappDir + 'scripts/app/fortune/fortune.controller.js');
      // jhipsterFunc.addJavaScriptToIndex('app/fortune/fortune.controller.js');
      // this.template('src/main/webapp/scripts/app/fortune/_fortune.html', webappDir + 'scripts/app/fortune/fortune.html');
      // this.template('src/main/webapp/scripts/app/fortune/_fortune.js', webappDir + 'scripts/app/fortune/fortune.js');
      // jhipsterFunc.addJavaScriptToIndex('app/fortune/fortune.js');
      // this.template('src/main/webapp/scripts/components/fortune/_fortune.service.js', webappDir + 'scripts/components/fortune/fortune.service.js');
      // jhipsterFunc.addJavaScriptToIndex('components/fortune/fortune.service.js');
      // jhipsterFunc.addElementToMenu('fortune', 'sunglasses', true);
      // jhipsterFunc.addElementTranslationKey('fortune', 'Fortune', 'en');
      // jhipsterFunc.addElementTranslationKey('fortune', 'Fortune', 'fr');
      //
      // jhipsterFunc.copyI18nFilesByName(this, webappDir, 'fortune.json', 'en');
      // jhipsterFunc.copyI18nFilesByName(this, webappDir, 'fortune.json', 'fr');
      done();

    },

    registering: function () {
      try {
        jhipsterFunc.registerModule("generator-jhipster-social-auth", "entity", "post", "app", "Social authentication module for JHipster V4");
      } catch (err) {
        this.log(chalk.red.bold('WARN!') + ' Could not register as a jhipster entity post creation hook...\n');
      }
    }
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.log('End of social-auth generator');
  }
});
