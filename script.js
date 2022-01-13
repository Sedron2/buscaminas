let game = []
let mina = '💣'
let size = 16
let abierto = 'grey'
const div = document.querySelector(".grid")
const cells = document.getElementsByTagName('span')

// falta intentar remover los event listeners en la linea 37
// falta agregar un boton de reintentar
// falta agregar un contador de banderitas
// falta agregar la carita que haga :O
// falta diseño

generate_grid(size)
añadir_event_listeners(cells)
insertar_bombas(size, 40)
agregar_numeros_medio(size)
llenar_esquinas(size)
llenar_columnas(size)


function generate_grid(size) {
	div.innerHTML = "<span> </span>\n".repeat(size * size)
	div.style.gridTemplateColumns = "repeat(" + size + ", 1fr)"
}

function añadir_event_listeners(cells) {
	for(let i=0;i<cells.length;i++){
	   cells[i].addEventListener("click", function (){clicked(i)}) // añadiendo el eventlistener para cada una de las casillas
	   cells[i].addEventListener("contextmenu", function (ev){ev.preventDefault(); r_clicked(i)})
	}
	function clicked(i) {
		//console.log('Has pulsado el numero ' + (i));
		if (cells[i].textContent === '🚩') {}
		else {
			if (game[i] == mina) {
				// aqui
				setTimeout(mostrar_bombas, 1000)
				setTimeout(terminar_juego, 3000)
			}
			if (game[i] === ' ')
				desencadenar(i)
			else
				abrir(i)
		}
	}
	function r_clicked(i) {
		if (cells[i].style.backgroundColor !== abierto)
			if (cells[i].textContent === '🚩')
				cells[i].textContent = ' '
			else
				cells[i].textContent = '🚩'
	}
}

function insertar_bombas(size, quantity){
	for (let i = 1; i < (size * size) + 1; i++) {
		if (quantity > 0){
			game.push(mina) // agregando las minas en la lista
			quantity -= 1
		}
		else
			game.push(' ') // llenando el resto de blancos
	}

	desordernar_lista(game)
	desordernar_lista(game) // randomizando
}


