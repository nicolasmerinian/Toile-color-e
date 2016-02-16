//=================================================================//

// Fonction pemettant de supprimer une entrée d'un tableau

// array : le nom du tableau dont on veut supprimer une valeur
// valueOrIndex : valeur ou index de l'entrée à supprimer

function unset(array, valueOrIndex) {
	var output = [];
	for (var i in array) {
		if (i != valueOrIndex) {
			output[i] = array[i];
		}
	}
	return output;
}

function middlepop(tab,a){
		return (a>tab.length)?false:(tab.slice(0,a).concat(tab.slice(a+1,tab.length)));
}

Array.prototype.isset = function(o) {
	for (el in this) {
		if (this[el] == o) {
			return true;
		}
	}
	return false;
}

//=================================================================//

// Fonction permettant d'accélérer les tests grâce à des messages de
// tests plus rapides à écrire

// msg : chaine que l'on souhaite afficher

function aff(msg) {
	console.log('Msg de test : ' + msg)
};

//=================================================================//

function majPosTab(array) {
	var output = [];
	for (var ele in array) {
		output.push(array[ele]);
	}
	for (var eleMaj in output) {
		output[eleMaj].id = eleMaj;
	}
	return output;
}

function random(min, max) {
	/* We generate a float number between 0 and 1.
		Then We multiplied it by the max number minus the min number and then we add the min number.
		Last, we convert it into an integer and return it */
	return Math.floor((Math.random() * (max - min)) + min);
}			







//=================================================================//