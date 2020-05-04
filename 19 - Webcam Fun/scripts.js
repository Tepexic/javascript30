const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
  // Get video
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then( localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    // in case we're denied access to the webcam
    .catch(err => {
      console.log(err)
    })
}

function paint2canvas() {
  // Get video dimensions and adjust canvas to it
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  // Paint to canvas at every determined rate
  return setInterval( () => {
    // Draw the video
    ctx.drawImage(video, 0, 0, width, height);

    // Get pixels
    let pixels = ctx.getImageData(0, 0, width, height); // Array of pixels in RGBA order, then it repeats. Actual data inside pixels.data
    // Add efects
    //pixels = redEffect(pixels);
    pixels = greenScreen(pixels);
    //ctx.globalAlpha = 1;
    // Re draw
    ctx.putImageData(pixels, 0, 0);

  }, 1000)
}

function redEffect(pixels) {
  for(let i=0; i<= pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // R
    pixels.data[i + 1] = pixels.data[i + 0] - 100; // G
    pixels.data[i + 2] = pixels.data[i + 0] * 0.6; // B
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i=0; i<= pixels.data.length; i+=4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // R
    pixels.data[i + 200] = pixels.data[i + 1]; // G
    pixels.data[i - 150] = pixels.data[i + 2]; // B
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();
  // Take data from canvas
  const data = canvas.toDataURL('image/jpeg');
  // CReate link to download it
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.textContent = 'Download image';
  link.innerHTML = `<img src=${data} alt="handsome man example"/>`
  strip.insertBefore(link, strip.firstChild)
}
getVideo();

video.addEventListener('canplay', paint2canvas)