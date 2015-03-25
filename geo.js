
	var x = document.getElementById("demo");

	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition, showError);
	}

	function showPosition(position) {
	    var latlon = position.coords.latitude + "," + position.coords.longitude;

	    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
	    +latlon+"&zoom=14&size=400x300&sensor=false";
	    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
	}

	function showError(error) {
	    switch(error.code) {
	        case error.PERMISSION_DENIED:
	            x.innerHTML = "User denied the request for Geolocation."
	            break;
	        case error.POSITION_UNAVAILABLE:
	            x.innerHTML = "Location information is unavailable."
	            break;
	        case error.TIMEOUT:
	            x.innerHTML = "The request to get user location timed out."
	            break;
	        case error.UNKNOWN_ERROR:
	            x.innerHTML = "An unknown error occurred."
	            break;
		}
	}
	function getLocation(){
		function(geolocation){
		 
		  if (geolocation) return;
		  
		  var cache;
		  
		  geolocation = window.navigator.geolocation = {};
		  geolocation.getCurrentPosition = function(callback){
		    
		    if (cache) callback(cache);
		    
		    $.getScript('//www.google.com/jsapi',function(){
		      
		     // sometimes ClientLocation comes back null
		     if (google.loader.ClientLocation) {
		      cache = {
		        coords : {
		          "latitude": google.loader.ClientLocation.latitude, 
		          "longitude": google.loader.ClientLocation.longitude
		        }
		      };
		     }
		      
		      callback(cache);
		    });
		    
		  };
		  
		  geolocation.watchPosition = geolocation.getCurrentPosition;
		 
		})(navigator.geolocation);
		 
		 
		 
		// usage
		navigator.geolocation.watchPosition(function(pos){
		  console.log("I'm located at ",pos.coords.latitude,' and ',pos.coords.longitude);
		});
	}
}
