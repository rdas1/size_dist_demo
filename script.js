/*function loadImage(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          document.getElementById('img').src = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);

      findColor();

  }
}

function findColor() {
  var img = document.getElementById('img');
  var demoContainer = document.querySelector('.demo-container');

  var tracker = new tracking.ColorTracker(['magenta']);

  tracker.on('track', function(event) {
      console.log("Yo");
    event.data.forEach(function(rect) {

      window.plot(rect.x, rect.y, rect.width, rect.height, rect.color);
    });
  });

  tracking.track('#img', tracker);

  window.plot = function(x, y, w, h, color) {
    var rect = document.createElement('div');
    document.querySelector('.demo-container').appendChild(rect);
    rect.classList.add('rect');
    rect.style.border = '2px solid ' + color;
    rect.style.width = w + 'px';
    rect.style.height = h + 'px';
    rect.style.left = (img.offsetLeft + x) + 'px';
    rect.style.top = (img.offsetTop + y) + 'px';
  };
}

window.onload = function() {
};
*/