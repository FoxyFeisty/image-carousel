

var slidingHeight;
var animation = "margin-top";
var time = "800ms";

// JSON-Objekt deklarieren mit Zugriff auf Div-Container
var carousel = { container: document.querySelector("#carouselDiv") };
// Zugriff auf Figure
carousel.figure = carousel.container.querySelector("figure");
// Zugriff auf Figure-Inhalt (=ul)
carousel.figureCont = carousel.figure.querySelector("ul");
// Zugriff auf Bilder
carousel.items = carousel.figureCont.children;
// Zugriff auf Buttons
carousel.buttons = {
	"prev": carousel.container.querySelector("button.carouselPrev"),
	"next": carousel.container.querySelector("button.carouselNext")
};
// Default für erstes Bild
carousel.currentItem = 0;

// Array mit unterschiedlichen Media Query-Zuständen
var Queries = [
	window.matchMedia("(max-width: 420px)"),
	window.matchMedia("(max-width: 768px)")
]

// Funktion mit Media Query-Anweisungen
function mediaQueryResponse(x) {
	if (Queries[0].matches) {
		slidingHeight = 200;
		carousel.figure.style.height = 200 + 'px';
	} else if (Queries[1].matches) {
		slidingHeight = 280;
		carousel.figure.style.height = 280 + 'px';
	} else if (!Queries[0].matches && !Queries[1].matches) {
		slidingHeight = 400;
		carousel.figure.style.height = 400 + 'px';
	}
	console.log(x);
	return slidingHeight;
}

// Array durchlaufen, EventListener hinzufügen und Fkt mit Media Query-Anweisungen aufrufen
for (var i = 0; i < Queries.length; i++) {
	mediaQueryResponse(Queries[i]);
	Queries[i].addListener(mediaQueryResponse);
}


function carouselEventListener(carousel){
		// Add an event listener to the previous button
		carousel.buttons.prev.addEventListener('click', function(e){ carouselPrev(carousel); });
		// Add an event listener to the next button
		carousel.buttons.next.addEventListener('click', function(e){ carouselNext(carousel); });

		// Start the automatic timer to cycle the carousel automatically
		startCarouselTimeout(carousel);
}
carouselEventListener(carousel);


/**
 * carouselPrev
 * @param carousel Object The carousel object for cycling prev
 */
function carouselPrev(carousel) {
	// decrease index of current item
	carousel.currentItem--;
	// when below zero ...
	if (carousel.currentItem <= -1) {
		// ... set item to last item
		carousel.currentItem = carousel.items.length - 1;
	}
	// // after updating index, display items; weiter unten deklariert
	displayCarouselItem(carousel);
}

/** 
 * carouselNext
 * @param carousel Object The carousel object for cycling next
 */
function carouselNext(carousel) {
	// increase number of current index
	carousel.currentItem++;
	if (carousel.currentItem >= carousel.items.length) {
		carousel.currentItem = 0;
	}
	displayCarouselItem(carousel);
}

/** 
 * displayCarouselItem
 * @param carousel Object The carousel object to use for updating the carousel
 */
function displayCarouselItem(carousel) {	
	// reset automatic timer; Funktion weiter unten deklariert
	startCarouselTimeout(carousel);
	// set margin-left CSS property for current item
	carousel.figureCont.style.marginTop = '-' + (carousel.currentItem * slidingHeight) + 'px';
	carousel.figureCont.style.transition = animation + ' ' + time + ' ease-out';
}

/**
 * startCarouselTimeout
 * @param carousel Object The carousel object to use for automatically cycling
 */
 function startCarouselTimeout(carousel) {
 	// Cancel the last automatic timer
 	clearTimeout(carousel.interval);
 	// create a new automatic timer
 	// that will run carouselNext()
 	// every 3 seconds
 	carousel.interval = setTimeout(function() {
 			carouselNext(carousel);
 		},4000);
 }


