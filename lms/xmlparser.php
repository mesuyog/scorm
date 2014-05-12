<?php 

 

function readIMSManifestFile($manifestfile) {

  // PREPARATIONS

  // central array for resource data
  global $resourceData;

  // to check the aggregation 1, 1.1 ... 
  global $trackNumber;

  global $arrayOfChap;

  /// just to track if thing is happening for the first time
  global $firstTime;

  // load the imsmanifest.xml file
  $xmlfile = new DomDocument;
  $xmlfile->preserveWhiteSpace = FALSE; 
  $xmlfile->load($manifestfile);

  // adlcp namespace
  $manifest = $xmlfile->getElementsByTagName('manifest');
  $adlcp = $manifest->item(0)->getAttribute('xmlns:adlcp');

  //here we track the aggregation
//shownode($xmlfile->getElementsByTagName('item')->item(0));



  // READ THE RESOURCES LIST

  // array to store the results
  $resourceData = array();

  $arrayOfChap = array();

  //to store parameters to append to the url
  $parametersUrl = array();


  $firstTime = true;

  // get the list of resource element
  $resourceList = $xmlfile->getElementsByTagName('resource');

  $r = 0;
  foreach ($resourceList as $rtemp) {

    // decode the resource attributes
    $identifier = $resourceList->item($r)->getAttribute('identifier');
    $resourceData[$identifier]['type'] = $resourceList->item($r)->getAttribute('type');

    //we are a little tricky here to differenciate between scromtype and scromType (2004 version)
    $resourceData[$identifier]['scormtype'] = $resourceList->item($r)->getAttribute('adlcp:scormtype');
    if(($resourceData[$identifier]['scormtype'])==""){
      $resourceData[$identifier]['scormtype'] = $resourceList->item($r)->getAttribute('adlcp:scormType');
    }

    $resourceData[$identifier]['href'] = $resourceList->item($r)->getAttribute('href');
    // if(isset($resourceList->item($r)->getAttribute('xml:base'))){
    //   echo "hurrey";
    // }

    if ($resourceList->item($r)->hasAttribute('xml:base'))
    {
      $agadiKoUrl = $resourceList->item($r)->getAttribute('xml:base');
      $resourceData[$identifier]['href']=$agadiKoUrl.$resourceData[$identifier]['href'];
    }

    // list of files
    $fileList = $resourceList->item($r)->getElementsByTagName('file');

    $f = 0;
    foreach ($fileList as $ftemp) {
      $resourceData[$identifier]['files'][$f] =  $fileList->item($f)->getAttribute('href');
      $f++;
    }

    // list of dependencies
    $dependencyList = $resourceList->item($r)->getElementsByTagName('dependency');

    $d = 0;
    foreach ($dependencyList as $dtemp) {
      $resourceData[$identifier]['dependencies'][$d] =  $dependencyList->item($d)->getAttribute('identifierref');
      $d++;
    }

    $r++;

  }

  // resolve resource dependencies to create the file lists for each resource
  foreach ($resourceData as $identifier => $resource) {
    $resourceData[$identifier]['files'] = resolveIMSManifestDependencies($identifier);
  }

  // READ THE ITEMS LIST

  // arrays to store the results
  $itemData = array();

  // get the list of resource element
  $itemList = $xmlfile->getElementsByTagName('item');

  $i = 0;
  $trackNumber=1;
  

  foreach ($itemList as $itemp) {

   

    // decode the resource attributes
    $identifier = $itemList->item($i)->getAttribute('identifier');
    $itemData[$identifier]['identifierref'] = $itemList->item($i)->getAttribute('identifierref');
    if(isset($itemList->item($i)->getElementsByTagName('title')->item(0)->nodeValue)){$itemData[$identifier]['title'] = $itemList->item($i)->getElementsByTagName('title')->item(0)->nodeValue;}
    if(isset($itemList->item($i)->getElementsByTagNameNS($adlcp,'masteryscore')->item(0)->nodeValue)){$itemData[$identifier]['masteryscore'] = $itemList->item($i)->getElementsByTagNameNS($adlcp,'masteryscore')->item(0)->nodeValue;}
    if(isset($itemList->item($i)->getElementsByTagNameNS($adlcp,'datafromlms')->item(0)->nodeValue)){$itemData[$identifier]['datafromlms'] = $itemList->item($i)->getElementsByTagNameNS($adlcp,'datafromlms')->item(0)->nodeValue;}

     // well some item may have parameters to append to the url
     if ($itemList->item($i)->hasAttribute('parameters'))
    {
      $phacadiKoUrl = $itemList->item($i)->getAttribute('parameters'); 
      $parametersUrl[$identifier]['parameterUrl'] = $phacadiKoUrl;
    }

    if($firstTime){
       $arrayOfChap[$identifier]['chapList'] = $trackNumber;
       numberOfItemChild($itemp, $arrayOfChap[$identifier]['chapList']);
       $firstTime=false;
    }
    // echo $itemData[$identifier]['chapList'];
   
    // if(isset($itemData[$identifier]['chapList'])){
    //    echo "ohyeah ".$i;      
    //   }else{
    //     $itemData[$identifier]['chapList'] = "oh yeah";       
    //   }

    
    
    // if(shownode($itemp)){
    //   //echo "has fucking item childnode";
    // } else {
    //   $trackNumber++;
    // }  

    
     if(isset($arrayOfChap[$identifier]['chapList']))
      {
        numberOfItemChild($itemp, $arrayOfChap[$identifier]['chapList']);        
      }else{
        $arrayOfChap[$identifier]['chapList'] = ++$trackNumber;  
        numberOfItemChild($itemp, $arrayOfChap[$identifier]['chapList']);                      
      }
     
    
    $i++;

    


  }

  // PROCESS THE ITEMS LIST TO FIND SCOS
  
  // array for the results
  $SCOdata = array();

  // loop through the list of items
  foreach ($itemData as $identifier => $item) {

    // find the linked resource
    $identifierref = $item['identifierref'];
    
    // is the linked resource a SCO? if not, skip this item
    // eyeHere $resourceData[$identifierref]['scormType'] is not giving the falue for SCORM 2004, please check also scromType with
    // captial 'T' on 2004 and with small t on scorm other wtf??
   if(isset($resourceData[$identifierref]['scormtype'])){if (strtolower($resourceData[$identifierref]['scormtype']) != 'sco') { continue; }}   

    // save data that we want to the output array

    $SCOdata[$identifier]['chapList'] = $arrayOfChap[$identifier]['chapList']; //copying each items of arrayOfchap
    if(isset($item['title'])){$SCOdata[$identifier]['title'] = $item['title'];}
    if(isset($item['masteryscore'])){$SCOdata[$identifier]['masteryscore'] = $item['masteryscore'];}
    if(isset($item['datafromlms'])){$SCOdata[$identifier]['datafromlms'] = $item['datafromlms'];}
    if(isset($resourceData[$identifierref]['href'])){$SCOdata[$identifier]['href'] = $resourceData[$identifierref]['href'];}
    if(isset($resourceData[$identifierref]['files'])){$SCOdata[$identifier]['files'] = $resourceData[$identifierref]['files'];}

    if(isset($parametersUrl[$identifier]['parameterUrl'])){
      $SCOdata[$identifier]['href']=$SCOdata[$identifier]['href'].''.$parametersUrl[$identifier]['parameterUrl'];

    }
    
  

  }

  return $SCOdata;

}

