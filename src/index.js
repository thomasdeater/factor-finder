import App from "./App.svelte";

let app = new App({
  target: document.body,
});

export default app;

let loader = document.querySelector('.loader');

let body = document.body;

// document.addEventListener('keyup', e => {
//   if (e.key === 't') {
//     start();
//   } else if (e.key === 'd') {
//     body.classList = 'darkmode';
//   } else if (e.key === 'l') {
//     body.classList = 'lightmode';
//   }
// });

// window.start = function start() {
//   document.getElementById('app').innerHTML = '';
//   window.setTimeout(run, 100);
// }

function formatList(list) {
  list = list.map(n => n.toLocaleString())
  list = list.join(' • ');
  return list;
}

function run() {
  let f = [];
  let i = parseInt(window.prompt('Please enter an integer greater than 0'), 10);
  let ok = true;

  if (i > 1000000000) {
    ok = window.confirm('It may take a long time to find the factors for such a large number. Are you sure you want to continue?');
  }

  if (ok) {
    loader.style.display = 'block';
    window.setTimeout(() => {
      console.time('Factoring ' + i);
      f = factors(i);
      console.timeEnd('Factoring ' + i);
      loader.style.display = 'none';
      update(f, i);
    }, 10);
  }
}

function update(f, i) {
  if (!f.length) {
    // invalid number was entered (less than 1 or not a real number)
    print('<div class="main"><h1 class="error">Error!</h1><p>Please Hit The <strong class="key">T</strong> On Your Keyboard (or <a href="#" onclick="window.start();return false;">click here</a>) To Try Again!</p></div>');
  } else {
    print('<div class="main"><p>The factors of ' + i.toLocaleString() + ' are:</p><p class="factors">' + formatList(f) + '</p><p>' + (f.length < 3 ? 'This IS a prime number.' : 'This IS NOT a prime number.') + '</p><p>Hit The <strong class="key">T</strong> On Your Keyboard (or <a href="#" onclick="window.start();return false;">click here</a>) To Try Again!</p></div>');
    boom();
  }
}