
document
.getElementById('target')
.addEventListener('change', function () {
    'use strict';
    var vis = document.querySelector('.vis'),   
    target = document.getElementById(this.value);
    if (vis !== null) {
        vis.className = 'inv';
    }
    if (target !== null ) {
        target.className = 'vis';
    }
});


// --------------------Today Date---------------------------
var d = new Date();
    
var date = d.getDate();
var month = d.getMonth() + 1; 
var year = d.getFullYear();
    
var dateStr = date + "-" + month + "-" + year;
// -------------------------------------------------------------


//-----------------------Searching for vaccine by pincode------------------------------

let pincode = document.getElementById('exampleInputPincode');
let pincodeHelp = document.getElementById('pincodeHelp');
let regex = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;


document.getElementById('pincodeSubmit').addEventListener('submit',pincodeSubmit);

function pincodeSubmit(e){
    e.preventDefault();

    if(pincode.value === ''){
        pincodeHelp.textContent = `Not entered any pin`;
        pincodeHelp.classList.remove('text-muted');
        pincodeHelp.classList.add('text-danger')
    }
    else if( !((regex.test(pincode.value))) && pincode.value.length === 6 ){
        pincodeHelp.textContent = ``;

        var url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode.value}&date=${dateStr}`;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.setRequestHeader("accept", "application/pdf");

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
        
            // console.log(xhr.status);
            // console.log(xhr.responseText);

            var results=JSON.parse(this.responseText);
            
            if(Object.keys(results.sessions).length === 0){
                console.log('No Data Found!!');
                document.querySelector('.vaccine_table').style.display = 'none';
                document.querySelector('.status_info').innerHTML = `<h3 class="text-danger">No Data Found for ${pincode.value} PIN on ${dateStr}!!</h3>`;
                //`<h3 class="text-danger">No Data Found at ${selectDistrict.value} on ${dateStr}!!</h3>`;
            }else{
                document.querySelector('.vaccine_table').style.display = 'block';
                document.querySelector('.status_info').style.display = 'none'
                var output='';
    
                for(let i=0;i<results.sessions.length;i++){
                    
                    output += `
                            <tr>
                                <th scope="row">${i}</th>
                                <td>${results.sessions[i].date}</td>
                                <td>${results.sessions[i].pincode}</td>
                                <td>${results.sessions[i].state_name}</td>
                                <td>${results.sessions[i].district_name}</td>
                                <td>${results.sessions[i].name}</td>
                                <td>${results.sessions[i].block_name}</td>
                                <td>${results.sessions[i].address}</td>
                                <td>${results.sessions[i].min_age_limit}</td>
                                <td>${results.sessions[i].vaccine}</td>
                                <td>${results.sessions[i].slots}</td>
                                <td>${results.sessions[i].fee}</td>
                                <td>${results.sessions[i].available_capacity}</td>
                            </tr>`;
                }
                document.querySelector('tbody').innerHTML=output;
            }
    
        }};

        xhr.send();
        
    }
    else{
        pincodeHelp.textContent = `Pincode must be six digits.`;
        pincodeHelp.classList.remove('text-muted');
        pincodeHelp.classList.add('text-danger');
    }


    // console.log('hello pincode',pincode.value);

}



//-----------------------------Searching for vaccine by state and district--------------------------------


let selectState = document.getElementById('inputState')
selectState.innerHTML = '';

let selectDistrict = document.getElementById('inputDistrict');
selectDistrict.innerHTML = '';

function onLoadData(){

    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
    .then(data => data.json())
    .then(data => {
        
        for(let i=0;i<data.states.length; i++){
            selectState.innerHTML += `<option value="${data.states[i].state_id}">${data.states[i].state_name}</option>`
        }
    })
    .catch(error => console.log('error', +error))

}


function onStateChange(dist_val){

    // var dist = document.getElementById('inputState');
    // var dist_val = dist.options[dist.selectedIndex].value;
    // console.log(dist_val);

    fetch(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${dist_val}`)
    .then(data => data.json())
    .then(data => {
        
        for(let i=0;i<data.districts.length; i++){
            
            selectDistrict.innerHTML += `<option value="${data.districts[i].district_id}">${data.districts[i].district_name}</option>`
        }
    })
    .catch(error => console.log('error', +error))
}




let state_district_form = document.querySelector('.state_district_form').addEventListener('submit',onStateDistrict);


function onStateDistrict(e){
    e.preventDefault();
    let dist_name = selectDistrict[selectDistrict.selectedIndex].text;

    var url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selectDistrict.value}&date=${dateStr}`;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("accept", "application/pdf");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        
        // console.log(xhr.status);
        // console.log(xhr.responseText);

        var results=JSON.parse(this.responseText);
        
        if(Object.keys(results.sessions).length === 0){
            console.log('No Data Found!!');
            document.querySelector('.vaccine_table').style.display = 'none';
            document.querySelector('.status_info').innerHTML = `<h3 class="text-danger">No Data Found for ${dist_name} District on ${dateStr}!!</h3>`;
            //`<h3 class="text-danger">No Data Found at ${selectDistrict.value} on ${dateStr}!!</h3>`;
        }else{
            document.querySelector('.vaccine_table').style.display = 'block';
            document.querySelector('.status_info').style.display = 'none'
            var output='';

            for(let i=0;i<results.sessions.length;i++){
                
                output += `
                        <tr>
                            <th scope="row">${i}</th>
                            <td>${results.sessions[i].date}</td>
                            <td>${results.sessions[i].pincode}</td>
                            <td>${results.sessions[i].state_name}</td>
                            <td>${results.sessions[i].district_name}</td>
                            <td>${results.sessions[i].name}</td>
                            <td>${results.sessions[i].block_name}</td>
                            <td>${results.sessions[i].address}</td>
                            <td>${results.sessions[i].min_age_limit}</td>
                            <td>${results.sessions[i].vaccine}</td>
                            <td>${results.sessions[i].slots}</td>
                            <td>${results.sessions[i].fee}</td>
                            <td>${results.sessions[i].available_capacity}</td>
                        </tr>`;
            }
            document.querySelector('tbody').innerHTML=output;
        }

        
    }};

    xhr.send();

    //console.log(selectState.value, selectDistrict.value);
    
}
