/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

var ocmOrig = document.oncontextmenu
var ocmNone = new Function( "return false" )

// Inline Object
function ObjInline(n,a,x,y,w,h,v,z,c,d) {
  this.name = n
  this.altName = a
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.v = v
  this.z = z
  this.iType = '';
  this.isGrp = false
  this.hasOnUp = false
  this.hasOnRUp = false
  this.bgColor = c
  this.obj = this.name+"Object"
  this.parmArray = new Array
  this.numParms = 0
  this.alreadyActioned = false;
  this.eatOnUp=false;
  this.eatOnRUp=false;
  eval(this.obj+"=this")
  if ( d != 'undefined' && d!=null )
    this.divTag = d;
  else  
    this.divTag = "div";
  this.childArray = new Array  
  this.isPlaying = false;
  this.hasDone   = 0;
  this.flsPlayer = null;
  this.autoPlay  = false;
  this.hasBeenProcessed = false;
  this.bSizing = false;
}

function ObjInlineGetNS( tagName) { 
	var flashName = "swf" + this.name;
	if (navigator.appVersion.indexOf("Mac")!=-1) 
		return eval( "swf" + this.name );

	var objects = document.getElementsByTagName( String(tagName) );
	for (var i=0; i < objects.length; i++) {
		if ( objects[i].name == flashName || objects[i].id == flashName) {
			return window.document.embeds[i];
			break;
		}
	}
}

function ObjInlineAddParm( newParm ) {
  this.parmArray[this.numParms++] = newParm;
}

function ObjInlineAddChild( newChild ) {
  this.childArray[this.childArray.length] = newChild;
}

function ObjInlineActionGoTo( destURL, destFrame ) {
  this.objLyr.actionGoTo( destURL, destFrame );
}

function ObjInlineActionGoToNewWindow( destURL, name, props ) {
  this.objLyr.actionGoToNewWindow( destURL, name, props );
}

function ObjInlineActionPlay( ) {
  if( this.iType == 'flashvid' ) 
  {
     if(! this.flsPlayer )
        this.setFlashPlayer()
     if( !this.autoPlay )
        this.flsPlayer.sendEvent('play');
     this.autoPlay = true;
  }
  else if( this.iType == 'flash' ) 
  {
    if(! this.flsPlayer )
      this.setFlashPlayer()
  
    this.flsPlayer.Play();
    this.autoPlay = true;
    
  }
  else if( this.iType == 'wmp' ) {
    eval("document."+this.name+"obj"+".controls.play()");
    this.isPlaying = true;
  }
  else this.objLyr.actionPlay();
}

function ObjInlineActionStop( ) {
  if( this.iType == 'flashvid' ) 
  {
     if(! this.flsPlayer )
        this.setFlashPlayer()

      this.flsPlayer.sendEvent('stop');
      this.autoPlay  = false;
  }
  else if( this.iType == 'flash' ) 
  {
    if(! this.flsPlayer )
      this.setFlashPlayer()
  
    this.flsPlayer.GotoFrame(0);;
    this.flsPlayer.StopPlay();
    this.autoPlay  = false;
  }
  else if( this.iType == 'wmp' ) {
    eval("document."+this.name+"obj"+".controls.stop()");
    this.isPlaying = false;
  }
  else this.objLyr.actionStop();
}

function ObjInlineActionShow( ) {
  if( this.isGrp || !this.isVisible() )
    this.onShow();
}

function ObjInlineActionHide( ) {
  if( this.isGrp || this.isVisible() )
    this.onHide();
}

function ObjInlineActionLaunch( ) {
  this.objLyr.actionLaunch();
}

function ObjInlineActionExit( ) {
  this.objLyr.actionExit();
}

