/* 🎵 MASTER PLAYLIST */
export const playlist = [
    { title: "Aurai - Our Dawn", file: "/music/Aurai - Our Dawn.mp3" },
    { title: "Lookz - Childhood Dreams", file: "/music/Chillstep  Lookz - Childhood Dreams.mp3" },
    { title: "Wiljan & cluda - The Unknown", file: "/music/Wiljan & cluda - The Unknown.mp3" },
];

const audio = new Audio();
audio.loop = false;

let index = Number(localStorage.getItem("music-index")) || 0;
let volume = Number(localStorage.getItem("music-volume")) || 0.8;

audio.src = playlist[index].file;
audio.volume = volume;

/* Auto next */
audio.addEventListener("ended", () => {
    next();
});

/* Controls */

export function play() {
    audio.play();
}

export function pause() {
    audio.pause();
}

export function next() {
    index = (index + 1) % playlist.length;
    audio.src = playlist[index].file;
    audio.play();
    localStorage.setItem("music-index", index);
}

export function setTrack(i) {
    index = i;
    audio.src = playlist[index].file;
    audio.play();
    localStorage.setItem("music-index", index);
}

export function seek(t) {
    audio.currentTime = t;
}

export function setVolume(v) {
    volume = v;
    audio.volume = v;
    localStorage.setItem("music-volume", v);
}

export function getAudio() {
    return audio;
}

export function getIndex() {
    return index;
}
