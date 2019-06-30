//links works lul
window.addEventListener('click', function (e) {
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href })
  }
});
// Saves options to chrome.storage
function save_options() {
  save: {

    var DwnEnbl = document.getElementById('DwnEnbl').checked;
    var DwnBmVi = document.getElementById('DwnBmVi').checked;
    var DwnCount = document.getElementById('DwnCount').checked;
    var debug = document.getElementById('debug').checked;
    var pptc = document.getElementById('pptc').checked;
    var pptu = document.getElementById('pptu').value;
    var shwame = document.getElementById('shwame').checked;

    if (pptc == true && pptu == "") {
      document.getElementById('pptu').classList.toggle("is-invalid");
      break save;
    } else {
      whitebg();
    }

    chrome.storage.sync.set({
      DwnEnbl: DwnEnbl,
      DwnBmVi: DwnBmVi,
      DwnCount: DwnCount,
      debug: debug,
      pptc: false, // pptc,
      pptu: pptu,
      shwame: shwame
    }, function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved';
      setTimeout(function () {
        status.textContent = '';
      }, 1750);
    });
  }
}

// Restores checkboxs state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    DwnEnbl: true,
    DwnBmVi: false,
    DwnCount: true,
    DwnCountVal: 0,
    debug: false,
    pptc: false,
    pptu: "",
    shwame: true
  }, function (items) {
    document.getElementById('DwnEnbl').checked = items.DwnEnbl;
    document.getElementById('DwnBmVi').checked = items.DwnBmVi;
    document.getElementById('DwnCount').checked = items.DwnCount;
    document.getElementById('DwnCountVal').textContent = "(" + items.DwnCountVal + ")";
    document.getElementById('debug').checked = items.debug;
    document.getElementById('pptc').checked = false; // items.pptc;
    document.getElementById('pptu').value = items.pptu;
    document.getElementById('shwame').checked = items.shwame;
  });


}
//reset download counter val
function reset() {
  chrome.storage.sync.set({
    DwnCountVal: 0
  }, function () {
    var status = document.getElementById('resetstatus');
    status.textContent = 'Reseted!';
    var dCounter = document.getElementById('DwnCountVal');
    dCounter.textContent = '(0)';
    setTimeout(function () {
      status.textContent = '';
    }, 1750);
  });
}
//show tip 1
function spoiler() {
  if (document.getElementById('spoiler').style.display == 'none') {
    document.getElementById('spoiler').style.display = '';
    document.getElementById('dospoiler').innerHTML = 'Hide';
  } else {
    document.getElementById('spoiler').style.display = 'none'
    document.getElementById('dospoiler').innerHTML = 'Show how';
  }
}
//show tip 2
function spoiler2() {
  if (document.getElementById('spoiler2').style.display == 'none') {
    document.getElementById('spoiler2').style.display = '';
    document.getElementById('dospoiler2').innerHTML = 'Hide';
  } else {
    document.getElementById('spoiler2').style.display = 'none'
    document.getElementById('dospoiler2').innerHTML = 'Show how';
  }
}
//white bg
function whitebg() {
  document.getElementById('pptu').classList.remove("is-invalid");

}

//eventListeners
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);
document.getElementById('reset').addEventListener('click',
  reset);
document.getElementById('dospoiler').addEventListener('click',
  spoiler);
document.getElementById('dospoiler2').addEventListener('click',
  spoiler2);
document.getElementById('pptu').addEventListener('click',
  whitebg);