function ObjInlineActionChangeContents( value, align, fntId ) {
  var varValue = ''
  varValue += value
  if (arguments.length>1) {
    var div = null
    var fntName = this.objLyr.id + 'Font' + fntId
 
    if( varValue != "~~~null~~~" && varValue.split ) {
      var test = escape( varValue )
 
      var ca = test.split('%5Cr')
      if( ca.length ) {
        var newVarValue=''
    
        for(var i=0;i<ca.length;i++) {
          newVarValue += ca[i]
          if( i < ca.length-1 ) 
            newVarValue += '<br />'
        }
        varValue = newVarValue
      }
      
      test = varValue;
      
      var ca = test.split('%')
      if( ca.length ) {
        var newVarValue=''
    
        for(var i=0;i<ca.length;i++) {
          var tempStr, holdStr;
          var uni = 0;
          if( i )
          {
            if( ca[i].charAt( 0 ) == 'u' )
            {
              uni = 1;
              holdStr = ca[i].substring( 5 );
            }
            else
              holdStr = ca[i].substring( 2 );
          }
          else
            holdStr = ca[i];
            
          if( i && i < ca.length ) 
          {
            if( uni )
              tempStr = ca[i].substring( 1, 5 )
            else
              tempStr = ca[i].substring( 0, 2 )

            var hexValue = parseInt( tempStr, 16 )

            if( hexValue == 32 )
              newVarValue += ' '
            else
              newVarValue += '&#' + hexValue + ';'

            newVarValue += holdStr
          }
          else
            newVarValue += holdStr
        }
        varValue = newVarValue
      }
    }
    
    var splitID = '<!--split=' + this.objLyr.id + 'ter' + '-->';
	if( !is.ns4 ) {
      var parts = this.objLyr.ele.innerHTML.split(splitID);
      if ( parts.length == 3 )
      {
        if( varValue == "~~~null~~~" ) div = parts[0] + splitID + '<' + this.divTag + ' class="' + align + '"><span class="' + fntName + '">' + '</span></' + this.divTag + '>'  + splitID + parts[2]; 
        else div =  parts[0] + splitID + '<' + this.divTag + ' class="' + align + '"><span class="' + fntName + '">' + varValue + '</span></' + this.divTag + '>' + splitID + parts[2]; 
      }
    }
    if( !div )
    {
      if( varValue == "~~~null~~~" ) div = '<' + this.divTag + ' class="' + align + '"><span class="' + fntName + '">' + '</span></' + this.divTag + '>' 
      else div = '<' + this.divTag + ' class="' + align + '"><span class="' + fntName + '">' + varValue + '</span></' + this.divTag + '>'
    }
    if( is.ns5 ) this.objLyr.ele.innerHTML = div
    else this.objLyr.write( div );
  }
  else {
    if ( this.parmArray[1] ) {
      if( varValue.length == 0 )
      {
        var off = this.parmArray[1].indexOf( 'value=' )
        if( off >= 0 )
	  varValue = this.parmArray[1].substring( off + 7, this.parmArray[1].length-2 )

        //Fixup parm 0
        off = this.parmArray[0].indexOf( 'width=' )
        var front = this.parmArray[0].substring( 0, off + 7 )
        var end   = this.parmArray[0].substring( off + 7 )
        off = end.indexOf( "'" )
        var newString = front + this.w + end.substring( off )
        off = newString.indexOf( 'height=' )
        var front = newString.substring( 0, off + 8 )
        var end   = newString.substring( off + 8 )
        off = end.indexOf( "'" )
        this.parmArray[0] = front + this.h + end.substring( off )
      }

      if( this.iType == 'flashvid' ) {
        if( this.bSizing ) {
		  var strArr = new Array('width=', 'height=')
		  for(i=1; i < this.parmArray.length; i++) {
		    var delim = "&"
			for( y = 0 ; y < strArr.length; y++ ) {
			  var str = strArr[y];
			  var strLen = str.length
			  var off = this.parmArray[i].indexOf( str )
			  while(off > 0) {
			    var bIsNum = this.parmArray[i].charAt(off + strLen)
				if( bIsNum == "'" ) {
				  strLen++
				  delim = "'"
				}
				var front = this.parmArray[i].substring( 0, off + strLen )
				var end = this.parmArray[i].substring( off + strLen )
				var delimoff = end.indexOf( delim )
				this.parmArray[i] = front + this.w + end.substring( delimoff )
				off = this.parmArray[i].indexOf( str, off + strLen )
				strLen = str.length
				delim = "&"
			  }
			}
		  }
	      this.bSizing = false;
		}
		else {
            if(varValue.indexOf('media/') == 0 )
                varValue = varValue.substring(6);
            var str = 'file=';
			for(i=1; i < this.parmArray.length; i++) {
				off = this.parmArray[i].indexOf( str )
				if( off > 0 ) {
					var front = this.parmArray[i].substring( 0, off + 5 )
					var end   = this.parmArray[i].substring( off + 5 )
					off = end.indexOf( "&" )
					this.parmArray[i] = front + varValue + end.substring( off )
				}
			}
			this.flsPlayer = null;
        }
        
      }else if(this.iType = 'wmp' ){
		this.parmArray[1] = "<param name='URL' value='" + varValue + "'>";
        this.parmArray[3] = "<embed src='" + varValue + "' width='" + this.w + "'   height='" + this.h + "'PLUGINSPAGE='http://microsoft.com/windows/mediaplayer/en/download/' type='application/x-mplayer2'  name='" + this.name + "'>";
	  }else{
        this.parmArray[1] = "<param name='movie' value='" + varValue + "'>";
        this.parmArray[3] = "<embed src='" + varValue + "' width='" + this.w + "'   height='" + this.h + "' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' name='" + this.name + "' swliveconnect='true'>";
      }
      this.build();
      var str = "";
      for (var i=0; i < this.numParms; i++) str = str + this.parmArray[i]
      if( is.ns5 ) this.objLyr.ele.innerHTML = str
      else this.objLyr.write( str );
    }
    else {
      document.getElementById(this.name).style.width = this.w
      document.getElementById(this.name).style.height = this.h
    }
  }
}

