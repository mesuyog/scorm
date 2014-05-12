/*******************************************************************************
**
** FileName: APIWrapper.js
**
*******************************************************************************/

/*******************************************************************************
**
** Concurrent Technologies Corporation (CTC) grants you ("Licensee") a non-
** exclusive, royalty free, license to use, modify and redistribute this
** software in source and binary code form, provided that i) this copyright
** notice and license appear on all copies of the software; and ii) Licensee does
** not utilize the software in a manner which is disparaging to CTC.
**
** This software is provided "AS IS," without a warranty of any kind.  ALL
** EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
** IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-
** INFRINGEMENT, ARE HEREBY EXCLUDED.  CTC AND ITS LICENSORS SHALL NOT BE LIABLE
** FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
** DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES.  IN NO EVENT WILL CTC  OR ITS
** LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR DATA, OR FOR DIRECT,
** INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER
** CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT OF THE USE OF
** OR INABILITY TO USE SOFTWARE, EVEN IF CTC  HAS BEEN ADVISED OF THE POSSIBILITY
** OF SUCH DAMAGES.
**
*******************************************************************************/

/*******************************************************************************
** This file is part of the ADL Sample API Implementation intended to provide
** an elementary example of the concepts presented in the ADL Sharable
** Content Object Reference Model (SCORM).
**
** The purpose in wrapping the calls to the API is to (1) provide a
** consistent means of finding the LMS API implementation within the window
** hierarchy and (2) to validate that the data being exchanged via the
** API conforms to the defined CMI data types.
**
** This is just one possible example for implementing the API guidelines for
** runtime communication between an LMS and executable content components.
** There are several other possible implementations.
**
** Usage: Executable course content can call the API Wrapper
**      functions as follows:
**
**    javascript:
**          var result = LMSInitialize();
**          if (result != true) 
**          {
**             // handle error
**          }
**
**    authorware
**          result := ReadURL("javascript:LMSInitialize()", 100)
**
*******************************************************************************/

var _Debug = false;  // set this to false to turn debugging off
                     // and get rid of those annoying alert boxes.

// Define exception/error codes
var _NoError = 0;
var _GeneralError = 101;
var _ServerBusy = 102;
var _InvalidArgumentError = 201;
var _ElementCannotHaveChildren = 202;
var _ElementIsNotAnArray = 203;
var _NotInitialized = 301;
var _NotImplementedError = 401;
var _InvalidSetValue = 402;
var _ElementIsReadOnly = 403;
var _ElementIsWriteOnly = 404;
var _IncorrectDataType = 405;


// local variable definitions
var apiHandle = null;
var API = null;
var findAPITries = 0;
var lmsFinishCalled = false;
var lmsInitCalled = false;


/*******************************************************************************
**
** Function: LMSInitialize()
** Inputs:  None
** Return:  CMIBoolean true if the initialization was successful, or
**          CMIBoolean false if the initialization failed.
**
** Description:
** Initialize communication with LMS by calling the LMSInitialize
** function which will be implemented by the LMS.
**
*******************************************************************************/
function LMSInitialize()
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSInitialize was not successful.");
      return "false";
   }

   if( lmsInitCalled == false )
   {
      var result = api.LMSInitialize("");

      if (result.toString() != "true")
      {
         var err = ErrorHandler("LMSInitialize Error: ");
      }

      lmsInitCalled = true;
      lmsFinishCalled = false;
      if( this.top.apiHandle ) 
      {  
         this.top.lmsInitCalled = lmsInitCalled;
         this.top.lmsFinishCalled = lmsFinishCalled;
      }
      
      return result.toString();
   }
   else if (_Debug)
   {
      alert("LMSInitialize already called");
   }
    
   return "true";
}

