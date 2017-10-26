let mSrc = {};
const 	
	attr = 'mSrc',
	collection = [],
	selector = `img[${attr}]`,
	updated = 'mSrcUpdated',
	mutation_img_config = { attributes: true, childList: true },
	mutation_container_config = { childList: true };

const updateElement = (element) => {
	if(element.hasAttribute(attr)) {

		if(element.hasAttribute(updated)) {
			if(element.getAttribute(updated) === element.getAttribute(attr) && element.src === element.getAttribute(attr)) {
				return false;
			};
		};

		let image = new Image();
		image.onload = function () {
			element.src = this.src;
			element.setAttribute(updated, this.src);

			if(typeof element.observer === 'undefined') {
				element.observer = new MutationObserver(function(mutations) {
					mutations.forEach((mutation) => {
						updateElement(element);
					});    
				});

				element.observer.observe(element, mutation_img_config);
			};
		};
		image.src = element.getAttribute(attr);
	};
};

mSrc.init = () => {		
	document.querySelectorAll(selector).forEach((element) => {
		updateElement(element);
	});
};

mSrc.watchElement = (element) => {
	if(typeof element.observer === 'undefined') {
		element.observer = new MutationObserver(function(mutations) {
			mSrc.init();  
		});

		element.observer.observe(element, mutation_container_config);
	};
};

module.exports = mSrc;