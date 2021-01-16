/**
 * 
 * Content Script
 * File from osu! koko extension
 * 
 */
function main() {
	//config vars
	var config = {
		download_enabled: null,
		download_video: null,
		download_count: null,
		download_count_val: null,
		DEBUG: null
	};

	var dlLink = null;
	var isOldStyleValue = null;

	//Get user config
	chrome.storage.sync.get({
		DwnEnbl: true,
		DwnBmVi: false,
		DwnCount: true,
		DwnCountVal: 0,
		debug: false
	}, async function (result) {
		config.download_enabled = result.DwnEnbl;
		config.download_video = result.DwnBmVi;
		config.download_count = result.DwnCount;
		config.download_count_val = result.DwnCountVal;
		config.DEBUG = result.debug;

		//Enable/disable console logs
		if (!config.DEBUG) {
			console.log = function () { }
		}
		//If Enable download option is checked
		if (config.download_enabled) {
			download_process: {
				log("Logs enabled!");
				isOldStyleValue = isOldStyle();
				if (isIndexBeatmapPage(isOldStyleValue)) {
					log("Is index page. Download process break");
					break download_process;
				}
				//If user is logged in
				if (isLoggedIn(isOldStyleValue)) {
					log("Account is logged in");
					//Compare site style
					if (isOldStyleValue) {
						//Old site event
						log("Style: old style");
						//Get href attribute of download button by class
						dlLink = document.getElementsByClassName("beatmap_download_link")[0].href;
						//If Download with video option is enabled
						if (config.download_video) {
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
						while (true) {
							el = document.getElementsByClassName("btn-osu-big btn-osu-big--beatmapset-header js-beatmapset-download-link");
							log("Checkeing if url is ready...");
							if (el[0] && el[0].href) {
								break;
							}
							await sleep(10);
						}
						log(document.getElementsByClassName("btn-osu-big btn-osu-big--beatmapset-header js-beatmapset-download-link")[0].href)
						//Get href attribute of download button by class
						dlLink = document.getElementsByClassName("btn-osu-big btn-osu-big--beatmapset-header js-beatmapset-download-link")[0].href;
						if (config.download_video) {
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
					increaseDowloadCounter(config.download_count);

				} else {
					log("Account is not logged in");
					launchModal("User is not logged in! <br> You need to be logged in to download beatmaps.");
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
	let isLoggedIn = function (oldStyle) {
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
	let isIndexBeatmapPage = function (oldsite) {
		if ((oldsite == false) && (document.getElementsByClassName("osu-page osu-page--beatmapsets-search-header").length > 0)) {
			return true;
		} else {
			return false;
		}

	}
	//Check the user site type
	let isOldStyle = function () {
		//Only the old site has that class
		if (document.getElementsByClassName("mainbody").length > 0) {
			return true;
		} else {
			return false;
		}
	}

	let = increaseDowloadCounter = function (isEnabled) {
		if (isEnabled) {
			config.download_count_val = config.download_count_val + 1;
			chrome.storage.sync.set({
				DwnCountVal: config.download_count_val
			}, function () {
				log("Download count increment to " + config.download_count_val);
			});
		}

	}
	//console log
	let log = function (message) {
		console.log("osu! koko: " + message);
	}

	//modal
	let launchModal = function (message) {
		log("Modal running");
		div = document.createElement('div');
		document.body.appendChild(div);
		div.innerHTML = '<div id="myModal" class="modal">' +
			'<div class="modal-content">' +
			'<div class="modal-header">' +
			'<h2>osu! koko extension:</h2>' +
			'</div>' +
			'<div class="modal-body">' +
			'<p style="color: #121415;">' + message + '</p>' +
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

	let sleep = function (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
main();
