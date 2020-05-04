const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
  // Get video
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then( localMediaStream => {
      console.log(localMediaStream)
    })
}

getVideo();