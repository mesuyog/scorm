<?php 

/*

VS SCORM - cleardb.php 
Rev 1.1 - Wednesday, August 12, 2009
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

// GET data
$SCOInstanceID = $_REQUEST['SCOInstanceID'] * 1;

// delete all data
mysql_query("delete from scormvars where (SCOInstanceID=$SCOInstanceID)",$link);

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
<p>Database data cleared for SCOInstanceID = <?php print $SCOInstanceID; ?>.
</body>
</html>