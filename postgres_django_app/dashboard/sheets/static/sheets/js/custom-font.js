
	var transformZoom = 1;
       var cssZoom = 100;
function smaller()
{

			var step;
			//only firefox create problem
			if (Modernizr.testProp('zoom') === true) {
				console.log('CSS zoom supported');

				step = 5;
				cssZoom -= step;
				$('body').css('zoom', ' ' + cssZoom + '%');
			} else {
				console.log('no css zoom');
				step = 0.05;
				transformZoom -= step;
				$('html').css('MozTransform', 'scale(' + transformZoom + ',' + transformZoom + ')');
			console.log('no css zoom 1');
				$('html').css('transform-origin', 'top center');
			console.log('no css zoom 2');
		}
}

function larger()
{
			var step;

			if (Modernizr.testProp('zoom') === true) {

				step = 5;
				cssZoom += step;
				$('body').css('zoom', ' ' + cssZoom + '%');
			} else {
				console.log('no css zoom');
				step = 0.05;
				transformZoom += step;

				$('html').css('MozTransform', 'scale(' + transformZoom + ',' + transformZoom + ')');
				$('html').css('transform-origin', 'top center');
			}
}

function reset()
{
				cssZoom = 100;
			 if (Modernizr.testProp('zoom') === true) {
				 $('body').css('zoom', ' ' + 100 + '%');
				 }
				else
				{
						console.log('no css zoom');
					 transformZoom = 1;
					 $('html').css('MozTransform', 'scale(' + 1 + ',' + 1 + ')');
						$('html').css('transform-origin', 'top center');
					}
			 console.log('cssZoom');
}