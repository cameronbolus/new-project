import $ from 'jquery';
console.log($)
var forEach = function(arr,cb){for(var i = 0; i < arr.length; i++){ cb(arr[i], i, arr)  } }

var infoContainerEl = document.querySelector('.information-container')
// var navigationTabs = document.querySelector('.navigation div')
//     console.log(navigationTabs)


function controllerRouter (){
  var currentRoute = window.location.hash.slice(1)

  if(currentRoute === 'concerts'){
    $.getJSON('http://apis.is/concerts').then(function(serverRes){
      var htmlTemplate = createConcertsPageTemplate(serverRes.results, "Concerts")
      infoContainerEl.innerHTML = htmlTemplate
    })
  }

  if(currentRoute === 'carpools'){
    $.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
      var htmlTemplate = createCarpoolsPageTemplate(serverRes.results, "Carpools")
      infoContainerEl.innerHTML = htmlTemplate
    })
  }

  if(currentRoute === 'flights'){

      infoContainerEl.innerHTML = `
        <div class="flights padding-right">
        <h1>Flights</h1>
          <h2>Departures</h2>
          <table class='table table_departures'>
             <thead>
                <tr>
                  <th>Date</th>
                  <th>Departure Time</th>
                  <th>Destination</th>
                  <th>Airline</th>
                </tr>
              </thead>
             <tbody></tbody>
          </table>
        </div>

        <div class="flights">
          <h2>Arrivals</h2>
          <table class='table table_arrivals'>
             <thead>
                <tr>
                  <th>Date</th>
                  <th>Arrival Time</th>
                  <th>Origin</th>
                  <th>Airline</th>
                </tr>
              </thead>
             <tbody></tbody>
          </table>
        </div>
      `



    $.getJSON('http://apis.is/flight?language=en&type=departures').then(function(serverRes){
      var departureTableBody = document.querySelector('.table_departures tbody')
      var htmlRowsString = createFlightHtmlRowsDep(serverRes.results, "departures")
      departureTableBody.innerHTML = htmlRowsString
    })
    $.getJSON('http://apis.is/flight?language=en&type=arrivals').then(function(serverRes){
      var arrivalTableBody = document.querySelector('.table_arrivals tbody')
      var htmlRowsString = createFlightHtmlRowsDep(serverRes.results, "arrivals")
      arrivalTableBody.innerHTML = htmlRowsString
    })
  }
}
/////////////Concert Page Function/////////////////
function createConcertsPageTemplate(dataArray, Title){
  var bigHTMLStr = ''

  bigHTMLStr += `
  <h1 class="to-the-left">Concerts</h1>
  `
  forEach(dataArray, function(articleObj){

    bigHTMLStr += `
    <div class="concert">
        <img src="${articleObj.imageSource}">
        <h3>${articleObj.name}</h3>
        <div><mark>Venue: </mark>${articleObj.eventHallName}</div>
        <div class="to-the-right">${articleObj.dateOfShow}</div>
    </div>
    `
  })

  return `
  <div class="stories-container">
    ${bigHTMLStr}
  </div>
`
}

////////////Carpools Page Function//////////////

function createCarpoolsPageTemplate(dataArray, Title){
  var bigHTMLStr = ''

  bigHTMLStr += `
  <h1 class="to-the-left">Carpools</h1>
  <table class="table carpools">
    <tr>
      <th>Time of Departure</th>
      <th>From</th>
      <th>To</th>
    </tr>
    `

  forEach(dataArray, function(articleObj){

    bigHTMLStr += `
      <tr>
        <td>${articleObj.time}</td>
        <td>${articleObj.from}</td>
        <td>${articleObj.to}</td>
      </tr>
    `
  })

  bigHTMLStr += `</table>`
  return `
  <div class="stories-container">
    ${bigHTMLStr}
  </div>
`
}


/////////////Flights departure page function/////////////

function createFlightHtmlRowsDep(dataArray, flightType){
  var bigHTMLStrOfRows = ''

  forEach(dataArray, function(articleObj){

    bigHTMLStrOfRows += `
      <tr>
        <td>${articleObj.date}</td>
        <td>${articleObj.plannedArrival}</td>
        <td>${ flightType === 'arrivals' ? articleObj.from : articleObj.to }</td>
        <td>${articleObj.airline}</td>
      </tr>
    `
  })
  console.log(bigHTMLStrOfRows)
  return bigHTMLStrOfRows
}

////////////////Nav tab event listener//////////////
// var navTabsContainerEl = document.querySelector('.navigation')
// navTabsContainerEl.addEventListener('click', function(evt){
// 	var clickedTab = evt.target
// 	var route = clickedTab.dataset.route
// 	window.location.hash = route
// })

window.addEventListener('hashchange', controllerRouter )
controllerRouter()
