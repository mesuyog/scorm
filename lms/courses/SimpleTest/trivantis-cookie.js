/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/
function saveVariable(name,value,days,title,lms) {
  var titleMgr = getTitleMgrHandle();
  var expires = ""
  
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000))
    expires = "; expires="+date.toGMTString()
  }
  
  var encValue = UniEscape( value )
  
  // Find the cookie
  var myCookie = (days ? 'LectoraPermCookie' : 'LectoraTempCookie' )
  if( title )
    myCookie += '_' + title
    
  var nameEQ = '|' + name + "="
  var ca = document.cookie.split(';')
  var i,j
  var last = 0
  var lastVal = null
  var saveId = -1

  for(i=0;i<ca.length;i++) 
  {
    var c = ca[i];
    for( j = 0;j<c.length;j++)
    {
      if( c.charAt(j) != ' ' )
        break
    }
    c = c.substring(j);
    if( c.indexOf(myCookie) == 0 )
    {
      var ce=c.indexOf('=')
      last = parseInt( c.substring( myCookie.length, ce ), 10 )
      var vo = c.indexOf(nameEQ) 
      if( vo >= 0 )
      {
        var start=c.substring(ce+1,vo)
        var mid=c.substring(vo+nameEQ.length)
        var end=mid.indexOf( '|' )
        mid = mid.substring( end )
        lastVal = start + mid
        saveId = last
        break
      }
      else
      {
        lastVal = c.substring( ce + 1 )
      }
    }
  }
  
  trivLogMsg( 'saveVariable for ' + name + ' to [' + value + ']', 2 )
  if( titleMgr )
  {
    titleMgr.setVariable(name,encValue,days)
    if( (!days || lms) && !document.TitleMgr && ! window.jTitleManager )
      return
  }
  
  var newVal = nameEQ+encValue+"|"
  if( lastVal != null && (lastVal.length + newVal.length < 4000) )
  {
      if( lastVal )
        lastVal = lastVal.substring( 0, lastVal.length - 1 )
      if( days < 0 )
        newVal = null
      var cookieName = myCookie + last
      document.cookie = cookieName+"="+lastVal+newVal+expires+"; path=/"
  }
  else
  {
      if( lastVal != null && saveId != -1 ) {
        var oldCookie = myCookie + saveId
        document.cookie = oldCookie+"="+lastVal+expires+"; path=/"
      }
      var cookieName = myCookie + (last+1)
      document.cookie = cookieName+"="+newVal+expires+"; path=/"
  }
}

function readVariable(name,defval,days,title) {
  var titleMgr = getTitleMgrHandle();
  if( titleMgr == null || titleMgr.findVariable( name ) < 0 )
  {
    var myCookie = (days ? 'LectoraPermCookie' : 'LectoraTempCookie' )
    if( title )
      myCookie += '_' + title
    var nameEQ = '|' + name + "="
    var ca = document.cookie.split(';')
    var i,j
  
    for(i=0;i<ca.length;i++) 
    {
      var c = ca[i];
      for( j = 0;j<c.length;j++)
      {
        if( c.charAt(j) != ' ' )
          break
      }
      c = c.substring(j);
      if( c.indexOf(myCookie) == 0 )
      {
        var vo = c.indexOf(nameEQ) 
        if( vo >= 0 )
        {
          var val=c.substring(vo+nameEQ.length)
          var ve =val.indexOf( '|' )
  
          val = val.substring(0,ve);
          var valUn = UniUnescape( val )
        
          if( titleMgr )
            titleMgr.setVariable(name,val,days)
          trivLogMsg( 'readVariable for ' + name + ' = [' + valUn + ']', 1 )
          return valUn
        }
      }
    }
  }
  
  if( titleMgr ) {
    var res = new String( titleMgr.getVariable(name,UniEscape(defval),days) )
    defval = UniUnescape( res )
  }
  trivLogMsg( 'readVariable for ' + name + ' = [' + defval + ']', 1 )
  return defval
}