/*******************************************************************************
**
** Function LMSFinish()
** Inputs:  None
** Return:  CMIBoolean true if successful
**          CMIBoolean false if failed.
**
** Description:
** Close communication with LMS by calling the LMSFinish
** function which will be implemented by the LMS
**
*******************************************************************************/
function LMSFinish()
{
   var result = "false";
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSFinish was not successful.");
      return "false";
   }
   else
   {
      // call the LMSFinish function that should be implemented by the API
      var finishCalled = lmsFinishCalled;
      
      lmsFinishCalled = true;
      lmsInitCalled = false;
      if( this.top.apiHandle ) 
      {  
         this.top.lmsInitCalled = lmsInitCalled;
         this.top.lmsFinishCalled = lmsFinishCalled;
      }
      
      if( finishCalled == false )
      {
         result = api.LMSFinish("");
      }
      else if (_Debug)
      {
         alert("LMSFinish already called");
      }
   }

   return result.toString();
}

/*******************************************************************************
**
** Function LMSGetValue(name)
** Inputs:  name - string representing the cmi data model defined category or
**             element (e.g. cmi.core.student_id)
** Return:  The value presently assigned by the LMS to the cmi data model
**       element defined by the element or category identified by the name
**       input value.
**
** Description:
** Wraps the call to the LMS LMSGetValue method
**
*******************************************************************************/
function LMSGetValue(name)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSGetValue was not successful.");
      return "";
   }
   else if (lmsFinishCalled == true )
   {
      if( _Debug )
         alert( 'Unable to perform LMSGetValue after LMSFinish already called' )
         
      return ""
   }
   else
   {
      var value = api.LMSGetValue(name);
      var valString = value.toString();
      
      trivLogMsg( 'LMSGetValue for ' + name + ' = [' + valString + ']', 16 )
      return valString;
   }
}

/*******************************************************************************
**
** Function LMSSetValue(name, value)
** Inputs:  name -string representing the data model defined category or element
**          value -the value that the named element or category will be assigned
** Return:  CMIBoolean true if successful
**          CMIBoolean false if failed.
**
** Description:
** Wraps the call to the LMS LMSSetValue function
**
*******************************************************************************/
function LMSSetValue(name, value)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSSetValue was not successful.");
      return;
   }
   else if (lmsFinishCalled == true )
   {
      if( _Debug )
         alert( 'Unable to perform LMSSetValue after LMSFinish already called' )
   }
   else
   {
      var result = api.LMSSetValue(name, value);
      trivLogMsg( 'LMSSetValue for ' + name + ' to [' + value + ']', 16 )
      if (result.toString() != "true")
      {
         var err = ErrorHandler("LMSSetValue Error: " + name + " to [" + value + "]" );
      }
   }

   return;
}

/*******************************************************************************
**
** Function LMSCommit()
** Inputs:  None
** Return:  None
**
** Description:
** Call the LMSCommit function 
**
*******************************************************************************/
function LMSCommit()
{
   /* result was local scope in the last else block: rlarson 5/24/2001 */
   var result = "false";
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSCommit was not successful.");
      return "false";
   }
   else if (lmsFinishCalled == true )
   {
      if( _Debug )
         alert( 'Unable to perform LMSCommit after LMSFinish already called' )
   }
   else
   {
      result = api.LMSCommit("");
      if (result.toString() != "true")
      {
         var err = ErrorHandler("LMSCommit Error: ");
      }
   }

   return result.toString();
}

/*******************************************************************************
**
** Function LMSGetLastError()
** Inputs:  None
** Return:  The error code that was set by the last LMS function call
**
** Description:
** Call the LMSGetLastError function 
**
*******************************************************************************/
function LMSGetLastError()
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSGetLastError was not successful.");
      //since we can't get the error code from the LMS, return a general error
      return _GeneralError;
   }

   return api.LMSGetLastError().toString();
}

/*******************************************************************************
**
** Function LMSGetErrorString(errorCode)
** Inputs:  errorCode - Error Code
** Return:  The textual description that corresponds to the input error code
**
** Description:
** Call the LMSGetErrorString function 
**
********************************************************************************/
function LMSGetErrorString(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSGetErrorString was not successful.");
   }

   return api.LMSGetErrorString(errorCode).toString();
}

