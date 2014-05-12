<?php 

//  essential functions
require "subs.php";

//  read database login information and connect
require "config.php";
dbConnect();

// read form variables
$SCOInstanceID = $_REQUEST['SCOInstanceID'] * 1;

// ------------------------------------------------------------------------------------
// set cmi.core.lesson_status

// find existing value of cmi.core.lesson_status
$lessonstatus = readElement('cmi.core.lesson_status');

// if it's 'not attempted', change it to 'completed'
if ($lessonstatus == 'not attempted') {
	writeElement('cmi.core.lesson_status','completed');
}

// has a mastery score been specified in the IMS manifest file?
$masteryscore = readElement('adlcp:masteryscore');
$masteryscore *= 1;

if ($masteryscore) {

	// yes - so read the score
	$rawscore = readElement('cmi.core.score.raw');
	$rawscore *= 1;

	// set cmi.core.lesson_status to passed/failed
	if ($rawscore >= $masteryscore) {
		writeElement('cmi.core.lesson_status','passed');
	}
	else {
		writeElement('cmi.core.lesson_status','failed');
	}

}

// ------------------------------------------------------------------------------------
// set cmi.core.entry based on the value of cmi.core.exit

// clear existing value
writeElement('cmi.core.entry','');

// new entry value depends on exit value
$exit = readElement('cmi.core.exit');
if ($exit == 'suspend') {
	writeElement('cmi.core.entry','resume');
}
else {
	writeElement('cmi.core.entry','');
}

// ------------------------------------------------------------------------------------
// process changes to cmi.core.total_time

// read cmi.core.total_time from the 'scormvars' table
$totaltime = readElement('cmi.core.total_time');

// convert total time to seconds
$time = explode(':',$totaltime);
$totalseconds = $time[0]*60*60 + $time[1]*60 + $time[2];

// read the last-set cmi.core.session_time from the 'scormvars' table
$sessiontime = readElement('cmi.core.session_time');

// no session time set by SCO - set to zero
if (! $sessiontime) {
	$sessiontime = "00:00:00";
}

// convert session time to seconds
$time = explode(':',$sessiontime);
$sessionseconds = $time[0]*60*60 + $time[1]*60 + $time[2];

// new total time is ...
$totalseconds += $sessionseconds;

// break total time into hours, minutes and seconds
$totalhours = intval($totalseconds / 3600);
$totalseconds -= $totalhours * 3600;
$totalminutes = intval($totalseconds / 60);
$totalseconds -= $totalminutes * 60;

// reformat to comply with the SCORM data model
$totaltime = sprintf("%04d:%02d:%02d",$totalhours,$totalminutes,$totalseconds);

// save new total time to the 'scormvars' table
writeElement('cmi.core.total_time',$totaltime);

// delete the last session time
writeElement('cmi.core.session_time','');

// ------------------------------------------------------------------------------------

// return value to the calling program
print "true";
die;

?>