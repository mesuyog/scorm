<html>
<html lang='en'>
<head>
    <meta charset="UTF-8" /> 
    <title>
        Login!!
    </title>
    <link rel="stylesheet" type="text/css" href="style.css" />
</head>   
<body>

<div id="wrapper">

	<form name="login-form" class="login-form" action="checklogin.php" method="post">
	
		<div class="header">
		<h1>Daily Report</h1>
		<span>Below are the content of the daily report</span>
		</div>
	
		<div class="content">
		
		
		
	



<?php 

//  essential functions
require "subs.php";

//  read database login information and connect
require "config.php";
echo "<h3>Report For : </h3>"; 




showReport("testing");
function showReport($sessionID){
	global $link;
	dbConnect1();

	// la suyog vai yeha kei ramro presentation gara .. yeso time ko lagi ghadi sadi dekhauna milcha vane pani.. as you design.. 
	// natra simple presentation vayie pani huncha :D

	$sessionID = 9;

	$result = mysql_query("select student_name from coursesession where (sessionID=$sessionID)",$link);
	$result2 = mysql_query("select total_time from coursesession where (sessionID=$sessionID)",$link);
	$result3 = mysql_query("select student_id from coursesession where (sessionID=$sessionID)",$link);
	list($value) = mysql_fetch_row($result);
	list($value2) = mysql_fetch_row($result2);
	list($value3) = mysql_fetch_row($result3);
	echo $value;
	//echo $value2;

	/*echo "<br/>";
	echo "<h3 > Lession Status </h3>";
	echo $value2 ;
	echo "<br/>";*/
	?>
	<h2 style="margin-top:50px"> Lession Status: <br/> <?php echo "<h3>$value2 </h3>"; ?> </h2>
	<h2 style="margin-top:50px"> Student Id: <br/> <?php echo "<h3>$value3 </h3>"; ?> </h2>



	<?php

}

function dbConnect1() {

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

}


?>





</form>


</div>
<div class="gradient"></div>


</body>
</html>
