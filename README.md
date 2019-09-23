# Timeclock for hours volunteered at robotics

Students on Team 60 log the amount of time they work on our robot(and related projects) during build season.

This because the team requires(among other things) a certain number of hours logged for travel with the team to competitions.

I implemented a timeclock solution using google's forms, a spreadsheet, and apps script.

Both the mentors and students love it! Faster and simpler for the students--with up to date information provided for mentors.


## old system
- Sheets of paper in labeled folders for each student
- Writing down the times and duration each day
- Mentor manually summing each students total to verify travel elegibility

## what about existing time clock software?
- Complicated features we don't need like different hourly rates and overtime
- $$ most timeclock software is paid or freemium
- Inconvenient to add new users

Not well matched to our use case.

## new tech

Let's keep it simple. We can identify people by name. Which works wonderfully in a small group. I can also pretend that names don't change :)

So one google form to clock in, and another for clocking out.

![both time clocks](both_timeclocks.png)

The script tied to clocking in is straightforward. This functions execution is triggered by submission of the form. Note the magic happening on lines 13 and 15. I wrote my own library so that I could share and simplify code between the all the parts of this project.

```
function onInSubmit() {
  var responses = FormApp.getActiveForm().getResponses();
  var last = responses[responses.length-1];
  var username = String(last.getItemResponses()[0].getResponse()).trim();

  var ss = SpreadsheetApp.openById("15s5WXak4KLxC9Tb3TAZBhi30FBIl_eMxYUXq1Ip4pwY");
  var usersheet = ss.getSheetByName(username);
  if (!usersheet) {
    usersheet = timeclockutils.createUserSheet(ss, username);
  }
  timeclockutils.onClockIn(last.getTimestamp(), usersheet);
}
```
And just like that we already have:

1.  Easy onboarding. Just walk to the computer and type in your name
2.  Automatic timestamp--nothing hastilly scribbled and impossible to read

The script for clocking out is very similar.

---






