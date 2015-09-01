/**
 * Created by andin on 15-1-30.
 */
var http = require("http");
var exec = require("child_process").exec;
function onRequest(request, response) {
    console.log("Request handler 'start' was called.");
    //console.log(request);
    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    var content = "empty";
    //调用linux shell命令
    exec("ls -lah", function (error, stdout, stderr) {
        content = stdout;
        response.write(content);
        response.end();
    });
}
http.createServer(onRequest).listen(8888);
console.log("Server has started.");

