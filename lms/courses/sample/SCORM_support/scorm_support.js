var g_objAPI = null;
var g_nAPI = 0;				// type of API to start searching for; allowable values: 0 - SCORM 2004; 1 - SCORM 1.2 (or 1.1)
var g_aAPI = ["1.0", "0.2"]	// Array that stores the API versions
var g_zAPIVersion = -1;
var g_bFinishDone = false;


function findAPI(win)
{
	// Search the window hierarchy for an object named "API_1484_11" for SCORM 2004 or "API" for SCORM 1.2 or below
	// Look in the current window (win) and recursively look in any child frames
	if(g_nAPI == 0)
	{
		if(win.API_1484_11 != null)
  	 	{
  	 		return win.API_1484_11;
		}
	} else if(g_nAPI == 1 || g_nAPI == "") {
		if (win.API != null)
		{
			g_zAPIVersion = g_aAPI[g_nAPI];
			return win.API;
		}
	}

	if (win.length > 0)  // check frames
	{
		for (var i=0;i<win.length;i++)
		{
			var objAPI = findAPI(win.frames[i]);
			if (objAPI != null)
			{
				return objAPI;
			}
		}
	}
	return null;
}


function getAPI(intAPISearchOrder)
{
	// intAPISearchOrder is 0 - start at current window and work way up; 1 - start at top window and work way down.
	var objAPI = null;
	intAPISearchOrder=((typeof(intAPISearchOrder)=='undefined')?0:intAPISearchOrder);
	if(intAPISearchOrder==0)
	{
		// start and the current window and recurse up through parent windows/frames
		objAPI = findAPI(window);
		if((objAPI==null) && (window.opener != null) && (typeof(window.opener) != "undefined"))
		{
			objAPI = findAPI(window.opener);
		} else if((objAPI==null) && (window.parent != null) && (typeof(window.parent) != "undefined")) {
			objAPI = findAPI(window.parent);
		}
		if((objAPI==null) && (g_nAPI < (g_aAPI.length-1)))
		{
			g_nAPI++;
			objAPI = getAPI(intAPISearchOrder);
		}
	} else {
		// start at the top window and recurse down through child frames
		objAPI = findAPI(this.top);

		if (objAPI == null)
		{
			// the API wasn't found in the current window's hierarchy.  If the
			// current window has an opener (was launched by another window),
			// check the opener's window hierarchy.
			objTopWindow=window.top;

			objTopWindow = objTopWindow.opener;

			while (objTopWindow && !objAPI)
			{
				//checking window opener
				objAPI = findAPI(objTopWindow.top);
				if (objAPI==null) objTopWindow = objTopWindow.opener;
			}
			if(objAPI==null && g_nAPI < (g_aAPI.length-1))
			{
				g_nAPI++;
				objAPI = getAPI(intAPISearchOrder);
			}
		}
	}
	if(objAPI==null)
	{
		// can't find API
	} else if(objAPI != null && g_zAPIVersion == -1) {
		g_zAPIVersion = objAPI.version;
	}

	return objAPI;
}

function setAPI()
{
	while(g_objAPI == undefined)
	{
		g_objAPI = getAPI(0);
	}
}

function isAPI() {
	return ((typeof(g_objAPI)!= "undefined") && (g_objAPI != null))
}

// called in the outer HTML file
// g_objAPI = getAPI();

function dataToFlash(layer, msg) {
	// set the comm HTML
	fcomValue = "<OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\"2\" HEIGHT=\"2\" id=\"scorm_support\" ALIGN=\"\"> <PARAM NAME=movie VALUE=\"scorm_support.swf?invokeMethod=methodToExecute&lc_name=lc_name&param=" + msg + "\"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src=\"scorm_support.swf?invokeMethod=methodToExecute&lc_name=lc_name&param=" + msg + "\" quality=high bgcolor=#FFFFFF  WIDTH=\"2\" HEIGHT=\"2\" NAME=\"scorm_support\" ALIGN=\"\" TYPE=\"application/x-shockwave-flash\" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED> </OBJECT>";

	// get the browser info
	IE=0; NS4=0; NS6=0;
	if (navigator.appName.indexOf('Netscape')!=-1 && parseInt(navigator.appVersion)<5) {NS4=1;}
	if (navigator.appName.indexOf('Netscape')!=-1 && parseInt(navigator.appVersion)>4.9) {NS6=1;}
	if (navigator.appName.indexOf('Microsoft')!=-1 && parseInt(navigator.appVersion)>3) {IE=1;}

	if (IE==true)
	{
		IE_dynamic.document.body.innerHTML=fcomValue;
	}

	if (NS4)
	{
		// change the comm HTML
		fcomValue = "<OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\"2\" HEIGHT=\"2\" id=\"scorm_support\" ALIGN=\"\"> <PARAM NAME=movie VALUE=\"SCORM_support/scorm_support.swf?invokeMethod=methodToExecute&lc_name=lc_name&param=" + msg + "\"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src=\"SCORM_support/scorm_support.swf?invokeMethod=methodToExecute&lc_name=lc_name&param=" + msg + "\" quality=high bgcolor=#FFFFFF  WIDTH=\"2\" HEIGHT=\"2\" NAME=\"scorm_support\" ALIGN=\"\" TYPE=\"application/x-shockwave-flash\" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED> </OBJECT>";

		eval('var echoecho = document.layers.NS_'+layer+'.document;');
		echoecho.open();
		echoecho.write(fcomValue);
		echoecho.close();
	}

	if (NS6)
	{
		// change the comm HTML
		fcomValue = "<OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\"2\" HEIGHT=\"2\" id=\"scorm_support\" ALIGN=\"\"> <PARAM NAME=movie VALUE=\"SCORM_support/scorm_support.swf?invokeMethod=methodToExecute&lc_name=lc_name&param=" + msg + "\"> <PARAM NAME=quality VALUE=high> <PARAM NAME=bgcolor VALUE=#FFFFFF> <EMBED src=\"SCORM_support/scorm_support.swf?invokeMethod=methodToExecute&lc_name=lc_name&param=" + msg + "\" quality=high bgcolor=#FFFFFF  WIDTH=\"2\" HEIGHT=\"2\" NAME=\"scorm_support\" ALIGN=\"\" TYPE=\"application/x-shockwave-flash\" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED> </OBJECT>";

		document.getElementById('NS_'+layer).innerHTML =fcomValue;
	}
}


function dataFromFlash(strSCOfunction, strSCOproperty, varSCOvalue, strFLvariableName) {
	var strEval = "";
	var varResult = false;
	if(isAPI())
	{
		if (varSCOvalue != "")
		{
			strEval = "g_objAPI." + strSCOfunction + "('" + strSCOproperty + "', '" + varSCOvalue + "');";
		} else {
			if(strSCOfunction=="LMSGetLastError")
			{
				strEval = "g_objAPI." + strSCOfunction + "(" + strSCOproperty + ");";
			} else {
				strEval = "g_objAPI." + strSCOfunction + "('" + strSCOproperty + "');";
			}
		}
	} else {
		if (SCOvalue != "")
		{
			strEval = strSCOfunction + "('" + strSCOproperty + "', '" + varSCOvalue + "');";
		} else {
			strEval = strSCOfunction + "('" + strSCOproperty + "');";
		}
	}
	varResult = eval(strEval);
	if(strSCOfunction == "LMSFinish" || strSCOfunction == "Terminate")
	{
		// set global variable to result of Finish function
		g_bFinishDone = varResult;
	}
	dataToFlash('dynamic', strFLvariableName + "|" + varResult);
}