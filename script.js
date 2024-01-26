let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// Add this function to fill the playlist with current track information
function fillPlaylist() {
  const playlistContainer = document.querySelector("#playlist");
  // Clear previous content
  playlistContainer.innerHTML = "";

  // Add current track information to the playlist
  for (let i = 0; i < musicList.length; i++) {
    const trackElement = document.createElement("li");
    trackElement.textContent = `${i + 1}. ${musicList[i].name} - ${
      musicList[i].artist
    }`;
    playlistContainer.appendChild(trackElement);
  }
}

const musicList = [
  {
    img: "media/fehd.jpg",
    name: "BABA MIMOUN",
    artist: "FEHD BENCHEMSI",
    music: "media/x2mate.com - FEHD BENCHEMSI - BABA MIMOUN (320 kbps).mp3",
  },
  {
    img: "media/hamid.jpg",
    name: "Alhamdouchia",
    artist: "Hamid El Gnawi",
    music: "media/Alhamdouchia.mp3",
  },
  {
    img: "media/maxresdefault.jpg",
    name: "Mimouna",
    artist: "Maalem Issam",
    music:
      "media/Mimouna لالة ميمونة Maallem Issam Art ( Gnawa Audio studio  traditionnel gnaoua official ).mp3",
  },
  {
    img: "media/Oum-2286.jpg",
    name: "Lik (Acoustic Session)",
    artist: "OUM",
    music: "media/#583 #oum  - Lik (Acoustic Session).mp3",
  },
];

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = musicList[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + musicList[track_index].img + ")";
  track_name.textContent = musicList[track_index].name;
  track_artist.textContent = musicList[track_index].artist;
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + musicList.length;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  var angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
  document.body.style.background = gradient;
}
function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  let randomIndex = Math.floor(Math.random() * musicList.length);
  loadTrack(randomIndex);
  playTrack();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
  playTrack();
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
  pauseTrack();
}
function repeatTrack() {
  if (isPlaying) {
    curr_track.currentTime = 0;
  } else {
    loadTrack(track_index);
    playTrack();
  }
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
  if (track_index < musicList.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < musicList.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * musicList.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = musicList.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function openModal() {
  const modal = document.getElementById("artistModal");
  modal.style.display = "block";

  // Populate the artist list in the modal
  const artistList = document.getElementById("artistList");
  artistList.innerHTML = "";
  for (let i = 0; i < musicList.length; i++) {
    const artistItem = document.createElement("li");
    artistItem.textContent = musicList[i].artist;
    artistList.appendChild(artistItem);
  }
}

function closeModal() {
  const modal = document.getElementById("artistModal");
  modal.style.display = "none";
}

function openPlaylist() {
  const playlistWindow = document.createElement("div");
  playlistWindow.id = "playlistWindow";
  playlistWindow.className = "playlist-window";

  const closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = closePlaylist;

  const playlistList = document.createElement("ul");
  playlistList.id = "playlistList";

  for (let i = 0; i < musicList.length; i++) {
    const playlistItem = document.createElement("li");
    playlistItem.textContent = `${i + 1}. ${musicList[i].name} - ${
      musicList[i].artist
    }`;
    playlistList.appendChild(playlistItem);
  }

  playlistWindow.appendChild(closeButton);
  playlistWindow.appendChild(playlistList);

  document.body.appendChild(playlistWindow); // Append to the document body
}

function closePlaylist() {
  const playlistWindow = document.getElementById("playlistWindow");
  playlistWindow.parentNode.removeChild(playlistWindow);
}

function openPlaylist() {
  const playlistWindow = document.createElement("div");
  playlistWindow.id = "playlistWindow";
  playlistWindow.className = "playlist-window";

  const closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = closePlaylist;

  const playlistList = document.createElement("ul");
  playlistList.id = "playlistList";

  for (let i = 0; i < musicList.length; i++) {
    const playlistItem = document.createElement("li");
    playlistItem.textContent = `${i + 1}. ${musicList[i].name} - ${
      musicList[i].artist
    }`;

    playlistItem.addEventListener("click", function () {
      loadTrack(i);
      playTrack();
    });

    playlistList.appendChild(playlistItem);
  }

  playlistWindow.appendChild(closeButton);
  playlistWindow.appendChild(playlistList);

  document.body.appendChild(playlistWindow);
}

function closePlaylist() {
  const playlistWindow = document.getElementById("playlistWindow");
  playlistWindow.parentNode.removeChild(playlistWindow);
}

function openPlaylist() {
  const playlistWindow = document.createElement("div");
  playlistWindow.id = "playlistWindow";
  playlistWindow.className = "playlist-window";

  const closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = closePlaylist;

  const playlistList = document.createElement("ul");
  playlistList.id = "playlistList";

  for (let i = 0; i < musicList.length; i++) {
    const playlistItem = document.createElement("li");
    playlistItem.textContent = `${i + 1}. ${musicList[i].name} - ${
      musicList[i].artist
    }`;

    playlistItem.addEventListener("click", function () {
      loadTrack(i);
      playTrack();
    });

    // Add a hover event listener to set background color
    playlistItem.addEventListener("mouseover", function () {
      playlistItem.style.backgroundColor = getRandomBackgroundColor();
    });

    playlistItem.addEventListener("mouseout", function () {
      playlistItem.style.backgroundColor = "";
    });

    playlistList.appendChild(playlistItem);
  }

  playlistWindow.appendChild(closeButton);
  playlistWindow.appendChild(playlistList);

  document.body.appendChild(playlistWindow);
}

function closePlaylist() {
  const playlistWindow = document.getElementById("playlistWindow");
  playlistWindow.parentNode.removeChild(playlistWindow);
}

function getRandomBackgroundColor() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let color = "#";

  for (let i = 0; i < 6; i++) {
    let randomIndex = Math.round(Math.random() * 14);
    color += hex[randomIndex];
  }

  return color;
}

function openPlaylist() {
  const playlistWindow = document.createElement("div");
  playlistWindow.id = "playlistWindow";
  playlistWindow.className = "playlist-window";

  const closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.innerHTML = "&times;";
  closeButton.onclick = closePlaylist;

  const playlistList = document.createElement("ul");
  playlistList.id = "playlistList";

  for (let i = 0; i < musicList.length; i++) {
    const playlistItem = document.createElement("li");
    playlistItem.textContent = `${i + 1}. ${musicList[i].name} - ${
      musicList[i].artist
    }`;

    playlistItem.addEventListener("click", function () {
      loadTrack(i);
      playTrack();
    });

    playlistItem.addEventListener("mouseover", function () {
      playlistItem.style.backgroundColor = getRandomBackgroundColor();
    });

    playlistItem.addEventListener("mouseout", function () {
      playlistItem.style.backgroundColor = "";
    });

    playlistList.appendChild(playlistItem);
  }

  const addMusicButton = document.createElement("button");
  addMusicButton.textContent = "Add Music";
  addMusicButton.addEventListener("click", openFileInput);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "audio/*";
  fileInput.style.display = "none";
  fileInput.addEventListener("change", handleFileSelect);

  playlistWindow.appendChild(closeButton);
  playlistWindow.appendChild(playlistList);
  playlistWindow.appendChild(addMusicButton);
  playlistWindow.appendChild(fileInput);

  document.body.appendChild(playlistWindow);
}

function closePlaylist() {
  const playlistWindow = document.getElementById("playlistWindow");
  playlistWindow.parentNode.removeChild(playlistWindow);
}

function openFileInput() {
  const fileInput = document.querySelector('input[type="file"]');
  fileInput.click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const newTrack = {
      name: file.name,
      artist: "Unknown",
      music: URL.createObjectURL(file),
    };
    addTrackToPlaylist(newTrack);
  }
}

function savePlaylist() {
  localStorage.setItem("musicList", JSON.stringify(musicList));
  console.log("Playlist saved:", musicList);
}

function loadPlaylist() {
  const storedMusicList = localStorage.getItem("musicList");
  if (storedMusicList) {
    musicList = JSON.parse(storedMusicList);
    console.log("Playlist loaded:", musicList);
  }
}

function addTrackToPlaylist(newTrack) {
  musicList.push(newTrack);
  savePlaylist();
  fillPlaylist();
  console.log("Track added to playlist:", newTrack);
}

document.querySelector(".circle").addEventListener("click", openPlaylist);

function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.toLowerCase();

  const matchingSongs = musicList.filter((song) =>
    song.name.toLowerCase().includes(query)
  );

  if (matchingSongs.length > 0) {
    searchInput.value = matchingSongs[0].name;
  }
}

function searchSong() {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.toLowerCase();

  const matchingSongs = musicList.filter(
    (song) => song.name.toLowerCase() === query
  );

  if (matchingSongs.length > 0) {
    const index = musicList.indexOf(matchingSongs[0]);
    loadTrack(index);
    playTrack();
  } else {
    alert("Sorry, this song is unavailable.");
  }
}
