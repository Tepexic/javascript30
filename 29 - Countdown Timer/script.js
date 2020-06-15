const display = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('button');

function timer(seconds) {
  // Clear, if any, the intervals
  try {
    clearInterval(countdown)
  } catch {}

  const now = Date.now();
  const later =  now + seconds * 1000

  // Display timer for the first time, since we're setting the timeout for later
  displayTimeLeft(seconds)

  displayEndTime(later)

  countdown = setInterval( () => {
    secondsLeft = Math.round((later - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor( seconds / 60 )
  let remSeconds = seconds % 60
  if(remSeconds < 10) {
    remSeconds = '0' + remSeconds
  }
  text = `${minutes}:${remSeconds}`
  display.textContent = text;
  document.title = text;
}

function displayEndTime(timestamp) {
  const later = new Date(timestamp)
  let minutes = later.getMinutes();
  let hours = later.getHours();
  if(minutes < 10) {
    minutes= '0' + minutes
  }
  if(hours > 12) {
    hours= hours - 12
  }
  
  endTime.textContent = `Be back at: ${hours}:${minutes}`
}

buttons.forEach(b => {
  b.addEventListener('mousedown', () => { timer(b.dataset.time) })
})

// You can select elements by name
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(parseInt(this.minutes.value) * 60)
  this.reset();
})