// Saves options to chrome.storage
function save_options() {
  var input = document.forms[0].color;
  var color = "";
  var i;
  for (i = 0; i < input.length; i++) {
    if (input[i].checked) {
      color = color + input[i].value;
    }
  }

  // Get date
  var fullDate = document.getElementById("datetime").value;
  var date = new Date(fullDate);

  chrome.storage.sync.set({
    color: color,
    msgAfter: document.getElementById("message-after").value,
    fullDate: fullDate,
    minutes: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    /*
    setTimeout(function() {
      status.textContent = '';
    }, 750);
    */
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    color: 'red',
    msgAfter: '',
    fullDate: '',
    minutes: '',
    hours: '',
    day: '',
    month: '',
    year: ''
  }, function(items) {
    var input = document.forms[0].color;
    var i;
    for (i = 0; i < input.length; i++) {
      if (input[i].value == items.color) {
        input[i].checked = true;
      }
    }

    document.getElementById('message-after').value = items.msgAfter;
    document.getElementById('datetime').value = items.fullDate;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', function(event) {
    if(document.getElementById('datetime').value !== ''){
      save_options();
    }
    else {
      event.preventDefault();
      var status = document.getElementById('status');
      status.className = 'error';
      status.innerHTML = '<i class="fa fa-cog fa-warning"></i> Please enter a full date.';
    }
});
