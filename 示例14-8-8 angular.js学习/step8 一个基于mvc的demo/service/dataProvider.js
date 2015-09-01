/**
 * Created by andin on 15-1-4.
 */
define(["angularAMD"], function(angularAMD){
    angularAMD.service("dataProviderSvc", function(){
        if(typeof JsObject == 'undefined'){
            //浏览器测试数据源
            return {
                outPathSet: function(){
                    return "啊啊";
                }
            };
        }
        else{
            //qt提供的数据源
            return {
                outPathSet: function(){
                    var ret = JsObject.outPathSet();
                    if( !ret ){
                        //notify( 'error', '设置路径失败' );
                    } else if( ret.error ){
                        //notify( 'error', ret.error );
                    }
                    if(ret.path){
                        return ret.path;
                    }
                    else {
                        return "";
                    }
                }
            };
        }
    });
});

