/*
 * responsiveImageMaps jQuery plugin v0.1
 *
 * Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size.
 * If you want you can define the original image-map size with the attributes "data-with" and "data-height"
 * Example:
 *    &('map[name="arrow"]').responsiveImageMaps(newWidth, newHeight);
 *    
 * Copyright (c) 2014 Alexander WUnschik
 * https://github.com/stowball/jQuery-rwdImageMaps
 * http://wunschik.it
 * Licensed under the MIT license
 */
(function($) {
	$.fn.responsiveImageMaps = function(newWidth, newHeight) {
		var $map = this;

		$map.each(function() {
			var that = this;
			var $that = $(that);

			var origWidth = $map.data('width');
			if (!origWidth) {
				var name = $this.attr('name');
				var $img = $('img[usemap="#'+name+']')
				$.each($img, function(i, e) {
					origWidth = $this.width()
					$this.data('width', origWidth);
				});
			}
			
			var origHeight = $map.data('height');
			if (!origHeight) {
				var name = $this.attr('name');
				var $img = $('img[usemap="#'+name+']')
				$.each($img, function(i, e) {
					origHeight = $this.height()
					$this.data('height', origHeight);
				});
			}

			var dWidth = ((100 / origWidth) * newWidth) / 100;
			var dHeight = ((100 / origHeight) * newHeight) / 100;

			$that.find('area').each(function() {
				var $this = $(this);

				var origCoords = $this.attr('data-coords');
				if (!origCoords) {
					$this.attr('data-coords', $this.attr('coords'));
					origCoords = $this.attr('data-coords');
				}
				origCoords = origCoords.split(',');

				var newCoords = new Array(origCoords.length);
				for (var i = 0; i < origCoords.length; ++i) {
					if (i % 2 === 0) {
						newCoords[i] = parseInt(origCoords[i] * dWidth, 10);
					} else {
						newCoords[i] = parseInt(origCoords[i] * dHeight, 10);
					}
				}
				$this.attr('coords', newCoords.toString());
			});
		});

		return this;
	};
})(jQuery);