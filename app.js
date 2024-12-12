const days = document.getElementById("days")
const hours = document.getElementById("hours")
const minutes = document.getElementById("minutes")
const seconds = document.getElementById("seconds")
const countdown = document.getElementById("countdown")

const currentYear = new Date().getFullYear()
// console.log(currentYear)

const concertTime = new Date(`January 19 ${2025} 00:00:00`)
// console.log(concertTime)

function updateCountdown() {
    const currentTime = new Date()
    const diff = concertTime - currentTime

    const d = Math.floor(diff / 1000 / 60 / 60 / 24)
    const h = Math.floor((diff / 1000 / 60 / 60) % 24)
    const m = Math.floor((diff / 1000 / 60) % 60)
    const s = Math.floor((diff / 1000) % 60)

    days.innerHTML = d
    hours.innerHTML = h < 10 ? '0' + h : h
    minutes.innerHTML = m < 10 ? '0' + m : m
    seconds.innerHTML = s < 10 ? '0' + s : s
}

setInterval(updateCountdown, 1000)

// ================================================================
// MUSIC PLAYER JS
const musicContainer = document.getElementById('music-container')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const album = document.getElementById('album')
const cover = document.getElementById('cover')

// SONG TITLES
// const songs = ['Everglow', 'Sunflower', 'Blinding Lights']

const songs = [
    {
        song: "A Sky Full of Stars",
        album: "Ghost Stories",
        cover: "Ghost Stories"
    },
    {
        song: "Charlie Brown",
        album: "Mylo Xyloto",
        cover: "Mylo Xyloto"
    },
    {
        song: "Adventure Of A Lifetime",
        album: "A Head Full of Dreams",
        cover: "A Head Full of Dreams"
    },
    {
        song: "feelslikeimfallinginlove",
        album: "Moon Music",
        cover: "Moon Music"
    },
    {
        song: "Viva La Vida",
        album: "Viva la Vida or Death and All his friends",
        cover: "Viva la Vida or Death and All his friends"
    },
    {
        song: "The Scientist",
        album: "A Rush of Blood to the Head",
        cover: "A Rush of Blood to the Head"
    },
    {
        song: "Hymn for the Weekend",
        album: "A Head Full of Dreams",
        cover: "A Head Full of Dreams"
    },
    {
        song: "Higher Power",
        album: "Music of the Spheres",
        cover: "Music of the Spheres"
    }
]

// KEEP TRACK OF SONGS
let songIndex = 0

// INITIALLY LOAD SONG DETAILS INTO DOM
loadSong(songs[songIndex])

// UPDATE SONG DETAILS
function loadSong(songObj) {
    title.innerHTML = songObj.song
    album.innerHTML = songObj.album
    audio.src = `assets/${songObj.song}.mp3`
    cover.src = `assets/${songObj.cover}.jpg`
}

// PLAY SONG
function playSong() {
    musicContainer.classList.add("play")
    playBtn.querySelector('i.fa').classList.remove('fa-play')
    playBtn.querySelector('i.fa').classList.add('fa-pause')
    audio.play()
}

// PAUSE SONG
function pauseSong() {
    musicContainer.classList.remove("play")
    playBtn.querySelector('i.fa').classList.add('fa-play')
    playBtn.querySelector('i.fa').classList.remove('fa-pause')
    audio.pause()
}

// PREV SONG
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

// NEXT SONG
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// UPDATE TIME 
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

// SET PROGRESS BAR
function setProgress(e) {
    const width = this.clientWidth
    const ClickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (ClickX / width) * duration
}

// EVENT LISTENERS
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// CHANGE SONG
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// TIME SONG UPDATE
audio.addEventListener('timeupdate', updateProgress)

// CLICK ON PROGRESS BAR
progressContainer.addEventListener('click', setProgress)

// SONG ENDS
audio.addEventListener("ended", nextSong)