import 'animate.css';

let app = document.getElementById('app');

app.innerHTML = '';

export function print(s) {
  let frag = document.createRange().createContextualFragment(s);
  let div = frag.firstChild;
  div.classList += ' animate__animated animate__zoomInUp';
  app.appendChild(frag);
}