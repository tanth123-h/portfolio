import { getDocument, GlobalWorkerOptions } from './public/vendor/pdfjs/pdf.mjs';
const vendor = new URL('./public/vendor/pdfjs/', import.meta.url);
GlobalWorkerOptions.workerSrc = new URL('pdf.worker.mjs', vendor).href;

export async function mountReader(root, language) {
  const thai = language === 'th';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.textContent = thai ? 'กำลังโหลดเอกสาร…' : 'Loading document…';
  root.append(status);
  const task = getDocument({ url: root.dataset.pdf,
    cMapUrl: new URL('cmaps/', vendor).href, cMapPacked: true,
    standardFontDataUrl: new URL('standard_fonts/', vendor).href,
    wasmUrl: new URL('wasm/', vendor).href });
  let documentPdf;
  const observer = new MutationObserver(() => {
    if (!root.isConnected) { task.destroy(); observer.disconnect(); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  try {
    documentPdf = await task.promise;
    if (!root.isConnected) return;
    const controls = document.createElement('div');
    controls.className = 'pdf-controls';
    const previous = document.createElement('button');
    const next = document.createElement('button');
    previous.type = next.type = 'button';
    previous.textContent = thai ? 'หน้าก่อน' : 'Previous page';
    next.textContent = thai ? 'หน้าถัดไป' : 'Next page';
    controls.append(previous, status, next);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    const text = document.createElement('p');
    text.className = 'sr-only';
    root.append(controls, canvas, text);
    let number = 1;
    async function renderPage() {
      previous.disabled = next.disabled = true;
      const page = await documentPdf.getPage(number);
      const scale = Math.min(2, devicePixelRatio || 1);
      const viewport = page.getViewport({ scale: Math.max(240, root.clientWidth) / page.getViewport({scale:1}).width * scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({canvasContext: canvas.getContext('2d'), viewport}).promise;
      const label = (thai ? 'หน้า ' : 'Page ') + number + ' / ' + documentPdf.numPages;
      status.textContent = label;
      canvas.setAttribute('aria-label', label);
      const content = await page.getTextContent();
      text.textContent = content.items.map(item => item.str || '').join(' ');
      previous.disabled = number === 1;
      next.disabled = number === documentPdf.numPages;
    }
    previous.onclick = () => { number--; renderPage().catch(failed); };
    next.onclick = () => { number++; renderPage().catch(failed); };
    await renderPage();
  } catch (error) { failed(error); }
  function failed(error) {
    if (!root.isConnected) return;
    status.textContent = thai ? 'แสดงตัวอย่างไม่ได้ กรุณาใช้ลิงก์เปิดไฟล์ด้านบน' : 'Preview unavailable. Use Open file above.';
    console.warn('PDF preview:', error.message);
  }
}
