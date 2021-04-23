'use strict';

// enable links
window.addEventListener('click', function (e) {
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href })
  }
});


//get version
document.getElementById('ver').textContent = "v" + chrome.runtime.getManifest().version;

// options

// Saves options to chrome.storage
function save_options() {
  console.log('fired')
  let DwnEnbl = document.getElementById('DwnEnbl').checked;
  let DwnBmVi = document.getElementById('DwnBmVi').checked;
  let CloseTab = document.getElementById('CloseTab').checked;
  let debug = document.getElementById('debug').checked;

  chrome.storage.sync.set({
    DwnEnbl: DwnEnbl,
    DwnBmVi: DwnBmVi,
    CloseTab: CloseTab,
    debug: debug
  }, function () { });
}

// Restores checkboxs state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    DwnEnbl: true,
    DwnBmVi: false,
    CloseTab: true,
    debug: false
  }, function (items) {
    document.getElementById('DwnEnbl').checked = items.DwnEnbl;
    document.getElementById('DwnBmVi').checked = items.DwnBmVi;
    document.getElementById('CloseTab').checked = items.CloseTab;
    document.getElementById('debug').checked = items.debug;
  });
}

//show tip 1
function spoiler() {
  if (document.getElementById('spoiler').style.display == 'none') {
    document.getElementById('spoiler').style.display = '';
    document.getElementById('dospoiler').innerHTML = 'Hide';
  } else {
    document.getElementById('spoiler').style.display = 'none'
    document.getElementById('dospoiler').innerHTML = 'Show';
  }
}
//show tip 2
function spoiler2() {
  if (document.getElementById('spoiler2').style.display == 'none') {
    document.getElementById('spoiler2').style.display = '';
    document.getElementById('dospoiler2').innerHTML = 'Hide';
  } else {
    document.getElementById('spoiler2').style.display = 'none'
    document.getElementById('dospoiler2').innerHTML = 'Show';
  }
}

//eventListeners
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('DwnEnbl').addEventListener('input',
  save_options);
document.getElementById('DwnBmVi').addEventListener('input',
  save_options);
document.getElementById('CloseTab').addEventListener('input',
  save_options);
document.getElementById('debug').addEventListener('input',
  save_options);
document.getElementById('dospoiler').addEventListener('click',
  spoiler);
document.getElementById('dospoiler2').addEventListener('click',
  spoiler2);



