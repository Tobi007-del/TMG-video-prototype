/* 
TODO: 
    make codebase objective
    next and prev video
    keyboard shortcuts shortcut
*/

//global variables
const DEFAULT_SETTINGS = {
    mediaPlayer: 'TMG',
    mediaType: 'video/audio',
    media: {
        artwork: [
            {
                src: "/TMG_MEDIA_PROTOTYPE/assets/icons/movie-tape.png"
            }
        ]
    },
    activated: true,
    initialMode: "normal",
    initialState: true,
    progressBar: false,
    beta: false,
    playbackState: null,
    keyShortcuts: true
},
//loading CSSStyleSheet
_styleCache = {},
loadCSSStyleSheet = src => {
    _styleCache[src] = _styleCache[src] || new Promise(function (resolve, reject) {
        let link = document.createElement("link")
        link.href = src
        link.rel = "stylesheet"

        link.onload = () => resolve(link)
        link.onerror = () =>  reject(new Error(`Load error for TMG CSSStylesheet`))

        document.head.append(link)
    })

    return _styleCache[src]
},
media = document.querySelectorAll("[tmgcontrols]"),
mobileMediaQuery = () => {return window.matchMedia('(max-width: 480px), (max-width: 940px) and (max-height: 480px) and (orientation: landscape)').matches},
//some general functions
clamp = (min, amount, max) => {return Math.min(Math.max(amount, min), max)},
isIterable = obj => {
    return obj !== null && obj !== undefined && typeof obj[Symbol.iterator] === 'function'
},
leadingZeroFormatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2})

if (media) {
    if (isIterable(media)) 
        for(const medium of media) {deployControls(medium)}
    else deployControls(media)
}

function deployControls(medium) { 
    if (medium.controls) {
        console.error("TMG refused to override default video controls")
        console.warn("Please remove the 'controls' attribute to deploy the TMG video controller!")
        return
    } 
    if (medium.tagName.toLowerCase() === "video") {
        const v = medium.dataset, value = medium.getAttribute('tmgcontrols').toLowerCase()
        //building controls object
        let fetchedControls, videoSettings
        if (v.tmg?.includes('.json')) {
            fetchedControls = fetch(v.tmg.toString()).then(res => {
                if (!res.ok) throw new Error(`TMG could not find JSON file!. Status: ${res.status}`)
                return res.json()
            }).catch(({message: mssg}) => {
                console.error(`${mssg} Please provide a valid JSON file`)
                fetchedControls = undefined
            })
        } else if(v.tmg) {
            console.error("File type must be in the '.json' format for TMG to read the custom settings")
        }
        (async function buildControlOptions(v) {
            const customControls = await fetchedControls ??  {} 
            let bool = () => {return customControls && Object.keys(customControls).length === 0}
            if (bool()) {
                if (v.tmgActivated) {
                    customControls.activated = JSON.parse(v.tmgActivated)
                    medium.removeAttribute("data-tmg-activated")
                }
                if (v.tmgInitialState) {
                    customControls.initialState = JSON.parse(v.tmgInitialState)
                    medium.removeAttribute("data-tmg-initial-state")
                }
                if (v.tmgInitialMode) {
                    customControls.initialMode = v.tmgInitialMode
                    medium.removeAttribute("data-tmg-initial-mode")
                }
                if (v.tmgProgressBar) {
                    customControls.progressBar =  JSON.parse(v.tmgProgressBar)
                    medium.removeAttribute("data-tmg-progress-bar")
                }
                if (v.tmgBeta) {
                    customControls.beta = JSON.parse(v.tmgBeta)
                    medium.removeAttribute("data-tmg-beta")
                }
                if (v.tmgKeyShortcuts) {
                    customControls.keyShortcuts = JSON.parse(v.tmgKeyShortcuts)
                    medium.removeAttribute("data-tmg-key-shortcuts")
                }
                if (v.tmgPreviewImagesAddress) {
                    customControls.previewImages ? customControls.previewImages.address = v.tmgPreviewImagesAddress : customControls.previewImages = {
                        address: v.tmgPreviewImagesAddress
                    }
                    medium.removeAttribute("data-tmg-preview-images-address")
                }
                if (v.tmgPreviewImagesFps) {
                    customControls.previewImages ? customControls.previewImages.fps = v.tmgPreviewImagesFps : customControls.previewImages = {
                        fps: Number(v.tmgPreviewImagesFps)
                    }
                    medium.removeAttribute("data-tmg-preview-images-fps")
                } 
                if (v.tmgMediaTitle) {
                    customControls.media ? customControls.media.title = v.tmgMediaTitle : customControls.media = {
                        title: v.tmgMediaTitle
                    }
                    medium.removeAttribute("data-tmg-media-title")
                }
                if (v.tmgMediaArtwork ?? medium.poster) {
                    customControls.media ? customControls.media.artwork = [{src: v.tmgMediaArtwork ?? medium.poster}] : customControls.media = {
                        artwork: [{src: v.tmgMediaArtwork ?? medium.poster}]
                    }
                    medium.removeAttribute("data-tmg-media-artwork")
                }
            }
            videoSettings = bool() ? DEFAULT_SETTINGS : {...DEFAULT_SETTINGS, ...customControls} 
            videoSettings.mediaType = "video"
            videoSettings.playbackState = medium.autoplay ? "playing" : "paused"
            if (value === '' || value === 'true') {
                medium.poster = videoSettings.initialState ? (medium.poster || videoSettings.media.artwork[0].src) : ""
                loadCSSStyleSheet("/TMG_MEDIA_PROTOTYPE/prototype-2/prototype-2-video.css").then(() => launchVideoController(medium, videoSettings))
                console.log(videoSettings)
            } else {
                console.error("TMG could not deploy custom controls")
                console.warn(`Consider removing the '${value}' value from the 'tmgcontrols' attribute`)
            }
        })(v)
    } else {
        console.error(`TMG could not deploy custom controls on the '${medium.tagName.toLowerCase()}' element as it is not supported`)
        console.warn("TMG only supports the 'video' element currently")
    }
}

