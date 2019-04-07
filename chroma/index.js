
var color;
var player = document.getElementById('video');

var handleSuccess = function(stream) {
	// Attach the video stream to the video element and autoplay.
	player.srcObject = stream;
	loadAll();
};

// Get video
navigator.mediaDevices.getUserMedia({video: true})
  .then(handleSuccess);


function pickedFilter () {
	var selector = document.getElementById("colorFilter");
	color = selector.options[selector.selectedIndex].value;
	loadAll();
}

pickedFilter();

colorFilter.addEventListener("change", pickedFilter);

function compute_frame(color) {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, 640, 480);
	
	// 640x480 x 4 because rgba per pixel = 1228800 = l
    let l = frame.data.length / 4;
	
	if (color === "Blue") {
		for (let i = 0; i < l; i++) {
			
			let r = frame.data[i * 4 + 0];
			let g = frame.data[i * 4 + 1];
			let b = frame.data[i * 4 + 2];

			if (b > r && b > g)
			{
				if (b > 100 ) {
					frame.data[i * 4 + 3] = 0;
				}
			}
				
		}
	} else {
		for (let i = 0; i < l; i++) {
			
			let r = frame.data[i * 4 + 0];
			let g = frame.data[i * 4 + 1];
			let b = frame.data[i * 4 + 2];

			if (g > r && g > b)
			{
				if (g > 100 ) {
					frame.data[i * 4 + 3] = 0;
				}
			}
				
		}
	}
    this.ctx2.putImageData(frame, 0, 0);
    return;
};

function time_callback () {
    if (this.video.paused || this.video.ended) {
      return;
    }
    compute_frame(color);
    let self = this;
	
	// Update
    setTimeout(function () {
		self.time_callback();
    }, 0);
};

function loadAll () {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");
    let self = this;
    this.video.addEventListener("play", function() {
        self.width = self.video.videoWidth;
        self.height = self.video.videoHeight;
        self.time_callback();
    }, false);
};
