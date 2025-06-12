let html5QrCode;

function startScanner() {
  document.getElementById('reader').style.display = 'block';
  document.getElementById('stopBtn').style.display = 'inline';

  html5QrCode = new Html5Qrcode("reader");
  Html5Qrcode.getCameras().then(devices => {
    const cameraId = devices[2]?.id || devices[0].id;
    html5QrCode.start(
      cameraId,
      { fps: 10, qrbox: { width: 400, height: 100 } },
      qrCodeMessage => {
        document.getElementById('transfer').value = qrCodeMessage;
        stopScanner();
      }
    );
  });
}

function stopScanner() {
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      document.getElementById('reader').style.display = 'none';
      document.getElementById('stopBtn').style.display = 'none';
    });
  }
}

function addEntry() {
  const from = document.getElementById("storeFrom").value;
  const to = document.getElementById("storeTo").value;
  const dept = document.getElementById("department").value;
  const transfer = document.getElementById("transfer").value;
  const date = document.getElementById("date").value;
  const packages = document.getElementById("packages").value;

  const row = [from, to, dept, transfer, date, packages];

  let data = JSON.parse(localStorage.getItem("transferData") || "[]");
  data.push(row);
  localStorage.setItem("transferData", JSON.stringify(data));

  document.getElementById("department").value = "";
  document.getElementById("transfer").value = "";
  document.getElementById("packages").value = "";
}

function saveData() {
  const stored = JSON.parse(localStorage.getItem("transferData") || "[]");
  if (stored.length === 0) return alert("No hay datos para guardar");
  const header = ["From","To","Dept","Transfer","Date","Packages"];
  const rows = [header, ...stored];
  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "transfer_data.csv";
  link.click();
}

window.onload = () => {
  const stores = ["dublin", "cork", "limerick", "dundrum"];
  const fromSel = document.getElementById("storeFrom");
  const toSel = document.getElementById("storeTo");
  stores.forEach(s => {
    fromSel.innerHTML += `<option value="${s}">${s}</option>`;
    toSel.innerHTML += `<option value="${s}">${s}</option>`;
  });
};
