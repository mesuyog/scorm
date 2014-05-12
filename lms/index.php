<?php require_once "phpuploader/include_phpuploader.php" ?>
<?php session_start(); ?>
<!DOCTYPE html>
<html class="no-js">
    
    <head>
        <title>LMS : Admin Page</title>
        <!-- Bootstrap -->
        <link href="bootstrap/css/bootstrap.css" rel="stylesheet" media="screen">
        <link href="bootstrap/css/bootstrap-responsive.css" rel="stylesheet" media="screen">
        <link href="assets/styles.css" rel="stylesheet" media="screen">      
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
                    <a class="brand" href="#">LMS</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav pull-right">
                            
                            <li class="active">
                                <a href="#"><i class="icon-home"></i>  Dashboard</a>
                                 
                            </li>
                            
                            <li class="dropdown">
                                <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"> <i class="icon-user"></i> Ashok Subedi <i class="caret"></i>

                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a tabindex="-1" href="#">Profile</a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                        <a tabindex="-1" href="logout.php">Logout</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        
                    </div>
                    <!--/.nav-collapse -->
                </div>
            </div>
        </div>
        <div class="container-full">
            <div class="row-fluid main-row">
                <div class="span2" id="sidebar">
                
                <div class="content-box">
                <ul class="nav nav-tabs nav-stacked bs-docs-sidenav nav-collapse collapse">

            <li class="active">

                <a href="index.php">
                    
                            <img src="images/home.png" />
                      
                            <h4>Home</h4>
                        
                    <div class="arrow">
                        <div class="bubble-arrow-border"></div>
                        <div class="bubble-arrow"></div>
                    </div>
                </a>

            </li>

            <li class="">
                <a href="people.php" id="btn-more" style="display: block;">
                     <img src="images/people.png" />
                      
                            <h4>People</h4>
                </a>
             </li>
             
             <li class="">
                <a href="certificates.php" id="btn-more" style="display: block;">
                     <img src="images/certificates.png" />
                      
                            <h4>Certifiactes</h4>
                </a>
             </li>
             
             <li class="">
                <a href="account.php" id="btn-more" style="display: block;">
                     <img src="images/account.png" />
                      
                            <h4>Account</h4>
                </a>
             </li>
             
            

        </ul>
                <div class="clearfix"></div>
                  
                </div>
                </div>
                
                <!--/span-->
                <div class="span10" id="content">
                <div class="content-box">
                    <div class="row-fluid">
                    
                    <div class="span9">
                    <h3>Courses</h3><hr/>
                    
                    <div class="widget stacked widget-table action-table">
                    
                <div class="widget-header">
                    <i class="icon-th-list"></i>
                    <h3>You can preview (eye) or delete (cross) the courses.</h3>
                </div> <!-- /widget-header -->
                
                <div class="widget-content">

                            <?php
                                // $noOfDirs = array();
                                // $counter = 0;
                                // if ($handle = opendir('courses')) {
                                //     $blacklist = array(); //doesn't disply these courses
                                //     while (false !== ($file = readdir($handle))) {
                                //         if (!in_array($file, $blacklist)) {
                                //             //echo "$file\n";
                                //             $noOfDirs[$counter]=$file;
                                //             $counter++;
                                //         }
                                //     }
                                //     closedir($handle);
                                // }
                            $dirs = array_filter(glob('courses/*'), 'is_dir');
                            //print_r( $dirs);
                            $onlyDirs= array( );
                            $counter = 0;
                            foreach($dirs as $a){
                                $onlyDirs[$counter]= substr($a, 8);
                                $counter++;
                            }
                            ?>
                    
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Browser</th>
                                <th class="td-actions"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                             for($i=0; $i<count($onlyDirs);$i++){
                                  echo "<tr>";
                                  echo "<td valign=top align=left>".($i+1)."</td>";
                                  echo "<td valign=top align=left>".$onlyDirs[$i]."</td>";    
                                  echo '<td align="center"class="td-actions">';                                                                       
                                  ?>                  
                                   
                                    <a class="btn btn-small viewCourse"  href="scorm_presenter.php?course=<?php echo $onlyDirs[$i];?>"  role="button">
                                        <i class="btn-icon-only icon-eye-open"></i>                                     
                                    </a>
                                    
                                    <a href="#" id="<?php echo $onlyDirs[$i]; ?>" class="btn btn-small btn-danger deleteCourse" value="insert">
                                        <i class="btn-icon-only icon-remove"></i>                                       
                                    </a>
                                </td>
                            </tr>
                                  <?php
                             }
                            ?>
                             
                            </tbody>
                        </table>
                    
                </div> <!-- /widget-content -->
            
            
            
            <!-- Modal -->
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">                     
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button class="btn btn-primary">Save changes</button>
  </div>
</div>


            </div> <!-- /widget -->
            
            <hr/>
            
        
        </div><!--span9 END-->
        <div class="span3">
            
                <div class="demo">
                    <h5>Upload Your SCORM Course</h5><h6>(one at a time)</h6>
                    <p>(Allowed file types: <span style="color:red">zip</span>).
                    <p>
                    <?php
                        $uploader=new PhpUploader();
                        
                        $uploader->MultipleFilesUpload=false;
                        $uploader->InsertText="Upload File (Max 100M)";
                        
                        $uploader->MaxSizeKB=10240000;  
                        $uploader->AllowedFileExtensions="zip";
                        
                        //Where'd the files go?
                        $uploader->SaveDirectory="uploadedZipCourse";                        
                        $uploader->Render();                       
                    ?>
                    </p>    
                    
                <script type='text/javascript'>
                function CuteWebUI_AjaxUploader_OnTaskComplete(task)
                {
                    alert(task.FileName + " is uploaded and extracted :)");
                    window.location.reload();                   
                }
                </script>       
                </div><br/>
              
     <div class="well">
        <h5>Welcome to SCORM LMS</h5>
        <p>Hello user! welcome to SCORM LMS. Please make sure that you upload SCORM complient .zip files <span style="color:red">(no exception/error-handling for now)</span> that will be uploaded to
            the server. You can learn more about SCORM <a href="http://www.adlnet.gov/" style="color:blue">here</a></p>       
        
    </div><!--well EDN-->
                    </div><!--span3 END--->
                    </div><!--row FLUID END-->
                     <hr>
            <footer>
                <p class="text-center">&copy; MHC 2014</p>
            </footer>
                </div>
            </div>
           </div>
        </div>
        <!--/.fluid-container-->
 <script type="text/javascript" src="jquery.js"></script>  
<script type="text/javascript">  
// jQuery Document  
var base_url='../LMS_SCORM/';
// base_url='http://cloud.mdevsolutions.com/';

//var ri = 50; // this request id to test
$(document).ready(function(){ 
   
    $(".deleteCourse").click(function(){  
        var idP = $(this).prop('id');       
      $.ajax({
           url: 'common.php',          
           type: 'POST',
           data:{jsondata: idP},
           success: function(data){
            //console.log("server responds: "+data);
            window.location.reload();
           }
        });
    });             
});   
</script>  
           
    </body>

</html>