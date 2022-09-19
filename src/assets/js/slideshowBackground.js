export function slideshowBackground(){
	let settings = {
		images: {
			'src/assets/images/index/bg01.jpg': 'center 40%',
			'src/assets/images/index/bg02.jpg': 'center 40%',
			'src/assets/images/index/bg03.jpg': 'center 40%',
			'src/assets/images/index/bg04.jpg': 'center 20%'
		},
		delay: 6000
	};

	let pos = 0, lastPos = 0, $wrapper, $bgs = [], $bg, k;

	$wrapper = document.querySelector('#bg');

	for (k in settings.images) {
		$bg = document.createElement('div');
		$bg.style.backgroundImage = 'url("' + k + '")';
		$bg.style.backgroundPosition = settings.images[k];
		$bg.style.backgroundSize = 'cover';
		$bg.style.backgroundRepeat = 'no-repeat';
		$wrapper.appendChild($bg);
		$bgs.push($bg);
	}

	// Main loop.
	$bgs[pos].classList.add('visible');
	$bgs[pos].classList.add('top');

	window.setInterval(function () {

		lastPos = pos;
		pos++;

		// Wrap to beginning if necessary.
		if (pos >= $bgs.length)
			pos = 0;

		// Swap top images.
		$bgs[lastPos].classList.remove('top');
		$bgs[pos].classList.add('visible');
		$bgs[pos].classList.add('top');

		// Hide last image after a short delay.
		window.setTimeout(function () {
			$bgs[lastPos].classList.remove('visible');
		}, settings.delay / 2);

	}, settings.delay);
}