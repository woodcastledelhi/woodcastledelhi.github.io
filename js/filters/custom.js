angular.module('woodcastle').filter('moment', function () {
    return function (input, momentFn /*, param1, param2, etc... */) {
        var args = Array.prototype.slice.call(arguments, 2),
        momentObj = moment(input)
        return momentObj[momentFn].apply(momentObj, args);
    };
});

/**
 * Description:
 *     removes white space from text. useful for html values that cannot have spaces
 * Usage:
 *   {{some_text | nospace}}
 */
angular.module('woodcastle').filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
});

// returns array in reverse order
angular.module('woodcastle').filter('reverse', function() {
    return function(items) {
        if(items.length>0)
            return items.slice().reverse();
        else
            return items
    };
});

angular.module('woodcastle').filter('trim', function() {
    return function(items) {
        return $.trim(items)
    };
});

// returns authentication from json string
angular.module('woodcastle').filter('parseJsonString', function() {
    return function(str) {
        if(str !="" && str!== null){
            var obj = str
            
            if(obj)
                return '<span class="badge bg-green">ON</span>'
            else
                return '<span class="badge bg-red">OFF</span>'
        }else{
            return "<span>N/A</span>"
        }
        
    };
});
// returns description from json string
angular.module('woodcastle').filter('showDescriptionAPI', function() {
    return function(str) {
        if(str !="" && str!== null){
            return str
        }else{
            return "N/A"
        }
        
    };
});

angular.module('woodcastle').filter('parseJsonStringForSettings', function() {
    return function(str1) {
        if(str1 !="" && str1!== null){
            var obj = JSON.parse(str1)
            if(obj.apiState)
                return '<span class="label label-success">Active</span>'
            else
                return '<span class="label label-danger">InActive</span>'
        }else{
            return "<span>N/A</span>"
        }
        
    };
});
// returns adaptorType from json string
angular.module('woodcastle').filter('parseJsonStringForConfig', function() {
    return function(str) {
        if(str !="" && str!== null){
            var obj = JSON.parse(str)
            if(obj.adaptorType == "proxyAPI"){
                return "PROXY"
            }else{
                return obj.adaptorType 
            }
            
        }
    };
});
// returns CORS from json string
angular.module('woodcastle').filter('parseJsonStringForCors', function() {
    return function(str) {
        if(str !="" && str!== null){
            var obj = JSON.parse(str)
            if(obj.adaptorType == 'jar'){
                if(obj.CORS == "true")
                    return '<span class="badge bg-green">ON</span>'
                else if(obj.CORS == "false")
                    return '<span class="badge bg-red">OFF</span>'
            }else{
                if(obj.CORS)
                    return '<span class="badge bg-green">ON</span>'
                else
                    return '<span class="badge bg-red">OFF</span>'
            }
        }
    };
});
// returns methods from json string
angular.module('woodcastle').filter('extractAPImethods', function() {
    return function(obj) {
        var a= ''
        obj.forEach(function(o){
            if(o.name == "POST"){
                a+= '&nbsp; <span class="label label-primary">POST</span>'
            }else if(o.name == "GET"){
                a+= '&nbsp; <span class="label label-success">GET</span>'
            }else if(o.name == "PUT"){
                a+= '&nbsp; <span class="label label-primary">PUT</span>'
            }else if(o.name == "DELETE"){
                a+= '&nbsp; <span class="label label-danger">DELETE</span>'
            }else if(o.name == "ALL"){
                a+= '&nbsp; <span class="label label-info">ALL</span>'
            }else if(o.name == "OPTIONS"){
                a+= '&nbsp; <span class="label label-warning">OPTIONS</span>'
            }else if(o.name == "HEAD"){
                a+= '&nbsp; <span class="label label-warning">HEAD</span>'
            }
           
        })
        return a
    };
});