function cleanupTitle( title ) {
  if( window.name.indexOf( 'Trivantis_' ) == -1 ) {
    var date = new Date();
    date.setTime(date.getTime()+(-1*24*60*60*1000))
    var expires = "; expires="+date.toGMTString()

    var myCookie = 'LectoraTempCookie'
    if( title )
      myCookie += '_' + title
    for( var i = 1; i < 21; i++ )
    {
      var name = myCookie + i
      if( readCookie( name, '' ) != '' )
        document.cookie = name + "=" + expires + "; path=/"
      else
        break
    }
    return 1;
  }
  else
    return 0;
}

// Variable Object
function Variable(name,defval,f,cm,frame,days,title) {
  this.origAICC = false
  this.bSCORM = false
  this.of=f
  this.f=f
  this.eTS=null
  this.tV=null
  this.aiccframe=frame
  this.aiccgroup=null
  this.aicccore=false
  this.exp=days
  if( defval ) this.defVal = defval.toString();
  else this.defVal=null;
  this.cm=0
  this.title=title
  this.lastUT = null
  if( cm ) {
    this.cm = -1 * cm
    if(name=='CM_Course_ID')this.name='TrivantisCourse'
    else if(name=='CM_Course_Name')this.name='TrivantisCourseName'
    else if(name=='CM_Student_ID')this.name='TrivantisLogin'
    else if(name=='CM_Student_Name')this.name='TrivantisLoginName'
    else {
      this.name=name
      this.cm = cm
    }
  }
  else if( frame ) {
    var underPos = name.indexOf('AICC_')
    if( underPos == 0 ) {
      this.origAICC = true
      this.name=name.substring(5)
      if( frame == 'scorm' ) {
        this.bSCORM = true
        this.aiccgroup = 'cmi'
        this.name = this.name.toLowerCase()
        var core_check = this.name.substring(0,5)
        if( core_check == 'core_' ) this.name = this.name.substring(5)
        if(this.name=='lesson') this.name='cmi.suspend_data'
        else if(this.name=='vendor') this.name='cmi.launch_data'
        else if(this.name=='time') this.name='cmi.core.total_time'
        else if(this.name=='score') this.name='cmi.core.score.raw'
        else this.name = 'cmi.core.' + this.name
      }
      else if( frame == 'scorm2004' ) {
        this.bSCORM = true
        this.aiccgroup = 'cmi'
        this.name = this.name.toLowerCase()
        var core_check = this.name.substring(0,5)
        if( core_check == 'core_' ) this.name = this.name.substring(5)
        if(this.name=='lesson') this.name='cmi.suspend_data'
        else if(this.name=='vendor') this.name='cmi.launch_data'
        else if(this.name=='time') this.name='cmi.total_time'
        else if(this.name=='score') this.name='cmi.score.raw'
        else if(this.name=='course_id')this.name='cmi.evaluation.course_id'
        else if(this.name=='lesson_id')this.name='cmi.core.lesson_id'
        else if(this.name=='student_id')this.name='cmi.learner_id'
        else if(this.name=='student_name')this.name='cmi.learner_name'
        else if(this.name=='lesson_location')this.name='cmi.location'
        else if(this.name=='lesson_status')this.name='cmi.success_status'
        else this.name = 'cmi.' + this.name
      }
      else if(this.name=='Core_Lesson') {
        this.aiccgroup='[CORE_LESSON]'
      }
      else if(this.name=='Core_Vendor') {
        this.aiccgroup='[CORE_VENDOR]'
      }
      else if(this.name=='Course_ID') {
        this.aiccgroup='[EVALUATION]'
      }
      else {
        this.aiccgroup='[CORE]'
        this.aicccore=true
      }
      if( !this.bSCORM ) this.update()
    }
    else {
      if( frame == 'scorm' || frame == 'scorm2004' ) this.bSCORM = true
      if( name.indexOf('CMI_Core') == 0 ) {
        this.origAICC = true
        this.aiccgroup='cmi'
        if( name == 'CMI_Core_Entry' ) {
          this.name='cmi.core.entry'
          this.update()
        }
        else {
          this.name='cmi.core.exit'
          this.value=this.defVal
        }
      }
      else if ( name == 'CMI_Completion_Status' ) {
        if( frame == 'scorm2004' ) this.bSCORM = true
        this.origAICC = true
        this.aiccgroup='cmi'
        this.name='cmi.completion_status'
        this.update()
      }
      else {
        this.name = name
      }
    }
  }
  else {
    this.name=name;
  }
  if( this.f == 4 ) this.uDT()
}

