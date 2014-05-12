<?php 

/*

VS SCORM - showdb.php 
Rev 1.2 - Wednesday, August 12, 2009
Copyright (C) 2009, Addison Robson LLC

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, 
Boston, MA	02110-1301, USA.

*/

//  database login information
require "../config.php";

// connect to the database
$link = mysql_connect($dbhost,$dbuser,$dbpass);
mysql_select_db($dbname,$link);

// read GET variables
$SCOInstanceID = $_REQUEST['SCOInstanceID'] * 1;

// create a table showing all variables
$output  = "<table cellpadding=3 cellspacing=0 border=1>\n";
$output .= "<tr>\n";
$output .= "\t<td valign=top align=left><b>SCOInstanceID</b></td>\n";
$output .= "\t<td valign=top align=left><b>varName</b></td>\n";
$output .= "\t<td valign=top align=left><b>varValue</b></td>\n";
$output .= "</tr>\n";
$result = mysql_query("select SCOInstanceID,varName,varValue from scormvars order by SCOInstanceID,varName",$link);
while (list($SCOInstanceID,$varName,$varValue) = mysql_fetch_row($result)) {

	// make safe for display
	$safeVarName = htmlentities($varName);
	$safeVarValue = ($varValue == "") ? '&nbsp;' : htmlentities($varValue);

	// table row
	$output .= "<tr>\n";
	$output .= "\t<td valign=top align=center>$SCOInstanceID</td>\n";
	$output .= "\t<td valign=top align=left>$safeVarName</td>\n";
	$output .= "\t<td valign=top align=left>$safeVarValue</td>\n";
	$output .= "</tr>\n";

}

$output .= "</table>\n";

?>
<html>
<head>
	<title></title>
	<style type="text/css">
	p,td,li,body,input,select,textarea {
		font-family: verdana, sans-serif;
		font-size: 10pt;
	}
	</style>
</head>
<body bgcolor="#ffffff">
<p><?php print $output; ?>
</body>
</html>