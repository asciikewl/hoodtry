// JavaScript Document
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);



// PhoneGap is ready
function onDeviceReady() {
    getLocation();
    listCommunities();
    navigator.splashscreen.hide();
}


function getLocation() {
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
}
  
//=======================Say Hello (Page 1) Operations=======================//
function sayHello() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');
    
    sayHelloTextElem.innerHTML = 'Hello you bad ass, ' + inputText.value + '!';
    sayHelloTextElem.style.display = 'block';
    sayHelloInputElem.style.display = 'none';
}

function sayHelloReset() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');
    
    inputText.value = '';
    sayHelloTextElem.style.display = 'none';
    sayHelloInputElem.style.display = 'block';
}

//=======================Geolocation Operations=======================//
// onGeolocationSuccess Geolocation

//adw: global variable for last position, until we know how to do it better
var hoodeye_last_position;
function onGeolocationSuccess(position) {
    hoodeye_last_position = position;
    
    $("#event_latitude").val(hoodeye_last_position.coords.latitude);
    $("#event_longitude").val(hoodeye_last_position.coords.longitude);
    
    // Use Google API to get the location data for the current coordinates
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({ "latLng": latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if ((results.length > 1) && results[1]) {
                $("#myLocation").html(results[1].formatted_address);
            }
        }
    });
    
    // Use Google API to get a map of the current location
    // http://maps.googleapis.com/maps/api/staticmap?size=280x300&maptype=hybrid&zoom=16&markers=size:mid%7Ccolor:red%7C42.375022,-71.273729&sensor=true
    var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x200&maptype=street&zoom=16&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng;
    var mapImg = '<img src="' + googleApis_map_Url + '" />';
    $("#map_canvas").html(mapImg);
}

// onGeolocationError Callback receives a PositionError object
function onGeolocationError(error) {
    $("#myLocation").html("<span class='err'>" + error.message + "</span>");
}
//=======================Get Community from hoodeye=======================//

function listCommunities() {
    var mydevice =  device.uuid;
    var lat = hoodeye_last_position.coords.latitude;
    var long = hoodeye_last_position.coords.longitude;
    

    $.get('http://dev.hoodeye.com:4242/api/community?device='+mydevice+'&lat='+lat+'&long='+long, function(data) {
        
      var items = [];
      var options;
      $.each(data, function(key, community) { 
         items.push(community.name);
          options += '<option value="'+community._id+'">'+community.name+'</option>';
     });
     $("#community_index").html(items.join('<br/>'));
     $("#event_community").html(options);

    });
}

/////AL -testing and learning: working with the js and modifying subpage       
function testlist()
{
var txt1="<p>added</p>";              // Create text with HTML
var txt2=$("<p></p>").text("Text.");  // Create text with jQuery
var txt3=document.createElement("p");
txt3.innerHTML="Text.";               // Create text with DOM
$("#inputlistV").append(txt1,txt2,txt3);        // Append new elements
}

function persontypes()
{
var txt1="<option>new person</option>";              // Create text with HTML
var txt2=$("<option ></option>").text("Person2");  // Create text with jQuery
var txt3=document.createElement("option");
txt3.innerHTML="person 3";               // Create text with DOM
$("#persontype").append(txt1,txt2,txt3);        // Append new elements
   
}



function listCommunities1() {

  

    $.get('http://dev.hoodeye.com:4242/api/community', function(data) {
        
      var items = [];
      var options;
      $.each(data, function(key, community) { 
         items.push(community.name);
          options += '<option value="'+community._id+'">'+community.name+'</option>';
     });
     $("#comoptions").html(items.join('<br/>'));
     

    });
}