function VarUpdateValue() {
  var now = new Date().getTime()
  if( this.lastUT >= now - 500 ) return;
  else this.lastUT = now;
  
  if( this.cm ) {
    if( this.cm < 0 ) {
      this.defVal=readCookie(this.name,this.defVal)
      this.cm *= -1
    }
    var titleMgr = getTitleMgrHandle();
    if( titleMgr ) {
      var vv=new String(titleMgr.getVariable(this.name,UniEscape(this.defVal),this.exp));
      this.value=UniUnescape(vv);
    }
    else this.value=this.defVal
  }
  else if( this.aiccframe ) {
    var titleMgr = getTitleMgrHandle();
    if( this.origAICC ) {
      if( this.bSCORM ) {
        if( this.name=='cmi.evaluation.course_id' ) this.value=this.defVal
        else if( this.name=='cmi.core.lesson_id' ) this.value=this.defVal
        else if( this.name!='cmi.core.exit' && this.name != 'cmi.exit' ) this.value=new String( LMSGetValue( this.name ) )
        if( titleMgr ) {
          titleMgr.setVariable(this.name,UniEscape(this.value),this.exp)
          if( this.name=='cmi.learner_id' ) titleMgr.setVariable('cmi.core.student_id',UniEscape(this.value),this.exp)
          if( this.name=='cmi.learner_name' ) titleMgr.setVariable('cmi.core.student_name',UniEscape(this.value),this.exp)
          if( this.name=='cmi.core.total_time' || this.name=='cmi.total_time' ) this.value = UpdateSCORMTotalTime( this.value )
        }
      }
      else if(this.name=='Core_Lesson') {
        this.value=getParam(this.aiccgroup)
      }
      else if(this.name=='Core_Vendor') {
        this.value=getParam(this.aiccgroup)
      }
      else if(this.name=='Course_ID') {
        this.value=getParam(this.name)
      }
      else {
        this.value=getParam(this.name)
      }
    }
    else {
      if( this.bSCORM ) {
        this.value=this.defVal
        if( titleMgr && titleMgr.findVariable( this.name ) != -1 ){
            var vv=new String(titleMgr.getVariable(this.name,UniEscape(this.defVal),this.exp));
            this.value=UniUnescape(vv);
        } else {
          var data=new String( LMSGetValue( 'cmi.suspend_data' ) )
          if( data == '' ) {
            if( titleMgr ) titleMgr.setVariable(this.name,UniEscape(this.value),this.exp)
          }
          else {
            var ca = data.split(';')
            for(var i=0;i<ca.length;i++) {
              var c = ca[i];
              if( c.indexOf('=') >= 0 ) {
                ce = c.split('=')
                if( this.name == ce[0] ) this.value = UniUnescape(ce[1])
                if( titleMgr ) titleMgr.setVariable(ce[0],ce[1],this.exp)
              }
            }
          }
        }
      }
      else {
        if( titleMgr ) {
          var vv=new String(titleMgr.getVariable(this.name,UniEscape(this.defVal),this.exp));
          this.value=UniUnescape(vv);
        }
        else this.value = this.defVal
      }
    }
  }
  else if( this.f > 0 ) {
    this.uDT()
  }
  else {
    var val = readVariable(this.name,this.defVal,this.exp,this.title)
    var subval = val ? val.substr( 0, 7 ) : null
    if( subval == "~~f=1~~" ) {
      this.tV = parseInt( val.substr( 7, val.length-7 ), 10 )
      this.f = 1
      this.uDTV()
    }
    else if( subval == "~~f=2~~" ) {
      this.tV = parseInt( val.substr( 7, val.length-7 ), 10 )
      this.f = 2
      this.uDTV()
    }
    else if( subval == "~~f=4~~" ) {
      var now = new Date()
      this.tV = parseInt( val.substr( 7, val.length-7 ), 10 )
      this.eTS = now.getTime() - this.tV
      this.f = 4
      this.uDTV()
    }
    else this.value=val
  }
  this.value = EncodeNull( this.value )
}

