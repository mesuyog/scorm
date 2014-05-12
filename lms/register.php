<html>
<html lang='en'>
<head>
    <meta charset="UTF-8" /> 
    <title>
        Register!!
    </title>
    <link rel="stylesheet" type="text/css" href="style.css" />
</head>   
<body>

<div id="wrapper">

	<form name="login-form" class="login-form" action="" method="post">
	
		<div class="header">
		<h1>Register Form</h1>
		<span>Fill out the form below to Register to Scrom lms.</span>
		</div>
	
		<div class="content">
		<input name="name_first" type="text" class="input username"  placeholder="First Name" required="true"/>
		
		<input name="name_last" type="text" class="input username" placeholder="Last Name" required="true"/>

		<input name="name_dept" type="text" class="input username" placeholder="Department" required="true" />
		
		<input name="name_uname" type="text" class="input username" placeholder="User Name" required="true"/>

		<input name="name_pass" type="password" class="input username" placeholder="Password" required="true"/>
			
		</div>

		<div class="footer">
		<input type="submit" name="Register" value="Register" class="button" />
		 
		</div>
	
	</form>

</div>
<div class="gradient"></div>


</body>
</html>

<?php 
	
	$connection = mysql_connect('localhost','root','root') or die(mysql_error());
	$db_select = mysql_select_db("scorm_db", $connection) or die(mysql_error());

	if(isset($_POST['Register'])){

	$fname = $_POST['name_first'];
	$lname = $_POST['name_last'];
	$dept = $_POST['name_dept'];
	$username = $_POST['name_uname'];
	$Password = $_POST['name_pass'];
	if($fname != null)
	$qry = "INSERT INTO scorm_db.studentinfo (LName, FName, Department, UserName, Password) VALUES ( '$fname', '$lname', '$dept', '$username', '$Password')";
	$result = mysql_query($qry);

	header("Location: loggin.php");
}
?>