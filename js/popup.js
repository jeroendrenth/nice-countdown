

var countDown = {

  start: function(date, message) {
    var countdown = new Countdown({
      selector: '#timer',
      msgAfter: message,
      msgPattern: "{days} days, {hours} hours, {minutes} minutes and {seconds} seconds",
      dateStart: new Date(),
      dateEnd: new Date(date),
    });
  }



};


// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {

  chrome.storage.sync.get({
    color: '#04ff00',
    msgAfter: '',
    fullDate : new Date()
  }, function(value) {
    countDown.start(value.fullDate, value.msgAfter);
    document.getElementById("timer").style.color = value.color;
  });
});
