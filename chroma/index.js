var compute_frame = function() {
    this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
    let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
	
	// 640x480 x 4 bytes per pixel = 1228800 = l
    let l = frame.data.length / 4;

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
    this.ctx2.putImageData(frame, 0, 0);
    return;
};

var time_callback = function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    let self = this;
	
	// Update
    setTimeout(function () {
        self.timerCallback();
      }, 0);
};

var do_load = function() {
    this.video = document.getElementById("video");
    this.c1 = document.getElementById("c1");
    this.ctx1 = this.c1.getContext("2d");
    this.c2 = document.getElementById("c2");
    this.ctx2 = this.c2.getContext("2d");
    let self = this;
    this.video.addEventListener("play", function() {
        self.width = self.video.videoWidth;
        self.height = self.video.videoHeight;
        self.timerCallback();
      }, false);
};

var processor = {
    doLoad: do_load,
    timerCallback: time_callback, 
    computeFrame: compute_frame 
};