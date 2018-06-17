var DwnEnbl;
var DwnBmVi;
var DwnCount;
var DwnCountVal;
var DEBUG;
chrome.storage.sync.get([
	'DwnEnbl',
    'DwnBmVi',
    'DwnCount',
    'DwnCountVal',
    'debug'], function(result) {
          DwnEnbl = result.DwnEnbl;
          DwnBmVi = result.DwnBmVi;
          DwnCount = result.DwnCount;
          DwnCountVal = result.DwnCountVal;
          DEBUG = result.debug;

          if(!DEBUG){
          	console.log = function() {}
          }
          
if(DwnEnbl){
console.log("osu!koko: Log on");
if (isLoggedIn()) {
	console.log("osu!koko: account is logged in");
	var url = window.location.href;
console.log("osu!koko: URL: "+url);
if(url.substring(0,31)=="https://osu.ppy.sh/beatmapsets/"){
	console.log("osu!koko: True event, url match with https://osu.ppy.sh/beatmapsets/");
	console.log("osu!koko: Checking if its a beatmap...");
	var beatidf = url.substring(31);
	var beatid = beatidf.charAt(0);
	for (var i = 1; ((beatidf.charAt(i) != "/") && (beatidf.charAt(i) != "#")); i++) {
		beatid = beatid + beatidf.charAt(i);

		}
		console.log("osu!koko: ID: "+beatid);

	if(isInt(beatid)){
		console.log("osu!koko: Its a beatmap!");
		if(DwnBmVi){
			window.open("https://osu.ppy.sh/beatmapsets/"+beatid+"/download");
			console.log("osu!koko: Download start with video, according to the user configuration");
		}else{
			window.open("https://osu.ppy.sh/beatmapsets/"+beatid+"/download?noVideo=1");
			console.log("osu!koko: Download start without video, according to the user configuration");
		}
		if(DwnCount){
			DwnCountVal = DwnCountVal+ 1;
	chrome.storage.sync.set({
    DwnCountVal: DwnCountVal
  }, function() {
  	console.log("osu!koko: Download count increment to "+DwnCountVal);

  });
		}
		
		
		
	}else{
		console.log("osu!koko: Is not a beatmap. Nothing to do here.");
		console.log("osu!koko: Bye bye.");
	}
}else{
	console.log("osu!koko: False event, url dont match with https://osu.ppy.sh/ Nothing to do here.");
	console.log("osu!koko: Bye bye.")
}
}else{
	console.log("osu!koko: account is not logged in");
}

}else{
	console.log("osu!koko: Downloads disabled, according to the user configuration")
}



});



function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}
function isLoggedIn(){
	var arr = document.getElementsByClassName("btn-osu-big btn-osu-big--beatmapset-header js-beatmapset-download-link");
	if(arr.length > 0){
		return true;
	}else{
		return false;
	}
}