// returns methods from json string
angular.module('woodcastle').filter('parseJsonStringForMethods', function() {
    return function(str) {
        if(str !="" && str!== null){
            var obj = JSON.parse(str)
           
            var a= ''
            obj.allowedMethod.forEach(function(o){
                if(o.name == "POST"){
                    a+= '&nbsp; <span class="label label-primary">POST</span>'
                }else if(o.name == "GET"){
                    a+= '&nbsp; <span class="label label-success">GET</span>'
                }else if(o.name == "PUT"){
                    a+= '&nbsp; <span class="label label-primary">PUT</span>'
                }else if(o.name == "DELETE"){
                    a+= '&nbsp; <span class="label label-danger">DELETE</span>'
                }else if(o.name == "ALL"){
                    a+= '&nbsp; <span class="label label-info">ALL</span>'
                }else if(o.name == "OPTIONS"){
                    a+= '&nbsp; <span class="label label-warning">OPTIONS</span>'
                }else if(o.name == "HEAD"){
                    a+= '&nbsp; <span class="label label-warning">HEAD</span>'
                }
           
            })
            return a
        }
       
      
    };
});

angular.module('woodcastle').filter("getProxyEndPoint",function(){
    return function(restApiPath,projectSelect,apiName){
        var urrl = apiEngineURL.split("://");
        var runningUrl
        if(runningEnv == "DEVELOPMENT" || runningEnv == "TEST"){
            runningUrl = urrl[1]
        }else{
            runningUrl = apiEngineURLOrig
        }
        if(projectSelect != undefined){
            restApiPath = urrl[0]+"://"+projectSelect.name+"-"+accountId+"."+runningUrl+"/"+projectSelect.version+"/"+apiName+restApiPath;
        }
        return restApiPath;
    }
});

angular.module('woodcastle').filter("getProjectName",function(){
    return function(api_settings){
        var projectName =  JSON.parse(api_settings); 
        return projectName.displayProjectName;
    }
});
angular.module('woodcastle').filter("getProjectNameDOC",function(){
    return function(settings){
        var projectName =  JSON.parse(settings); 
        return projectName.displayProjectName;
    }
});
angular.module('woodcastle').filter("getAPINameDOC",function(){
    return function(settings){
        var projectName =  JSON.parse(settings);
        var apis = projectName.apis
        var result=""
        for(var i = 0;i<apis.length;i++){
            result= result+'&nbsp;&nbsp;<span class="label label-success" >'+apis[i].apiName+'</span>'
        }
        return result;
    }
});

angular.module('woodcastle').filter("getAllPreRules",function(){
    return function(preRule){
        var rule = preRule;  //JSON.parse(preRule);
        var result=""
        if(rule.length > 0){
            result= result+'&nbsp;&nbsp;<span class="label label-info ng-binding" style="margin-left: -5px;" >'+rule[0].name+'</span>'
            for(var i = 1;i<rule.length;i++){
                result= result+'&nbsp;&nbsp;<span class="label label-info ng-binding" >'+rule[i].name+'</span>'
            }
        }else{
            result='<i class="fa fa-minus"></i>'
        }
        return result;
    }
});

angular.module('woodcastle').filter("getAllPostRules",function(){
    return function(postRule){
        var rule = postRule; // JSON.parse(postRule);
        var result=""
        if(rule.length > 0){
            result= result+'&nbsp;&nbsp;<span class="label label-primary ng-binding" style="margin-left: -5px;" >'+rule[0].name+'</span>'
            for(var i = 1;i<rule.length;i++){
                result= result+'&nbsp;&nbsp;<span class="label label-primary ng-binding" >'+rule[i].name+'</span>'
            }
        }else{
            result='<i class="fa fa-minus"></i>'
        }
        return result;
    }
});

