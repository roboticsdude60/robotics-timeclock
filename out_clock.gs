function onSubmit() {
  var responses = FormApp.getActiveForm().getResponses();
  var last = responses[responses.length-1];
  var username = String(last.getItemResponses()[0].getResponse()).trim();  
    
  var ss = SpreadsheetApp.openById("15s5WXak4KLxC9Tb3TAZBhi30FBIl_eMxYUXq1Ip4pwY");
  var usersheet = ss.getSheetByName(username);
  if (!usersheet) {
    usersheet = timeclockutils.createUserSheet(ss, username);
  }
  timeclockutils.onClockOut(last.getTimestamp(), usersheet);
}