function VarSave() {
  if(this.cm) {
    var titleMgr = getTitleMgrHandle();
    if( titleMgr ) titleMgr.setVariable(this.name,UniEscape(this.value),this.exp)
  }
  else if(this.aiccframe){
    var titleMgr = getTitleMgrHandle();
    if( this.bSCORM ) {
	  var lmsVal = this.value;
	  if( lmsVal == '~~~null~~~' )
	    lmsVal = null;
      if( this.name == 'cmi.core.total_time' || this.name == 'cmi.total_time' ) {
        if( this.aiccframe == 'scorm' ) {
          LMSSetValue( 'cmi.core.session_time', lmsVal )
          if( titleMgr ) titleMgr.setVariable('cmi.core.session_time',UniEscape(this.value),this.exp)
        }
        else {
          LMSSetValue( 'cmi.session_time', lmsVal )
          if( titleMgr ) titleMgr.setVariable('cmi.session_time',UniEscape(this.value),this.exp)
        }
      }
      else {
        if( titleMgr ) titleMgr.setVariable(this.name,UniEscape(this.value),this.exp)
        if( this.aiccgroup ) {
          LMSSetValue( this.name, lmsVal )
          if( this.name == 'cmi.score.raw' ){
            var scaled = this.value / 100
            LMSSetValue( 'cmi.score.scaled', scaled )
            LMSCommit( "" );
          } 
          else if( this.name == 'cmi.core.score.raw'     ||
                   this.name == 'cmi.core.lesson_status' ||
                   this.name == 'cmi.success_status' ){
            LMSCommit( "" );
          }
        }
        else {
          var nameEQ = this.name + "="
          var newData= nameEQ + UniEscape(this.value) + ';'
          var bErr = false;
          var data=new String( LMSGetValue( 'cmi.suspend_data' ) )
          if( data != '' ) {
            var ca = data.split(';');
            var sizeLimit = 4096;
            for(var i=0;i<ca.length;i++) {
              var c = ca[i];
              if (c != '' && c.indexOf(nameEQ) != 0) {   
                newData = newData + c + ';'
              }
            }
          }
          
          LMSSetValue( 'cmi.suspend_data', newData )
          var chkdata=new String( LMSGetValue( 'cmi.suspend_data' ) )
          if( UniUnescape(chkdata).length < UniUnescape(newData).length ) {
            bErr = true;
          }
          
          if( bErr && bDisplayErr ) {
            var errMsg = 'Some of the persistent data was not able to be stored';
            trivLogMsg( errMsg, 2 )
            alert( errMsg )
          }
        }
      }
    }
    else {
      if(this.aicccore) putParam(this.aiccgroup,this.name+'='+this.value,this.aiccframe)
      else if( this.aiccgroup ) putParam(this.aiccgroup,this.value,this.aiccframe)
      else {
        if( titleMgr ) titleMgr.setVariable(this.name,UniEscape(this.value),this.exp)
        saveVariable(this.name,this.value,this.exp,this.title,this.aiccframe)
      }
    }
  }
  else{
    if( this.f != 0 && this.tV >= 0 ) {
      if( this.f == 4 ) saveVariable(this.name,"~~f=4~~"+this.tV+'#'+this.value,this.exp,this.title,this.aiccframe)
      else if ( this.f == 2 ) saveVariable(this.name,"~~f=2~~"+this.tV+'#'+this.value,this.exp,this.title,this.aiccframe)
      else if ( this.f == 1 ) saveVariable(this.name,"~~f=1~~"+this.tV+'#'+this.value,this.exp,this.title,this.aiccframe)
    } 
    this.value = EncodeNull( this.value )
    saveVariable(this.name,this.value,this.exp,this.title,this.aiccframe)
  }
}

function VarSet(setVal) {
  this.value = EncodeNull( setVal )
  this.f = 0
  this.eTS = null
  this.tV = null
  this.save() 
}

function VarSetVar(setVar) {
  if( setVar.f > 0 ) setVar.uDT()
  else setVar.update()
  this.value = setVar.value
  this.f = setVar.f
  if( setVar.f == 1 || setVar.f == 2 )
    this.of = 8
  this.eTS = setVar.eTS
  this.tV = setVar.tV
  this.save() 
}

