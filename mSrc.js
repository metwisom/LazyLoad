'use strict';

var mSrc = {
	attribute_name: 'mSrc',
	interval: 30,
	init: function(){
		document.addEventListener('DOMContentLoaded', () => {
			mSrc.start();
			mSrc.createHook();
		});
	},
	start: function(){
		mSrc.targetNodes = document.querySelectorAll('img[' + mSrc.attribute_name + ']');
		mSrc.image = new Image();
		mSrc.image.onload = () => {
			mSrc.targetNodes[mSrc.index].setAttribute('src', mSrc.src)
			mSrc.targetNodes[mSrc.index].removeAttribute(mSrc.attribute_name)
			mSrc.index++;
			setTimeout(() => {mSrc.load()}, mSrc.interval)
		}
		mSrc.load();
	},
	createHook: function(){
		var target = document.getElementsByTagName('body')[0];
		var isImg = function (node) {
			return node.nodeName == 'IMG';
		}
		var hasImgNode = function(mutation) {
			return Array.from(mutation.addedNodes).some(isImg);
		}
		var observer = new MutationObserver(function(mutations){
			if( mutations.some(hasImgNode) ) {
				mSrc.start();
			}
		});
		var config = {childList: true};
		observer.observe(target, config);
	},
	load: function(){
		if(mSrc.targetNodes.length <= mSrc.index){
			return mSrc.clear();
		}
		mSrc.src = mSrc.targetNodes[mSrc.index].getAttribute(mSrc.attribute_name);
		mSrc.image.src = mSrc.src;
	},
	clear: function(){
		mSrc.src = null;
		mSrc.image = null;
		mSrc.index = 0;
		mSrc.targetNodes = null;
		return true;
	},
	index: 0,
	src: null,
	image: null,
	targetNodes: null
}

mSrc.init()