function ObjInlineActionTogglePlay( ) {
  if( this.iType == 'flashvid' ) 
  {
     if(! this.flsPlayer ) this.setFlashPlayer()
     if( this.autoPlay ) this.autoPlay = false;
	 else this.autoPlay = true;
     this.flsPlayer.sendEvent('play');
  }
  else if( this.iType == 'flash' ) 
  {
      if(! this.flsPlayer )
      	this.setFlashPlayer()
  
      if( this.flsPlayer.IsPlaying() ) {
          this.flsPlayer.StopPlay();
          this.autoPlay  = false;
      }
      else {
	      this.flsPlayer.Play();
	      this.autoPlay = true;
      }
  }
  else if( this.iType == 'wmp' ) 
  {
	this.setPlayState();
    if( this.isPlaying ) {
	    eval("document."+this.name+"obj"+".controls.stop()");
	    this.isPlaying = false;
    }
    else {
	    eval("document."+this.name+"obj"+".controls.play()");
	    this.isPlaying = true;
    }
  }
  else this.objLyr.actionTogglePlay();

}

function ObjInlineActionToggleShow( ) {
  if( this.isGrp ) {
    for ( var i=0; i<this.childArray.length; i++ )
       eval( this.childArray[i] + ".actionToggleShow()");
  }
  else if(this.objLyr.isVisible()) 
    this.actionHide();
  else 
    this.actionShow();
}

function ObjInlineSizeTo( w, h ) { 
    this.w = w
    this.h = h
    this.bSizing = true;
    this.build()
    this.activate()
    if( this.objLyr )
    	this.objLyr.clipTo( 0, w, h, 0  )
    this.actionChangeContents( '' )
}

function ObjInlineGoToFrame( frame ) {
   if( this.iType == 'flash' ) 
   {
      if(! this.flsPlayer )
      	this.setFlashPlayer()
     
      this.flsPlayer.GotoFrame(frame);
   }

}

