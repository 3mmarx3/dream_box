let activeIndex = 1;
const maxSteps = 4;

function refreshUI() {
  const fillPercentage = (activeIndex / maxSteps) * 100;
  const trackFill = document.getElementById('trackFill');
  const stepDisplay = document.getElementById('stepDisplay');
  
  if (trackFill) trackFill.style.width = fillPercentage + '%';
  if (stepDisplay) stepDisplay.textContent = activeIndex + '/' + maxSteps;
}

function moveNext() {
  const currentView = document.getElementById('step' + activeIndex);
  if (currentView) {
    currentView.classList.remove('visible');
  }

  activeIndex++;

  if (activeIndex <= maxSteps) {
    const nextView = document.getElementById('step' + activeIndex);
    if (nextView) {
      nextView.classList.add('visible');
      refreshUI();
    }
  }
}

function moveBack() {
  const overlays = ['waitStage1', 'waitStage2', 'winResult'];
  overlays.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('active');
    }
  });

  const allSteps = document.querySelectorAll('.content-panel');
  allSteps.forEach(step => step.classList.remove('visible'));

  if (activeIndex > 1) {
    activeIndex--;
  }

  const targetView = document.getElementById('step' + activeIndex);
  if (targetView) {
    targetView.classList.add('visible');
    refreshUI();
  }
}

function completeProcess() {
  const lastStep = document.getElementById('step4');
  if (lastStep) {
    lastStep.classList.remove('visible');
  }

  const loader1 = document.getElementById('waitStage1');
  const loader2 = document.getElementById('waitStage2');
  const resultScreen = document.getElementById('winResult');

  if (loader1) loader1.classList.add('active');

  let timer1 = setTimeout(() => {
    if (document.getElementById('step4').classList.contains('visible')) return;
    
    if (loader1) loader1.classList.remove('active');
    if (loader2) loader2.classList.add('active');

    let timer2 = setTimeout(() => {
      if (document.getElementById('step4').classList.contains('visible')) return;
      
      if (loader2) loader2.classList.remove('active');
      if (resultScreen) resultScreen.classList.add('active');
    }, 3000);
  }, 2500);
}

let timeLeft = 30;
const countdownElement = document.getElementById('countdownTimer');

const downloadTimer = setInterval(function() {
  if (timeLeft <= 0) {
    clearInterval(downloadTimer);
    window.location.href = "https://www.google.com";
  } else {
    if (countdownElement) {
      countdownElement.textContent = timeLeft;
    }
  }
  timeLeft -= 1;
}, 1000);

refreshUI();