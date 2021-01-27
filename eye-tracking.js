var video = document.querySelector("#videoElement");
var canvas = document.querySelector('#faceDetectionCanvas');
var context = canvas.getContext('2d');


function reverseRect(rect) {
	let reversed = rect;
	reversed.x = canvas.width - rect.x - rect.width;
	return reversed;
}

var eyeTracker = new tracking.ObjectTracker(['eye']);
var faceTracker = new tracking.ObjectTracker(['face']);

//eyeTracker.setInitialScale(4);
eyeTracker.setStepSize(1.7);
eyeTracker.setEdgesDensity(0.1);

faceTracker.setStepSize(1.7);
faceTracker.setEdgesDensity(0.1);

var eyeTrackerTask = tracking.track('#videoElement', eyeTracker, { camera: true });

var mostRecentRects = [];
var counter = 0;

window.addEventListener("keydown", handleKeyDownEyes, true);

function handleKeyDownEyes(e) {
	console.log("Key pressed");
	eyeTrackerTask.stop();
	if (e.keyCode == 32) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		mostRecentRects.forEach(function(rect, idx) {
			//rect = reverseRect(rect);
			//mostRecentRects[idx % 2] = rect;
			context.strokeStyle = 'white';
			context.strokeRect(rect.x, rect.y, rect.width, rect.height);

		});
	}
}

eyeTracker.on('track', function(event) {

	if (event.data.length != 2){
		counter = 0;
		//context.clearRect(0, 0, canvas.width, canvas.height);
		return;
	}
	counter++;

	context.clearRect(0, 0, canvas.width, canvas.height);

	event.data.forEach(function(rect, idx) {
		rect = reverseRect(rect);
		mostRecentRects[idx % 2] = rect;
		context.strokeStyle = 'red';
		context.strokeRect(rect.x, rect.y, rect.width, rect.height);
	});
	
/*
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (event.data.length > 2) return;
	if (event.data.length == 2) {
		var deltaX = Math.abs((event.data[0].x + event.data[0].width/2) - (event.data[1].x + event.data[1].width/2) );
		var deltaY = Math.abs( (event.data[0].y + event.data[0].height/2) - (event.data[1].y + event.data[1].height/2) );
		var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
	}

	event.data.forEach(function(rect, idx) {

		rect = reverseRect(rect);

	  	context.strokeStyle = '#a64ceb';
	  	context.strokeRect(rect.x, rect.y, rect.width, rect.height);

	  context.font = '20px Helvetica';
	  context.fillStyle = "red";
	  context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 20, rect.y + 20);
	  context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 20, rect.y + 40);
	  if (idx % 2 == 0) {
	  	context.fillText('delta x: ' + deltaX + 'px', canvas.width/2-20, canvas.height - 60);
	  	context.fillText('delta y: ' + deltaY + 'px', canvas.width/2-20, canvas.height - 40);	  	
	  	context.fillText('distance: ' + distance + 'px', canvas.width/2-20, canvas.height - 20);
	  }
	});
*/	
});

/*
var percentages = [];
function rollingAverage(size) {
  percentages.splice(0, percentages.length - size);
  var sum = percentages.reduce(function(total, num) {
    return total + num
  }, 0);
  return sum / percentages.length;
}

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;



    setInterval(function() {
		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		var faces = ccv.detect_objects({
		  canvas: ccv.pre(canvas),
		  cascade: cascade,
		  interval: 2,
		  min_neighbors: 1
		});

		faces.forEach(function(face) {

			console.log(face);

			context.beginPath();
			context.rect(face.x, face.y, face.width, face.height);
			context.lineWidth = 1;
			context.strokeStyle = 'red';
			context.stroke();

	        var percentage = 100 * face.height / canvas.height;
	        percentages.push(percentage);
	        console.log(rollingAverage(5).toFixed(2) + '%')
	        //document.querySelector('code').textContent = rollingAverage(5).toFixed(2) + '%';

		});

    }, 300);

    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
*/