function launchVideoController(video, videoSettings) {
    const videoContainer = document.createElement('div')
    videoContainer.classList = "video-container"
    if (!video.autoplay) videoContainer.classList.add('paused')
    if (videoSettings.initialState) videoContainer.classList.add("initial")
    if (videoSettings.initialMode) videoContainer.classList.add(videoSettings.initialMode)
    if (videoSettings.progressBar) videoContainer.classList.add("progress-bar")
    if (!(videoSettings.previewImages?.address && videoSettings.previewImages?.fps)) videoContainer.classList.add("no-previews")
    videoContainer.innerHTML = 
    `
    <!-- Code injected by TMG -->
    <div class="video-overlay-controls-container">
    <img class="thumbnail-img" alt="movie-image" src="${DEFAULT_SETTINGS.media.artwork[0].src}">
    <div class="notifiers-container" data-current-notifier="">
        <div class="notifiers play-notifier">
            <svg class="play-notifier-icon" data-tooltip-text="Play(k)" data-tooltip-position="top">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
        </div>
        <div class="notifiers pause-notifier">
            <svg class="pause-notifier-icon" data-tooltip-text="Pause(k)" data-tooltip-position="top">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
        </div>
        <div class="notifiers captions-notifier">
            <svg data-tooltip-text="Closed Captions(c)" data-tooltip-position="top">
                <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
            </svg>
        </div>
        <div class="notifiers speed-notifier"></div>
        <div class="notifiers theatre-notifier">
            <svg class="tall" data-tooltip-text="Theater Mode(t)" data-tooltip-position="top">
                <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
            </svg>
            <svg class="wide" data-tooltip-text="Normal Mode(t)" data-tooltip-position="top">
                <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
            </svg>
        </div>
        <div class="notifiers full-screen-notifier">
            <svg class="open" data-tooltip-text="Enter Full Screen(f)" data-tooltip-position="top">
                <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
            <svg class="close" data-tooltip-text="Leave Full Screen(f)" data-tooltip-position="top">
                <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
        </div>            
        <div class="notifiers volume-notifier-content"></div>
        <div class="notifiers volume-up-notifier">
            <svg class="volume-up-notifier-icon" >
                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
            </svg>
        </div>
        <div class="notifiers volume-down-notifier">
            <svg class="volume-down-notifier-icon">
                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
            </svg>
        </div>
        <div class="notifiers volume-muted-notifier">
            <svg class="volume-muted-notifier-icon">
                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
            </svg>
        </div>
        <div class="notifiers fwd-notifier">
            <svg>
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg>
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg>
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>                
        </div>
        <div class="notifiers bwd-notifier">
            <svg>
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg>
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg>
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>                
        </div>
    </div>
    <div class="mini-player-expand-btn-wrapper">
        <button type="button" class="mini-player-expand-btn" title="Expand mini-player(e)">
            <svg class="mini-player-expand-icon" viewBox="0 -960 960 960" data-tooltip-text="Expand(e)" data-tooltip-position="top">
                <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"/>
            </svg>
        </button>
    </div>
    <div class="mini-player-cancel-btn-wrapper">
        <button type="button" class="mini-player-cancel-btn" title="Remove Mini-player(r)">
            <svg class="mini-player-cancel-icon" viewBox="0 -960 960 960" data-tooltip-text="Remove(r)" data-tooltip-position="top">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        </button>
    </div>
    <div class="video-buffer"></div>
    <button type="button" class="replay-btn" title="Replay(shift + r)">
        <svg class="replay-icon" viewBox="0 -960 960 960" data-tooltip-text="Replay" data-tooltip-position="top">
            <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/>
        </svg> 
    </button>
        <button type="button" class="main-play-pause-btn" title="Play/Pause(p,l,a,y)">
            <svg class="play-icon" data-tooltip-text="Play(k)" data-tooltip-position="top">
            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        </svg>
        <svg class="pause-icon" data-tooltip-text="Pause(k)" data-tooltip-position="top">
            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
        </svg>
    </button>        
    </div>
    <div class="video-controls-container">
        <div class="timeline-container" title="'>' - 5s & Shift + '>' - 10s" tabindex="0">
            <div class="timeline">
                <div class="preview-img-container">
                    <img class="preview-img" alt="Preview-image" src="${DEFAULT_SETTINGS.media.artwork[0].src}">
                </div>
                <div class="thumb-indicator"></div>
            </div>
        </div>
        <div class="controls">
            <button type="button" class="play-pause-btn" title="Play/Pause(p,l,a,y)">
                <svg class="replay-icon" viewBox="0 -960 960 960" data-tooltip-text="Replay(shift + r)" data-tooltip-position="top">
                    <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/>
                </svg> 
                <svg class="play-icon" data-tooltip-text="Play(p,l,a,y)" data-tooltip-position="top">
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
                <svg class="pause-icon" data-tooltip-text="Pause(p,l,a,y)" data-tooltip-position="top">
                    <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                </svg>
            </button>
            <div class="volume-container">
                <button type="button" class="mute-btn" title="Toggle Volume(m)">
                    <svg class="volume-high-icon" data-tooltip-text="High Volume" data-tooltip-position="top">
                        <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                    </svg>
                    <svg class="volume-low-icon" data-tooltip-text="Low Volume" data-tooltip-position="top">
                        <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                    </svg>
                    <svg class="volume-muted-icon" data-tooltip-text="Volume Muted" data-tooltip-position="top">
                        <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                    </svg>
                </button>
                <input class="volume-slider" type="range" min="0" max="100" step="any" title="Adjust Volume - Vertical arrows">
            </div>
            <div class="duration-container">
                <div class="current-time">0.00</div>
                /
                <div class="total-time">0.00</div>
            </div>
            <button type="button" class="settings-btn" title="Toggle Settings">
                <svg class="settings-icon" viewBox="0 -960 960 960" data-tooltip-text="Settings(s)" data-tooltip-position="top">
                    <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                </svg>
            </button>
            <button type="button" class="captions-btn" title="Toggle Closed Captions(c)">
                <svg data-tooltip-text="Closed Captions(c)" data-tooltip-position="top">
                    <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
                </svg>
            </button>
            <button type="button" class="speed-btn wide-btn" title="Playback Speed(s)">1x</button>
            <button type="button" class="picture-in-picture-btn" title="Toggle Picture-in-Picture(i)">
                <svg data-tooltip-text="Picture-in-Picture(i)" data-tooltip-position="top">
                    <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
                </svg>
            </button>
            <button type="button" class="theater-btn" title="Toggle Theater Mode(t)">
                <svg class="tall" data-tooltip-text="Theater Mode(t)" data-tooltip-position="top">
                    <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
                </svg>
                 <svg class="wide" data-tooltip-text="Normal Mode(t)" data-tooltip-position="top">
                    <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
                </svg>
            </button>
            <button type="button" class="full-screen-btn" title="Toggle Full Screen(f)">
                <svg class="open" data-tooltip-text="Enter Full Screen(f)" data-tooltip-position="top">
                    <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
                <svg class="close" data-tooltip-text="Leave Full Screen(f)" data-tooltip-position="top">
                    <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
            </button>
        </div>
    </div>
    <!-- Code injected by TMG ends -->
    `

    const parentDiv = video.parentNode
    parentDiv.insertBefore(videoContainer, video)
    videoContainer.append(video)

    //DOM Elements
    const 
    replayBtn = videoContainer.querySelector(".replay-btn"), 
    playPauseBtn = videoContainer.querySelector(".play-pause-btn"),
    mainPlayPauseBtn = videoContainer.querySelector(".main-play-pause-btn"),
    theaterBtn = videoContainer.querySelector(".theater-btn"),
    fullScreenBtn = videoContainer.querySelector(".full-screen-btn"),
    pictureInPictureBtn = videoContainer.querySelector(".picture-in-picture-btn"),
    miniPlayerExpandBtn = videoContainer.querySelector(".mini-player-expand-btn"),
    miniPlayerCancelBtn = videoContainer.querySelector(".mini-player-cancel-btn"),
    muteBtn = videoContainer.querySelector(".mute-btn"),
    captionsBtn = videoContainer.querySelector(".captions-btn"),
    speedBtn = videoContainer.querySelector(".speed-btn"),
    currentTimeElem = videoContainer.querySelector(".current-time"),
    totalTimeElem = videoContainer.querySelector(".total-time"),
    previewImg = videoContainer.querySelector(".preview-img"),
    thumbnailImg = videoContainer.querySelector(".thumbnail-img"),
    volumeSlider = videoContainer.querySelector(".volume-slider"),
    previewImgContainer = videoContainer.querySelector(".preview-img-container"),
    timelineContainer = videoContainer.querySelector(".timeline-container"),
    svgs = videoContainer.querySelectorAll("svg"),
    notifiersContainer = videoContainer.querySelector(".notifiers-container"),
    speedNotifier = notifiersContainer.querySelector(".speed-notifier"),
    //some general variables
    altImgSrc = "/TMG_MEDIA_PROTOTYPE/assets/icons/movie-tape.png",
    getControlsSize = () => {return Number(getComputedStyle(videoContainer).getPropertyValue("--controls-size").replace('px', ''))},
    restraintTime = 3000,
    notifiersTransitionTime = Number(getComputedStyle(notifiersContainer).getPropertyValue("--transition-time").replace('ms', '')) + 10,
    notifierArrowsTransitionTime = Number(getComputedStyle(notifiersContainer).getPropertyValue("--arrows-transition-time").replace('ms', '')) + 10,        
    captions = video.textTracks[0],   
    preventBreak = e => e.target.src = altImgSrc,           
    //custom events for notifying user
    events = ["videoplay","videopause","volumeup","volumedown","volumemuted","captions","speed","theatre","fullScreen","fwd","bwd"],
    fire = (eventName, el = notifiersContainer, detail=null, bubbles=true, cancellable=true) => {
        let evt = new CustomEvent(eventName, {detail, bubbles, cancellable})
        el.dispatchEvent(evt)
    },
    notify = {
        init : function() {
            for(const notifier of notifiersContainer.children) {
                notifier.addEventListener('transitionend', this.resetNotifiers)
            }
            for (const event of events) {
                notifiersContainer.addEventListener(event, this)
            }
        },

        handleEvent: function(e) {
            const transitionTime = e.type === "fwd" || e.type === "bwd" ? notifierArrowsTransitionTime : notifiersTransitionTime
            if (transitionId) clearTimeout(transitionId)
            notifiersContainer.dataset.currentNotifier = e.type
            transitionId = setTimeout(this.resetNotifiers, transitionTime)
        },

        resetNotifiers: function() {
            notifiersContainer.dataset.currentNotifier = ''
        }
    },
    //Intersection Observer Setup to watch the vieo
    videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.target != video) {
                parentIntersecting = entry.isIntersecting
                toggleMiniPlayerMode()
            } else {
                videoIntersecting = entry.isIntersecting
                videoIntersecting && videoSettings.keyShortcuts ? setKeyEventListeners() : removeKeyEventListeners()
            }
        })
    }, {root: null, rootMargin: '0px', threshold: 0})   
    
    let wasPaused = !video.autoplay, 
    previousRate = video.playbackRate,
    isScrubbing = false,
    concerned = false,
    parentIntersecting = true,
    videoIntersecting = true,
    playId,
    hoverId,
    restraintId,
    restraintIdTwo, 
    smCounter = 0, 
    smCheck = false,
    speedCheck = false, 
    speedToken,
    speedTimeoutId,
    speedIntervalId,
    rewindVideoTime,
    speedPosition,
    skipDurationId = null,
    skipDuration = 0,
    currentNotifier,
    transitionId

    //initial function calls and setting of states
    controlsResize()

    //initializing video state
    if (videoSettings.activated) {
        if (videoSettings.initialState) {
            notifiersContainer.addEventListener("click", () => togglePlay(true), {once:true})
            video.addEventListener("timeupdate", initializeVideoControls, {once:true})
        } else initializeVideoControls()        
    } else {
        console.warn("You have to activate the TMG controller to access the custom controls")
        setInitialStates()
    }

    function initializeVideoControls() {
        setInitialStates()
        videoObserver.observe(videoContainer.parentElement)
        videoObserver.observe(video)      
        setEventListeners()
    }

    function setInitialStates() {
        videoContainer.querySelector(".total-time").textContent = formatDuration(video.duration)
        volumeState()
        if (captions) { 
            captions.mode = "hidden"
        } else {
            captionsBtn.classList.add("hidden")
            const n = events.findIndex(e => e === "captions")
            events.splice(n, 1)
        }
        if (videoSettings.initialState) {
            const playNotifier = notifiersContainer.querySelector(".play-notifier")
            playNotifier.classList.add("spin")
            playNotifier.addEventListener("animationend", () => {
                playNotifier.classList.remove("spin")
            }, {once: true})
            if (!video.autoplay) handlePlay()
            videoContainer.classList.remove("initial")
        }
    }

    function setKeyEventListeners() {
        if (videoSettings.keyShortcuts) {
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)
        }
    }

    function removeKeyEventListeners() {
        document.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("keyup", handleKeyUp)
    }

    function setEventListeners() {
        //Event Listeners
        //window event listeners
        window.addEventListener('resize', handleResize)

        //document event listeners
        document.addEventListener("fullscreenchange", handleFullScreenChange)
        document.addEventListener("webkitfullscreenchange", handleFullScreenChange)

        //video event listeners
        video.addEventListener("play", handlePlay)
        video.addEventListener("pause", handlePause)        
        video.addEventListener("contextmenu", e => e.preventDefault())
        video.addEventListener("waiting", () => videoContainer.classList.add("buffer"))
        video.addEventListener("playing", () => videoContainer.classList.remove("buffer"))
        video.addEventListener("ratechange", handlePlaybackChange)      
        video.addEventListener("timeupdate", handleTimeUpdate)
        video.addEventListener("volumechange", volumeState)
        video.addEventListener("loadeddata", () => totalTimeElem.textContent = formatDuration(video.duration))
        video.addEventListener("ended", () => videoContainer.classList.add("replay"))
        video.addEventListener("mousedown", handlePointerDown)
        video.addEventListener("touchstart", handlePointerDown, {passive:true})
        video.addEventListener("click", handleClick)
        video.addEventListener("dblclick", handleDoubleClick)
        video.addEventListener("enterpictureinpicture", handleEnterPip)
        video.addEventListener("leavepictureinpicture", handleLeavePip)

        //button event listeners 
        playPauseBtn.addEventListener("click", () => togglePlay())
        mainPlayPauseBtn.addEventListener("click", () => togglePlay())
        speedBtn.addEventListener("click", changePlaybackSpeed)
        captionsBtn.addEventListener("click", toggleCaptions)
        muteBtn.addEventListener("click", toggleMute)
        replayBtn.addEventListener("click", handleReplay)
        theaterBtn.addEventListener("click", toggleTheaterMode)
        fullScreenBtn.addEventListener("click", toggleFullScreenMode)
        pictureInPictureBtn.addEventListener("click", togglePictureInPictureMode)
        miniPlayerExpandBtn.addEventListener("click", () => toggleMiniPlayerMode(false, "instant"))
        miniPlayerCancelBtn.addEventListener("click", () => toggleMiniPlayerMode(false))        

        //videocontainer event listeners
        videoContainer.addEventListener("mousemove", handleMouseMove)

        //timeline contanier event listeners
        timelineContainer.addEventListener("pointerdown", handleTimelineScrubbing)
        timelineContainer.addEventListener("mousemove", handleTimelineUpdate)
        timelineContainer.addEventListener("focus", handleTimelineFocus)
        timelineContainer.addEventListener("blur", handleTimelineBlur)

        //volume event listeners
        volumeSlider.addEventListener("input", handleSliderInput)
        volumeSlider.addEventListener("mousedown", () => volumeSlider.classList.add("active"))
        volumeSlider.addEventListener("mouseup", () => volumeSlider.classList.remove("active"))
        volumeSlider.parentElement.addEventListener("mousemove", handleVolumeMouseMove)
        volumeSlider.parentElement.addEventListener("mouseup", handleVolumeMouseUp)

        //image event listeners 
        previewImg.onerror = preventBreak
        thumbnailImg.onerror = preventBreak

        //notifiers event listeners
        notify.init()
    }

    //resizing controls
    function controlsResize() {           
        let controlsSize = 25
        svgs.forEach(svg => {
            svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
            if ((!svg.classList.contains("settings-icon")) && (!svg.classList.contains("mini-player-expand-icon")) && (!svg.classList.contains("mini-player-cancel-icon")) && (!svg.classList.contains("replay-icon")))
                svg.setAttribute("viewBox", `0 0 ${controlsSize} ${controlsSize}`)
        })
    }       

    //window resizing
    function handleResize() {
        toggleMiniPlayerMode()
    }

    //Play and Pause States
    function togglePlay(bool) {
        bool ?? video.paused ? video.play() : video.pause()
    }
    
    function handlePlay() {
        for (const media of document.querySelectorAll("video, audio")) {
            if (media !== video) media.pause()
        }
        videoContainer.classList.remove("paused")
        videoSettings.playbackState = "playing"
        if ('mediaSession' in navigator) {
            if (videoSettings.media) navigator.mediaSession.metadata = new MediaMetadata(videoSettings.media)
            navigator.mediaSession.setActionHandler('play', () => togglePlay(true))
            navigator.mediaSession.setActionHandler('pause', () => togglePlay(false))
            navigator.mediaSession.setActionHandler('seekbackward', () => skip(-10))
            navigator.mediaSession.setActionHandler('seekforward', () => skip(10))
            navigator.mediaSession.playbackState = videoSettings.playbackState
        }            

    }
            
    function handlePause() {
        videoContainer.classList.add("paused")
        videoSettings.playbackState = "paused"
        if ('mediaSession' in navigator) navigator.mediaSession.playbackState = videoSettings.playbackState
    }

    function handleReplay() {
        moveVideoTime({action: "moveTo", details: {to: "start"}})
        video.play()
    }

    function restraint() {
        if (restraintId) clearTimeout(restraintId)
        restraintId = setTimeout(() => videoContainer.classList.remove("hover"), restraintTime)
    }                

    //Time Manipulation
    //Timeline
    function moveVideoTime({action, details}) {
        switch(action) {
            case "moveTo":                    
                switch(details.to) {
                    case "start":
                        video.currentTime = 0
                        break
                    case "end":
                        video.currentTime = video.duration
                        break
                    default:                        
                        video.currentTime = (Number(details.to)/Number(details.max)) * video.duration
                }
                break
        }
    }

    function handleTimelineScrubbing(e) {
        timelineContainer.setPointerCapture(e.pointerId)
        isScrubbing = true
        toggleScrubbing(e)
        timelineContainer.addEventListener("pointermove", handleTimelineUpdate)
        timelineContainer.addEventListener("pointerup", e => {
            isScrubbing = false
            toggleScrubbing(e)
            timelineContainer.removeEventListener("pointermove", handleTimelineUpdate)
            timelineContainer.releasePointerCapture(e.pointerId)
        }, { once: true })
    }
    
    function toggleScrubbing(e) {
        const rect = timelineContainer.getBoundingClientRect()
        const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
        videoContainer.classList.toggle("scrubbing", isScrubbing)
        if (isScrubbing) {
            wasPaused = video.paused
            togglePlay(false)
        } else {
            video.currentTime = percent * video.duration
            if (!wasPaused) togglePlay(true)     
        }
        handleTimelineUpdate(e)
    }

    function handleTimelineUpdate({clientX: x}) { 
        const rect = timelineContainer.getBoundingClientRect()
        const percent = clamp(x - rect.x, 0, rect.width) / rect.width
        const previewTime = formatDuration(percent * video.duration)
        const previewImgMin = (previewImgContainer.offsetWidth / 2) / rect.width
        const previewImgPercent = clamp(previewImgMin, percent, (1 - previewImgMin))
        timelineContainer.style.setProperty("--preview-position", percent)
        timelineContainer.style.setProperty("--preview-img-position", previewImgPercent)
        previewImgContainer.dataset.previewTime = previewTime  
        if (isScrubbing) timelineContainer.style.setProperty("--progress-position", percent)
        if (videoSettings.previewImages?.address && videoSettings.previewImages?.fps) {
            const previewImgNumber = Math.max(1, Math.floor((percent * video.duration) / videoSettings.previewImages.fps))
            const previewImgSrc = videoSettings.previewImages.address.replace('$', previewImgNumber)
            previewImg.src = previewImgSrc
            if (isScrubbing) thumbnailImg.src = previewImgSrc
        }
        let arrowPosition, arrowPositionMin = (videoContainer.classList.contains("theater") || videoContainer.classList.contains("full-screen")) && !mobileMediaQuery() ? getControlsSize()/3.25 : getControlsSize()/1.5 
        if (percent < previewImgMin) {
            arrowPosition = `${Math.max(percent * rect.width, arrowPositionMin)}px`
        } else if (percent > (1 - previewImgMin)) {
            arrowPosition = `${Math.min((previewImgContainer.offsetWidth/2 + (percent * rect.width) - previewImgContainer.offsetLeft), previewImgContainer.offsetWidth - arrowPositionMin - 2)}px`
        } else arrowPosition = '50%'
        previewImgContainer.style.setProperty("--preview-img-arrow-position", arrowPosition)
    }

    function handleTimelineFocus() {
        if (timelineContainer.matches(":focus-visible")) {
            removeKeyEventListeners()
            document.addEventListener("keydown", handleTimelineKeyDown)
        }
    }

    function handleTimelineKeyDown(e) {
        e.stopImmediatePropagation()
        switch (e.key.toString().toLowerCase()) {
            case "arrowleft":
            case "arrowdown":
                e.preventDefault()
                video.currentTime -= e.shiftKey ? 5 : 1
            break
            case "arrowright":
            case "arrowup":
                e.preventDefault()
                video.currentTime += e.shiftKey ? 5 : 1
            break
        }
    }

    function handleTimelineBlur() {
        document.removeEventListener('keydown', handleTimelineKeyDown)
        if(videoIntersecting && videoSettings.keyShortcuts) setKeyEventListeners()
    }

    function handleTimeUpdate() {
        currentTimeElem.textContent = formatDuration(video.currentTime)
        const percent = video.currentTime / video.duration
        timelineContainer.style.setProperty("--progress-position", percent)
        if (video.currentTime < video.duration) videoContainer.classList.remove("replay")
    }

    function formatDuration(time) {
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60) % 60
        const hours = Math.floor(time / 3600)
        if (hours === 0) return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        else return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
    }

    //Time Skips
    function skip(duration, persist = false) {
        video.currentTime += duration
        const notifier = duration > 0 ? notifiersContainer.querySelector(".fwd-notifier") : notifiersContainer.querySelector(".bwd-notifier")
        if (persist) {
            if (notifier != currentNotifier) {
                skipDuration = 0
                currentNotifier?.classList.remove('persist')
            }
            currentNotifier = notifier
            notifier.classList.add('persist')
            if ((video.currentTime !== 0 && notifier.classList.contains("bwd-notifier")) || (video.currentTime !== video.duration && notifier.classList.contains("fwd-notifier"))) {
                skipDuration += duration
            }
            if (skipDurationId) clearTimeout(skipDurationId)
            skipDurationId = setTimeout(() => {
                skipDuration = 0
                notifier.classList.remove('persist')
            }, notifierArrowsTransitionTime)
            notifier.dataset.skip = skipDuration
            return
        } 
        if ((video.currentTime === 0 && notifier.classList.contains("bwd-notifier")) || (video.currentTime === video.duration && notifier.classList.contains("fwd-notifier"))) {
            duration = 0
        }            
        notifier.dataset.skip = Math.abs(duration)
    }
            
    //Playback
    function changePlaybackSpeed() {
        let newPlaybackRate = video.playbackRate + .25
        if (newPlaybackRate > 2) newPlaybackRate = .25
        video.playbackRate = newPlaybackRate
    }
    
    function handlePlaybackChange() {
        speedBtn.textContent = `${video.playbackRate}x`
        notifiersContainer.querySelector(".speed-notifier").textContent = `${video.playbackRate}x`  
    }
    
    function speedUp(x) {
        if (!speedCheck) {
            const rect = video.getBoundingClientRect()
            speedCheck = true
            wasPaused = video.paused
            if (wasPaused) togglePlay(true)
            if (x && videoSettings.beta) {
                x - rect.left >= video.offsetWidth*0.5 ? fastForward() : rewind()
            } else fastForward()
            function fastForward() {
                speedToken = 1
                previousRate = video.playbackRate
                video.playbackRate = 2    
            }
            function rewind() {
                speedToken = 0
                notifiersContainer.querySelector(".speed-notifier").textContent = '2x'
                speedNotifier.classList.add("rewind")
                video.addEventListener("play", rewindReset)
                video.addEventListener("pause", rewindReset)
                rewindVideoTime = video.currentTime
                speedIntervalId = setInterval(rewindVideo, 20)
            }        
            speedNotifier.classList.add("active")
            videoContainer.classList.add("movement")
            if(videoSettings.beta) videoContainer.classList.add("progress-bar")
        }
    }

    function rewindVideo() {
        rewindVideoTime -= .04
        timelineContainer.style.setProperty("--progress-position",  rewindVideoTime/video.duration)
        video.currentTime -= .04
    }

    function rewindReset() {
        video.paused ? clearInterval(speedIntervalId) : speedIntervalId = setInterval(rewindVideo, 20)
    }
    
    function slowDown() {
        if (speedCheck) {
            speedCheck = false
            if (wasPaused) togglePlay(false)
            if (speedToken === 1) {
                video.playbackRate = previousRate
            } else if (speedToken === 0) {
                notifiersContainer.querySelector(".speed-notifier").textContent = `${previousRate}x`
                speedNotifier.classList.remove("rewind")
                video.removeEventListener("play", rewindReset)
                video.removeEventListener("pause", rewindReset)
                if (speedIntervalId) clearInterval(speedIntervalId)
            }
            speedNotifier.classList.remove("active")
            videoContainer.classList.remove('movement')
            if(videoSettings.beta) videoContainer.classList.remove("progress-bar")
        }
    }

    //Captions
    function toggleCaptions() {
        if (!captions) return
        const isHidden = captions.mode === "hidden"
        captions.mode = isHidden ? "showing" : "hidden"
        videoContainer.classList.toggle("captions", isHidden)
    }
            
    //Volume
    function toggleMute() {
        video.muted = !video.muted
    }

    function handleSliderInput({target}) {
        volumeHoverState()            
        video.volume = target.value / 100
        video.muted = target.value === 0
    }
                
    function volumeState() {
        let { min, max, value } = volumeSlider
        value = (video.volume * 100).toFixed()
        notifiersContainer.querySelector(".volume-notifier-content").dataset.volume = value
        let volumeLevel = ""
        if (video.muted || value == 0) {
            value = 0
            volumeLevel = "muted"
        } else if (value > (max/2)) 
            volumeLevel = "high"
        else 
            volumeLevel = "low"
        let volumePercent = (value-min) / (max - min)
        let volumeSliderPercent = `${12 + (volumePercent * 77)}%`
        volumeSlider.value = value
        volumeSlider.dataset.volume = `${value}`
        volumeSlider.style.setProperty("--volume-slider-percent", volumeSliderPercent)
        videoContainer.style.setProperty("--volume-percent", volumePercent)
        videoContainer.dataset.volumeLevel = volumeLevel
    }

    function volumeChange(type, value) {
        const n = value / 100
        switch(type) {
            case "increment":
                if ((video.volume*100).toFixed() == 100-value) {
                    video.volume = 1
                    fire("volumeup")
                    break
                }
                if ((video.volume*100).toFixed() < 100) video.volume += ((video.volume*100).toFixed()%value) ? (n - video.volume%n).toFixed(2) : n 
                fire("volumeup")
                break
            case "decrement":
                if (video.volume == 0 || (video.volume*100).toFixed() == value) {
                    video.volume = 0
                    fire("volumemuted")
                    break
                }
                if (video.volume) video.volume -= ((video.volume*100).toFixed()%value) ? (video.volume%n) : n   
                fire("volumedown")
                break
        }
    }

    function handleVolumeMouseMove() {
        if (hoverId) clearTimeout(hoverId)
        hoverId = setTimeout(() => {
            if (volumeSlider.parentElement.matches(':hover')) {
                volumeSlider.parentElement.classList.add("hover")
                volumeHoverState()
            }
        }, 250)
    }

    function volumeHoverState() {
        if (restraintIdTwo) clearTimeout(restraintIdTwo)
        restraintIdTwo = setTimeout(() => volumeSlider.parentElement.classList.remove("hover"), restraintTime)  
    }

    function handleVolumeMouseUp() {
        if (hoverId) clearTimeout(hoverId)
    }

    //theatre mode
    function toggleTheaterMode() {
        videoContainer.classList.toggle("theater")
    }
    
    //full-screen mode
    function toggleFullScreenMode() {
        if (!videoContainer.classList.contains("picture-in-picture")) {
            if (document.fullscreenElement == null) {
                if (screen.orientation && screen.orientation.lock && screen.orientation.type.startsWith("portrait")) {  
                    screen.orientation.lock('landscape')
                    .then(() => console.log('Video was changed to fullscreen so orientation was locked to landscape.'))
                    .catch(error => console.error('Failed to lock orientation:', error))
                }  
                videoContainer.requestFullscreen()
            } else {
                if (screen.orientation && screen.orientation.lock)
                    screen.orientation.unlock()
                document.exitFullscreen()
            }    
        }        
    }

    function handleFullScreenChange() {
        videoContainer.classList.toggle("full-screen", document.fullscreenElement)            
        if (videoContainer.classList.contains("mini-player") && videoContainer.classList.contains("full-screen")) videoContainer.classList.remove("mini-player")
    }        

    //picture-in-picture mode
    function togglePictureInPictureMode() {
        videoContainer.classList.contains("picture-in-picture") ? document.exitPictureInPicture() : video.requestPictureInPicture()
    } 

    function handleEnterPip() {
        videoContainer.classList.add("picture-in-picture")
        toggleMiniPlayerMode(false)
    }

    function handleLeavePip() {
        videoContainer.classList.remove("picture-in-picture")
        toggleMiniPlayerMode()
    }        

    //mini player mode
    function toggleMiniPlayerMode(bool, behaviour) {
    const threshold = 240
    if (!document.fullscreenElement) {
        if (bool === false) {
            if (behaviour) {
                concerned = true
                window.scrollTo({
                    top: videoContainer.parentNode.offsetTop,
                    left: 0,
                    behavior: behaviour,
                })                    
            }
            removeMiniPlayer()
            return
        }
        if ((!videoContainer.classList.contains("mini-player") && !video.paused && window.innerWidth >= threshold && !document.pictureInPictureElement && !parentIntersecting) || (bool === true)) {
            videoContainer.classList.add("mini-player")
            videoContainer.addEventListener("mousedown", moveMiniPlayer)
            videoContainer.addEventListener("touchstart", moveMiniPlayer, {passive: false})
            return
        } 
        if ((videoContainer.classList.contains("mini-player") && parentIntersecting) || (videoContainer.classList.contains("mini-player") && window.innerWidth < threshold)) cleanUpMiniPlayer()
        function removeMiniPlayer() {
            cleanUpMiniPlayer()
            if (!video.paused && !concerned) togglePlay(false)
            concerned = false
        }                
        function cleanUpMiniPlayer() {
            videoContainer.classList.remove("mini-player")
            videoContainer.removeEventListener("mousedown", moveMiniPlayer)
            videoContainer.removeEventListener("touchstart", moveMiniPlayer, {passive: false})
        }            
    }
    }    

    function moveMiniPlayer(e){
        if (videoContainer.classList.contains("mini-player")) {
        if (!e.target.classList.contains("timeline-container") && !e.target.classList.contains("timeline") && !e.target.classList.contains("timeline-container") && e.target.tagName.toLowerCase() != "button" && e.target.tagName.toLowerCase() != "input") {
            videoContainer.addEventListener("mousemove", handleMiniPlayerPosition)
            videoContainer.addEventListener("mouseup", emptyListeners, {once: true})
            videoContainer.addEventListener("mouseleave", emptyListeners, {once: true})
            videoContainer.addEventListener("touchmove", handleMiniPlayerPosition, {passive: false})
            videoContainer.addEventListener("touchend", emptyListeners, {once: true, passive: false})
        }

        function emptyListeners() {
            videoContainer.classList.remove("movement")
            videoContainer.classList.add("hover")
            restraint()
            videoContainer.removeEventListener("mousemove", handleMiniPlayerPosition)
            videoContainer.removeEventListener("mouseup", emptyListeners, {once: true})
            videoContainer.removeEventListener("mouseleave", emptyListeners, {once: true})
            videoContainer.removeEventListener("touchmove", handleMiniPlayerPosition, {passive: false})
            videoContainer.removeEventListener("touchend", emptyListeners, {once: true, passive: false})
        }

        function handleMiniPlayerPosition(e) {
            e.preventDefault()
            videoContainer.classList.add("movement")
            const x = e.clientX ?? e.changedTouches[0].clientX,
            y = e.clientY ?? e.changedTouches[0].clientY,
            {innerWidth: ww, innerHeight: wh} = window,
            {offsetWidth: w, offsetHeight: h} = videoContainer,
            xR = 0,
            yR = 0,
            posX = clamp(xR, ww - x - w/2, ww - w - xR),
            posY = clamp(yR, wh - y - h/2, wh - h - yR)
            videoContainer.style.setProperty("--mouse-x", `${(posX/ww * 100).toFixed()}%`)
            videoContainer.style.setProperty("--mouse-y", `${(posY/wh * 100).toFixed()}%`)
        }
    }            
    }        

    //Keyboard and General Accessibility Functions
    function handleClick() {
        if (playId) clearTimeout(playId)
        playId = setTimeout(() => {
            if (!(speedCheck && smCounter < 1))  togglePlay()
            handleMouseMove()
        }, 300)
    }

    function handleDoubleClick({clientX: x}) {
        if (playId) clearTimeout(playId)
        const rect = video.getBoundingClientRect()
        if (((x-rect.left) > (video.offsetWidth*0.65))) {
            skip(10, true)
        } else if ((x-rect.left) < (video.offsetWidth*0.35)) {
            skip(-10, true)
        } else toggleFullScreenMode()
    }

    function handleMouseMove() {
        videoContainer.classList.add("hover")
        restraint()
    }

    function handleKeyDown(e) {
        const tagName = document.activeElement.tagName.toLowerCase()

        if (tagName === "input") return

        switch (e.key.toString().toLowerCase()) {
            case " ":
                if (tagName === "button") return
                e.preventDefault()
            case "p":
            case "l":
            case "a":
            case "y":
            case "k":
                smCounter ++
                if (smCounter === 1) document.addEventListener("keyup", playTriggerUp)
                if (smCounter === 2 && !smCheck) speedUp()
                break
            case "arrowleft":
                e.preventDefault()
                e.shiftKey ? skip(-10) : skip(-5)
                fire("bwd")
                break
            case "arrowright":
                e.preventDefault()
                e.shiftKey ? skip(10) : skip(5)
                fire("fwd")
                break
            case "arrowup":
                e.preventDefault()
                volumeChange("increment", 5)
                break
            case "arrowdown":
                e.preventDefault()
                volumeChange("decrement", 5)
                break
            case "home":
                e.preventDefault()
            case "0":
                moveVideoTime({action: "moveTo", details: {to: "start"}})
                break
            case "end":
                e.preventDefault()
                moveVideoTime({action: "moveTo", details: {to: "end"}})
                break
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                moveVideoTime({action: "moveTo", details: {to: e.key, max: 9}})
                break                
        }
    }        

    function handleKeyUp(e) {
        const tagName = document.activeElement.tagName.toLowerCase()

        if (tagName === "input") return

        switch (e.key.toString().toLowerCase()) {
            case "f":
                toggleFullScreenMode()
                fire("fullScreen")
                break
            case "t":
                if (!mobileMediaQuery() && !videoContainer.classList.contains("mini-player") && !videoContainer.classList.contains("full-screen")) {
                    toggleTheaterMode()
                    fire("theatre")
                }
                break
            case "e":
                e.shiftKey ?  toggleMiniPlayerMode(false, "smooth") : toggleMiniPlayerMode(false, "instant")
                break
            case "r":
                e.shiftKey ? handleReplay() : toggleMiniPlayerMode(false) 
                break
            case "i":
                if (!e.shiftKey) togglePictureInPictureMode()
                break
            case "m":
                toggleMute()
                video.muted ? fire("volumemuted") : fire("volumeup")
                break
            case "s": 
                changePlaybackSpeed()
                fire("speed")
                break
            case "c":
                toggleCaptions()
                fire("captions")
                break
        }
    }

    function playTriggerUp(e) {
        const tagName = document.activeElement.tagName.toLowerCase()
        
        if (tagName === "input") return
        
        switch (e.key.toString().toLowerCase()) {
            case " ":
                if (tagName === "button") return
                e.preventDefault()                
            case "p":
            case "l":
            case "a":
            case "y":
            case "k":                        
                e.stopImmediatePropagation()
                if (smCounter === 1) {
                    togglePlay()
                    video.paused ? fire("videopause") : fire("videoplay") 
                }
            default:
                if (speedCheck && smCounter > 1 && !smCheck) slowDown()
                smCounter = 0
        }
        document.removeEventListener("keyup", playTriggerUp)
    }     

    function handlePointerDown(e) {
        if (!videoContainer.classList.contains("mini-player")) {
            videoContainer.addEventListener("mouseup", handlePointerUp)
            videoContainer.addEventListener("mouseleave", handlePointerUp)                
            videoContainer.addEventListener("touchend", handlePointerUp)
            if (videoSettings.beta) {
            videoContainer.addEventListener("mousemove", handlePointerMove)
            videoContainer.addEventListener("touchmove", handlePointerMove, {passive: true})
            }
            smCheck = true
            const x = e.clientX ?? e.changedTouches[0].clientX
            speedTimeoutId = videoSettings.beta ? setTimeout(speedUp, 1000, x) : setTimeout(speedUp, 1000)
            const rect = video.getBoundingClientRect()
            speedPosition = x - rect.left >= video.offsetWidth * 0.5 ? "right" : "left"
            function handlePointerMove(e) {
                if (videoSettings.beta) {
                const x = e.clientX ?? e.changedTouches[0].clientX
                const currPos = x - rect.left >= video.offsetWidth * 0.5 ? "right" : "left"
                if (currPos !== speedPosition) {
                    speedPosition = currPos
                    slowDown()
                    setTimeout(speedUp, 0, x)
                }
                }
            }
            function handlePointerUp() {
                videoContainer.removeEventListener("mouseup", handlePointerUp)
                videoContainer.removeEventListener("mouseleave", handlePointerUp)      
                videoContainer.removeEventListener("touchend", handlePointerUp)
                if (videoSettings.beta) {
                videoContainer.removeEventListener("mousemove", handlePointerMove)              
                videoContainer.removeEventListener("touchmove", handlePointerMove, {passive: true})
                }
                smCheck = false
                if (speedTimeoutId) clearTimeout(speedTimeoutId)
                if (speedCheck && smCounter < 1) slowDown()                        
            }
        }
    }    
}
