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

	$columnName = getColumnName($VarName);
	$safeVarName = mysql_real_escape_string($columnName);

	//$result = mysql_query("select VarValue from scormvars where ((SCOInstanceID=$SCOInstanceID) and (VarName='$safeVarName'))",$link);
	$result = mysql_query("select $safeVarName from coursesession where (sessionID=$SCOInstanceID)",$link);
	list($value) = mysql_fetch_row($result);

	return $value;

}

function writeElement($VarName,$VarValue) { 

	global $link;
	global $SCOInstanceID;

	$columnName = mysql_real_escape_string($VarName);
	$safeVarName = getColumnName($columnName);
	$safeVarValue = mysql_real_escape_string($VarValue);
	
	mysql_query("update coursesession set $safeVarName='$safeVarValue' where (sessionID=$SCOInstanceID)",$link);
	
	return 'true';
}

function initializeElement($VarName,$VarValue) {

	global $link;
	global $SCOInstanceID;

	$columnName = mysql_real_escape_string($VarName);
	$safeVarName = getColumnName($columnName);
	$safeVarValue = mysql_real_escape_string($VarValue);
	
	mysql_query("update coursesession set $safeVarName='$safeVarValue' where (sessionID=$SCOInstanceID)",$link);
	

}

function initializeSCO() {

	global $link;
	global $SCOInstanceID;

	// has the SCO previously been initialized?
	var_dump($SCOInstanceID);
	$result = mysql_query("select is_initialized from coursesession where sessionID=$SCOInstanceID",$link);
	$row = mysql_fetch_row($result);	

	// not yet initialized - initialize all elements
	if ($row[0]=='false') {

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

		mysql_query("update coursesession set is_initialized='true' where (sessionID=$SCOInstanceID)",$link);

	}

	// new session so clear pre-existing session time
	writeElement('cmi.core.session_time','');

	// create the javascript code that will be used to set up the javascript cache, 
	$initializeCache = "var cache = new Object();\n";

	$result = mysql_query("select * from coursesession where (sessionID=$SCOInstanceID)",$link);
	$row = mysql_fetch_row($result);
	
	//new array containing rows
	$newArray = array("sessionId", "courseID", "cmi.core._children", "cmi.core.score._children", "student_name", "student_id", "cmi.core.score.raw", "adlcp:masteryscore", 
		"cmi.launch_data", "cmi.suspend_data", "cmi.core.lesson_location", "cmi.core.credit", "cmi.core.lesson_status", "cmi.core.entry", "cmi.core.exit", "cmi.core.total_time", "cmi.core.session_time",
			"testscore");

	for($i=0;$i<18;$i++){
	    // make the value safe by escaping quotes and special characters
		$jvarvalue = addslashes($row[$i]);
		$varname = $newArray[$i];

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

function getColumnName($varname) {

	switch ($varname) {

		case 'cmi.core.student_name':
			$varvalue = "student_name";
			break;

		case 'cmi.core.student_id':
			$varvalue = "student_id";
			break;

		case 'adlcp:masteryscore':
			$varvalue = "mastryscore";
			break;

		case 'cmi.core._children':
			$varvalue = "children";
			break;

		case 'cmi.core.score._children':
			$varvalue = "score_children";
			break;

		case 'cmi.core.score.raw':
			$varvalue = "score_raw";
			break;

		case 'adlcp:masteryscore':
			$varvalue = "masteryscore";
			break;

		case 'cmi.launch_data':
			$varvalue = "launch_data";
			break;

		case 'cmi.suspend_data':
			$varvalue = "suspend_data";
			break;

		case 'cmi.core.lesson_location':
			$varvalue = "lesson_location";
			break;

		case 'cmi.core.credit':
			$varvalue = "credit";
			break;

		case 'cmi.core.lesson_status':
			$varvalue = "lesson_status";
			break;

		case 'cmi.core.entry':
			$varvalue = "entry";
			break;

		case 'cmi.core.exit':
			$varvalue = "exitcourse";
			break;

		case 'cmi.core.total_time':
			$varvalue = "total_time";
			break;

		case 'cmi.core.session_time':
			$varvalue = "session_time";
			break;

		default:
			$varvalue = 'test';

	}

	return $varvalue;

}

?>