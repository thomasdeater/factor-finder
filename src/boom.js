import confetti from 'canvas-confetti';

export function boom() {
  confetti.create(document.getElementById('canvas'), {
    resize: true,
    useWorker: true,
  })({ particleCount: 800, spread: 400 });
}