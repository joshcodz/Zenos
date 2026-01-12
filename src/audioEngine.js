const audio = new Audio();
audio.crossOrigin = "anonymous";

const state = {
    trackIndex: Number(localStorage.getItem("music-track")) || 0,
    volume: Number(localStorage.getItem("music-volume")) || 0.7,
};

audio.volume = state.volume;

export const playlists = {
    lofi: [
        {
            title: "Lo-Fi Chill",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        {
            title: "Late Night Coding",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        },
    ],

    radio: [
        {
            title: "Chillhop Radio",
            url: "https://stream.zeno.fm/f3wvbbqmdg8uv",
        },
    ],
};

let currentPlaylist = "lofi";

function loadTrack() {
    const track = playlists[currentPlaylist][state.trackIndex];
    audio.src = track.url;
}

loadTrack();

/* ---------------- Controls ---------------- */

export function play() {
    audio.play();
}

export function pause() {
    audio.pause();
}

export function next() {
    const list = playlists[currentPlaylist];
    state.trackIndex = (state.trackIndex + 1) % list.length;
    localStorage.setItem("music-track", state.trackIndex);
    loadTrack();
    play();
}

export function setVolume(v) {
    audio.volume = v;
    state.volume = v;
    localStorage.setItem("music-volume", v);
}

export function seek(time) {
    audio.currentTime = time;
}

export function setPlaylist(name) {
    currentPlaylist = name;
    state.trackIndex = 0;
    loadTrack();
}

export function getAudio() {
    return audio;
}

export function getCurrentTrack() {
    return playlists[currentPlaylist][state.trackIndex];
}