function ObjInlineGoToNextFrame() {
   if( this.iType == 'flash' ) 
   {
      if(! this.flsPlayer )
      	this.setFlashPlayer()
        
      var frame = this.flsPlayer.CurrentFrame()+1;
      this.flsPlayer.GotoFrame(frame);
   }

}

function ObjInlineGoToPrevFrame() {
  if( this.iType == 'flash' ) 
  {
      if(! this.flsPlayer )
      	this.setFlashPlayer()
          
      var frame = this.flsPlayer.CurrentFrame()-1;
      this.flsPlayer.GotoFrame(frame);
   }
}

function ObjInlineGoToLabel( label ) {
  if( this.iType == 'flash' ) 
  {
     if(! this.flsPlayer )
      	this.setFlashPlayer()
          
     this.flsPlayer.TGotoLabel('/', String(label) );
   }
}

function ObjInlineGetFlashVar ( varName ) {
     if(! this.flsPlayer )
      	this.setFlashPlayer()
          
     return this.flsPlayer.GetVariable( String(varName) );

	
}

function ObjInlineSetFlashVar( varName,myValue ) {
 if(! this.flsPlayer )
      	this.setFlashPlayer()

  this.flsPlayer.SetVariable( String(varName), String(myValue) );
}

function ObjInlinePause() {
  if( this.iType == 'flashvid' ) 
  {
     if(! this.flsPlayer )
        this.setFlashPlayer()
     if( this.autoPlay )
        this.flsPlayer.sendEvent('PLAY');
	 this.autoPlay = false;
  }
  else if( this.iType == 'flash' ) 
  {
     if(! this.flsPlayer )
        this.setFlashPlayer()

      this.flsPlayer.StopPlay();
  }
  else if( this.iType == 'wmp' ) 
  {
	this.setPlayState();
	eval("document."+this.name+"obj"+".controls.pause()");
	this.isPlaying = false;
  }
}

{ // Setup prototypes
var p=ObjInline.prototype
p.addParm = ObjInlineAddParm
p.build = ObjInlineBuild
p.init = ObjInlineInit
p.activate = ObjInlineActivate
p.up = ObjInlineUp
p.down = ObjInlineDown
p.over = ObjInlineOver
p.out = ObjInlineOut
p.capture = 0
p.onOver = new Function()
p.onOut = new Function()
p.onSelect = new Function()
p.onDown = new Function()
p.onUp = new Function()
p.onRUp = new Function()
p.actionGoTo = ObjInlineActionGoTo
p.actionGoToNewWindow = ObjInlineActionGoToNewWindow
p.actionPlay = ObjInlineActionPlay
p.actionStop = ObjInlineActionStop
p.actionShow = ObjInlineActionShow
p.actionHide = ObjInlineActionHide
p.actionLaunch = ObjInlineActionLaunch
p.actionExit = ObjInlineActionExit
p.actionChangeContents = ObjInlineActionChangeContents
p.actionTogglePlay = ObjInlineActionTogglePlay
p.actionToggleShow = ObjInlineActionToggleShow
p.writeLayer = ObjInlineWriteLayer
p.onShow = ObjInlineOnShow
p.onHide = ObjInlineOnHide
p.isVisible = ObjInlineIsVisible
p.onSelChg = new Function()
p.addChild = ObjInlineAddChild
p.doTrans = ObjInlineDoTrans
p.sizeTo  = ObjInlineSizeTo
p.goToFrame     = ObjInlineGoToFrame
p.goToNextFrame = ObjInlineGoToNextFrame
p.goToPrevFrame = ObjInlineGoToPrevFrame
p.goToLabel     = ObjInlineGoToLabel
p.getFlashVar   = ObjInlineGetFlashVar
p.setFlashVar   = ObjInlineSetFlashVar
p.getNS         = ObjInlineGetNS
p.getFlashVars  = ObjInlineGetFlashVar
p.actionPause	= ObjInlinePause
p.offset        = ObjInlineOffset
p.moveGrp       = ObjInlineMoveGrp
p.transGrp      = ObjInlineTransGrp
p.setPlayState  = ObjInlinefSetPlayState
p.onDone		= new Function() 
p.isDone        = ObjInlineIsDone
p.setFlashPlayer = ObjInlineSetFlashPlayer
}

