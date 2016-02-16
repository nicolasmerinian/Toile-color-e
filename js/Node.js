var Node = function (context, id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.radius = NodeModel.radius;
	this.range = NodeModel.range;
	this.graphics = {
		stroke : '#888',
		fill : '#555',
		lineWidth : 2,
		font : '6px Arial'
	};
	this.neighbours = [];
	this.links = [];
	this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
};

Node.prototype.draw = function (context) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, Math.PI * 360, false);	
	context.closePath();
	context.fill();
	context.stroke();
};

Node.prototype.detectNeighbourNode = function (node) {
	var isNeighbour = false;
	if (this != node && this.links.length < MAXLINKSPERNODE) {
		context.beginPath();
		context.arc(this.x, this.y, this.range, Math.PI * 360, false);	
		context.closePath();
		isNeighbour = context.isPointInPath(node.x, node.y);
		if (isNeighbour) {
			if (!this.neighbours.isset(node)) {
				this.neighbours.push(node);
				this.links.push([node.x, node.y, node]);
			}
		}
	}
	return isNeighbour;
};

Node.prototype.drawLinks = function (context) {
	context.lineWidth = 1;
	var color = '#17B';
	context.strokeStyle = this.color || color;
	context.beginPath();
	for (var i = 0; i < this.links.length; i++) {
		var l = this.links[i];
		var nid = l[2].id;
		if (this.id < nid) {
			context.moveTo(this.x, this.y);
			context.lineTo(l[0], l[1]);
		}
	}
	context.closePath();
	context.stroke();	
};