// ------------------------------------------------------------------------------------

// recursive function used to resolve the dependencies (see above)
function resolveIMSManifestDependencies($identifier) {

  global $resourceData;

  $files = $resourceData[$identifier]['files'];

  if(isset($resourceData[$identifier]['dependencies'])){$dependencies = $resourceData[$identifier]['dependencies'];
  if (is_array($dependencies)) {
    foreach ($dependencies as $d => $dependencyidentifier) {
      $files = array_merge($files,resolveIMSManifestDependencies($dependencyidentifier));
      unset($resourceData[$identifier]['dependencies'][$d]); 
    }
    $files = array_unique($files);
  }
}

  return $files;

}

//following functions to track the aggregations.
function shownode($manifest) {
 foreach ($manifest->childNodes as $p){
  echo $p->nodeName.' '.$p->nodeValue.'<br>';
  if($p->nodeName=="item"){
    return true;
    // if (hasChild($p)) {
    //     echo $p->nodeName.' -> CHILDNODES number is '.$p->childNodes->length.'<br>';
    //     shownode($p);
    // } elseif ($p->nodeType == XML_ELEMENT_NODE)
    //  echo "";//$p->nodeName.' '.$p->nodeValue.'<br>';
    // } 
  }
}
  return false;
}


function hasChild($p) {
 if ($p->hasChildNodes()) {
  foreach ($p->childNodes as $c) {
   if ($c->nodeType == XML_ELEMENT_NODE)
    return true;
  }
 }
 return false;
}


function numberOfItemChild($thisNode, $parentTrackNumber ){
  global $arrayOfChap;
   $number=0;
   foreach ($thisNode->childNodes as $p){
     if($p->nodeName=="item"){
       $number++;
       $identifier = $p->getAttribute('identifier');
       $arrayOfChap[$identifier]['chapList'] = $parentTrackNumber.".".(string)$number;
       //echo $arrayOfChap[$identifier]['chapList'];
    }
  }
  //echo "it has ".$number." chldren";
}


?>