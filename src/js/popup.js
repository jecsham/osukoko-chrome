'use strict';

//links works lul
window.addEventListener('click', function (e) {
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href })
  }
});
//update downloads count text in popup.html
chrome.storage.sync.get({
  DwnCount: true,
  DwnCountVal: 0
}, function (item) {
  if (item.DwnCount) {
    document.getElementById('DwnCountValpopup').textContent = "Total downloads: " + toNum(item.DwnCountVal);
  }

});

//get version
document.getElementById('ver').textContent = "v" + chrome.runtime.getManifest().version;


//waring message
var shwame;
chrome.storage.sync.get({
  shwame: true
}, function (item) {
  if (item.shwame)
    publicateWame();

});
function publicateWame() {
  document.getElementById('shwame').innerHTML = '<div class="alert alert-warning"><strong>You should know the following:</strong>' +
    '<ol>' +
    '<li>This is NOT an official osu! extension.</li>' +
    '<li>Keep in mind that osu! has a formidable feature to download beatmaps for those who <a href="https://osu.ppy.sh/store/listing"> buy the osu! suppoerter tag.</a></li>' +
    '</ol></div>';
}

/**
 * 
 * koko!tracker beta Algorithm
 * 
 */
var pposuplus = null;
var pposurankplus = null;
var pposucrankplus = null;
var pptaikoplus = null;
var pptaikorankplus = null;
var pptaikocrankplus = null;
var ppcatchplus = null;
var ppcatchrankplus = null;
var ppcatchcrankplus = null;
var ppmaniaplus = null;
var ppmaniarankplus = null;
var ppmaniacrankplus = null;
var pposu = null;
var pptaiko = null;
var ppcatch = null;
var ppmania = null;
var pposurank = null;
var pposucrank = null;
var pptaikorank = null;
var pptaikocrank = null;
var ppcatchrank = null;
var ppcatchcrank = null;
var ppmaniarank = null;
var ppmaniacrank = null;
var pptu = null;
var lastUpdateTable = null;
chrome.storage.sync.get({
  pptc: false,
  pptu: "",
  pposuplus: false,
  pposurankplus: false,
  pposucrankplus: false,
  pptaikoplus: false,
  pptaikorankplus: false,
  pptaikocrankplus: false,
  ppcatchplus: false,
  ppcatchrankplus: false,
  ppcatchcrankplus: false,
  ppmaniaplus: false,
  ppmaniarankplus: false,
  ppmaniacrankplus: false,
  pposu: false,
  pptaiko: false,
  ppcatch: false,
  ppmania: false,
  pposurank: false,
  pposucrank: false,
  pptaikorank: false,
  pptaikocrank: false,
  ppcatchrank: false,
  ppcatchcrank: false,
  ppmaniarank: false,
  ppmaniacrank: false,
  lastUpdateTable: 0
}, function (items) {
  pptu = items.pptu;
  if (items.pptc) {
    if (items.pposu == false && items.pptaiko == false && items.ppcatch == false && items.ppmania == false) {
      apiRequest();
    } else {
      pposuplus = items.pposuplus;
      pposurankplus = items.pposurankplus;
      pposucrankplus = items.pposucrankplus;
      pptaikoplus = items.pptaikoplus;
      pptaikorankplus = items.pptaikorankplus;
      pptaikocrankplus = items.pptaikocrankplus;
      ppcatchplus = items.ppcatchplus;
      ppcatchrankplus = items.ppcatchrankplus;
      ppcatchcrankplus = items.ppcatchcrankplus;
      ppmaniaplus = items.ppmaniaplus;
      ppmaniarankplus = items.ppmaniarankplus;
      ppmaniacrankplus = items.ppmaniacrankplus;
      pposu = items.pposu;
      pptaiko = items.pptaiko;
      ppcatch = items.ppcatch;
      ppmania = items.ppmania;
      pposurank = items.pposurank;
      pposucrank = items.pposucrank;
      pptaikorank = items.pptaikorank;
      pptaikocrank = items.pptaikocrank;
      ppcatchrank = items.ppcatchrank;
      ppcatchcrank = items.ppcatchcrank;
      ppmaniarank = items.ppmaniarank;
      ppmaniacrank = items.ppmaniacrank;
      lastUpdateTable = items.lastUpdateTable;
      publicateTable();
    }

  } else {
    document.getElementById('pptable').innerHTML = "";
  }
});
function publicateTable() {
  document.getElementById('kokooverview').innerHTML = "<a class='text-dark' href = 'https://osu.ppy.sh/users/" + pptu + "'>" + pptu + "</a>";
  document.getElementById('pptable').innerHTML = " <div class='table-responsive'><table class='table table-sm small text-center'>" +
    "<tr><th>Mode</th>" +
    "<th>pp</th>" +
    "<th>Rank (World - Country)</th>" +
    "</tr>" +
    "<tr><td>standard</td><td>" + toNum(pposu) + moreless(pposuplus) + "</td><td>" + toNum(pposurank) + moreless(pposurankplus) + "<strong> - </strong>" + toNum(pposucrank) + moreless(pposucrankplus) + "</td></tr>" +
    "<tr><td>taiko</td><td>" + toNum(pptaiko) + moreless(pptaikoplus) + "</td><td>" + toNum(pptaikorank) + moreless(pptaikorankplus) + "<strong> - </strong>" + toNum(pptaikocrank) + moreless(pptaikocrankplus) + "</td></tr>" +
    "<tr><td>catch</td><td>" + toNum(ppcatch) + moreless(ppcatchplus) + "</td><td>" + toNum(ppcatchrank) + moreless(ppcatchrankplus) + "<strong> - </strong>" + toNum(ppcatchcrank) + moreless(ppcatchcrankplus) + "</td></tr>" +
    "<tr><td>mania</td><td>" + toNum(ppmania) + moreless(ppmaniaplus) + "</td><td>" + toNum(ppmaniarank) + moreless(ppmaniarankplus) + "<strong> - </strong>" + toNum(ppmaniacrank) + moreless(ppmaniacrankplus) + "</td></tr></table></div>" +
    "<p class='text-center'><small>Last update: " + lastUpdateTablef() + "</small></p>" +
    "<p class='text-center'><button type='button' class='btn btn-sm btn-light' id='updt'>Update data</button></p>";
  document.getElementById('updt').addEventListener('click',
    updateTable);
}
function updateTable() {
  document.getElementById('pptable').innerHTML = `<div class="spinner-grow spinner-grow-sm text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow spinner-grow-sm text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow spinner-grow-sm text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div>`;
  apiRequest();
}
//Time Ago temp algorithm
function lastUpdateTablef() {
  var d = new Date();
  var actualdate = d.getTime();
  var timeago = actualdate - lastUpdateTable;
  if (timeago < 60000) {
    var secs = parseInt((timeago / 1000) % 60);
    return secs + " second(s) ago";
  } else {
    if (timeago < 3600000) {
      var mins = parseInt((timeago / (1000 * 60)) % 60);
      return mins + " minute(s) ago";
    } else {
      if (timeago < 86400000) {
        var hours = parseInt((timeago / (1000 * 60 * 60)) % 24);
        return hours + " hour(s) ago";
      } else {
        var days = parseInt(timeago / (1000 * 60 * 60 * 24));
        return days + " day(s) ago";
      }
    }
  }
}

