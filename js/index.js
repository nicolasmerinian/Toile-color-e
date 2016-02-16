var canvasElement;
var context;
var nodes = [];
var fps = 60;
var interval = 1000 / fps;	
var isMouseDown = false;
var ID = 0;

$(window).ready(function() {
	
	var windowWidth;
	var windowHeight;
	
	// On récupère l'objet canvas
	canvasElement = document.getElementById('canvasElement');
	
	windowWidth = window.innerWidth * 0.97;
	windowHeight = window.innerHeight * 0.8;
	canvasElement.width = windowWidth;
	canvasElement.height = windowHeight;
	
	
	
	if (!canvasElement || !canvasElement.getContext) {
		return;
	}

	// On récupère le contexte 2D
	context = canvasElement.getContext('2d');
	if (!context) {
		return;
	}
	
	window.onresize = function (event) {
		windowWidth = window.innerWidth * 0.97;
		windowHeight = window.innerHeight * 0.8;
		canvasElement.width = windowWidth;
		canvasElement.height = windowHeight;
		draw();
	};
	
	canvasElement.onclick = function (event) {
		var pX = event.pageX - canvasElement.offsetLeft;
		var pY = event.pageY - canvasElement.offsetTop;
		createNode(pX, pY);
		update();
	};
	
	canvasElement.onmousedown = function (event) {
		isMouseDown = true;
	};
	
	canvasElement.onmouseup = function (event) {
		isMouseDown = false;
	};
	
	canvasElement.onmousemove = function (event) {
		if (isMouseDown) {
			var pX = event.pageX - canvasElement.offsetLeft;
			var pY = event.pageY - canvasElement.offsetTop;
			createNode(pX, pY);
			update();
		}
	};
	
	init();
	
});

function init() {
	if (AUTOGEN) {
		timer = setInterval(update, interval);
	}
};

function update() {
	if (AUTOGEN) {
		createNode();
	}
	buildNetwork();
	draw();
};

function createNode(x, y) {
	var doublon = false;
	var x = x || canvasElement.width * Math.random();
	var y = y || canvasElement.height * Math.random();
	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].x == x && nodes[i].y == y) {
			doublon = true;
			aff('doublon !');
		}
	}
	if (!doublon) {
		// var id = nodes.length;
		var id = ID;
		var node = new Node(context, id, x, y);
		nodes.push(node);
		ID++;
	}
	if (nodes.length > MAXNODES) {
		// nodes.shift();
		ShiftNodes();
	}
};

function ShiftNodes() {
	// for (var h = 0; h < nodes.length; h++) {
		var node = nodes[0];
		var id = node.id;
		if (node && node.links) {
			for (var i = 0; i < node.links.length; i++) {
				// aff(i);
				var link = node.links[i];
				// if (link) {
					var node2 = link[2];
					if (node2 && node2.links) {
						for (var k = 0; k < node2.links.length; k++) {
							// aff(k);
							var node3 = node2.links[k];
							if (node3.id == id) {
								aff("Le noeud " + k + "dont l'id est " + node3.id + "fait référence au noeud 0, dont l'id est " + id);
								node2.links.middlepop(k);
								aff(k);
							}
						}
					}
				// }
			}
		}
	// }
	nodes[0].links = [];
	nodes.shift();
};

function draw() {
	context.clearRect(0, 0, canvasElement.width, canvasElement.height);
	for (var i = 0; i < nodes.length; i++) {
		var n = nodes[i];
		n.drawLinks(context);
	}
	context.globalAlpha = NodeModel.graphics.opacity;
	context.fillStyle = NodeModel.graphics.fill;
	context.strokeStyle = NodeModel.graphics.stroke;
	context.lineWidth = NodeModel.graphics.lineWidth;
	for (var i = 0; i < nodes.length; i++) {
		var n = nodes[i];
		n.draw(context);
	}
};


function buildNetwork() {
	for (var i = 0; i < nodes.length; i++) {
		for (var j = 0; j < nodes.length; j++) {
			if (i != j) {
				var n1 = nodes[i];
				var n2 = nodes[j];
				var neighbour = n1.detectNeighbourNode(n2);
				// if (neighbour) {
					// aff('Le noeud ' + i + ' est voisin avec le noeud ' + j + '.');
				// }
			}
		}
	}
};


function clearUselessLinks() {
	var count = 0;
	var nodeFound = false;
	for (var i = 0; i < nodes.length; i++) {
		var n1 = nodes[i];
		for (var j = 0; j < n1.links.length; j++) {
			var l1 = n1.links[j];
			for (var k = 0; k < nodes.length; k++) {
				var n2 = nodes[k];
				if (l1[2] == n2.id) {
					nodeFound = true;
				}
			}
			if (!nodeFound) {
				count++;
				n1.links.middlepop(j);
			}
		}
	}
	return count;
};

Array.prototype.middlepop = function (i) {
	if (i > this.length) {
		return false;
	}
	else {
		return this.slice(0, i).concat(this.slice(i + 1, this.length));
	}
};


function LinksCount() {
	var sum = 0;
	var count = 0;
	for (var i = 0; i < nodes.length; i++) {
		var n1 = nodes[i];
		aff(i + ', ' + n1.links.length);
		sum += n1.links.length;
		for (var j = 0; j < n1.links.length; j++) {
			count++;
		}
	}
	aff('SUM : ' + sum);
	return count;
};






































// Pour empêcher la sélection du texte de la page pendant le jeu
function ffalse() {
		return false;
}
function ftrue() {
		return true;
}
document.onselectstart = new Function ("return false");
if(window.sidebar) {
		document.onmousedown = ffalse;
		document.onclick = ftrue;
}