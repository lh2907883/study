module.exports.start = function(){
    var http = require("http");
    function onRequest(request, response) {
        console.log("Request received.");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");

//    console.log("********************************  console.log(module.parent);  *****************************");
//    console.log(module.parent);
//    console.log("********************************  console.log(require);  *****************************");
//    console.log(require); //require.main.filename 表示node的入口函数
//    console.log("********************************  console.log(global);  *****************************");
//    console.log(global);

    console.log("********************************  console.log(require.resolve);  *****************************");
    console.log(require.resolve.toString());
    console.log("********************************  console.log(process.cwd());  *****************************");
    console.log(process.cwd());
};

