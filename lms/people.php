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

			<li class="active">
				<a href="people.php" id="btn-more" style="display: block;">
					 <img src="images/people.png" />
                      
							<h4>People</h4>
                            
                            <div class="arrow">
						<div class="bubble-arrow-border"></div>
						<div class="bubble-arrow"></div>
					</div>
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
                    <h3>Peoples</h3><hr/>
                    
                    <div class="widget stacked widget-table action-table">
                    
                <div class="widget-header">
                    <i class="icon-th-list"></i>
                    <h3>Admin can view students, their course and make various changes</h3>
                </div> <!-- /widget-header -->
                
                <div class="widget-content">
                    
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Joined Date</th>
                                <th class="td-actions"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ashok Subedi</td>
                                <td>1999-12-15</td>
                                <td class="td-actions">
                                    <a class="btn btn-small"  href="#myModal" role="button" data-toggle="modal">
                                        <i class="btn-icon-only icon-eye-open"></i>                                     
                                    </a>
                                    
                                    <a href="javascript:;" class="btn btn-small btn-danger">
                                        <i class="btn-icon-only icon-remove"></i>                                       
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Sujan Adhikari</td>
                                <td>2010-02-12</td>
                                <td class="td-actions">
                                    <a class="btn btn-small"  href="#myModal" role="button" data-toggle="modal">
                                        <i class="btn-icon-only icon-eye-open"></i>                                     
                                    </a>
                                    
                                    <a href="javascript:;" class="btn btn-small btn-danger">
                                        <i class="btn-icon-only icon-remove"></i>                                       
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>John Mauchly</td>
                                <td>2000-10-23</td>
                                <td class="td-actions">
                                    <a class="btn btn-small"  href="#myModal" role="button" data-toggle="modal">
                                        <i class="btn-icon-only icon-eye-open"></i>                                     
                                    </a>
                                    
                                    <a href="javascript:;" class="btn btn-small btn-danger">
                                        <i class="btn-icon-only icon-remove"></i>                                       
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Bikaram Basnet</td>
                                <td>2005-04-04</td>
                                <td class="td-actions">
                                    <a class="btn btn-small"  href="#myModal" role="button" data-toggle="modal">
                                        <i class="btn-icon-only icon-eye-open"></i>                                     
                                    </a>
                                    
                                    <a href="javascript:;" class="btn btn-small btn-danger">
                                        <i class="btn-icon-only icon-remove"></i>                                       
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Alisha Subedi</td>
                                <td>1999-10-12</td>
                                <td class="td-actions">
                                    <a class="btn btn-small"  href="#myModal" role="button" data-toggle="modal">
                                        <i class="btn-icon-only icon-eye-open"></i>                                     
                                    </a>
                                    
                                    <a href="javascript:;" class="btn btn-small btn-danger">
                                        <i class="btn-icon-only icon-remove"></i>                                       
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Barsha Pun</td>
                                <td>2009-07-23</td>
                                <td class="td-actions">
                                    <a class="btn btn-small"  href="#myModal" role="button" data-toggle="modal">
                                        <i class="btn-icon-only icon-eye-open"></i>                                     
                                    </a>
                                    
                                    <a href="javascript:;" class="btn btn-small btn-danger">
                                        <i class="btn-icon-only icon-remove"></i>                                       
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    
                </div> <!-- /widget-content -->
            
            
            
            <!-- Modal -->
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">✕</button>
                    <h3>About Sujan</h3>
                </div>
                    <div class="modal-body" style="text-align:center;">
                    <div class="row-fluid">
                        <div class="span10 offset1">
                            <div id="modalTab">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="about">
    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R" name="aboutme" width="140" height="140" border="0" class="img-circle"></a>
      <h3 class="media-heading">Sujan Adhikari<small> NEPAL</small></h3>
                <span><strong>Courses: </strong></span>
                <span class="label label-warning">HTML5/CSS</span>
                <span class="label label-info">Adobe CS 5.5</span>
                <span class="label label-info">Microsoft Office</span>
                <span class="label label-success">Windows XP, Vista, 7</span>
    </center>
    <hr>
    <center>
    <p class="text-left"><strong>Comment: </strong><br>
        Hello I'm Sujan. I study bioloty and I like traveling and making new friends. But the truth is I'm a programmer.</p>
      <br>
      </center>
      </div>
    </div>
</div>
</div>
</div>
</div>
  <div class="modal-footer">
    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
    <button class="btn btn-primary">Save changes</button>
  </div>
