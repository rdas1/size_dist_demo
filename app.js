const canvas = new fabric.Canvas('canvas');
const instructions = document.getElementById('instructions');

var ppi;

var circle, isDown, origX, origY;

var numClicks = 0;

var referencePoints = [];

// var referenceObj = {};

document.getElementById('imageLoader').onchange = function(e) {
	var imageObj = new Image();
 	imageObj.onload = draw;
 	imageObj.onerror = failed;
 	imageObj.src = URL.createObjectURL(this.files[0]);

};

function getReferenceSize() {

	canvas.on('mouse:down', getReferencePointMouseDown); 

	canvas.on('mouse:up', getReferencePointMouseUp);

};

const getReferencePointMouseDown = function (o) {
		if (referencePoints.length == 4) {
			return;
		}
		isDown = true;
		var pointer = canvas.getPointer(o.e);
		origX = pointer.x;
		origY = pointer.y;
		circle = new fabric.Circle({
		    left: pointer.x,
		    top: pointer.y,
		    radius: 5,
		    strokeWidth: 3,
		    stroke: 'black',
		    fill: 'white',
		    selectable: true,
		    originX: 'center', originY: 'center'
		});
		canvas.add(circle);
		referencePoints.push({x: circle.left, y: circle.top});
	};

const getReferencePointMouseUp = function(o) {
		numClicks += 1;
		if (numClicks > 4) {
			return;
		}
		else if (referencePoints.length == 4) {
			var card_width = (Math.abs(referencePoints[0].x - referencePoints[1].x) + Math.abs(referencePoints[3].x - referencePoints[2].x))/2; 
			var card_height = (Math.abs(referencePoints[0].y - referencePoints[3].y) + Math.abs(referencePoints[1].y - referencePoints[2].y))/2; 
			console.log("card width: " + card_width);
			console.log("card height: " + card_height);

			var ppi = Math.min(card_width, card_height) / 2.125;
			var ppi2 = Math.max(card_width, card_height) / 3.375;


			console.log("ppi 1: " + ppi);
			console.log("ppi 2: " + ppi2);
			
			const instruction2 = document.createElement('li');
			instruction2.textContent = "Great! Now, click the corners of your screen, starting from the top left, and going clockwise."
			instructions.appendChild(instruction2);

			getScreenPoints(ppi);

			/*
			const next_button = document.createElement('BUTTON');
			var next = document.createTextNode("Next");
			next_button.appendChild(next);
			next_button.onclick = getScreenPoints(ppi);
			document.getElementById('beforeCanvas').appendChild(next_button);
			*/

		} 
		/*
		else {
			console.log(referencePoints[referencePoints.length - 1].x + ", " + referencePoints[referencePoints.length - 1].y);			
		}
		*/
	};

function getScreenPoints(ppi) {

	var screenPoints = [];

	canvas.on('mouse:down', function(o) {
		if (screenPoints.length == 4) {
			return;
		}
		isDown = true;
		var pointer = canvas.getPointer(o.e);
		origX = pointer.x;
		origY = pointer.y;
		circle = new fabric.Circle({
		    left: pointer.x,
		    top: pointer.y,
		    radius: 5,
		    strokeWidth: 3,
		    stroke: 'black',
		    fill: 'white',
		    selectable: true,
		    originX: 'center', originY: 'center'
		});
		canvas.add(circle);
		screenPoints.push({x: circle.left, y: circle.top});
	});

	canvas.on('mouse:up', function(o) {
		if (screenPoints.length == 4) {
			var screen_width_px = (Math.abs(screenPoints[0].x - screenPoints[1].x) + Math.abs(screenPoints[3].x - screenPoints[2].x))/2; 
			var screen_height_px = (Math.abs(screenPoints[0].y - screenPoints[3].y) + Math.abs(screenPoints[1].y - screenPoints[2].y))/2; 
			console.log("screen width in pixels: " + screen_width_px);
			console.log("screen height in pixels: " + screen_height_px);

			var screen_width_in = screen_width_px / ppi;
			var screen_height_in = screen_height_px / ppi;
			var screen_diagonal_in = Math.sqrt( (screen_width_in * screen_width_in) + (screen_height_in * screen_height_in) );

			console.log("screen width in inches: " + screen_width_in);
			console.log("screen height in inches: " + screen_height_in);
			console.log("screen diagonal size in inches: " + screen_diagonal_in);

			document.getElementById('resultsLabel').innerText = "RESULTS:";

			const results = document.getElementById('resultsList');

			// results.innerHTML ="<li>" + width_result + </li>"


			const width_result = document.createElement('li');
			const height_result = document.createElement('li');
			const diagonal_result = document.createElement('li');
			
			width_result.textContent = "Screen width: " + screen_width_in;
			height_result.textContent = "Screen height: " + screen_height_in;
			diagonal_result.textContent = "Screen size (diagonal): " + screen_diagonal_in;

			results.appendChild(width_result);
			results.appendChild(height_result);
			results.appendChild(diagonal_result);
		}/*
		else {
			console.log(screenPoints[screenPoints.length - 1].x + ", " + screenPoints[screenPoints.length - 1].y);
		}*/
	});
}

function draw() {

	var scale = 1;

	if (this.width > 600) {
		scale = 600 / this.width;
	}

	else if (this.height > 600) {
		scale = 600 / this.height;
	}

	var image = new fabric.Image(this);
	image.set({	
    	left: 0,
    	top: 0,
	    scaleX: scale,
	    scaleY: scale,
	    lockMovementX: true,
	    lockMovementY: true,
	    lockScalingX: true,
	    lockScalingY: true,
	    selection: false,
	    hasControls: false,
	    evented: false,
	})

    canvas.setWidth(image.getScaledWidth())
    canvas.setHeight(image.getScaledHeight())
    canvas.setBackgroundImage(image);

    const instruction1 = document.createElement('li');
	instruction1.textContent = "Click the corners of the card, starting from the top left, and going clockwise."
	instructions.appendChild(instruction1);

	getReferenceSize();

}

function failed() {
	console.error("The provided file couldn't be loaded. Try a different image!");
}