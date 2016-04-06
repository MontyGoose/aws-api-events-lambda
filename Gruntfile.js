var grunt = require('grunt');
grunt.loadNpmTasks('grunt-aws-lambda');

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

var proxy = require('proxy-agent');
AWS.config.update({
  httpOptions: {
    agent: proxy('http://proxy.pershing.com:8080')
  }
});




grunt.initConfig({
   lambda_invoke: {
      default: {
      }
   },
   lambda_deploy: {
      default: {
         arn: 'arn:aws:lambda:us-east-1:937459784210:function:APIEvents',
         package: 'api-events-lambda_0-0-1_2016-3-6-15-26-27'
      }
   },
   lambda_package: {
      default: {
      }
   }
});



grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy']);
