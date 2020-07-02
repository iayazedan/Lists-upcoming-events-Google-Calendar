function listUpcomingEvents() {
  var filterCreatorEmail = 'ayas46500@gmail.com';
  var filterColorId = '10';
  var calendarId = 'ayas46500@gmail.com';
  var optionalArgs = {
    timeMin: (new Date()).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime'
  };
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;
  
  
  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      if (!when) {
        when = event.start.date;
      }
      if (event.creator.email == filterCreatorEmail) {
        Logger.log('%s %s %s (%s)', event.creator.email, event.colorId, event.summary, when);
        if (event.colorId != filterColorId){
          Logger.log('Updating color from %s to %s',event.colorId, filterColorId);
          event.colorId = filterColorId;
          Calendar.Events.patch(event, 'primary', event.id)
        }
      }
     //  Logger.log(JSON.stringify(event));
  }
  }
 else {
    Logger.log('No upcoming events found.');
  }
}
 