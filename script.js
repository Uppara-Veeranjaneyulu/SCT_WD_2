let startTime = 0, elapsedTime = 0, timerInterval;
    let running = false;
    let lapCount = 0;

    const timeDisplay = document.getElementById('time');
    const startPauseBtn = document.getElementById('startPause');
    const resetBtn = document.getElementById('reset');
    const lapBtn = document.getElementById('lap');
    const lapTimesContainer = document.getElementById('lapTimes');
    const statusText = document.getElementById('statusText');
    const playIcon = '<i class="fa-solid fa-play"></i>';
    const pauseIcon = '<i class="fa-solid fa-pause"></i>';

    function formatTime(ms) {
      const totalSeconds = Math.floor(ms / 1000);
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
      return `${minutes}:${seconds}.${milliseconds}`;
    }

    function updateTime() {
      const now = Date.now();
      elapsedTime = now - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }

    function toggleStartPause() {
      if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        startPauseBtn.innerHTML = pauseIcon;
        statusText.textContent = 'Running';
        running = true;
      } else {
        clearInterval(timerInterval);
        startPauseBtn.innerHTML = playIcon;
        statusText.textContent = 'Paused';
        running = false;
      }
    }

    function resetStopwatch() {
      clearInterval(timerInterval);
      elapsedTime = 0;
      timeDisplay.textContent = '00:00.00';
      startPauseBtn.innerHTML = playIcon;
      lapTimesContainer.innerHTML = '';
      lapCount = 0;
      statusText.textContent = 'Stopped';
      running = false;
    }

    function recordLap() {
      if (!running) return;
      lapCount++;
      const lapTime = formatTime(elapsedTime);
      const lap = document.createElement('div');
      lap.className = 'lap';
      if (lapCount === 1) lap.classList.add('green');
      lap.innerHTML = `<span>#${lapCount} ${lapTime}</span><span>${lapTime}</span>`;
      lapTimesContainer.prepend(lap);
    }

    startPauseBtn.addEventListener('click', toggleStartPause);
    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', recordLap);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleStartPause();
      }
      if (e.code === 'KeyL') recordLap();
      if (e.ctrlKey && e.code === 'KeyR') resetStopwatch();
    });