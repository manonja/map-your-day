const base_URL = 'http://localhost:3000/'
const activities_URL = 'http://localhost:3000/activities/'
const users_URL = 'http://localhost:3000/users/'

const startBtn = document.querySelector('#start-btn')
const loginBtn = document.querySelector('#login-btn')
const jumbotron = document.querySelector('#jumbotron')
const loginModal = document.querySelector('#modalLoginForm')
const activityForm = document.querySelector('#activity-form')
const addActivityBtn = document.querySelector('#add-activity-btn')
const summaryDiv = document.querySelector('#summary-container')
const timelineDiv = document.querySelector('#timeline-container')
const activityName = document.querySelector('#activity-name')
const beginningTime = document.querySelector('#beginning-time')
const endingTime = document.querySelector('#ending-time')
const activityLocation = document.querySelector('#pac-input')
const timelineBtn = document.querySelector('#timeline-btn')
const userLogin = document.querySelector("#login")
const map = document.querySelector('#map')
const homePage = document.querySelector('#home')

// toggle form
const toggleAddActivityForm = () => {
  if (activityForm.style.display === 'none') {
    activityForm.style.display = 'block'
    map.style.display = 'block'
    addActivityBtn.style.display = 'block'
    summaryDiv.style.display = 'none'
    timelineDiv.style.display === 'none'
    jumbotron.style.display = 'none'
  } else {
    activityForm.style.display = 'none'
    map.style.display = 'none'
    addActivityBtn.style.display = 'none'
    timelineDiv.style.display === 'none'

  }
}

// toggle summary
const toggleSummary = () => {
  if (summaryDiv.style.display === 'none') {
    activityForm.style.display = 'none'
    summaryDiv.style.display = 'block'
    jumbotron.style.display = 'none'
    map.style.display = 'none'
    addActivityBtn.style.display = 'none'
    timelineDiv.style.display === 'none'

  } else {
    summaryDiv.style.display = 'none'

  }
}

// toggle timeline
const toggleTimeline = () => {
  if (timelineDiv.style.display === 'none') {
    activityForm.style.display = 'none'
    timelineDiv.style.display = 'block'
    jumbotron.style.display = 'none'
    summaryDiv.style.display = 'none'
    map.style.display = 'none'
    addActivityBtn.style.display = 'none'
  } else {
    timelineDiv.style.display = 'none'
  }
}

// prevent the page to refresh when we click the homepage button
homePage.addEventListener('click', (e) => {
  e.preventDefault()
  jumbotron.style.display = 'block'
  timelineDiv.style.display = 'none'
  map.style.display = 'none'
  addActivityBtn.style.display = 'none'
  activityForm.style.display = 'none'

})


// Display timeline for each activity
let counter = 0
const timeLineActivity = () => {
  // reset page
  timelineDiv.innerHTML = ""

  let newItem = ""
  state.activities.forEach(el => {
    counter++
      newItem += `
        <li class=${(counter % 2 !== 0) ? 'timeline-inverted' : 'timeline'}>
        <div class="timeline-badge">
          <a><i class="fa fa-circle" id=""></i></a>
        </div>
        <div class="timeline-panel">
            <div class="timeline-heading">
                <h4>${el.name}</h4>
            </div>
            <div class="timeline-body">
                <p>${el.beginning_time}H - ${el.end_time}H at ${el.location}</p>
                <p>This activity will take you ${el.end_time - el.beginning_time} hour(s)</p>
            </div>
            <div class="timeline-footer">
                <p class="text-right">May-9-2019</p>
            </div>
        </div>
      </li>
    `
  })
  return newItem
}

// Display summary for each activity
const summaryActivity = () => {
  // reset page
  summaryDiv.innerHTML = ""
  newActivity = ""
  state.activities.forEach(el => {
    newActivity += `
    <li class="list-group-item">${el.beginning_time}h - ${el.end_time}h: ${el.name} - Where? ${el.location} - Duration? ${activityDuration()} hour(s)<input type="button" class="btn orange" value="Delete" id='delete-btn' style="float: right;"></li>
    `
  })
  return newActivity
}

// Add activity to timeline onclick
timelineBtn.addEventListener('click', () => {
  const timelineList = document.createElement('ul')
  timelineList.className = "timeline"
  timelineList.innerHTML = timelineActivity()
  timelineDiv.append(timelineList)
})
//should we add the location and/or a little map?^


// Display activity
const displayUserActivity = (user) => {

}

// Display activities
const displayActivities = () => {
  state.activities.forEach(displayUserActivity)
}


// Create activity

  addActivityBtn.addEventListener('click', (e) => {
    // prevent page to refresh
    e.preventDefault()
    state.activities.push({name: activityName.value, beginning_time: timeStringToFloat(beginningTime.value),
                end_time: timeStringToFloat(endingTime.value), location: activityLocation.value})
    //add to API
    fetch(activities_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({user_id: state.currentUser.id,
                            name: activityName.value, beginning_time: beginningTime.value,
                                        end_time: endingTime.value, location: activityLocation.value
                                      })
  }).then(resp => resp.json())

    // Add activity to summary
    const activityList = document.createElement('ul')
    activityList.className = "list-group"

    activityList.innerHTML = summaryActivity()

    // delete activity
    const deleteBtn = activityList.querySelector('#delete-btn')
    deleteBtn.addEventListener('click', () => {
      activityList.remove()
    })

    summaryDiv.append(activityList)
    reset()

})

// reset form values
const reset = () => {
    activityName.value = ""
    beginningTime.value = "06:00:00"
    endingTime.value = "08:00:00"
  activityLocation.value = ""
}

// convert time to decimal
const timeStringToFloat = (time) => {
  let hoursMinutes = time.split(/[.:]/);
  let hours = parseInt(hoursMinutes[0], 10);
  let minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
}

// calculate duration
const activityDuration = () => {
  return timeStringToFloat(endingTime.value) - timeStringToFloat(beginningTime.value)
}

// init google maps
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.520416, lng: -0.087607},
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }



//state
  const state = {
    currentUser: null,
    activities: []
  }

// login
userLogin.addEventListener('click', (e) => {

  e.preventDefault()
  const modal = document.querySelector("#id01")

  let userName = modal.querySelector('#username').value
  login(userName).then(data => {
    state.currentUser = data
    state.activities = data.activities
  })
  modal.style.display = 'none'
})

// Welcome user
const welcome = () => {

}

// Server
const login = userName => {
return fetch(users_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({username: userName})
})
  .then(resp => resp.json())
  .catch(err => console.log(err))

}

// Loads google maps
document.addEventListener("DOMContentLoaded", () => {
  initAutocomplete()
})
