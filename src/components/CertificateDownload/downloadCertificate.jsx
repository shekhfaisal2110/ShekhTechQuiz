import html2canvas from "html2canvas";

/**
 * Downloads a DOM element as a PNG image.
 * @param {string|HTMLElement} elementOrId - The element ID or DOM node to capture.
 * @param {string} fileName - The name of the PNG file to save.
 */
export default async function downloadCertificateAsPNG(elementOrId, fileName = "certificate.png") {
  let element = typeof elementOrId === "string"
    ? document.getElementById(elementOrId)
    : elementOrId;

  if (!element) {
    alert("Certificate element not found!");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false
  });

  const imgData = canvas.toDataURL("image/png");

  // Create a temporary link element to trigger the download
  const link = document.createElement("a");
  link.href = imgData;
  link.download = fileName;
  link.click();
}
