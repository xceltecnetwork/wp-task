export default function loadCss(url) {
  return new Promise((resolve, reject) => {
    const element = document.createElement('link');

    element.href = url;
    element.type = 'text/css';
    element.rel = 'stylesheet';
    element.onload = () => resolve(url);
    element.onerror = () => reject(url);

    document.head.appendChild(element);
  });
}
