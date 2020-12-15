const TypeWriter = function(txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
}

// TYPE METHOD:

TypeWriter.prototype.type = function() {
	//get current index:
	const current = this.wordIndex % this.words.length;
	// get full text:
	const fullTxt = this.words[current];
	// Checking if deleting:
	if (this.isDeleting) { // delete character
		this.txt = fullTxt.substring(0, this.txt.length -1);
	} else { // add character
		this.txt = fullTxt.substring(0, this.txt.length +1);
	}

	// Insert text into HTML:
	this.txtElement.innerHTML = `<span class="new-txt">${this.txt}</span>`;

	// TYping speed:
	let typeSpeed = 200;

	if (this.Deleting) {
		typeSpeed = 10000; // deleting is faster 
	}

	// Checking if word is complete:
	if (!this.isDeleting && this.txt == fullTxt) {
		// make a pause
		typeSpeed = this.wait;
		// deleting becomes true:
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt == '') {
		this.isDeleting = false;
		// grab a next word:
		this.wordIndex++;
		// pause before typing:
		typeSpeed = 300;
	}

	setTimeout(()=> this.type(), typeSpeed)
}

// DOM load:

document.addEventListener('DOMContentLoaded', init);

// INIT:

function init () {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');
	new TypeWriter(txtElement, words, wait);
}