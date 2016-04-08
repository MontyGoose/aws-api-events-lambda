var grunt = require('grunt');
grunt.loadNpmTasks('grunt-aws-lambda');

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
var proxy  = process.env.HTTP_PROXY;

grunt.initConfig({
   lambda_invoke: {
      default: {
      }
   },
   lambda_deploy: {
      default: {
         http_proxy: proxy,
         arn: 'arn:aws:lambda:us-east-1:937459784210:function:APIEvents'
      }
   },
   lambda_package: {
      default: {
      }
   }
});

grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy']);
