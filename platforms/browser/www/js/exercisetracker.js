// use when testing phone gap as will not get fired in browser
document.addEventListener("deviceready", function () {
    console.log('device ready');
    setup();

});

// use when in browser - remember to comment out whn uploading to build as both will fire!
$(document).ready(function () {
    console.log('ready');
    setup();

$("#selColour").change(function(){alert("The text has been changed.");

var background_colour = $("#selColour").val();
localStorage.setItem("Colour", background_colour);
$("body").css("background-color", background_colour);

})
});

function setup() {

// check to see if we are online and sort accordingly!
    if (window.navigator.offLine) {
        //jquery find the the buttin by id and chnage text. geo location does not require internet but google maps does.
        $("#home_network_button").text('No Internet Access')
            .attr("data-icon", "delete")
            .button('refresh');
    } else {
        console.log('online');
    }
}
var track_id = ''; // Name/ID of the exercise
var watch_id = null; // ID of the geolocation
var tracking_data = []; // Array containing GPS position objects

// add inside set up function
$("#startTracking_start").on('click', function() {
console.log('start tracking');
// Start tracking the User
watch_id = navigator.geolocation.watchPosition()                                                                               // Success                                                                               function(position) {                                                                               tracking_data.push(position);                                                                               console.log(position, JSON.stringify(tracking_data));                                                                               },                                                                                // Error                                                                               function(error) {                                                                               console.log(error);                                                                               },                                                                               // Settings                                                                               {                                                                               enableHighAccuracy: true,                                                                              timeout: 5000                                                                              });
// Tidy up the UI
track_id = $("#track_id").val();
$("#track_id").hide();
$("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");});
$("#startTracking_stop").on('click', function() {
// Stop tracking the user                                 navigator.geolocation.clearWatch(watch_id);
//log in the browser any co ords to test
console.log('stop tracking', tracking_data, tracking_data.length, JSON.stringify(tracking_data));
// Save the tracking data
//if no name has been entered and start trackinhg clicked use an id of 'NO NAME'
if (track_id == '') {
track_id = 'No Name' + DATE()
}
window.localStorage.setItem(track_id, JSON.stringify(tracking_data));                                                             // Reset watch_id and tracking_data
watch_id = null;
tracking_data = null;
console.log('removed');
$("#track_id").val("").show();
$("#startTracking_status").html("Stopped tracking workout: <strong>" + track_id + "</strong>");
});
