/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

var ocmOrig = document.oncontextmenu
var ocmNone = new Function( "return false" )

// Image Object
function ObjImage(n,i,a,x,y,w,h,v,z,d) {
  this.name = n
  this.altName = a
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.v = v
  this.z = z
  this.hasOnUp = false
  this.hasOnRUp = false
  this.isChoice = false
  this.obj = this.name+"Object"
  this.alreadyActioned = false;
  eval(this.obj+"=this")
  this.imgSrc = i
  if ( d!=null && d!="undefined" )
    this.divTag = d;
  else  
    this.divTag = "div";
}

function ObjImageActionGoTo( destURL, destFrame ) {
  this.objLyr.actionGoTo( destURL, destFrame );
}

function ObjImageActionGoToNewWindow( destURL, name, props ) {
  this.objLyr.actionGoToNewWindow( destURL, name, props );
}

function ObjImageActionPlay( ) {
  this.objLyr.actionPlay();
}

function ObjImageActionStop( ) {
  this.objLyr.actionStop();
}

function ObjImageActionShow( ) {
  if( !this.isVisible() )
    this.onShow();
}

function ObjImageActionHide( ) {
  if( this.isVisible() )
    this.onHide();
}

function ObjImageActionLaunch( ) {
  this.objLyr.actionLaunch();
}

function ObjImageActionExit( ) {
  this.objLyr.actionExit();
}

function ObjImageActionChangeContents( newImage ) {
  this.objLyr.doc.images[this.name+"Img"].src = newImage
}

function ObjImageActionTogglePlay( ) {
  this.objLyr.actionTogglePlay();
}

function ObjImageActionToggleShow( ) {
  if(this.objLyr.isVisible()) this.actionHide();
  else this.actionShow();
}

function ObjImageSizeTo( w, h ){
    this.w = w
    this.h = h
    this.build()
    this.activate()
    this.objLyr.clipTo( 0, w, h, 0  )
}

{ // Setup prototypes
var p=ObjImage.prototype
p.build = ObjImageBuild
p.init = ObjImageInit
p.activate = ObjImageActivate
p.up = ObjImageUp
p.down = ObjImageDown
p.over = ObjImageOver
p.out = ObjImageOut
p.capture = 0
p.onOver = new Function()
p.onOut = new Function()
p.onSelect = new Function()
p.onDown = new Function()
p.onUp = new Function()
p.onRUp = new Function()
p.actionGoTo = ObjImageActionGoTo
p.actionGoToNewWindow = ObjImageActionGoToNewWindow
p.actionPlay = ObjImageActionPlay
p.actionStop = ObjImageActionStop
p.actionShow = ObjImageActionShow
p.actionHide = ObjImageActionHide
p.actionLaunch = ObjImageActionLaunch
p.actionExit = ObjImageActionExit
p.actionChangeContents = ObjImageActionChangeContents
p.actionTogglePlay = ObjImageActionTogglePlay
p.actionToggleShow = ObjImageActionToggleShow
p.writeLayer = ObjImageWriteLayer
p.onShow = ObjImageOnShow
p.onHide = ObjImageOnHide
p.isVisible = ObjImageIsVisible
p.sizeTo = ObjImageSizeTo
p.onSelChg = new Function()
}

function ObjImageBuild() {
  this.css = buildCSS(this.name,this.x,this.y,this.w,this.h,this.v,this.z)
  this.div = '<' + this.divTag + ' id="'+this.name+'"></' + this.divTag +'>\n'
  this.divInt = '<a name="'+this.name+'anc"'
  if( this.hasOnUp ) this.divInt += ' href="javascript:void(null)"'
  this.divInt += '><img name="'+this.name+'Img" src="'+this.imgSrc
  if( this.altName ) this.divInt += '" alt="'+this.altName
  else if( this.altName != null ) this.divInt += '" alt="'
  this.divInt += '" width='+this.w+' height='+this.h
  if( ( this.hasOnUp || this.isChoice ) && !is.ns4 ) this.divInt += ' style="cursor:pointer"'
  this.divInt += ' border=0></a>'
}

function ObjImageInit() {
  this.objLyr = new ObjLayer(this.name)
}

function ObjImageActivate() {
  if( this.objLyr && this.objLyr.styObj && !this.alreadyActioned )
    if( this.v ) this.actionShow()
  if( this.capture & 4 ) {
    if (is.ns4) this.objLyr.ele.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP | Event.KEYDOWN)
    this.objLyr.ele.onUp = new Function(this.obj+".onUp(); return false;")
    this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;")
    this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;")
    this.objLyr.ele.onkeydown = ObjImageKeyDown
  }
  if( this.capture & 1 ) this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
  if( this.capture & 2 ) this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")
  if( is.ns5 ) this.objLyr.ele.innerHTML = this.divInt
  else this.objLyr.write( this.divInt );
}

function ObjImageDown(e) {
  if( is.ie ) e = event
  if( is.ie && !is.ieMac && e.button!=1 && e.button!=2 ) return
  if( is.ieMac && e.button != 0 ) return
  if( is.ns && !is.ns4 && e.button!=0 && e.button!=2 ) return
  if( is.ns4 && e.which!=1 && e.which!=3 ) return
  this.onSelect()
  this.onDown()
}

function ObjImageKeyDown(e) {
    var keyVal = 0
    if( is.ns4 ) keyVal = e.which
    else {
        if( is.ie ) e = event
        keyVal = e.keyCode
    }
    if( keyVal == 13 || keyVal == 32 ) this.onUp()
}

function ObjImageUp(e) {
  if( is.ie ) e = event
  if( (is.ie || is.nsMac) && !e ) return
  if( is.ie && !is.ieMac && e&& e.button!=1 && e.button!=2 ) return
  if( is.ns && !is.nsMac && !is.ns4 && e && e.button!=0 && e.button!=2 ) return
  if( is.ns4 && e && e.which!=1 && e.which!=3 ) return
  if( !is.ieMac && !is.nsMac && e && (( !is.ns4 && e.button==2 ) || ( is.ns4 && e.which==3 )) )
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

function ObjImageOver() {
  this.onOver()
}

function ObjImageOut() {
  this.onOut()
}

function ObjImageWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjImageOnShow() {
  this.alreadyActioned = true;
  this.objLyr.actionShow();
}

function ObjImageOnHide() {
  this.alreadyActioned = true;
  this.objLyr.actionHide();
}

function ObjImageIsVisible() {
  return this.objLyr.isVisible()
}