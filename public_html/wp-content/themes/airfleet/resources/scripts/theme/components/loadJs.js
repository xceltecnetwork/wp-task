export default function loadJs(url) {
  return new Promise((resolve, reject) => {
    const element = document.createElement('script');

    element.src = url;
    element.async = true;
    element.onload = () => resolve(url);
    element.onerror = () => reject(url);

    document.body.appendChild(element);
  });
}