function moreless(num) {
  if (num > 0) {
    return "(<i class='text-success'>+" + toNum(num) + "</i>)";
  } else {
    if (num < 0) {
      return "(<i class='text-danger'>" + toNum(num) + "</i>)";
    } else {
      return "";
    }
  }

}
function toNum(num) {
  num = parseFloat(num).toFixed(2);
  return Number(num).toLocaleString('en');
}
/**
 * 
 * API Request to https://osu-koko.herokuapp.com/
 * 
 * 
 */
function apiRequest() {
  var xhr = new XMLHttpRequest();
  var d = new Date();
  var t = d.getTime();
  xhr.onload = function () {
    var json = xhr.responseText;                        // Response
    json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
    json = JSON.parse(json);                            // Parse JSON
    pposuplus = (json['pp0'] - pposu);
    pposurankplus = (pposurank - json['pprank0']);
    pposucrankplus = (pposucrank - json['ppcrank0']);
    pptaikoplus = (json['pp1'] - pptaiko);
    pptaikorankplus = (pptaikorank - json['pprank1']);
    pptaikocrankplus = (pptaikocrank - json['ppcrank1']);
    ppcatchplus = (json['pp2'] - ppcatch);
    ppcatchrankplus = (ppcatchrank - json['pprank2']);
    ppcatchcrankplus = (ppcatchcrank - json['ppcrank2']);
    ppmaniaplus = (json['pp3'] - ppmania);
    ppmaniarankplus = (ppmaniarank - json['pprank3']);
    ppmaniacrankplus = (ppmaniacrank - json['ppcrank3']);
    pposu = json['pp0'];
    pptaiko = json['pp1'];
    ppcatch = json['pp2'];
    ppmania = json['pp3'];
    pposurank = json['pprank0'];
    pposucrank = json['ppcrank0'];
    pptaikorank = json['pprank1'];
    pptaikocrank = json['ppcrank1'];
    ppcatchrank = json['pprank2'];
    ppcatchcrank = json['ppcrank2'];
    ppmaniarank = json['pprank3'];
    ppmaniacrank = json['ppcrank3'];
    lastUpdateTable = t;
    chrome.storage.sync.set({
      pposuplus: pposuplus,
      pposurankplus: pposurankplus,
      pposucrankplus: pposucrankplus,
      pptaikoplus: pptaikoplus,
      pptaikorankplus: pptaikorankplus,
      pptaikocrankplus: pptaikocrankplus,
      ppcatchplus: ppcatchplus,
      ppcatchrankplus: ppcatchrankplus,
      ppcatchcrankplus: ppcatchcrankplus,
      ppmaniaplus: ppmaniaplus,
      ppmaniarankplus: ppmaniarankplus,
      ppmaniacrankplus: ppmaniacrankplus,
      pposu: pposu,
      pptaiko: pptaiko,
      ppcatch: ppcatch,
      ppmania: ppmania,
      pposurank: pposurank,
      pposucrank: pposucrank,
      pptaikorank: pptaikorank,
      pptaikocrank: pptaikocrank,
      ppcatchrank: ppcatchrank,
      ppcatchcrank: ppcatchcrank,
      ppmaniarank: ppmaniarank,
      ppmaniacrank: ppmaniacrank,
      lastUpdateTable: t
    }, function () { });
    publicateTable();
  };
  var data = pptu;
  xhr.open('GET', 'https://osukoko-api-proxy-service.jecsham.com/osuapi?u=' + encodeURIComponent(data)); //1 request per sec by ip 
  xhr.send();

}
