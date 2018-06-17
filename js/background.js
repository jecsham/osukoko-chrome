//set 0 in download counter val (first time install)
var DwnCountVal;
chrome.runtime.onInstalled.addListener(function () {
	chrome.storage.sync.get({
		DwnCountVal: 0
	}, function (item) {
		DwnCountVal = item.DwnCountVal;
		chrome.storage.sync.set({
			DwnCountVal: DwnCountVal
		}, function () { });
	});
});