</div>


            </div> <!-- /widget -->
            
            <hr/>
            <form class="form-horizontal">
            <fieldset class="well">
                <!-- Address form -->
         
                <h4>Add a New Student</h4><hr/>
         
                <!-- full-name input-->
                <div class="control-group">
                    <label class="control-label">Full Name</label>
                    <div class="controls">
                        <input id="full-name" name="full-name" type="text" placeholder="full name"
                        class="input-xlarge">
                        <p class="help-block"></p>
                    </div>
                </div>
                <!-- address-line1 input-->
                <div class="control-group">
                    <label class="control-label">Address Line 1</label>
                    <div class="controls">
                        <input id="address-line1" name="address-line1" type="text" placeholder="address line 1"
                        class="input-xlarge">
                        <p class="help-block">Street address, P.O. box, company name, c/o</p>
                    </div>
                </div>
                <!-- address-line2 input-->
                <div class="control-group">
                    <label class="control-label">Address Line 2</label>
                    <div class="controls">
                        <input id="address-line2" name="address-line2" type="text" placeholder="address line 2"
                        class="input-xlarge">
                        <p class="help-block">Apartment, suite , unit, building, floor, etc.</p>
                    </div>
                </div>
                <!-- city input-->
                <div class="control-group">
                    <label class="control-label">City / Town</label>
                    <div class="controls">
                        <input id="city" name="city" type="text" placeholder="city" class="input-xlarge">
                        <p class="help-block"></p>
                    </div>
                </div>
                <!-- region input-->
                <div class="control-group">
                    <label class="control-label">State / Province / Region</label>
                    <div class="controls">
                        <input id="region" name="region" type="text" placeholder="state / province / region"
                        class="input-xlarge">
                        <p class="help-block"></p>
                    </div>
                </div>
                <!-- postal-code input-->
                <div class="control-group">
                    <label class="control-label">Zip / Postal Code</label>
                    <div class="controls">
                        <input id="postal-code" name="postal-code" type="text" placeholder="zip or postal code"
                        class="input-xlarge">
                        <p class="help-block"></p>
                    </div>
                </div>
                <!-- country select -->
                <div class="control-group">
                    <label class="control-label">Country</label>
                    <div class="controls">
                        <select id="country" name="country" class="input-xlarge">
                            <option value="" selected="selected">(please select a country)</option>
                            <option value="AF">Afghanistan</option>
                            <option value="AL">Albania</option>
                            <option value="DZ">Algeria</option>
                            <option value="AS">American Samoa</option>
                            <option value="AD">Andorra</option>
                            <option value="AO">Angola</option>
                            <option value="AI">Anguilla</option>
                            <option value="AQ">Antarctica</option>
                            <option value="AG">Antigua and Barbuda</option>
                            <option value="AR">Argentina</option>
                            <option value="AM">Armenia</option>
                            <option value="AW">Aruba</option>
                            <option value="AU">Australia</option>
                            <option value="AT">Austria</option>
                            <option value="AZ">Azerbaijan</option>
                            <option value="BS">Bahamas</option>
                            <option value="BH">Bahrain</option>
                            <option value="BD">Bangladesh</option>
                            <option value="BB">Barbados</option>
                            <option value="BY">Belarus</option>
                            <option value="BE">Belgium</option>
                            <option value="BZ">Belize</option>
                            <option value="BJ">Benin</option>
                            <option value="BM">Bermuda</option>
                            <option value="BT">Bhutan</option>
                            <option value="BO">Bolivia</option>
                            <option value="BA">Bosnia and Herzegowina</option>
                            <option value="BW">Botswana</option>
                            <option value="BV">Bouvet Island</option>
                            <option value="BR">Brazil</option>
                            <option value="IO">British Indian Ocean Territory</option>
                            <option value="BN">Brunei Darussalam</option>
                            <option value="BG">Bulgaria</option>
                            <option value="BF">Burkina Faso</option>
                            <option value="BI">Burundi</option>
                            <option value="KH">Cambodia</option>
                            <option value="CM">Cameroon</option>
                            <option value="CA">Canada</option>
                            <option value="CV">Cape Verde</option>
                            <option value="KY">Cayman Islands</option>
                            <option value="CF">Central African Republic</option>
                            <option value="TD">Chad</option>
                            <option value="CL">Chile</option>
                            <option value="CN">China</option>
                            <option value="CX">Christmas Island</option>
                            <option value="CC">Cocos (Keeling) Islands</option>
                            <option value="CO">Colombia</option>
                            <option value="KM">Comoros</option>
                            <option value="CG">Congo</option>
                            <option value="CD">Congo, the Democratic Republic of the</option>
                            <option value="CK">Cook Islands</option>
                            <option value="CR">Costa Rica</option>
                            <option value="CI">Cote d'Ivoire</option>
                            <option value="HR">Croatia (Hrvatska)</option>
                            <option value="CU">Cuba</option>
                            <option value="CY">Cyprus</option>
                            <option value="CZ">Czech Republic</option>
                            <option value="DK">Denmark</option>
                            <option value="DJ">Djibouti</option>
                            <option value="DM">Dominica</option>
                            <option value="DO">Dominican Republic</option>
                            <option value="TP">East Timor</option>
                            <option value="EC">Ecuador</option>
                            <option value="EG">Egypt</option>
                            <option value="SV">El Salvador</option>
                            <option value="GQ">Equatorial Guinea</option>
                            <option value="ER">Eritrea</option>
                            <option value="EE">Estonia</option>
                            <option value="ET">Ethiopia</option>
                            <option value="FK">Falkland Islands (Malvinas)</option>
                            <option value="FO">Faroe Islands</option>
                            <option value="FJ">Fiji</option>
                            <option value="FI">Finland</option>
                            <option value="FR">France</option>
                            <option value="FX">France, Metropolitan</option>
                            <option value="GF">French Guiana</option>
                            <option value="PF">French Polynesia</option>
                            <option value="TF">French Southern Territories</option>
                            <option value="GA">Gabon</option>
                            <option value="GM">Gambia</option>
                            <option value="GE">Georgia</option>
                            <option value="DE">Germany</option>
                            <option value="GH">Ghana</option>
                            <option value="GI">Gibraltar</option>
                            <option value="GR">Greece</option>
                            <option value="GL">Greenland</option>
                            <option value="GD">Grenada</option>
                            <option value="GP">Guadeloupe</option>
                            <option value="GU">Guam</option>
                            <option value="GT">Guatemala</option>
                            <option value="GN">Guinea</option>
                            <option value="GW">Guinea-Bissau</option>
                            <option value="GY">Guyana</option>
                            <option value="HT">Haiti</option>
                            <option value="HM">Heard and Mc Donald Islands</option>
                            <option value="VA">Holy See (Vatican City State)</option>
                            <option value="HN">Honduras</option>
                            <option value="HK">Hong Kong</option>
                            <option value="HU">Hungary</option>
                            <option value="IS">Iceland</option>
                            <option value="IN">India</option>
                            <option value="ID">Indonesia</option>
                            <option value="IR">Iran (Islamic Republic of)</option>
                            <option value="IQ">Iraq</option>
                            <option value="IE">Ireland</option>
                            <option value="IL">Israel</option>
                            <option value="IT">Italy</option>
                            <option value="JM">Jamaica</option>
                            <option value="JP">Japan</option>
                            <option value="JO">Jordan</option>
                            <option value="KZ">Kazakhstan</option>
                            <option value="KE">Kenya</option>
                            <option value="KI">Kiribati</option>
                            <option value="KP">Korea, Democratic People's Republic of</option>
                            <option value="KR">Korea, Republic of</option>
                            <option value="KW">Kuwait</option>
                            <option value="KG">Kyrgyzstan</option>
                            <option value="LA">Lao People's Democratic Republic</option>
                            <option value="LV">Latvia</option>
                            <option value="LB">Lebanon</option>
                            <option value="LS">Lesotho</option>
                            <option value="LR">Liberia</option>
                            <option value="LY">Libyan Arab Jamahiriya</option>
                            <option value="LI">Liechtenstein</option>
                            <option value="LT">Lithuania</option>
                            <option value="LU">Luxembourg</option>
                            <option value="MO">Macau</option>
                            <option value="MK">Macedonia, The Former Yugoslav Republic of</option>
                            <option value="MG">Madagascar</option>
                            <option value="MW">Malawi</option>
                            <option value="MY">Malaysia</option>
                            <option value="MV">Maldives</option>
                            <option value="ML">Mali</option>
                            <option value="MT">Malta</option>
                            <option value="MH">Marshall Islands</option>
                            <option value="MQ">Martinique</option>
                            <option value="MR">Mauritania</option>
                            <option value="MU">Mauritius</option>
                            <option value="YT">Mayotte</option>
                            <option value="MX">Mexico</option>
                            <option value="FM">Micronesia, Federated States of</option>
                            <option value="MD">Moldova, Republic of</option>
                            <option value="MC">Monaco</option>
                            <option value="MN">Mongolia</option>
                            <option value="MS">Montserrat</option>
                            <option value="MA">Morocco</option>
                            <option value="MZ">Mozambique</option>
                            <option value="MM">Myanmar</option>
                            <option value="NA">Namibia</option>
                            <option value="NR">Nauru</option>
                            <option value="NP">Nepal</option>
                            <option value="NL">Netherlands</option>
                            <option value="AN">Netherlands Antilles</option>
                            <option value="NC">New Caledonia</option>
                            <option value="NZ">New Zealand</option>
                            <option value="NI">Nicaragua</option>
                            <option value="NE">Niger</option>
                            <option value="NG">Nigeria</option>
                            <option value="NU">Niue</option>
                            <option value="NF">Norfolk Island</option>
                            <option value="MP">Northern Mariana Islands</option>
                            <option value="NO">Norway</option>
                            <option value="OM">Oman</option>
                            <option value="PK">Pakistan</option>
                            <option value="PW">Palau</option>
                            <option value="PA">Panama</option>
                            <option value="PG">Papua New Guinea</option>
                            <option value="PY">Paraguay</option>
                            <option value="PE">Peru</option>
                            <option value="PH">Philippines</option>
                            <option value="PN">Pitcairn</option>
                            <option value="PL">Poland</option>
                            <option value="PT">Portugal</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="QA">Qatar</option>
                            <option value="RE">Reunion</option>
                            <option value="RO">Romania</option>
                            <option value="RU">Russian Federation</option>
                            <option value="RW">Rwanda</option>
                            <option value="KN">Saint Kitts and Nevis</option>
                            <option value="LC">Saint LUCIA</option>
                            <option value="VC">Saint Vincent and the Grenadines</option>
                            <option value="WS">Samoa</option>
                            <option value="SM">San Marino</option>
                            <option value="ST">Sao Tome and Principe</option>
                            <option value="SA">Saudi Arabia</option>
                            <option value="SN">Senegal</option>
                            <option value="SC">Seychelles</option>
                            <option value="SL">Sierra Leone</option>
                            <option value="SG">Singapore</option>
                            <option value="SK">Slovakia (Slovak Republic)</option>
                            <option value="SI">Slovenia</option>
                            <option value="SB">Solomon Islands</option>
                            <option value="SO">Somalia</option>
                            <option value="ZA">South Africa</option>
                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                            <option value="ES">Spain</option>
                            <option value="LK">Sri Lanka</option>
                            <option value="SH">St. Helena</option>
                            <option value="PM">St. Pierre and Miquelon</option>
                            <option value="SD">Sudan</option>
                            <option value="SR">Suriname</option>
                            <option value="SJ">Svalbard and Jan Mayen Islands</option>
                            <option value="SZ">Swaziland</option>
                            <option value="SE">Sweden</option>
                            <option value="CH">Switzerland</option>
                            <option value="SY">Syrian Arab Republic</option>
                            <option value="TW">Taiwan, Province of China</option>
                            <option value="TJ">Tajikistan</option>
                            <option value="TZ">Tanzania, United Republic of</option>
                            <option value="TH">Thailand</option>
                            <option value="TG">Togo</option>
                            <option value="TK">Tokelau</option>
                            <option value="TO">Tonga</option>
                            <option value="TT">Trinidad and Tobago</option>
                            <option value="TN">Tunisia</option>
                            <option value="TR">Turkey</option>
                            <option value="TM">Turkmenistan</option>
                            <option value="TC">Turks and Caicos Islands</option>
                            <option value="TV">Tuvalu</option>
                            <option value="UG">Uganda</option>
                            <option value="UA">Ukraine</option>
                            <option value="AE">United Arab Emirates</option>
                            <option value="GB">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="UM">United States Minor Outlying Islands</option>
                            <option value="UY">Uruguay</option>
                            <option value="UZ">Uzbekistan</option>
                            <option value="VU">Vanuatu</option>
                            <option value="VE">Venezuela</option>
                            <option value="VN">Viet Nam</option>
                            <option value="VG">Virgin Islands (British)</option>
                            <option value="VI">Virgin Islands (U.S.)</option>
                            <option value="WF">Wallis and Futuna Islands</option>
                            <option value="EH">Western Sahara</option>
                            <option value="YE">Yemen</option>
                            <option value="YU">Yugoslavia</option>
                            <option value="ZM">Zambia</option>
                            <option value="ZW">Zimbabwe</option>
                        </select>                        
                    </div>                   
                </div>
                 <center><button class="btn btn-primary">Add</button></center>
            </fieldset>
        </form>
            
                    
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