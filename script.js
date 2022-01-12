let game = []
let mina = '💣'
const div = document.querySelector(".grid")
const cells = document.getElementsByTagName('span')


generate_grid(16)
añadir_event_listeners(cells)
insertar_bombas(16, 40)
agregar_numeros_medio(16)
//llenar_esquinas()
//llenar_columnas()


function generate_grid(size) {
	div.innerHTML = "<span> </span>\n".repeat(size * size)
	div.style.gridTemplateColumns = "repeat(" + size + ", 1fr)"
}

function añadir_event_listeners(cells) {
	for(let i=0;i<cells.length;i++){
	   cells[i].addEventListener("click", function an(){clicked(i)}) // añadiendo el eventlistener para cada una de las casillas
	   cells[i].addEventListener("contextmenu", function an2(ev){ev.preventDefault(); r_clicked(i)})
	}
	function clicked(i) {
		console.log('Has pulsado el numero ' + (i));
		if (cells[i].textContent === '🚩') {}
		else {
			if (game[i] == mina) {
				// falta intentar remocer los event listeners
				setTimeout(mostrar_bombas, 1000)
				setTimeout(terminar_juego, 3000)
			}
			cells[i].textContent = game[i];
			cells[i].style.backgroundColor = 'grey'
		}
	}
	function r_clicked(i) {
		if (cells[i].style.backgroundColor !== 'grey')
			if (cells[i].textContent === '🚩')
				cells[i].textContent = ' '
			else
				cells[i].textContent = '🚩'
	}
}

function insertar_bombas(size, quantity){
	for (let i = 1; i < size * size; i++) {
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
		condicion = game[i] !== mina && i !== 0 && (i + 1) % size != 0 && i % size != 0
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

function llenar_esquinas() {
	let minas_alrededor = 0
	if (game[0] !== mina ) {
		if (game[1] === mina)
			minas_alrededor++
		if (game[size] === mina)
			minas_alrededor++
		if (game[size + 1].textContent === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			game[0] = minas_alrededor
	}
	minas_alrededor = 0
    if (game[size - 1].textContent !== mina ) {
		if (game[size - 2].textContent === mina)
			minas_alrededor++
		if (game[size + size - 1].textContent === mina)
			minas_alrededor++
		if (game[size + size - 2].textContent === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			game[size - 1].textContent = minas_alrededor
	}
    minas_alrededor = 0
    if (bombs[size * (size - 1)].textContent !== mina ) {
		if (bombs[size * (size - 1) - size].textContent === mina)
			minas_alrededor++
		if (bombs[size * (size - 1) - size + 1].textContent === mina)
			minas_alrededor++
		if (bombs[size * (size - 1) + 1].textContent === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			bombs[size * (size - 1)].textContent = minas_alrededor
	}
    minas_alrededor = 0
    if (bombs[(size * size) - 1].textContent !== mina ) {
		if (bombs[(size * size) - size - 1].textContent === mina)
			minas_alrededor++
		if (bombs[(size * size) - size - 2].textContent === mina)
			minas_alrededor++
		if (bombs[(size * size) - 2].textContent === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			bombs[(size * size) - 1].textContent = minas_alrededor
	}
}

function llenar_columnas () {
	for (i = size; i < (size * (size - 2)); i += size) {
		minas_alrededor = 0
		if (bombs[i].textContent !== mina) {
			if (bombs[i - size].textContent === mina)
				minas_alrededor++
			if (bombs[i - size + 1].textContent === mina)
				minas_alrededor++
			if (bombs[i + 1].textContent === mina)
				minas_alrededor++
			if (bombs[i + size].textContent === mina)
				minas_alrededor++
			if (bombs[i + size + 1].textContent === mina)
				minas_alrededor++
			if (minas_alrededor !== 0)
				bombs[i].textContent = minas_alrededor
		}
	}

	for (i = size + size - 1; i < (size * (size - 1)); i += size) {
		minas_alrededor = 0
		if (bombs[i].textContent !== mina) {
			if (bombs[i - size].textContent === mina)
				minas_alrededor++
			if (bombs[i - size - 1].textContent === mina)
				minas_alrededor++
			if (bombs[i - 1].textContent === mina)
				minas_alrededor++
			if (bombs[i + size].textContent === mina)
				minas_alrededor++
			if (bombs[i + size - 1].textContent === mina)
				minas_alrededor++
			if (minas_alrededor !== 0)
				bombs[i].textContent = minas_alrededor
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