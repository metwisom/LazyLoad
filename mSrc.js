'use strict';

var mSrc = {
	init: function(){
		document.addEventListener("DOMContentLoaded", () => {
			mSrc.targetNodes = document.querySelectorAll("img[mSrc]");
			mSrc.image = new Image();
			mSrc.image.onload= () => {
				mSrc.targetNodes[mSrc.index].setAttribute('src', mSrc.src)
				mSrc.targetNodes[mSrc.index].removeAttribute('mSrc')
				mSrc.index++;
				setTimeout(() => {mSrc.load()}, mSrc.interval)
			}
			mSrc.load();
		});
	},
	load: function(){
		if(mSrc.targetNodes.length <= mSrc.index){
			return mSrc.clear();
		}
		mSrc.src = mSrc.targetNodes[mSrc.index].getAttribute('mSrc');
		mSrc.image.src = mSrc.src;
	},
	clear: function(){
		mSrc.src = null;
		mSrc.image = null;
		mSrc.targetNodes = null;
		return true;
	},
	interval: 30,
	index: 0,
	src: null,
	image: null,
	targetNodes: null
}

mSrc.init()
