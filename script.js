let html5QrCode;
const storeFrom = document.getElementById("storeFrom");
const storeTo = document.getElementById("storeTo");
const department = document.getElementById("department");
const transfer = document.getElementById("transfer");
const date = document.getElementById("date");
const packages = document.getElementById("packages");
const readerDiv = document.getElementById("reader");
const stopBtn = document.getElementById("stopBtn");

const storeList = ["dublin", "cork", "dundrum", "limerick"];
storeList.forEach(store => {
  const opt1 = document.createElement("option");
  opt1.value = opt1.textContent = store;
  storeFrom.appendChild(opt1);

  const opt2 = document.createElement("option");
  opt2.value = opt2.textContent = store;
  storeTo.appendChild(opt2);
});

date.valueAsDate = new Date();

function startScanner() {
  readerDiv.style.display = "block";
  stopBtn.style.display = "inline";
  html5QrCode = new Html5Qrcode("reader");
  Html5Qrcode.getCameras().then(devices => {
    const cameraId = devices[2] ? devices[2].id : devices[0].id;
    html5QrCode.start(
      cameraId,
      { fps: 10, qrbox: { width: 400, height: 100 }, formatsToSupport: [ Html5QrcodeSupportedFormats.CODE_128 ] },
      code => {
        transfer.value = code;
        stopScanner();
      }
    );
  });
}

function stopScanner() {
  html5QrCode.stop().then(() => {
    readerDiv.style.display = "none";
    stopBtn.style.display = "none";
  });
}

function getData() {
  return {
    from: storeFrom.value,
    to: storeTo.value,
    dept: department.value,
    transfer: transfer.value,
    date: date.value,
    packages: packages.value
  };
}

function addEntry() {
  const entry = getData();
  const db = firebase.database();
  const newRef = db.ref("transfers").push();
  newRef.set(entry);
  department.value = "";
  transfer.value = "";
  packages.value = "";
}

function saveData() {
  // Firebase guarda automáticamente, no es necesario hacer nada extra aquí
  alert("Data already saved to Firebase. Use 'Save as CSV' in loaded.html.");
}

// Firebase Config se incluye aparte en firebase-config.js
