/**
 * 
 * Content Script
 * 
 */
var DwnEnbl = null;
var DwnBmVi = null;
var DwnCount = null;
var DwnCountVal = null;
var DEBUG = null;
var oldStyle = null;
var dlLink = null;

//Get user config
chrome.storage.sync.get({
	DwnEnbl: true,
	DwnBmVi: false,
	DwnCount: true,
	DwnCountVal: 0,
	debug: false
}, function (result) {
	DwnEnbl = result.DwnEnbl;
	DwnBmVi = result.DwnBmVi;
	DwnCount = result.DwnCount;
	DwnCountVal = result.DwnCountVal;
	DEBUG = result.debug;

	//Enable/disable console logs
	if (!DEBUG) {
		console.log = function () { }
	}
	//If Enable download option is checked
	if (DwnEnbl) {
		download_process: {
			log("Logs enabled!");
			oldStyle = isOldStyle();
			if (isIndexBeatmapPage(oldStyle)) {
				log("Is index page. Download process break");
				break download_process;
			}
			//If user is logged in
			if (isLoggedIn(oldStyle)) {
				log("Account is logged in");
				//Compare site style
				if (oldStyle) {
					//Old site event
					log("Style: old style");
					//Get href attribute of download button by class
					dlLink = document.getElementsByClassName("beatmap_download_link")[0].href;
					//If Download with video option is enabled
					if (DwnBmVi) {
						window.open(dlLink);
						log("Download start with video, according to the user configuration");
						log("Download link: " + dlLink);
					} else {
						window.open(dlLink + "n");
						log("Download start without video, according to the user configuration");
						//if Download with video option es disabled, "n" are appended in the link
						log("Download link: " + dlLink + "n");
					}
				} else {
					//New site event
					log("Style: new style");
					//Get href attribute of download button by class
					dlLink = document.getElementsByClassName("btn-osu-big btn-osu-big--beatmapset-header js-beatmapset-download-link")[0].href;
					if (DwnBmVi) {
						window.open(dlLink);
						log("Download start with video, according to the user configuration");
						log("Download link: " + dlLink);
					} else {
						window.open(dlLink + "?noVideo=1");
						log("Download start without video, according to the user configuration");
						//if Download with video option es disabled, "?noVideo=1" are appended in the link
						log("Download link: " + dlLink + "?noVideo=1");
					}
				}
				//Downloads counter function
				increaseDowloadCounter(DwnCount);

			} else {
				log("Account is not logged in");
				launchModal("Automatic download can't start because user isn't logged in :(<br>Press F5 when you have logged in");
			}

		}


	} else {
		log("Downloads disabled, according to the user configuration")
	}
});
/**
 * 
 * Functions
 * 
 */

//Check if user is logged in
function isLoggedIn(oldStyle) {
	if (oldStyle) {
		if (document.getElementsByClassName("mini-avatar").length > 0) {
			return true;
		} else {
			return false;
		}

	} else {
		if (document.getElementsByClassName("notification-icon__count").length > 0) {
			return true;
		} else {
			return false;
		}
	}

}

//check if is a beatmap page or beatmap index page
function isIndexBeatmapPage(oldsite) {
	if((oldsite == false) && (document.getElementsByClassName("osu-page osu-page--beatmapsets-search-header").length > 0)){
		return true;
	}else{
		return false;
	}
	
}
//Check the user site type
function isOldStyle() {
	//Only the old site has that class
	if (document.getElementsByClassName("mainbody").length > 0) {
		return true;
	} else {
		return false;
	}
}

function increaseDowloadCounter(isEnabled) {
	if (isEnabled) {
		DwnCountVal = DwnCountVal + 1;
		chrome.storage.sync.set({
			DwnCountVal: DwnCountVal
		}, function () {
			log("Download count increment to " + DwnCountVal);
		});
	}

}
//console log
function log(message) {
	console.log("osu! koko: " + message);
}

//error modal
function launchModal(message) {
	log("Modal running");
	div = document.createElement('div');
	document.body.appendChild(div);
	div.innerHTML = '<div id="myModal" class="modal">' +
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<h2>Koko-chan:</h2>' +
		'</div>' +
		'<div class="modal-body">' +
		'<p>' + message + '</p>' +
		'</div>' +
		'</div>' +
		'</div>';
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}