function ObjInlineBuild() {
  if( this.bgColor ) this.css = buildCSS(this.name,this.x,this.y,this.w,this.h,this.v,this.z,this.bgColor)
  else {
    var prefix=this.name.substring(3)
    if(prefix == 'tex') {
      var maxHeight = parseInt( this.h * 5 / 4, 10 )
      this.css = buildCSS(this.name,this.x,this.y,this.w,maxHeight,this.v,this.z,this.bgColor)
    }
    else if( is.ns4 ) {
      var right = this.w + this.x;
      if( right <= window.innerWidth + 4 ) this.css = buildCSS(this.name,this.x,this.y,this.w,null,this.v,this.z,this.bgColor)
      else this.css = buildCSS(this.name,this.x,this.y,this.w,this.h,this.v,this.z,this.bgColor)
    }
    else this.css = buildCSS(this.name,this.x,this.y,this.w,null,this.v,this.z,this.bgColor)
  }
  var divStart
  var divEnd
  divStart = '<' + this.divTag + ' id="'+this.name+'"'
  if( this.altName ) divStart += ' alt="'+this.altName+'"'
  else { if( this.altName != null ) divStart += ' alt=""' }
  divStart += '><a name="'+this.name+'anc"'
  if( this.hasOnUp ) divStart += ' href="javascript:' +this.name+ '.onUp()"'
  divStart += '>'
  divEnd   = '</a></' + this.divTag + '>'
  this.div = divStart + '\n' + divEnd + '\n'
}

function ObjInlineInit() {
  this.objLyr = new ObjLayer(this.name)
}

function ObjInlineActivate() {
  if( this.objLyr && this.objLyr.styObj && !this.alreadyActioned ) {
    if( this.isGrp ) {
      if( this.v ) {
        for ( var i=0; i<this.childArray.length; i++ )
        {
          if ( eval( this.childArray[i] + ".isVisible()") )
            eval( this.childArray[i] + ".actionShow()");
        }
      }
    }
    else
      if( this.v ) this.actionShow()
  }
  if( this.capture & 4 ) {
    if (is.ns4) this.objLyr.ele.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP)
    this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;")
    this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;")
  }
  if( this.capture & 1 ) this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
  if( this.capture & 2 ) this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")
  if( this.numParms ) {
    var str = "";
    for (var i=0; i < this.numParms; i++) str = str + this.parmArray[i]
    if( is.ns5 ) this.objLyr.ele.innerHTML = str
    else this.objLyr.write( str );
  }
}

function ObjInlineDown(e) {
  if( is.ie ) e = event
  if( is.ie && !is.ieMac && e.button!=1 && e.button!=2 ) return
  if( is.ieMac && e.button != 0 ) return
  if( is.ns && !is.ns4 && e.button!=0 && e.button!=2 ) return
  if( is.ns4 && e.which!=1 && e.which!=3 ) return
  this.onSelect()
  this.onDown()
}

function ObjInlineUp(e) {
  if( is.ie ) e = event
  if( is.ie && !is.ieMac && e.button!=1 && e.button!=2 ) return
  if( is.ieMac && e.button!=0 ) return
  if( is.ns && !is.ns4 && !is.nsMac && e.button!=0 && e.button!=2 ) return
  if( is.ns4 && e.which!=1 && e.which!=3 ) return
  if( ( !is.ns4 && e.button==2 ) || ( is.ns4 && e.which==3 ) )
  {
    if( this.hasOnRUp )
    {
      document.oncontextmenu = ocmNone
      this.onRUp()
      setTimeout( "document.oncontextmenu = ocmOrig", 100)
    }
  }
  else if( this.hasOnUp )
    this.onUp()
}

