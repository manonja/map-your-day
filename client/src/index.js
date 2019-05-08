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

// toggle form 
const toggleAddActivityForm = () => {
  if (activityForm.style.display === 'none') {
    activityForm.style.display = 'block'
    summaryDiv.style.display = 'none'
    timelineDiv.style.display === 'none'
    jumbotron.style.display = 'none'
  } else {
    activityForm.style.display = 'none'
  }
}

// toggle summary
const toggleSummary = () => {
  if (summaryDiv.style.display === 'none') {
    activityForm.style.display = 'none'
    summaryDiv.style.display = 'block'
    jumbotron.style.display = 'none'
  } else {
    summaryDiv.style.display = 'none'
  }
}

const toggleTimeline = () => {
  if (timelineDiv.style.display === 'none') {
    activityForm.style.display = 'none'
    timelineDiv.style.display = 'block'
    jumbotron.style.display = 'none'
  } else {
    timelineDiv.style.display = 'none'
  }
}

const counter = 0 
// See my timeline
timelineBtn.addEventListener('click', () => {
  const timelineList = document.createElement('ul')
  timelineList.className = "timeline"
  timelineList.innerHTML = `
      <li class=${(counter % 2 !== 0) ? 'timeline-inverted' : 'timeline'}>
        <div class="timeline-badge">
          <a><i class="fa fa-circle" id=""></i></a>
        </div>
        <div class="timeline-panel">
            <div class="timeline-heading">
                <h4>${activityName.value}</h4>
            </div>
            <div class="timeline-body">
                <p>${beginningTime.value} - ${endingTime.value}: ${activityName.value} at ${activityLocation.value}</p>
                <p>This activity will take you ${activityDuration()} hour(s)</p>
  
            </div>
            <div class="timeline-footer">
                <p class="text-right">May-8-2019</p>
            </div>
      </div>
    </li>
  `
  timelineDiv.append(timelineList)

  
})

// Add activity on click 
addActivityBtn.addEventListener('click', (e) => {
  // prevent page to refresh
  e.preventDefault()
  // add activity to summary
  const activityList = document.createElement('ul')
  activityList.className = "list-group"

  activityList.innerHTML = `
    <li class="list-group-item">${beginningTime.value} - ${endingTime.value}: ${activityName.value} - Where? ${activityLocation.value} - Duration? ${activityDuration()} hour(s)<input type="button" class="btn orange" value="Delete" id='delete-btn' style="float: right;"></li>
  
  `
  // delete activity
  const deleteBtn = activityList.querySelector('#delete-btn')
  deleteBtn.addEventListener('click', () => {
    activityList.remove()
  })

  summaryDiv.append(activityList)
  reset() 

})

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

  // server 

  const getUserData = (user) => {
    fetch(`http://localhost:3000/users/${user.id}`)
      .then(resp => resp.json())
  }

  getUserData(user) 