angular.module('woodcastle').filter("getAllEmails",function(){
    return function(mails){
        var result = ""
        var emailList= mails.split(",")
        result = result+emailList[0]
        for(var i = 1;i<emailList.length-1;i++){
            result= result+ ' , ' + emailList[i] 
        }
        if(emailList.length > 1){
            result = result + ' and '+ emailList[emailList.length-1]
        }
        return result;
    }
});
angular.module('woodcastle').filter("alarmSummary",function($filter){
    return function(mName,projectSelect,apiSelect,apiName,alertEmail,callbackUrl,typeList,alertSelect,responseTime,failureThreshold,sharedFrequecy,frequency){
        var result=""
        if(mName == '' || mName == null || mName == undefined ){
            result= result+'<p class="txtCntr"><label>N/A</label></p>'
        }else{
            result="<p>Trigger <label>"+mName+"</label>"
            if(projectSelect != '' && projectSelect != null && projectSelect != undefined ){           
                if(apiSelect != '' && apiSelect != null && apiSelect != undefined ){                  
                    result= result+' for the Project <label class="w-wrap">'+projectSelect+'</label>'
                    result= result+' and for operation <label class="w-wrap">'+apiSelect+'</label> of <label class="w-wrap">'+apiName+'</label> API.</p>'
                    if(alertEmail != '' && alertEmail != null && alertEmail != undefined ){
                        result= result+'<p><label class="w-wrap">'+$filter('getAllEmails')(alertEmail)+'</label> will get notified whenever <label class="w-wrap">'+mName+'</label> alarm is triggered.'
                        if(callbackUrl != '' && callbackUrl != null && callbackUrl != undefined ){
                            result= result+' And simultaneously <label class="w-wrap">'+callbackUrl+'</label> will also be called.'
                        }
                        result=result+"</p>"
                        
                        if(typeList != '' && typeList != null && typeList != undefined){
                            if(typeList == 'Status' && alertSelect != '' && alertSelect != null && alertSelect != undefined && failureThreshold != '' && failureThreshold != null && failureThreshold != undefined){
                                result= result+'Alarm will be triggered when Response Code <label class="w-wrap">'+$filter('getAllAlertStatus')(alertSelect)+'</label> occurs '
                                result= result+'<label> '+failureThreshold+' </label> time(s)'
                                if(runningMode == 'SHARED'){
                                    result= result+' within <label>'+sharedFrequecy+'</label> minute(s).' 
                                }else{
                                    result= result+' within <label>'+frequency.options.stepsArray[frequency.value]+'</label> minute(s).' 
                                }
                            }else if(typeList == 'Response Time' && responseTime != '' && responseTime != null && responseTime != undefined && failureThreshold != '' && failureThreshold != null && failureThreshold != undefined){
                                result= result+'Alarm will be triggered when Average Response time exceeds <label class="w-wrap">'+responseTime+'</label> ms '
                                result= result+'<label> '+failureThreshold+' </label> time(s)'
                                if(runningMode == 'SHARED'){
                                    result= result+' within <label>'+failureThreshold*sharedFrequecy+'</label> minute(s). Average response time will be calculated in every <label>'+sharedFrequecy+'</label> minute(s).' 
                                }else{
                                    result= result+' within <label>'+failureThreshold*frequency.options.stepsArray[frequency.value]+'</label> minute(s). Average response time will be calculated in every <label>'+frequency.options.stepsArray[frequency.value]+'</label> minute(s).' 
                                }
                            }
                        }
                    }
                }
            }
           
        }
        return result;
    }
});
angular.module('woodcastle').filter("getAllAlertStatus",function(){
    return function(status){
        var result = ""
        result= result + status[0]
        for(var i = 1;i<status.length-1;i++){
            result= result+ ' , ' + status[i] 
        }
        if(status.length > 1){
            result = result + ' and '+ status[status.length-1]
        }
        return result;
    }
});

angular.module('woodcastle').filter("nrFormat",function(){
    return function(number){
        if(number!=undefined){
            var abs = number
            //= Math.abs(number)
            if( abs >= Math.pow(12, 15)){
                // trillion
                number = (number / Math.pow(12, 15)).toFixed(1)+" q"   
            }else if(abs < Math.pow(12, 15) &&  abs >= Math.pow(10, 12)){
                // trillion
                number = (number / Math.pow(10, 12)).toFixed(1)+" t"   
            }else if(abs < Math.pow(10, 12) && abs >= Math.pow(10, 9)){
                // billion
                number = (number / Math.pow(10, 9)).toFixed(1)+" b"
            }else if( abs >= 1000000){
                // million
                number = (number / 1000000).toFixed(1)+" m"
            } else if(abs < 1000000 && abs >= 1000){
                number = (number / 1000).toFixed(1)+" k"      
            }         
        }
        return number     
    }
});

angular.module('woodcastle').filter( 'bandwidth', function () {
    var units = [
    'bytes',
    'Kb',
    'Mb',
    'Gb',
    'Tb',
    'Pb'
    ];

    return function( bytes, precision ) {
        if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) ) {
            return '0';
        }

        var unit = 0;

        while ( bytes >= 1024 ) {
            bytes /= 1024;
            unit ++;
        }

        return bytes.toFixed( + precision ) + ' ' + units[ unit ];
    };
});