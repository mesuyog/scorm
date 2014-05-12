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
		<h1>Login Form</h1>
		<span>Fill out the form below to login to Scrom lms.</span>
		</div>
	
		<div class="content">
		<input name="myusername" type="text" class="input username" placeholder="Username" required="true"/>
		<div class="user-icon"></div>
		<input name="mypassword" type="password" class="input password" placeholder="Password" required="true" />
		<div class="pass-icon"></div>		
		</div>

		<div class="footer">
		<input type="submit" name="submit" value="Login" class="button" />
		  <span class="pull-right"><a href="register.php">Register Now!!</a></span>
		</div>
	
	</form>

</div>
<div class="gradient"></div>


</body>
</html>


