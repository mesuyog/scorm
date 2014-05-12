<?php
require "xmlparser.php";

// Get unique student-course login id for this student
//$SCOInstanceID = $_GET['SCOInstanceID'] * 1;
$SCOInstanceID = 9;
?>
<!DOCTYPE html>
<html class="no-js">
    
    <head>
        <title>SS : Admin Page</title>
        <!-- Bootstrap -->
        <link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
        <link href="bootstrap/css/bootstrap-responsive.css" rel="stylesheet" media="screen">
        <link href="assets/styles.css" rel="stylesheet" media="screen">
        
        <link href="assets/font-awesome.css" rel="stylesheet" media="screen">
        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
            <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>
    
    <body>
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container-fluid">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span class="icon-bar"></span>
                     <span class="icon-bar"></span>
                     <span class="icon-bar"></span>
                    </a>
                    <h1 style="padding-top:-20px;"><a class="brand" href="#">MDEV-SCORM</a></h1>
                    
                    <ul class="nav top-nav pagination-centered">
                        	<li><a href="#"><i class="icon-circle-arrow-left icon-2x"></i> Previous</a></li>
                            <li><a href="#"><i class="icon-circle-arrow-right icon-2x"></i> Next</a></li>
                            <li><a href="#"><i class="icon-remove-circle icon-2x"></i> Close</a></li>
                        </ul>
                        
                    <div class="nav-collapse collapse">
                    
                    	
                        <ul class="nav pull-right">
                        	
                            <li class="dropdown">
                                <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"> <i class="icon-user"></i> Ashok Subedi <i class="caret"></i>

                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a tabindex="-1" href="#">Profile</a>
                                    </li>
                                    <li>
                                        <a tabindex="-1" href="index.php">Return To LMS</a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <a tabindex="-1" href="login.html">Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        
                    </div>
                    <!--/.nav-collapse -->
                </div>
            </div>
        </div>

        <?php 
            $courseName = $_GET['course'];
            $SCOdata = readIMSManifestFile('courses/'.$courseName.'/imsmanifest.xml');
            // echo '<br/><br/><br/>';
            // echo sizeof($SCOdata);
            // var_dump($SCOdata);
        ?>
        <div class="container-full">
            <div class="row-fluid main-row">
                <div class="span3" id="sidebar">
                
                <div class="content-box" style="overflow:scroll"><br/>
                
        
        <ul class="nav nav-list bs-docs-sidenav affix-top nav-collapse collapse">
            <?php 
                // for now if there is just a single course we open on new window.
                $openOnNewWindow = false;
                if(sizeof($SCOdata)==1){
                  $openOnNewWindow = true;
                }
                // loop through the list of items
                foreach ($SCOdata as $identifier1 => $SCO) {
                  // data that we want 
                  //$SCO['title']= "Not Aviliable";
                  if(!isset($SCO['title'])){$SCO['title'] = "Not Aviliable";}
                  if(!isset($SCO['datafromlms'])){$SCO['datafromlms'] = "Not Aviliable";}
                  if(!isset($SCO['masteryscore'])){$SCO['masteryscore'] = "Not Aviliable";}
                  if(!isset($SCO['href'])){$SCO['href'] = "";}
                   if(!isset($SCO['files'])){$SCO['files'] = array("<center>-</center>");}

                   $count = substr_count(cleanVar($SCO['chapList']), '.');

                   $contentUrl = "courses/".$courseName."/".cleanVar($SCO['href']);
                   //echo $contentUrl;
                   //check if the url has .html or .php ie a dot to make it clickable or not.
                   if (strpos($contentUrl,'.') !== false) {
                      if($openOnNewWindow){  
                       //<a href="javascript:window.open('document.aspx','mywindowtitle','width=500,height=150')">open window</a>                      
                       //echo "<li class='popop'><a target='displayFrame' href=".$contentUrl.">".numberOfSpace($count)."<input type='checkbox' disabled>&nbsp;&nbsp;".cleanVar($SCO['title'])."</a></li>";
                        //echo "<li class='popop'><a href='JavaScript:newPopup('".$contentUrl."');'>".numberOfSpace($count)."<input type='checkbox' disabled>&nbsp;&nbsp;".cleanVar($SCO['title'])."</a></li>";
                        echo "<li class='comit'><a href='JavaScript:newPopup(&#39;".$contentUrl."&#39;);'>".numberOfSpace($count)."<input type='checkbox' disabled>&nbsp;&nbsp;".cleanVar($SCO['title'])."</a></li>";
                      }else{
                        echo "<li><a target='displayFrame' href=".$contentUrl.">".numberOfSpace($count)."<input type='checkbox' disabled>&nbsp;&nbsp;".cleanVar($SCO['title'])."</a></li>";
                      }
                    }else{
                       echo "<b><li class = 'comit'>".numberOfSpace($count)."<input type='checkbox' disabled >&nbsp;&nbsp;".cleanVar($SCO['title'])."</li></b>";
                    }               
                   
                  
                }

              
                // function to clean data for display
                function cleanVar($value) {
                  $value = (trim($value) == "") ? "&nbsp;" : htmlentities(trim($value));
                  return $value;
                }

                //following function just to insert space in front of course to maintain their hierarchy. Sorry with spelling.
                function numberOfSpace($count){
                  $returnSpaceString="";
                  for($i=0; $i<$count; $i++){
                    $returnSpaceString.="&nbsp;&nbsp;&nbsp;";
                  }
                  return $returnSpaceString;
                }
            ?>

             
          <!-- <li><a href="#dropdowns"><input type="checkbox"></i> Dropdowns</a></li>
          <li><a href="#buttonGroups"><input type="checkbox"></i> Button groups</a></li>
          <li><a href="#buttonDropdowns"><input type="checkbox"></i> Button dropdowns</a></li>
          <li><a href="#navs"><input type="checkbox"></i> Navs</a></li>
          <li><a href="#navbar"><input type="checkbox"></i> Navbar</a></li>
          <li><a href="#breadcrumbs"><input type="checkbox"></i> Breadcrumbs</a></li>
          <li><a href="#pagination"><input type="checkbox"></i> Pagination</a></li>
          <li><a href="#labels-badges"><input type="checkbox"></i> Labels and badges</a></li>
          <li><a href="#typography"><input type="checkbox"></i> Typography</a></li>
          <li><a href="#thumbnails"><input type="checkbox"></i> Thumbnails</a></li>
          <li><a href="#alerts"><input type="checkbox"></i> Alerts</a></li>
          <li><a href="#progress"><input type="checkbox"></i> Progress bars</a></li>
          <li><a href="#media"><input type="checkbox"></i> Media object</a></li>
          <li><a href="#misc"><input type="checkbox"></i> Misc</a></li> -->
        </ul>
        		<div class="clearfix"></div>
                  
                </div>
                </div>
                
                <!--/span-->
                <div class="span9" id="content" >
                  <!-- The API object should be located in a window that is a parent of the SCO 
                  or a parent of the opener window of the SCO. 
                In SCORM 1.1 and SCORM 1.2, the API object is always named “API”. 
                In SCORM 2004, the object is named “API_1484_11″.-->
                
                  <iframe src="api.php?SCOInstanceID=<?php print $SCOInstanceID; ?>" name="API" width="0px" height="0px" noresize></iframe>

                <div class="content-box">

                   <!-- <frameset frameborder="0" framespacing="0" border="0" rows="250,*" cols="*" onbeforeunload="API.LMSFinish('');" onunload="API.LMSFinish('');">
                    <frame src="api.php?SCOInstanceID='1'?php print $SCOInstanceID; ?>" name="API" noresize>
                    <frame src="../course/index.html" name="course displayFrame">
                  </frameset> -->
                  
                    
                    <iframe src="" name="displayFrame" width="98%" height="95%"></iframe>
                    </div>
                </div>
          
                    
                     <hr>
            <footer>
                <p class="text-center">&copy; MHC 2014</p>
            </footer>
                </div>
            </div>
           </div>
        </div>
        <!--/.fluid-container-->
        <script src="vendors/jquery-1.9.1.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script>
        
        <script>
       

$(document).ready(function(){
if (document.documentElement.clientWidth > 767) {
    $('.row-fluid').each(function(){  
        var highestBox = 0;

        $(this).find('.content-box').each(function(){
            if($(this).height() > highestBox){  
                highestBox = $(this).height();  
            }
        })

        $(this).find('.content-box').height(highestBox);
    });    
}
 $('.comit').click(function(){
   //alert('clicked me ');
      API.CallMeInNeed('');
 });



});

//calling LMSFinsih before loding and closing browser or tab.
$(window).load(function(){
  API.LMSFinish('');
});

// window.onbeforeunload = function(e) {
//   return 'Dialog text here.';
// };
window.onbeforeunload = function(e) {
   API.LMSFinish('');  
   //return 'Your course session is saved.';
};

function newPopup(url) {
    popupWindow = window.open(
        url,'popUpWindow','height=700,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
}

</script>
        
       
        
    </body>

</html>