function agregar_numeros_medio(size) {
	for (let i = 0; i < size * size; i++) {
		minas_alrededor = 0;
		let condicion = game[i] !== mina && i !== 0 && (i + 1) % size != 0 && i % size != 0
		if (condicion){
			try {
			if (game[i - size - 1] == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (game[i - size] == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (game[i - size + 1] == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (game[i - 1] == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (game[i + 1] == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (game[i + size - 1] == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (game[i + size] == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (game[i + size + 1] == mina)
				minas_alrededor++
			} catch(err) {}
		}
		if (condicion && minas_alrededor != 0)
				game[i] = minas_alrededor
	}
}

function llenar_esquinas(size) {
	let minas_alrededor = 0
	if (game[0] !== mina ) {
		if (game[1] === mina)
			minas_alrededor++
		if (game[size] === mina)
			minas_alrededor++
		if (game[size + 1] === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			game[0] = minas_alrededor
	}
	minas_alrededor = 0
    if (game[size - 1] !== mina ) {
		if (game[size - 2] === mina)
			minas_alrededor++
		if (game[size + size - 1] === mina)
			minas_alrededor++
		if (game[size + size - 2] === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			game[size - 1] = minas_alrededor
	}
    minas_alrededor = 0
    if (game[size * (size - 1)] !== mina ) {
		if (game[size * (size - 1) - size] === mina)
			minas_alrededor++
		if (game[size * (size - 1) - size + 1] === mina)
			minas_alrededor++
		if (game[size * (size - 1) + 1] === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			game[size * (size - 1)] = minas_alrededor
	}
    minas_alrededor = 0
    if (game[(size * size) - 1] !== mina ) {
		if (game[(size * size) - size - 1] === mina)
			minas_alrededor++
		if (game[(size * size) - size - 2] === mina)
			minas_alrededor++
		if (game[(size * size) - 2] === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			game[(size * size) - 1] = minas_alrededor;
	}
}

function llenar_columnas (size) {
	for (i = size; i < (size * (size - 2)); i += size) {
		minas_alrededor = 0
		if (game[i] !== mina) {
			if (game[i - size] === mina)
				minas_alrededor++
			if (game[i - size + 1] === mina)
				minas_alrededor++
			if (game[i + 1] === mina)
				minas_alrededor++
			if (game[i + size] === mina)
				minas_alrededor++
			if (game[i + size + 1] === mina)
				minas_alrededor++
			if (minas_alrededor !== 0)
				game[i] = minas_alrededor
		}
	}

	for (i = size + size - 1; i < (size * (size - 1)); i += size) {
		minas_alrededor = 0
		if (game[i] !== mina) {
			if (game[i - size] === mina)
				minas_alrededor++
			if (game[i - size - 1] === mina)
				minas_alrededor++
			if (game[i - 1] === mina)
				minas_alrededor++
			if (game[i + size] === mina)
				minas_alrededor++
			if (game[i + size - 1] === mina)
				minas_alrededor++
			if (minas_alrededor !== 0)
				game[i] = minas_alrededor
		}
	}
}

function desordernar_lista(lista) {
	lista = lista.sort(function () {return Math.random() - 0.5})
}

function mostrar_bombas() {
	for (let i = 0; i < game.length; i++)
		if (game[i] == mina) {
			cells[i].textContent = '💥'
		}
}

function terminar_juego() {
	div.innerHTML = '<div id="end">Perdiste!</div>'
	div.style.gridTemplateColumns = ''
	div.style.placeItems = 'center'
}

function abrir(i) {
	cells[i].textContent = game[i];
	cells[i].style.backgroundColor = 'grey'
}	

function desencadenar(i) {	
	abrir(i)
	abrir_alrededores(i)
	if (i === 0) { // primera esquina
		if (game[i + 1] === ' ' && !_abierto(i + 1)) {
			desencadenar(i + 1)
		}

		if (game[i + size] === ' ' && !_abierto(i + size)) {
			desencadenar(i + size)
		}

		if (game[i + size + 1] === ' ' && !_abierto(i + size + 1)) {
			desencadenar(i + size + 1)
		}
	}
	else if (i === size - 1){ // segunda esquina
		if (game[i - 1] === ' ' && !_abierto(i - 1)) {
			desencadenar(i - 1)
		}

		if (game[i + size] === ' ' && !_abierto(i + size)) {
			desencadenar(i + size)
		}

		if (game[i + size - 1] === ' ' && !_abierto(i + size - 1)) {
			desencadenar(i + size - 1)
		}
	}
	else if (i === size * (size - 1)){ // tercera esquina
		if (game[i + 1] === ' ' && !_abierto(i + 1)) {
			desencadenar(i + 1)
		}

		if (game[i - size] === ' ' && !_abierto(i - size)) {
			desencadenar(i - size)
		}

		if (game[i - size + 1] === ' ' && !_abierto(i - size + 1)) {
			desencadenar(i - size + 1)
		}
	}
	else if (i === (size * size) - 1){ // cuarta esquina
		if (game[i - 1] === ' ' && !_abierto(i - 1)) {
			desencadenar(i - 1)
		}

		if (game[i - size] === ' ' && !_abierto(i - size)) {
			desencadenar(i - size)
		}

		if (game[i - size - 1] === ' ' && !_abierto(i - size - 1)) {
			desencadenar(i - size - 1)
		}
	}
	else if (i < size) { // primera fila
		if (game[i - 1] === ' ' && !_abierto(i - 1)) {
			desencadenar(i - 1)
		}
		if (game[i + 1] === ' ' && !_abierto(i + 1)) {
			desencadenar(i + 1)
		}
		if (game[i + size - 1] === ' ' && !_abierto(i + size - 1)) {
			desencadenar(i + size - 1)
		}
		if (game[i + size] === ' ' && !_abierto(i + size)) {
			desencadenar(i + size)
		}
		if (game[i + size + 1] === ' ' && !_abierto(i + size + 1)) {
			desencadenar(i + size + 1)
		}
	}
	else if ((i > (size * (size - 1)) - 1)) { // ultima fila
		if (game[i - 1] === ' ' && !_abierto(i - 1)) {
			desencadenar(i - 1)
		}
		if (game[i + 1] === ' ' && !_abierto(i + 1)) {
			desencadenar(i + 1)
		}
		if (game[i - size - 1] === ' ' && !_abierto(i - size - 1)) {
			desencadenar(i - size - 1)
		}
		if (game[i - size] === ' ' && !_abierto(i - size)) {
			desencadenar(i - size)
		}
		if (game[i - size + 1] === ' ' && !_abierto(i - size + 1)) {
			desencadenar(i - size + 1)
		}
	}
	else if ((i + 1) % size === 0){ // columna derecha
		if (game[i - size - 1] === ' ' && !_abierto(i - size - 1)) {
			desencadenar(i - size - 1)
		}
		if (game[i - size] === ' ' && !_abierto(i - size)) {
			desencadenar(i - size)
		}
		if (game[i - 1] === ' ' && !_abierto(i - 1)) {
			desencadenar(i - 1)
		}
		if (game[i + size] === ' ' && !_abierto(i + size)) {
			desencadenar(i + size)
		}
		if (game[i + size - 1] === ' ' && !_abierto(i + size - 1)) {
			desencadenar(i + size - 1)
		}
	}
	else if (i % size === 0) { // columna izquierda
		if (game[i + size] === ' ' && !_abierto(i + size)) {
			desencadenar(i + size)
		}
		if (game[i + size + 1] === ' ' && !_abierto(i + size + 1)) {
			desencadenar(i + size + 1)
		}
		if (game[i + 1] === ' ' && !_abierto(i + 1)) {
			desencadenar(i + 1)
		}
		if (game[i - size] === ' ' && !_abierto(i - size)) {
			desencadenar(i - size)
		}

		if (game[i - size + 1] === ' ' && !_abierto(i - size + 1)) {
			desencadenar(i - size + 1)
		}
	}
	else if ((i + 1) % size != 0 && i % size != 0){ // los del medio
		if (game[i - size - 1] === ' ' && !_abierto(i - size - 1)) {
			desencadenar(i - size - 1)
		}
		if (game[i - size] === ' ' && !_abierto(i - size)) {
			desencadenar(i - size)
		}
		if (game[i - size + 1] === ' ' && !_abierto(i - size + 1)) {
			desencadenar(i - size + 1)
		}
		if (game[i - 1] === ' ' && !_abierto(i - 1)) {
			desencadenar(i - 1)
		}
		if (game[i + 1] === ' ' && !_abierto(i + 1)) {
			desencadenar(i + 1)
		}
		if (game[i + size - 1] === ' ' && !_abierto(i + size - 1)) {
			desencadenar(i + size - 1)
		}
		if (game[i + size] === ' ' && !_abierto(i + size)) {
			desencadenar(i + size)
		}
		if (game[i + size + 1] === ' ' && !_abierto(i + size + 1)) {
			desencadenar(i + size + 1)
		}
	}
}

function abrir_alrededores(i){
	if (i === 0) { // primera esquina
		abrir(i + 1)
		abrir(i + size)
		abrir(i + size + 1)
	}
	else if (i === size - 1){ // segunda esquina
		abrir(i - 1)
		abrir(i + size)
		abrir(i + size - 1)
	}
	else if (i === size * (size - 1)){ // tercera esquina
		abrir(i - size)
		abrir(i - size + 1)
		abrir(i + 1)
	}
	else if (i === (size * size) - 1){ // cuarta esquina
		abrir(i - size)
		abrir(i - size - 1)
		abrir(i - 1)
	}
	else if (i < size) { // primera fila
		abrir(i - 1)
		abrir(i + 1)
		abrir(i + size - 1)
		abrir(i + size)
		abrir(i + size + 1)
	}
	else if ((i > (size * (size - 1)) - 1)) { // ultima fila
		abrir(i - 1)
		abrir(i + 1)
		abrir(i - size - 1)
		abrir(i - size)
		abrir(i - size + 1)
	}

	else if ((i + 1) % size === 0){ // columna derecha
		abrir(i - size)
		abrir(i + size)
		abrir(i - 1)
		abrir(i - size - 1)
		abrir(i + size - 1)
	}
	else if (i % size === 0) { // columna izquierda
		abrir(i - size)
		abrir(i - size + 1)
		abrir(i + 1)
		abrir(i + size)
		abrir(i + size + 1)
	}
	else if ((i + 1) % size != 0 && i % size != 0){ // los del medio
		abrir(i + size)
		abrir(i - size)
		abrir(i + 1)
		abrir(i - 1)
		abrir(i + size + 1)
		abrir(i + size - 1)
		abrir(i - size + 1)
		abrir(i - size - 1)
	}
}

function _abierto(i) {
	if (i === 0) {
		return(
			abrir1(i + 1) &&
			abrir1(i + size) &&
			abrir1(i + size + 1))
	}
	else if (i === size - 1){
		return(
		abrir1(i - 1) &&
		abrir1(i + size) &&
		abrir1(i + size - 1))
	}
	else if (i === size * (size - 1)){
		return(
		abrir1(i - size) &&
		abrir1(i - size + 1) &&
		abrir1(i + 1))
	}
	else if (i === (size * size) - 1){
		return(
		abrir1(i - size)&&
		abrir1(i - size - 1) &&
		abrir1(i - 1))
	}
	else if (i < size) {
		return(
		abrir1(i - 1)&&
		abrir1(i + 1)&&
		abrir1(i + size - 1)&&
		abrir1(i + size)&&
		abrir1(i + size + 1))
	}
	else if ((i > (size * (size - 1)) - 1)) {
		return(
		abrir1(i - 1)&&
		abrir1(i + 1)&&
		abrir1(i - size - 1)&&
		abrir1(i - size)&&
		abrir1(i - size + 1))
	}
	else if ((i + 1) % size === 0){
		return(
		abrir1(i - size)&&
		abrir1(i + size)&&
		abrir1(i - 1)&&
		abrir1(i - size - 1)&&
		abrir1(i + size - 1))
	}
	else if (i % size === 0) {
		return(
		abrir1(i - size)&&
		abrir1(i - size + 1)&&
		abrir1(i + 1)&&
		abrir1(i + size)&&
		abrir1(i + size + 1))
	}
	else if ((i + 1) % size != 0 && i % size != 0){
		return(
		abrir1(i + size)&&
		abrir1(i - size)&&
		abrir1(i + 1)&&
		abrir1(i - 1)&&
		abrir1(i + size + 1)&&
		abrir1(i + size - 1)&&
		abrir1(i - size + 1)&&
		abrir1(i - size - 1))
	}
}
function abrir1(i) {
	return cells[i].style.backgroundColor === abierto}