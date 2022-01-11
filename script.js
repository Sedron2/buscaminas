let size = 16
let minas = 40
let mina = '💣'
const div = document.querySelector(".grid")
const bombs = document.getElementsByTagName("span")


generate_grid(size)
añadir_event_listeners()
insertar_bombas()
agregar_numeros_medio()
llenar_esquinas()
llenar_columnas()



function generate_grid(size) {
	div.innerHTML = "<span> </span>\n".repeat(size * size)
	div.style.gridTemplateColumns = "repeat(" + size + ", 1fr)"
}

function insertar_bombas(){
	let cells = []
	for (let i = 1; i < size * size; i++) {
		if (minas >= 0){
			cells.push(0) // agregando los 0s en la lista
			minas -= 1
		}
		else
			cells.push(1) // llenando el resto de 1
	}

	desordernar_lista(cells)
	desordernar_lista(cells) // randomizando

	let f = 0
	for (cell of bombs) {
		if (cells[f] === 0)
			cell.textContent = mina
		f++
	} // alterando el HTML para identificar las bombas en base a la lista desordenada
}

function desordernar_lista(lista) {
	lista = lista.sort(function () {return Math.random() - 0.5})
}

function añadir_event_listeners() {
	for(let i=0;i<bombs.length;i++){
	   bombs[i].addEventListener("click", function(){clicked(i)}) // añadiendo el eventlistener para cada una de las casillas
	}
	function clicked(i) {
		console.log('Has pulsado el numero ' + (i + 1));
	}
}

function agregar_numeros_medio() {
	let i = 0
	for (cell of bombs) {
		minas_alrededor = 0;
		condicion = cell.textContent !== mina && [bombs[0], bombs[size - 1], bombs[size * (size - 1)], bombs[(size * size) - 1]] && (i + 1) % size != 0 && (i) % size != 0
		if (condicion){
			try {
			if (bombs[i - size - 1].textContent == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (bombs[i - size].textContent == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (bombs[i - size + 1].textContent == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (bombs[i - 1].textContent == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (bombs[i + 1].textContent == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (bombs[i + size - 1].textContent == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (bombs[i + size].textContent == mina)
				minas_alrededor++
			} catch(err) {}
			try {
			if (bombs[i + size + 1].textContent == mina)
				minas_alrededor++
			} catch(err) {}
		}
		i++
		if (condicion && minas_alrededor != 0)
				cell.textContent = minas_alrededor
	}
}

function llenar_esquinas() {
	let minas_alrededor = 0
	if (bombs[0].textContent !== mina ) {
		if (bombs[1].textContent === mina)
			minas_alrededor++
		if (bombs[size].textContent === mina)
			minas_alrededor++
		if (bombs[size + 1].textContent === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			bombs[0].textContent = minas_alrededor
	}
	minas_alrededor = 0
    if (bombs[size - 1].textContent !== mina ) {
		if (bombs[size - 2].textContent === mina)
			minas_alrededor++
		if (bombs[size + size - 1].textContent === mina)
			minas_alrededor++
		if (bombs[size + size - 2].textContent === mina)
			minas_alrededor++
		if (minas_alrededor !== 0)
			bombs[size - 1].textContent = minas_alrededor
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
