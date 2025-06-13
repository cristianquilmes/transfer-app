// script.js
import { db, ref, push } from "./firebase-config.js";

const form = document.getElementById("transferForm");
const transferInput = document.getElementById("transferNo");
const scanBtn = document.getElementById("scanBtn");
const manualBtn = document.getElementById("manualBtn");
const addBtn = document.getElementById("addBtn");

const readerBox = document.getElementById("readerBox");

scanBtn.addEventListener("click", async () => {
  readerBox.innerHTML = "";
  const html5QrCode = new Html5Qrcode("readerBox");
  const devices = await Html5Qrcode.getCameras();

  if (devices.length > 1) {
    await html5QrCode.start(
      devices[1].id,
      { fps: 10, qrbox: { width: 400, height: 100 } },
      (decodedText) => {
        transferInput.value = decodedText;
        html5QrCode.stop();
        readerBox.innerHTML = "";
      }
    );
  } else {
    alert("No se encontró la cámara trasera.");
  }
});

manualBtn.addEventListener("click", () => {
  transferInput.removeAttribute("readonly");
  transferInput.focus();
});

addBtn.addEventListener("click", () => {
  const data = {
    from: document.getElementById("storeFrom").value,
    to: document.getElementById("storeTo").value,
    dept: document.getElementById("department").value,
    transfer: transferInput.value,
    date: document.getElementById("date").value,
    packages: document.getElementById("packages").value,
  };

  if (Object.values(data).some(v => v === "")) {
    alert("Por favor complete todos los campos.");
    return;
  }

  push(ref(db, "transfers"), data);

  form.reset();
  transferInput.setAttribute("readonly", true);
});
