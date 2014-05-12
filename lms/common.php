<?php
if (isset($_POST['jsondata'])) {
	$courseToDelete = $_POST['jsondata'];

	$dirPath = "courses/".$courseToDelete;	
	deleteDir($dirPath);	    
}

//following function to delete a course with its contents.
function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        throw new InvalidArgumentException("$dirPath must be a directory");
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            deleteDir($file);
        } else {
            unlink($file);
        }
    }
    rmdir($dirPath);
}
 ?>