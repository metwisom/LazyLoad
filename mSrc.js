'use strict';

var mSrc = {
	init: function(){		
		document.addEventListener("DOMContentLoaded", () => {
			this.targetNodes = document.querySelectorAll("img[mSrc]");
			this.image = new Image();
			this.image.onload= () => {
		    	this.targetNodes[this.index].setAttribute('src', this.src)
		    	this.targetNodes[this.index].removeAttribute('mSrc')
				this.index++;   	
		    	setTimeout(() => {this.load()}, this.interval)	 
		    }	 
			this.load();
		});
	},
	load: function(){
		if(this.targetNodes.length <= this.index){
			return this.clear();
		}
		this.src = this.targetNodes[this.index].getAttribute('mSrc');
	    this.image.src = this.src;
	},
	clear: function(){
		this.src = null;
		this.image = null;
		this.targetNodes = null;
		return true;
	},
	interval: 30,
	index: 0,
	src: null,
	image: null,
	targetNodes: null
}

mSrc.init()