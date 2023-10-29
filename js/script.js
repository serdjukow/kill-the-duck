let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let score = 0
let isGameStarted = false
let $timeHeader = document.querySelector('#time-header')
let $appHeader = document.querySelector('.app__header')
let $gameTime = document.querySelector('#game-time')
let $inputEl = document.getElementById('game-time')
let $inputItem = document.querySelector('.input__item')

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxColor)
$gameTime.addEventListener('input', setGameTime)
$inputItem.addEventListener('click', input_val)

function show($el) {
	$el.classList.remove('hide')
}

function hide($el) {
	$el.classList.add('hide')
}

function startGame() {
	startPlay()
	hide($appHeader)
	score = 0
	setGameTime()
	$gameTime.setAttribute('disabled', 'true')
	isGameStarted = true
	$game.style.cursor = 'url(../images/4.png) 25 25, pointer'
	let interval = setInterval(function () {
		let time = +$time.textContent

		if (time <= 0) {
			clearInterval(interval)
			endGame()
		} else {
			$time.textContent = (time - 0.1).toFixed(1)
		}
	}, 100)

	renderBox()
}

function setGameScore() {
	$result.textContent = score.toString()
}

function input_val(event) {
	let el = event.target
	let value = +$inputEl.value

	if (isNaN(value)) value = 0
	if (el.id == 'dec') value--
	else if (el.id == 'inc') value++

	$inputEl.value = +value
	setGameTime()
}

function setGameTime() {
	let time = +$gameTime.value
	$time.textContent = time
}

function endGame() {
	isGameStarted = false
	setGameScore()
	$gameTime.removeAttribute('disabled')
	show($start)
	game.innerHTML = ''
	$game.style.backgroundColor = 'rgba(34, 34, 34, 0)'
	show($appHeader)
	$game.style.cursor = 'pointer'
}

function handleBoxColor(event) {
	if (isGameStarted) {
		soundPlay()
	}
	if (!isGameStarted) {
		return
	}
	if (event.target.dataset.box) {
		score++
		renderBox()
	}
}

function renderBox() {
	$game.innerHTML = ''
	let box = document.createElement('div')
	let boxSize = getRandom(30, 120)
	let gameSize = $game.getBoundingClientRect()
	let maxTop = gameSize.height - boxSize
	let maxLeft = gameSize.width - boxSize

	box.className = 'game__box'
	box.innerHTML =
		'<svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="duck" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-duck fa-w-16 fa-7x"><g class="fa-group"><path fill="currentColor" d="M512 128a96 96 0 0 1-96 96h-27c37.28-13.18 59-54.2 59-96z" class="fa-secondary"></path><path fill="currentColor" d="M401.31 277.43A41.38 41.38 0 0 1 384 243.8a39.9 39.9 0 0 1 5-19.8c37.28-13.18 59-54.2 59-96a96 96 0 0 0-192 0 94.05 94.05 0 0 0 22.1 60.59 41.44 41.44 0 0 1 9.9 26.53A40.88 40.88 0 0 1 247.13 256h-21.69c-31.51 0-80.18-13.2-101.68-36.24C113.74 209 96 216.17 96 230.63A153.38 153.38 0 0 0 249.38 384h-32c-76 0-138.67-55.44-150.82-128h-50.4C7 256-.63 263.66 0 272.75 8.62 388.64 105.36 480 223.43 480h107.2c55.51 0 110.81-44.52 116.72-99.71a111.23 111.23 0 0 0-46.04-102.86zM352 144a16 16 0 1 1 16-16 16 16 0 0 1-16 16z" class="fa-primary"></path></g></svg>'
	box.style.height = box.style.width = boxSize + 'px'
	box.style.position = 'absolute'
	box.style.color = '#' + (((1 << 24) * Math.random()) | 1).toString(16)
	box.style.top = getRandom(0, maxTop) + 'px'
	box.style.left = getRandom(0, maxLeft) + 'px'
	box.style.borderRadius = '50%'
	box.setAttribute('data-box', 'true')

	$game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

let startAudio = document.getElementById('startAudio')

function startPlay() {
	startAudio.play()
	duckAudio.volume = 0.5
}

let soundAudio = document.getElementById('soundAudio')
function soundPlay() {
	soundAudio.play()
}

let duckAudio = document.getElementById('duckAudio')
function duckPlay() {
	duckAudio.play()
	duckAudio.volume = 0.2
}
