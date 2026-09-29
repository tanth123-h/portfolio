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
    previous.dataset.page = 'previous';
    next.dataset.page = 'next';
    previous.textContent = thai ? 'หน้าก่อน' : 'Previous page';
    next.textContent = thai ? 'หน้าถัดไป' : 'Next page';
    controls.append(previous, status, next);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', thai ? 'กำลังโหลดหน้าเอกสาร' : 'Document page loading');
    const text = document.createElement('p');
    text.className = 'sr-only';
    const viewportBox = document.createElement('div');
    viewportBox.className = 'pdf-scroll';
    viewportBox.setAttribute('role', 'region');
    viewportBox.tabIndex = 0;
    viewportBox.setAttribute('aria-label', thai ? 'เอกสาร เลื่อนเพื่ออ่านเมื่อขยาย' : 'Document, scroll to read when zoomed');
    viewportBox.append(canvas);
    const zoomControls = document.createElement('div');
    zoomControls.className = 'pdf-controls pdf-zoom';
    let zoom = 100;
    const zoomLabel = document.createElement('span');
    zoomLabel.setAttribute('role', 'status');
    function setZoom(value) {
      zoom = Math.max(100, Math.min(250, value));
      canvas.style.width = zoom + '%';
      zoomLabel.textContent = zoom + '%';
      zoomOut.disabled = zoom === 100;
      zoomIn.disabled = zoom === 250;
    }
    function zoomButton(action, label, handler) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.zoom = action;
      button.textContent = label;
      button.addEventListener('click', handler);
      zoomControls.append(button);
      return button;
    }
    const zoomOut = zoomButton('out', '−', () => setZoom(zoom - 25));
    zoomOut.setAttribute('aria-label', thai ? 'ย่อ' : 'Zoom out');
    const zoomIn = zoomButton('in', '+', () => setZoom(zoom + 25));
    zoomIn.setAttribute('aria-label', thai ? 'ขยาย' : 'Zoom in');
    zoomButton('fit', thai ? 'พอดีหน้าจอ' : 'Fit width', () => setZoom(100));
    const fullscreen = zoomButton('fullscreen', thai ? 'เต็มหน้าจอ' : 'Fullscreen', async () => {
      try {
        if (document.fullscreenElement === root) await document.exitFullscreen();
        else if (root.requestFullscreen) await root.requestFullscreen();
        else window.open(root.dataset.pdf, '_blank', 'noopener,noreferrer');
      } catch { status.textContent = thai ? 'ใช้ลิงก์เปิดไฟล์เพื่อดูเต็มหน้าจอ' : 'Use Open file above for a larger view.'; }
    });
    fullscreen.setAttribute('aria-label', thai ? 'สลับเต็มหน้าจอ' : 'Toggle fullscreen');
    zoomControls.append(zoomLabel);
    setZoom(100);
    root.append(controls, zoomControls, viewportBox, text);
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
    previous.onclick = () => { number--; viewportBox.scrollTo(0, 0); renderPage().catch(failed); };
    next.onclick = () => { number++; viewportBox.scrollTo(0, 0); renderPage().catch(failed); };
    await renderPage();
  } catch (error) { failed(error); }
  function failed(error) {
    if (!root.isConnected) return;
    status.textContent = thai ? 'แสดงตัวอย่างไม่ได้ กรุณาใช้ลิงก์เปิดไฟล์ด้านบน' : 'Preview unavailable. Use Open file above.';
    console.warn('PDF preview:', error.message);
  }
}
