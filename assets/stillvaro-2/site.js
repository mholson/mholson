/* Native playback only after the visitor chooses to open the preview. */
(() => {
  const dialog = document.getElementById('watch-preview-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const video = dialog.querySelector('video');
  document.querySelectorAll('[data-watch-preview]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      dialog.showModal();
      const playback = video.play();
      if (playback) playback.catch(() => { /* Native controls remain available. */ });
    });
  });
  dialog.addEventListener('close', () => video.pause());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
