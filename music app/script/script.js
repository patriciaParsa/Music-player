const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev-button'),
    nextBtn = document.getElementById('next-button'),
    playBtn = document.getElementById('play-button'),
    pauseBtn = document.getElementById('pause-button'),
    background = document.getElementById('background');

const music = new Audio();

const songs = [

    {
        path: 'assets/audio/amies - Fireflies.mp3',
        displayName: 'Fireflies',
        cover: 'assets/pictures/amies_fireflies.jpg',
        artist: 'Amies',
    },
    {
        path: 'assets/audio/Casiio - Passing By.mp3',
        displayName: 'Passing By',
        cover: 'assets/pictures/cassio_passing_by.jpg',
        artist: 'Casiio',
    },
    {
        path: 'assets/audio/Hevi - Morning Brew.mp3',
        displayName: 'Morning Brew',
        cover: 'assets/pictures/hevi_morning_brew.jpg',
        artist: 'Hevi',
    },
    {
        path: 'assets/audio/Peak Twilight - Magical Connection.mp3',
        displayName: 'Magical Connection',
        cover: 'assets/pictures/magical_connection.jpg',
        artist: 'Peak Twilight',
    },
    {
        path: 'assets/audio/ticofaces - Arrival.mp3',
        displayName: 'Arrival',
        cover: 'assets/pictures/ticofaces_arrival.jpg',
        artist: 'ticofaces',
    },
    {
        path: 'assets/audio/trxxshed - Ivory.mp3',
        displayName: 'Ivory',
        cover: 'assets/pictures/trxxshed_ivory.jpg',
        artist: 'trxxshed',
    },

];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {

    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