function VarAdd(addVal) {
  this.update()
  if ( this.f > 0 && !isNaN( addVal )) { 
    this.tV += CalcTD( this.f, addVal )
    this.uDTV()             
  } 
  else if( this.value == "~~~null~~~" ) {
    this.f = 0
    if( addVal != null && addVal != "" ) this.value = addVal
  }
  else {
    this.f = 0
    if( addVal != null && addVal != "" ) {
      if(!isNaN(this.value)&&!isNaN(addVal)&&!isNaN( parseFloat(addVal))&&!isNaN( parseFloat(this.value)) ) {
        var val=parseFloat(this.value)+parseFloat(addVal)
        var myVal = this.value.toString();
        if( addVal.indexOf( "." ) != -1 && myVal.indexOf( "." ) != -1 )
            val = (parseInt(val*100000000,10))/100000000
        this.value=val.toString()
      }
      else if( addVal != "~~~null~~~") this.value+=addVal;
    }
  }
  this.save()
}

function VarAddVar(addVar) {
  if( addVar.f > 0 ) {
    addVar.uDT()
    if( this.f > 0 ) {
      this.tV += addVar.tV
      if( addVar.f == 1 ) this.f = 1
        this.uDTV()
    }
    else this.add( addVar.value )
  }
  else {
    addVar.update()
    this.add( addVar.value )
  }
}

function VarSub(subVal) {
  this.update()
  if ( this.f > 0 && !isNaN( subVal )) {
    this.tV -= CalcTD( this.f, subVal )
    this.uDTV()            
  }
  else if( this.value == "~~~null~~~" ) {
    this.f = 0
    if( !isNaN(subVal)&&!isNaN(parseFloat(subVal) ) ) {
      var val=this.value=parseFloat("-"+subVal)
      this.value=val.toString()
    }
  }
  else {
    this.f = 0
    if( subVal != null && subVal != "" ) {
      if(!isNaN(this.value)&&!isNaN(subVal)&&!isNaN( parseFloat(subVal))&&!isNaN( parseFloat(this.value)) ) {
        var val=parseFloat(this.value)-parseFloat(subVal)
        var myVal = this.value.toString();
        if( subVal.indexOf( "." ) != -1 && myVal.indexOf( "." ) != -1 )
            val = (parseInt(val*100000000,10))/100000000
        this.value=val.toString()
      }    
      else if( this.value.length >= subVal.length && this.value.substr( this.value.length - subVal.length) == subVal ) {
        this.value=this.value.substr( 0, this.value.length - subVal.length )
      }
    }
  }
  this.save()
}

function VarSubVar(subVar) {
  if( subVar.f > 0 ) {
    subVar.uDT()
    if( this.f > 0 ) {
      this.tV -= subVar.tV
      if( subVar.f == 1 ) this.f = 1
      this.uDTV()
    }
    else this.sub( subVar.value )
  }
  else {
    subVar.update()
    this.sub( subVar.value )
  }
}

function VarMult(multVal) {
  this.update()
  if( this.value != "~~~null~~~" ) {
    if(!isNaN(this.value)&&!isNaN(multVal)&&!isNaN( parseFloat(multVal))&&!isNaN( parseFloat(this.value)) ) {
      var val=parseFloat(this.value)*parseFloat(multVal)
      val = parseFloat(val.toFixed(6));
      var myVal = this.value.toString();
      multVal = multVal.toString();
      if( multVal.indexOf( "." ) != -1 && myVal.indexOf( "." ) != -1 )
        val = (parseInt(val*100000000,10))/100000000
      this.value=val.toString()
    }
    this.save()
  }
}

function VarDiv(divVal) {
  this.update()
  if( this.value != "~~~null~~~" ) {
    if(!isNaN(this.value)&&!isNaN(divVal)&&!isNaN( parseFloat(divVal))&&!isNaN( parseFloat(this.value)) ) {
      if( parseFloat(divVal) != 0 ) {
        var val=parseFloat(this.value)/parseFloat(divVal)
        val = parseInt( val*100, 10 )
        val = parseFloat( val/100 )
        var myVal = this.value.toString();
        divVal = divVal.toString();
        if( divVal.indexOf( "." ) != -1 && myVal.indexOf( "." ) != -1 )
          val = (parseInt(val*100000000,10))/100000000
        this.value=val.toString()
      }
    }
    this.save()
  }
}

