/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

//functions for realtime date/time
function FormatDS( now ) {
  if (is.ns4 || is.ie4) {
    var monthList = new Array('January','February','March','April','May','June','July','August','September','October','November','December')
    var year = now.getYear()
    if( year < 1900 ) year += 1900
    return monthList[now.getMonth()]+' '+now.getDate()+', '+year
  }
  else
    return now.toLocaleDateString()
}

function FormatTS( now ) {
  if (is.ns || is.ie4) {
    var newmin = now.getMinutes()
    if (newmin<10) newmin = "0"+newmin
    var hour = now.getHours()
    var ampm = 'AM'
    if (hour>=12) {
      ampm = 'PM'
      if (hour>12)
        hour-=12
    }
    else if (hour==0) hour = 12
    if (hour<10) hour = ' '+hour
    return hour+':'+newmin+' '+ampm
  }
  else {
    var time = now.toLocaleTimeString()
    if (time.length>3) {
      idx=time.lastIndexOf(':')
      if (idx>=0) {
        var timenosec = time.substring(0,idx)
        if (time.length>=idx+3)
          timenosec = timenosec + time.substring(idx+3,time.length)
        time = timenosec
      }
    }
    idx=time.lastIndexOf(' ')
    if (idx>0 && idx==time.length-4)
      time = time.substring(0,time.length-4)
    return time;
  }
}

function FormatETS( eT ) {
  var mills = eT % 1000
  eT -= mills
  eT /= 1000
  var secs = eT % 60
  eT -= secs
  eT /= 60
  var mins = eT % 60
  eT -= mins
  eT /= 60
  var hours = eT
  if( hours < 10 ) hours = "0" + hours
  if( mins < 10 ) mins = "0" + mins
  if( secs < 10 ) secs = "0" + secs
  return hours + ':' + mins + ':' + secs
}

function CalcTD( f, val ) {
  var tV = 0
  if( f == 1 ) tV += 24 * 60 * 60 * 1000 * val
  else if( f == 2 ) tV += 60 * 1000 * val
  else if( f == 4 ) tV += 1000 * val
  return tV
}