function ObjInlineOver() {
  this.onOver()
}

function ObjInlineOut() {
  this.onOut()
}

function ObjInlineWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjInlineOnShow() {
  this.alreadyActioned = true;
  this.objLyr.actionShow();
  for ( var i=0; i<this.childArray.length; i++ )
  {
    if ( !eval( this.childArray[i] + ".isVisible()") )
      eval( this.childArray[i] + ".actionShow()");
  }
  
  if( this.matchObj )
	this.drawLine();
}

function ObjInlineOnHide() {
  this.alreadyActioned = true;
  for ( var i=0; i<this.childArray.length; i++ )
     eval( this.childArray[i] + ".actionHide()");
  this.objLyr.actionHide();

  if( this.matchLine )
	  this.matchLine.ResizeTo( -10, -10, -10, -10 );
  
  if( this.objLyr.doc.forms.length > 0 && this.objLyr.doc.forms[0].blur )
    this.objLyr.doc.forms[0].blur();
}

function ObjInlineIsVisible() {
  if( this.objLyr.isVisible() )
    return true;
  else
    return false;
}

function ObjInlineDoTrans(tOut,tNum,dur,fn,ol,ot,fl,ft,fr,fb,il) {
  if( !this.isVisible() )
  {
    for ( var i=0; i<this.childArray.length; i++ )
    {
      if ( eval( this.childArray[i] + ".isVisible()") )
        eval( this.childArray[i] + ".actionShow()");
    }
  }
  this.objLyr.doTrans(tOut,tNum,dur,fn,ol,ot,fl,ft,fr,fb,il);
}

function ObjInlineOffset( off ) {
  var maxY = 0;
  for ( var i=0; i<this.childArray.length; i++ )
  {
     var obj = eval( this.childArray[i] )
     obj.objLyr.moveBy( null, off );
     var bottom = obj.objLyr.ele.offsetTop + obj.objLyr.ele.offsetHeight;
     if( maxY < bottom ) maxY = bottom;
  }
  
  return maxY;
}

function ObjInlineMoveGrp( x, y, objNameArr ) {
  if( !objNameArr)
    objNameArr = new Array();
  else
    objNameArr = eval(objNameArr);
    
  if( this.isGrp ) {
    for ( var i = 0; i < this.childArray.length; i++ ) {
      var obj = eval( this.childArray[i] )
      
      if (i == 0 ) {
        smallX = obj.x;
        smallY = obj.y;
      }
      
      // ** Get smallest x position
      if( smallX > obj.x )
      	smallX = obj.x;
      
      // ** Get smallest y position
      if( smallY > obj.y )
        smallY = obj.y;
    }
    
    var isLeft = false;
    var isUp   = false;
    
    var xVal = Math.abs(smallX - x);
    if( smallX > x ) isLeft = true;
    
    var yVal = Math.abs(smallY - y);
    if( smallY > y ) isUp = true;
    
    // ** move each obj
    for ( var i = 0; i < this.childArray.length; i++ ) {
      var currPosX = obj.x;
      var currPosY = obj.y
      var obj = eval( this.childArray[i] )
      if( isLeft ) currPosX = obj.x - xVal;
      else         currPosX = obj.x + xVal;
      
      if( isUp )   currPosY = obj.y - yVal;
      else         currPosY = obj.y + yVal;
      
      for ( var j = 0; j < objNameArr.length; j++ ) {
	      if( obj.name == objNameArr[j]) {
	      	var myObj = eval(objNameArr[j]);
	      	myObj.moveTo(currPosX,currPosY);
	      	myObj.hasMoved = true;
            myObj.newX = currPosX;
            myObj.newY = currPosY;
	  	  }
  	  }
      obj.objLyr.moveTo(currPosX,currPosY);
      obj.objLyr.hasMoved = true;
      obj.objLyr.newX = currPosX;
      obj.objLyr.newY = currPosY;
      
    }
  }
}

