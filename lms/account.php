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

            <li class="">

                <a href="index.php">
                    
                            <img src="images/home.png" />
                      
                            <h4>Home</h4>
                        
                    
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
             
             <li class="active">
                <a href="account.php" id="btn-more" style="display: block;">
                     <img src="images/account.png" />
                      
                            <h4>Account</h4>
                        <div class="arrow">
                            <div class="bubble-arrow-border"></div>
                        <div class="bubble-arrow"></div>
                    </div>
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
                    <h3>Under Construction</h3><hr/>
                    
                    <div class="widget stacked widget-table action-table">
                    
                <div class="widget-header">
                   
                    <h3>We are working days and nights.</h3>
                </div> <!-- /widget-header -->
                
                <div class="widget-content">

                    <br/><br/>

                    <center><img src="http://www.animatedgif.net/underconstruction/anim0206-1_e0.gif" alt="Smiley face"></center>
                    
                    <br/><br/>
                    
                </div> <!-- /widget-content -->
            
            
            
            <!-- Modal -->
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  
    <div class="modal-body" style="text-align:center;">
    <div class="row-fluid">
        <div class="span10 offset1">
            <div id="modalTab">
                <div class="tab-content">
                    <div class="tab-pane active" id="about">
    
   
    <hr>
   
      </div>
    </div>
</div>
</div>
</div>
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
        <script src="vendors/jquery-1.9.1.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script>
        
        <script>
        $(document).ready(function() {
    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

    //Click dropdown
    panelsButton.click(function() {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(400, function() {
            //Completed slidetoggle
            if(idFor.is(':visible'))
            {
                currentButton.html('<i class="icon-chevron-up text-muted"></i>');
            }
            else
            {
                currentButton.html('<i class="icon-chevron-down text-muted"></i>');
            }
        })
    });


    $('[data-toggle="tooltip"]').tooltip();

    // $('button').click(function(e) {
    //     e.preventDefault();
    //     alert("This is a demo.\n :-)");
    // });
});


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

});

        </script>
        
       
        
    </body>

</html>