/*******************************************************************************
**
** Function LMSGetDiagnostic(errorCode)
** Inputs:  errorCode - Error Code(integer format), or null
** Return:  The vendor specific textual description that corresponds to the 
**          input error code
**
** Description:
** Call the LMSGetDiagnostic function
**
*******************************************************************************/
function LMSGetDiagnostic(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSGetDiagnostic was not successful.");
   }

   return api.LMSGetDiagnostic(errorCode).toString();
}

/*******************************************************************************
**
** Function LMSIsInitialized()
** Inputs:  none
** Return:  true if the LMS API is currently initialized, otherwise false
**
** Description:
** Determines if the LMS API is currently initialized or not.
**
*******************************************************************************/
function LMSIsInitialized()
{
   // there is no direct method for determining if the LMS API is initialized
   // for example an LMSIsInitialized function defined on the API so we'll try
   // a simple LMSGetValue and trap for the LMS Not Initialized Error

   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSIsInitialized() failed.");
      return false;
   }
   else if (lmsFinishCalled == true )
   {
      return false
   }
   else
   {
      var value = api.LMSGetValue("cmi.core.student_name");
      if( value.toString().length == 0 )
      {
        var errCode = parseInt( api.LMSGetLastError().toString(), 10 );
        if (errCode == _NotInitialized)
          return false;
      }
      return true;
   }
}

/*******************************************************************************
**
** Function ErrorHandler()
** Inputs:  None
** Return:  The current value of the LMS Error Code
**
** Description:
** Determines if an error was encountered by the previous API call
** and if so, displays a message to the user.  If the error code
** has associated text it is also displayed.
**
*******************************************************************************/
function ErrorHandler(str)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
      return;
   }

   // check for errors caused by or from the LMS
   var errCode = parseInt( api.LMSGetLastError().toString(), 10 );
   if (errCode != _NoError)
   {
      // an error was encountered so display the error description
      var errDescription = api.LMSGetErrorString(errCode);

      if (_Debug == true)
      {
         errDescription += "\n";
         errDescription += api.LMSGetDiagnostic(null);
         // by passing null to LMSGetDiagnostic, we get any available diagnostics
         // on the previous error.
      }

      alert(str + errDescription);
   }

   return errCode;
}

/******************************************************************************
**
** Function getAPIHandle()
** Inputs:  None
** Return:  value contained by APIHandle
**
** Description:
** Returns the handle to API object if it was previously set,
** otherwise it returns null
**
*******************************************************************************/
function getAPIHandle()
{
   if (apiHandle == null)
   {
      apiHandle = getAPI();
   }

   return apiHandle;
}


/*******************************************************************************
**
** Function findAPI(win)
** Inputs:  win - a Window Object
** Return:  If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API in parent and opener windows
**
*******************************************************************************/
function findAPI(win)
{
   while ((win.API == null) && (win.parent != null) && (win.parent != win))
   {
      findAPITries++;
      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (findAPITries > 7) 
      {
         alert("Error finding API -- too deeply nested.");
         return null;
      }
      
      win = win.parent;

   }
   return win.API;
}



/*******************************************************************************
**
** Function getAPI()
** Inputs:  none
** Return:  If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API, first in the current window's 
** frame hierarchy and then, if necessary, in the current window's opener window
** hierarchy (if there is an opener window).
**
*******************************************************************************/
function getAPI()
{
   var theAPI = findAPI(window);
   if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined"))
   {
      theAPI = findAPI(window.opener);
   }
   if ((theAPI == null) && (parent.window != null) && (parent.window.opener != null) && (typeof(parent.window.opener) != "undefined"))
   {
      theAPI = findAPI(parent.window.opener);
   }
   if ((theAPI == null) && (top.opener != null) && (top.opener.top != null) && (top.opener.top.opener != null) && (typeof(top.opener.top.opener) != "undefined"))
   {   
	    theAPI = findAPI(top.opener.top.opener);
   }
   if (theAPI == null)
   {
      alert("Unable to find an API adapter");
   }
   return theAPI
}


