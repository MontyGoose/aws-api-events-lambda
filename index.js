console.log('Loading event');

var doc = require('dynamodb-doc');
var request = require('request');

var dynamodb = new doc.DynamoDB();

exports.handler = function(event, context) {
    console.log("Request received:", JSON.stringify(event));
    console.log("Context received:", JSON.stringify(context));


    var options = {
      url: 'http://www.stateful.co/c/apievent/inc?value=1',
      headers: {
        'X-Sttc-URN': 'urn:github:5019965',
        'X-Sttc-Token': '8F37-909C-E861-3855',
        'Accept': 'text/plain'
      }
    };

    function callback(error,response,body) {
      if (!error && response.statusCode == 200) {
        saveData(body);
      } else {
        context.fail('ERROR: counter call failed with statusCode ('+response.statusCode+'): ' + error);
      }
    }

    request(options,callback);



    function saveData(counter) {
      var tableName = "APIEvents";
      var datetime = new Date().getTime().toString();
      event.id = counter;
      event.date = datetime;


      dynamodb.putItem(
        {
          "TableName": tableName,
          "Item": event
        },
        function(err, data) {
          if (err) {
            context.fail('ERROR: Dynamo failed: ' + err);
          } else {
            console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
            context.succeed('SUCCESS');
          }
        }
      );

      console.log("Item:", event);
    }

};
