<?php 


// ------------------------------------------------------------------------------------
// Database-specific code
// ------------------------------------------------------------------------------------

function dbConnect() {

	// database login details
	global $dbname;
	global $dbhost;
	global $dbuser;
	global $dbpass;

	// link
	global $link;

	// connect to the database
	$link = mysql_connect($dbhost,$dbuser,$dbpass);
	mysql_select_db($dbname,$link);
	$SCOInstanceID = "1";

}

function readElement($VarName) {

	global $link;
	global $SCOInstanceID;

	$safeVarName = mysql_real_escape_string($VarName);
	$result = mysql_query("select VarValue from scormvars where ((SCOInstanceID=$SCOInstanceID) and (VarName='$safeVarName'))",$link);
	list($value) = mysql_fetch_row($result);

	return $value;

}

function writeElement($VarName,$VarValue) { 

	global $link;
	global $SCOInstanceID;

	$safeVarName = mysql_real_escape_string($VarName);
	$safeVarValue = mysql_real_escape_string($VarValue);
	mysql_query("update scormvars set VarValue='$safeVarValue' where ((SCOInstanceID=$SCOInstanceID) and (VarName='$safeVarName'))",$link);

	return;

}

function initializeElement($VarName,$VarValue) {

	global $link;
	global $SCOInstanceID;

	// make safe for the database
	$safeVarName = mysql_real_escape_string($VarName);
	$safeVarValue = mysql_real_escape_string($VarValue);

	// look for pre-existing values
	$result = mysql_query("select VarValue from scormvars where ((SCOInstanceID=$SCOInstanceID) and (VarName='$safeVarName'))",$link);

	// if nothing found ...
	if (! mysql_num_rows($result)) {
		mysql_query("insert into scormvars (SCOInstanceID,VarName,VarValue) values ($SCOInstanceID,'$safeVarName','$safeVarValue')",$link);
	}

}

function initializeSCO() {

	global $link;
	global $SCOInstanceID;

	// has the SCO previously been initialized?
	var_dump($SCOInstanceID);
	$result = mysql_query("select count(varName) from scormvars where SCOInstanceID=$SCOInstanceID",$link);
	list($count) = mysql_fetch_row($result);

	// not yet initialized - initialize all elements
	if (! $count) {

		// elements that tell the SCO which other elements are supported by this API
		initializeElement('cmi.core._children','student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,exit,session_time');
		initializeElement('cmi.core.score._children','raw');

		// student information
		initializeElement('cmi.core.student_name',getFromLMS('cmi.core.student_name'));
		initializeElement('cmi.core.student_id',getFromLMS('cmi.core.student_id'));

		// test score
		initializeElement('cmi.core.score.raw','');
		initializeElement('adlcp:masteryscore',getFromLMS('adlcp:masteryscore'));

		// SCO launch and suspend data
		initializeElement('cmi.launch_data',getFromLMS('cmi.launch_data'));
		initializeElement('cmi.suspend_data','');

		// progress and completion tracking
		initializeElement('cmi.core.lesson_location','');
		initializeElement('cmi.core.credit','credit');
		initializeElement('cmi.core.lesson_status','not attempted');
		initializeElement('cmi.core.entry','ab-initio');
		initializeElement('cmi.core.exit','');

		// seat time
		initializeElement('cmi.core.total_time','0000:00:00');
		initializeElement('cmi.core.session_time','');

	}

	// new session so clear pre-existing session time
	writeElement('cmi.core.session_time','');

	// create the javascript code that will be used to set up the javascript cache, 
	$initializeCache = "var cache = new Object();\n";

	$result = mysql_query("select VarName,VarValue from scormvars where (SCOInstanceID=$SCOInstanceID)",$link);
	while (list($varname,$varvalue) = mysql_fetch_row($result)) {
	
		// make the value safe by escaping quotes and special characters
		$jvarvalue = addslashes($varvalue);

		// javascript to set the initial cache value
		$initializeCache .= "cache['$varname'] = '$jvarvalue';\n";

	}

	// return javascript for cache initialization to the calling program
	return $initializeCache;

}

// ------------------------------------------------------------------------------------
// LMS-specific code
// ------------------------------------------------------------------------------------
function setInLMS($varname,$varvalue) {
	return "OK";
}

function getFromLMS($varname) {

	switch ($varname) {

		case 'cmi.core.student_name':
			$varvalue = "Ashok Subedi";
			break;

		case 'cmi.core.student_id':
			$varvalue = "007";
			break;

		case 'adlcp:masteryscore':
			$varvalue = 0;
			break;

		case 'cmi.launch_data':
			$varvalue = "";
			break;

		default:
			$varvalue = '';

	}

	return $varvalue;

}

?>