var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

var proxy = require('proxy-agent');
var proxy_agent = proxy('http://proxy.pershing.com:8080');


AWS.config.update({
  httpOptions: {
    agent: proxy_agent
  }
});

var lambda = new AWS.Lambda({
    apiVersion: '2015-03-31'
});


lambda.getFunction({FunctionName: 'arn:aws:lambda:us-east-1:937459784210:function:APIEvents'}, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


console.log(JSON.stringify(AWS.config));
