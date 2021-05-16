// Covid19 World Map
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: {lat:20, lng:70},
    zoom: 3
  });

    //var marker = new google.maps.Marker({position: country, map: map});
    fetch("https://corona.lmao.ninja/v2/countries")
    .then(response=>response.json())
    .then(res=>{
        res.forEach(element=>{
            // console.log(element)
            var longitude=element.countryInfo.long;
            var latitude=element.countryInfo.lat;
            var country={lat:latitude,lng:longitude};
            var marker = new google.maps.Marker({
                position: country,
                map: map,
                title:`Country: ${element.country}
                Cases: ${element.cases} | Today: ${element.todayCases} | Active: ${element.active}
                Deaths: ${element.deaths} | Today: ${element.todayDeaths}
                Recovered: ${element.recovered} | Critical: ${element.critical}`
            });

            // var infoWindow = new google.maps.InfoWindow({
            //     content:`<h3>${element.country}</h3>
            //     <p>Cases: ${element.cases} | Today: ${element.todayCases} | Active: ${element.active}</p>
            //     <p>Deaths: ${element.deaths} | Today: ${element.todayDeaths}</p>
            //     <p>Recovered: ${element.recovered} | Critical: ${element.critical}</p>`
            // });
            // marker.addListener('click',function(){
            //     infoWindow.open(map,marker);
            // });
        })
    })
}  

// function loadWorldMap(){
//     fetch("https://corona.lmao.ninja/v2/countries")
//     .then(response=>response.json())
//     .then(res=>{
//         res.forEach(element=>{
//             //console.log(element)
//             var longitude=element.countryInfo.long;
//             var latitude=element.countryInfo.lat;
//             var country={lat:latitude,lng:longitude};
//             var marker = new google.maps.Marker({
//                 position: country,
//                 map: map
//             })

//         })
//     })
// }
// loadWorldMap();


// World Covid19 statistics

function loadWorldData(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET","https://coronavirus-19-api.herokuapp.com/countries/world",true);
    xhr.onload=function(){
        if(xhr.status==200){
            var results=JSON.parse(this.responseText);
            //console.log(results); 
            document.getElementById("w-total").textContent=results.cases.toLocaleString("en-IN");
            document.getElementById("w-active").textContent=results.active.toLocaleString("en-IN");
            document.getElementById("w-critical").textContent=results.critical.toLocaleString("en-IN");
            document.getElementById("w-recover").textContent=results.recovered.toLocaleString("en-IN");
            document.getElementById("w-deaths").textContent=results.deaths.toLocaleString("en-IN");
        }
    }
    xhr.send();  
}
loadWorldData();


// India Covid19 Statistics

function loadIndiaData(){ 
  var xhr = new XMLHttpRequest();
  xhr.open("GET","https://coronavirus-19-api.herokuapp.com/countries/india",true);
  xhr.onload=function(){
      if(this.status==200){
          var results=JSON.parse(this.responseText);
          //console.log(results); 
          document.getElementById("in-total").textContent=results.cases.toLocaleString("en-IN");
          document.getElementById("in-active").textContent=results.active.toLocaleString("en-IN");
          document.getElementById("in-critical").textContent=results.critical.toLocaleString("en-IN");
          document.getElementById("in-recover").textContent=results.recovered.toLocaleString("en-IN");
          document.getElementById("in-deaths").textContent=results.deaths.toLocaleString("en-IN");
      }
  }
  xhr.send();
}
loadIndiaData();

//load Countries Data
function loadCountriesData(){
    var xhr = new XMLHttpRequest();
    //xhr.open("GET","https://coronavirus-19-api.herokuapp.com/countries",true);
    xhr.open("GET","https://corona.lmao.ninja/v2/countries",true);
    xhr.onload=function(){
        if(xhr.status==200){
            var results=JSON.parse(xhr.responseText);
            let output='';
            var c=0;
            results.forEach(data=>{
                output+=`<li class="list-group-item" id="${c}">
                <h3><img src=${data.countryInfo.flag} width="50" height="30" alt="country-img">${data.country}</h3>
                <p>Cases: ${data.cases} | Today: ${data.todayCases} | Active: ${data.active}</p>
                <p>Deaths: ${data.deaths} | Today: ${data.todayDeaths}</p>
                <p>Recovered: ${data.recovered} | Critical: ${data.critical}</p>
            </li>`;
            c++;
            })
            document.querySelector(".country-data").innerHTML=output;  
        }

    }
    xhr.send();
}
loadCountriesData();


// Seach or Filter Items
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
filter.addEventListener('keyup', filterItems);

function filterItems(e){
    var text = e.target.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');
    Array.from(items).forEach(function(item){
      var itemName = item.firstElementChild.textContent;
      if(itemName.toLowerCase().indexOf(text) != -1){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
}