function ObjInlineTransGrp( tOut, tNum, dur, x, y, objNameArr ) {
  if( !objNameArr)
    objNameArr = new Array();
  else
    objNameArr = eval(objNameArr);
    
  if( this.isGrp ) {
    for ( var i = 0; i < this.childArray.length; i++ ) {
      var obj = eval( this.childArray[i] )
      
      if (i == 0 ) {
        smallX = obj.x;
        smallY = obj.y;
      }
      
      // ** Get smallest x position
      if( smallX > obj.x )
      	smallX = obj.x;
      
      // ** Get smallest y position
      if( smallY > obj.y )
        smallY = obj.y;
    }
    
    var isLeft = false;
    var isUp   = false;
    
    var xVal = Math.abs(smallX - x);
    if( smallX > x ) isLeft = true;
    
    var yVal = Math.abs(smallY - y);
    if( smallY > y ) isUp = true;
    
    // ** move each obj
    for ( var i = 0; i < this.childArray.length; i++ ) {
      var currPosX = obj.x;
      var currPosY = obj.y
      var obj = eval( this.childArray[i] )
      if( isLeft ) currPosX = obj.x - xVal;
      else         currPosX = obj.x + xVal;
      
      if( isUp )   currPosY = obj.y - yVal;
      else         currPosY = obj.y + yVal;
      
      for ( var j = 0; j < objNameArr.length; j++ ) {
	      if( obj.name == objNameArr[j]) {
	      	var myObj = eval(objNameArr[j]);
	      	myObj.doTrans(1,tNum,dur,null,myObj.x,myObj.y,currPosX,currPosY,0,0,0);
	      	myObj.hasMoved = true;
            myObj.newX = currPosX;
            myObj.newY = currPosY;
	  	  }
  	  }
      obj.objLyr.doTrans(tOut,tNum,dur,null,obj.objLyr.x,obj.objLyr.y,currPosX,currPosY,0,0,0);
      obj.objLyr.hasMoved = true;
      obj.objLyr.newX = currPosX;
      obj.objLyr.newY = currPosY;
      
    }
  }
}

function ObjInlinefSetPlayState() {
  var playerStatus = null;
  
  if (is.activeX)
    playerStatus = eval("document."+this.name+"obj"+".controls.playState");
  else
    playerStatus = eval("document."+this.name+"obj"+".controls.GetPlayState()");
  
  if( playerStatus ) {
      switch( playerStatus ) {
        case 0:
            // ** The playback state is undefined
        case 1:
            // ** Playback is stopped
        case 2:
            // ** Playback is paused
        case 6:
            // ** The player is buffering media
        case 7:
            // ** The player is waiting for streaming data
        case 8:
            // ** The player has reached the end of the media
        case 9:
            // ** The player is preparing new media
        case 10:
            // ** The player is ready to begin playback
            this.isPlaying = false;
            break;
        
        case 3:
            // ** The player is playing a stream
        case 4:
            // ** The player is scanning a stream forward
        case 5:
            // ** The player is scanning a stream in reverse
            this.isPlaying = true;
            break;
      }
  }
}

function ObjInlineIsDone()
{
	if(! this.flsPlayer )
      this.setFlashPlayer()

    if(this.flsPlayer){
        var currFrame = parseInt(this.flsPlayer.CurrentFrame())-1;
        var lastFrame;

        if( is.ie ) lastFrame = parseInt(this.flsPlayer.TotalFrames);
        else        lastFrame = parseInt(this.flsPlayer.TotalFrames());

        if((! this.flsPlayer.IsPlaying() && this.autoPlay) || currFrame >= lastFrame) {
            this.onDone()
            window.clearInterval(this.hasDone)
        }
	}
}

function ObjInlineSetFlashPlayer() {
    if( is.ie ) this.flsPlayer = eval( "document.swf" + this.name );
    else        this.flsPlayer = this.getNS("embed");
}