function VarCont(strCont) {
  this.update()
  if( this.value == "~~~null~~~" || ( this.value == "" && this.value != 0 ) ) return 0
  var myVal = this.value.toString();
  var result=myVal.indexOf( strCont )
  return (result >= 0)
}

function VarEQ(strEquals) {
  this.update()
  return (this.value == strEquals)
}

function VarLT(strTest) {
  this.update()
  if( this.value == "~~~null~~~" || ( this.value == "" && this.value != 0 ) ) {
    if( strTest == "~~~null~~~" || strTest == "" ) return 0
    else return 1
  }
  if(isNaN(this.value)||isNaN(strTest))return this.value<strTest
  else return parseFloat(this.value)<parseFloat(strTest)
}

function VarGT(strTest) {
  this.update()
  if( this.value == "~~~null~~~" || ( this.value == "" && this.value != 0 ) ) {
    if( strTest == "~~~null~~~" || strTest == "" ) return 1
    else return 0
  }
  if(isNaN(this.value)||isNaN(strTest))return this.value>strTest
  else return parseFloat(this.value)>parseFloat(strTest)
}

function VarUDT() {
  var now = new Date()
  if( this.of == 8 ) {
    var val = readVariable(this.name,this.defVal,this.exp,this.title)
    var subval = val ? val.substr( 0, 7 ) : null
    if( subval == "~~f=1~~" ) {
      this.tV = parseInt( val.substr( 7, val.length-7 ), 10 )
      this.f = 1
      this.uDTV()
    }
    else if( subval == "~~f=2~~" ) {
      this.tV = parseInt( val.substr( 7, val.length-7 ), 10 )
      this.f = 2
      this.uDTV()
    }
    else if( subval == "~~f=4~~" ) {
      var now = new Date()
      this.tV = parseInt( val.substr( 7, val.length-7 ), 10 )
      this.eTS = now.getTime() - this.tV
      this.f = 4
      this.uDTV()
    }
    else this.value=val
  }
  else if( this.f == 1 ) {
    this.tV = now.getTime()
    this.value = FormatDS( now )
  }
  else if( this.f == 2 ) {
    this.tV = now.getTime()
    this.value = FormatTS( now )
  }
  else if( this.of == 4 ) {
    // Only the original Elapsed Time variable gets updated
    var dT = 0
    if( this.eTS == null ) {
      var val = readVariable( this.name, "", this.exp, this.title ) 
      if( val ) {
        var hours = parseInt( val, 10 )
        var loc   = val.indexOf( ':' )
        val       = val.substring( loc + 1 )
        var mins  = parseInt( val, 10 )
        loc       = val.indexOf( ':' )
        val       = val.substring( loc + 1 )
        var secs  = parseInt( val, 10 )
        dT        = (((hours * 60) + mins) * 60 + secs) * 1000
      }
      this.eTS = now.getTime() - dT
    }
    this.tV = now.getTime() - this.eTS
    this.value = FormatETS( this.tV )
  }
  this.save()
 }

function VarUDTV() {
  if( this.f == 1 ) this.value = FormatDS( new Date( this.tV ))
  else if( this.f == 2 ) this.value = FormatTS( new Date( this.tV ))
  else if( this.f == 4 ) this.value = FormatETS( this.tV )
  this.save()
}

function VarGetValue() {
  this.update()
  return this.value
}

function VarMail() {
  this.update()
  ObjLayerActionGoTo( 'mailto:' + this.value )
}

