<?php
require "../xmlparser.php";
header('content-type: application/json');

	if(function_exists($_GET['f'])) {
	   $_GET['f']();
	}	
	function getMeJson()
	{
		header('Access-Control-Allow-Origin: *');
		///echo "inside post data";
		$arr = array('kala', 'kheti');
		var_dump($arr);
		//echo json_encode($arr);
	}
	function getCourseContentJson()
	{
		header('Access-Control-Allow-Origin: *');
		///echo "inside post data";
		$courseName = $_GET['course'];
        $SCOdata = readIMSManifestFile('../courses/'.$courseName.'/imsmanifest.xml');
		//$arr = array ('1'=>"Chapter One Title",'1.1'=>"Chapter One Subtitle",'2'=>"Chapter Two Title");
		echo json_encode($SCOdata);
	}
	function getCourseListJson()
	{
		header('Access-Control-Allow-Origin: *');
		 $dirs = array_filter(glob('../courses/*'), 'is_dir');
                            //print_r( $dirs);
                            $onlyDirs= array( );
                            $counter = 1;
                            foreach($dirs as $a){
                                $onlyDirs['Chapter '.$counter]= substr($a, 11);
                                $counter++;
                            }
		echo json_encode($onlyDirs);
	}
	?>