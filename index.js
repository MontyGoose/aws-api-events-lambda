

console.log('Loading event');
var doc = require('dynamodb-doc');
var dynamodb = new doc.DynamoDB();

exports.handler = function(event, context) {
    console.log("Request received:", JSON.stringify(event));
    console.log("Context received:", JSON.stringify(context));

    var tableName = "APIEvents";
    var datetime = new Date().getTime().toString();

    // date to event
    event.id = "1";
    event.date = datetime;
    //keep it simple - through the whole event it
    console.log("Item:", event);

    dynamodb.putItem({
            "TableName": tableName,
            "Item": event
        }, function(err, data) {
            if (err) {
                context.fail('ERROR: Dynamo failed: ' + err);
            } else {
                console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
                context.succeed('SUCCESS');
            }
        });
};