function VarIsCorr(ans) {
  this.update()
  var val = this.value.toString();
  val = val.replace(/'/g, "\\'");
  if( val == ans )
    return true;
  else
    return false;
}

function VarIsCorrSub(ans,idx) {
  this.update()
  var answers = ans.split(",");
  if( this.value.indexOf( answers[idx] ) >= 0 )
    return true;
  else
    return false;
}

function VarIsAnsSub(idx) {
  this.update()
  var subtest = ',' + (idx+1) + '-';
  var test = ',' + this.value;
  if( test.indexOf( subtest ) >= 0 )
    return true;
  else
    return false;
}

function VarIsCorrFIB(ans) {
  this.update()
  var val = this.value.toString();
  val = val.toLowerCase();
  val = val.replace(/'/g, "\\'");
  var answers = ans.split("~;~");
  for(var i=0;i<answers.length;i++) {
    if( val == answers[i] )
      return true;
  }
  return false;
}

{ // Setup protpotypes
var p=Variable.prototype
p.save=VarSave
p.set=VarSet
p.add=VarAdd
p.sub=VarSub
p.mult=VarMult
p.div=VarDiv
p.setByVar=VarSetVar
p.addByVar=VarAddVar
p.subByVar=VarSubVar
p.contains=VarCont
p.equals=VarEQ
p.lessThan=VarLT
p.greaterThan=VarGT
p.uDT=VarUDT
p.uDTV=VarUDTV
p.update=VarUpdateValue
p.getValue=VarGetValue
p.mailTo=VarMail
p.isCorr=VarIsCorr
p.isCorrSub=VarIsCorrSub
p.isAnsSub=VarIsAnsSub
p.isCorrFIB=VarIsCorrFIB
}

function saveTestScore( varTestName, score, title, frame ) 
{
  saveVariable( varTestName, score, null, title, frame )
}


var titleMgrHandle = null
var getFn = null

if( is.ns4 || is.ie4 ) getFn = 'titleMgrHandle = getTitleMgr( window, 0 );'
else getFn = 'try { titleMgrHandle = getTitleMgr( window, 0 ); } catch(error){ titleMgrHandle = null }'

function getTitleMgrHandle()
{
   if( is.ieMac || (is.ns4 && is.nsMac))
       return titleMgrHandle
       
   if (titleMgrHandle == null)
   {
      titleMgrHandle = eval( getFn )
   }

   return titleMgrHandle;
}

function getTitleMgr( testWnd, level )
{
   if( !testWnd )
     return null
     if( testWnd.jTitleManager )
        return testWnd.jTitleManager;
     else if( testWnd.document.TitleMgr )
       return testWnd.document.TitleMgr;
     else
     {
       var target
       if( this.frameElement && this.frameElement.id && this.frameElement.id.indexOf('DLG_content') == 0 && parent.parent )
         target = eval( "parent.parent.titlemgrframe" )
       else
         target = eval( "parent.titlemgrframe" )
         
       if( !target )
          target = eval( "testWnd.parent.titlemgrframe" )
       if( target ) {
          if( target.jTitleManager )
            return target.jTitleManager;
          else
            return target.document.TitleMgr;
       } else {
          if( testWnd.name.indexOf( 'Trivantis_Dlg_' ) == 0 )
            return getTitleMgr( testWnd.parent, level+1 )
          else {
            if( testWnd.name.indexOf( 'Trivantis_' ) == 0 )
              return getTitleMgr( testWnd.opener, level+1 )
            else if( level < 2 )
              return getTitleMgr( testWnd.parent, level+1 )
          }
       }
     }
       
   return null
}

function readCookie(name,defval) {
  var nameEQ = name + "="
  var ca = document.cookie.split(';')
  for(var i=0;i<ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length)
  }
  return defval
}

function afterProcessTest( score, name ) {
}

function UpdateSCORMTotalTime( currTime ) {
  var startDate = readVariable( 'TrivantisSCORMTimer', 0 )
  if ( startDate == 0 ) return currTime
  
  var currentDate = new Date().getTime();
  var elapsedMills = currentDate - startDate;
  var hours = parseInt( currTime, 10 )
  var loc   = currTime.indexOf( ':' )
  currTime  = currTime.substring( loc + 1 )
  var mins  = parseInt( currTime, 10 )
  loc       = currTime.indexOf( ':' )
  currTime  = currTime.substring( loc + 1 )
  var secs  = parseInt( currTime, 10 )
  loc       = currTime.indexOf( '.' )
  currTime  = currTime.substring( loc + 1 )
  var mills = parseInt( currTime, 10 ) * 100
  var total = (((hours * 60) + mins) * 60 + secs) * 1000 + mills
  return convertTotalMills( total + elapsedMills )
}

function EncodeNull( chkStr ) {
    if( chkStr == null ) return "~~~null~~~"
    else if( String( chkStr ) == "0" ) return 0
    else if ( chkStr == "" ) return "~~~null~~~"
    return chkStr
}
