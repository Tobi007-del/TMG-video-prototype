const videos = document.querySelectorAll("video")
const mobileThreshold = 480
function clamp(min, amount, max) {return Math.min(Math.max(amount, min), max)}

videos.forEach(video => {
    if (video.dataset.controls === "tmg-controls") {
        const videoContainer = document.createElement('div')
        videoContainer.classList = "video-container"
        videoContainer.innerHTML = 
        `
        <img class="thumbnail-img" alt="movie-image">
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
                <svg data-tooltip-text="Play(k)" data-tooltip-position="top">
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
                <svg data-tooltip-text="Play(k)" data-tooltip-position="top">
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
                <svg data-tooltip-text="Play(k)" data-tooltip-position="top">
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>                
            </div>
            <div class="notifiers bwd-notifier">
                <svg data-tooltip-text="Play(k)" data-tooltip-position="top">
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
                <svg data-tooltip-text="Play(k)" data-tooltip-position="top">
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
                <svg data-tooltip-text="Play(k)" data-tooltip-position="top">
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
        <div class="buffer-container">
            <div class="ground-buffer"></div>
            <div class="middle-buffer"></div>
            <div class="top-buffer"></div>
        </div>
        <button type="button" class="replay-btn" title="Replay">
            <svg class="replay-icon" viewBox="0 -960 960 960" data-tooltip-text="Replay" data-tooltip-position="top">
                <path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/>
            </svg> 
        </button>
        <div class="video-controls-container">
            <div class="timeline-container" title="'>' - 5s & Shift + '>' - 10s">
                <div class="timeline">
                    <div class="preview-img-container"><img class="preview-img" alt="Preview-image"></div>
                    <div class="thumb-indicator"></div>
                </div>
            </div>
            <div class="controls">
                <button type="button" class="play-pause-btn" title="Play/Pause(p,l,a,y)">
                    <svg class="play-icon" data-tooltip-text="Play(k)" data-tooltip-position="top">
                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                    <svg class="pause-icon" data-tooltip-text="Pause(k)" data-tooltip-position="top">
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
                <button type="button" class="captions-btn" title="Toggle Closed Captions(c)">
                    <svg data-tooltip-text="Closed Captions(c)" data-tooltip-position="top">
                        <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
                    </svg>
                </button>
                <button type="button" class="settings-btn" title="Toggle Settings">
                    <svg class="settings-icon" viewBox="0 -960 960 960" data-tooltip-text="Settings(s)" data-tooltip-position="top">
                        <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
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
        `
        const parentDiv = video.parentNode
        parentDiv.insertBefore(videoContainer, video)
        videoContainer.append(video)

        const replayBtn = videoContainer.querySelector(".replay-btn"), 
        playPauseBtn = videoContainer.querySelector(".play-pause-btn"),
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
        notifiersContainer = videoContainer.querySelector(".notifiers-container")

        //putting a big play button on the video only on page startup
        videoContainer.querySelector(".video-controls-container").style.opacity = 0
        const playNotifier = videoContainer.querySelector(".play-notifier")
        playNotifier.style.animation = "beat 1s infinite ease-out"

        //some general variables
        let wasPaused = !video.autoplay
        let previousRate = video.playbackRate
        
        video.addEventListener("play", () => {
            videoContainer.querySelector(".video-controls-container").style.opacity = ""
            videoContainer.querySelector(".video-controls-container").style.pointerEvents = "all"
            const playNotifier = document.querySelector(".play-notifier")
            playNotifier.style.animation = ""
            if (window.innerWidth <= mobileThreshold) {
                playbtnPosition()
                playNotifier.style.setProperty('display', 'none', 'important')
            }
        }, { once: true })

        //resizing controls
        function controlsResize() {           
            let controlsSize = 25
            svgs.forEach(svg => {
                svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
                if(!svg.classList.contains("settings-icon"))
                if(!svg.classList.contains("mini-player-expand-icon"))  
                if(!svg.classList.contains("mini-player-cancel-icon"))
                if(!svg.classList.contains("replay-icon")) 
                    svg.setAttribute("viewBox", `0 0 ${controlsSize} ${controlsSize}`)
            })
        }
        controlsResize()
        
        timelineContainer.addEventListener("pointerdown", e => {
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
        })
        
        let isScrubbing = false
        function toggleScrubbing(e) {
            const rect = timelineContainer.getBoundingClientRect()
            const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
            videoContainer.classList.toggle("scrubbing", isScrubbing)
            if (isScrubbing) {
                wasPaused = video.paused
                togglePlay(false)
            } else {
                video.currentTime = percent * video.duration
                if(!wasPaused) togglePlay(true)     
            }
        
            handleTimelineUpdate(e)
        }
         
        function handleTimelineUpdate(e) { 
            const rect = timelineContainer.getBoundingClientRect()
            const percent = clamp(e.clientX - rect.x, 0, rect.width) / rect.width
            const previewImgMin = (previewImg.offsetWidth / 2) / rect.width
            const previewImgPercent = clamp(previewImgMin, percent, (1 - previewImgMin))
            const previewImgNumber = Math.max(1, Math.floor((percent * video.duration) / 10))
            const previewImgSrc = `../assets/previewImgs/preview${previewImgNumber}.jpg`
            const previewTime = parseInt(percent * video.duration) > 0 ? formatDuration(percent * video.duration) : ''
            previewImg.src = previewImgSrc
            timelineContainer.style.setProperty("--preview-position", percent)
            timelineContainer.style.setProperty("--preview-img-position", previewImgPercent)
            previewImgContainer.dataset.previewTime = previewTime  
            if(isScrubbing) {
                thumbnailImg.src = previewImgSrc
                timelineContainer.style.setProperty("--progress-position", percent)
            }
        }
                
        function changePlaybackSpeed() {
            let newPlaybackRate = video.playbackRate + .25
            if (newPlaybackRate > 2) newPlaybackRate = .25
            video.playbackRate = newPlaybackRate
        }
        
        function handlePlaybackChange() {
            speedBtn.textContent = `${video.playbackRate}x`
            notifiersContainer.querySelector(".speed-notifier").textContent = `${video.playbackRate}x`  
        }

        //Captions
        const captions = video.textTracks[0]
        captions.mode = "hidden"
                
        function toggleCaptions() {
            const isHidden = captions.mode === "hidden"
            captions.mode = isHidden ? "showing" : "hidden"
            videoContainer.classList.toggle("captions", isHidden)
        }
    
        function handleTimeUpdate() {
            currentTimeElem.textContent = formatDuration(video.currentTime)
            const percent = video.currentTime / video.duration
            timelineContainer.style.setProperty("--progress-position", percent)
            if(video.currentTime < video.duration)videoContainer.classList.remove("replay")
        }
        
        const leadingZeroFormatter = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2})
        
        function formatDuration(time) {
            const seconds = Math.floor(time % 60)
            const minutes = Math.floor(time / 60) % 60
            const hours = Math.floor(time / 3600)
            if(hours === 0)
                return `${minutes}:${leadingZeroFormatter.format(seconds)}`
            else 
                return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
        }
                
        function toggleMute() {
            video.muted = !video.muted
        }

        function handleSliderInput(e) {
            video.volume = e.target.value / 100
            video.muted = e.target.value === 0
        }
                    
        function volumeState() {
            let { min, max, value, offsetWidth } = volumeSlider
            value = (video.volume * 100).toFixed()
            notifiersContainer.querySelector(".volume-notifier-content").dataset.volume = value
            let volumeLevel = ""
            if (video.muted || value == 0) {
                value = 0
                volumeLevel = "muted"
            } else if (value > (max/2)) {
                volumeLevel = "high"
            }
            else {
                volumeLevel = "low"
            }
            let volumePosition = `${((value - min) / (max - min)) * ((offsetWidth - 5) > 0 ? (offsetWidth - 5) : 40.5)}px`
            let volumePercent = `${((value-min) / (max - min)) * 100}%`
            volumeSlider.value = value
            volumeSlider.dataset.volume = `${value}`
            volumeSlider.style.setProperty("--volume-position", volumePosition)
            volumeSlider.style.setProperty("--volume-percent", volumePercent)
            videoContainer.dataset.volumeLevel = volumeLevel
        }
        
        volumeState()
                
        function handleReplay() {
            video.currentTime = 0
            video.play()
            videoContainer.classList.remove("replay")
        }

        let durationId = null
        let pValue = 0
        let currentNotifier
        //a function for time skips
        function skip(duration, persist = false) {
            if (!videoContainer.classList.contains("replay")) {

            }
            video.currentTime += duration
            const notifier = duration > 0 ? notifiersContainer.querySelector(".fwd-notifier") : notifiersContainer.querySelector(".bwd-notifier")
            if (persist) {
                const transitionTime = Number(getComputedStyle(notifiersContainer).getPropertyValue("--dbc-transition-time").replace('ms', '')) + 10
                if (notifier != currentNotifier) {
                    pValue = 0
                    currentNotifier?.classList.remove('persist')
                }
                currentNotifier = notifier
                notifier.classList.add('persist')
                pValue += Math.abs(duration)
                if ((video.currentTime === 0 && notifier.classList.contains("bwd-notifier")) || (video.currentTime === video.duration && notifier.classList.contains("fwd-notifier"))) {
                    pValue = 0
                }
                if (durationId) clearTimeout(durationId)
                durationId = setTimeout(() => {
                    pValue = 0
                    notifier.classList.remove('persist')
                }, transitionTime)
                notifier.dataset.skip = pValue
                return
            } 
            if ((video.currentTime === 0 && notifier.classList.contains("bwd-notifier")) || (video.currentTime === video.duration && notifier.classList.contains("fwd-notifier"))) {
                duration = 0
            }            
            notifier.dataset.skip = Math.abs(duration)
        }

        //a fnction to handle double tap to skip
        function doubletapToSkip(e) {
            const rect = video.getBoundingClientRect()
            if (((e.clientX-rect.left) > (video.offsetWidth*0.65))) {
                skip(10, true)
            } else if ((e.clientX-rect.left) < (video.offsetWidth*0.35)) {
                skip(-10, true)
            }
        }

        function tapHandler() {
        if ((navigator.maxTouchPoints > 0) && (window.innerWidth < (mobileThreshold+300))) {
            video.removeEventListener("dblclick", toggleFullScreenMode)
            video.addEventListener("dblclick", doubletapToSkip)
        } else {
            video.removeEventListener("dblclick", doubletapToSkip)
            video.addEventListener("dblclick", toggleFullScreenMode)
        }
        }
        tapHandler()   

        function expandMiniPlayer() {
            concerned = true
            toggleMiniPlayerMode(false)
            window.scroll({
                top: videoContainer.parentNode.offsetTop,
                left: 0,
                behavior: "instant",
            })
        }

        function toggleTheaterMode() {
            videoContainer.classList.toggle("theater")
        }
        
        function toggleFullScreenMode() {
            if (document.fullscreenElement == null) {
                if (screen.orientation && screen.orientation.lock && screen.orientation.type.startsWith("portrait")) {  
                    screen.orientation.lock('landscape')
                    .then(() => console.log('Video was changed to fullscreen so orientation was locked to landscape.'))
                    .catch(error => console.error('Failed to lock orientation:', error))
                }  
                videoContainer.requestFullscreen()
            } else {
                if (screen.orientation && screen.orientation.lock) {  
                    screen.orientation.unlock()
                }
                document.exitFullscreen()
            }
        }

        function togglePictureInPictureMode() {
            if(videoContainer.classList.contains("picture-in-picture")) {
                document.exitPictureInPicture()
            } else {
                video.requestPictureInPicture()
            }
        } 

        //a variable to check if the user is concerned in the current video while in mini-player mode
        let concerned = false
        function toggleMiniPlayerMode(bool = true) {
        const threshold = 240
        if(!document.fullscreenElement) {
            if (!bool) {
                cleanUpMiniPlayer()
                if(!video.paused && !concerned) togglePlay(false)
                concerned = false
                return
            }
            if (!video.paused && window.innerWidth >= threshold && !document.pictureInPictureElement && !intersect) {
                videoContainer.classList.add("mini-player")
                videoContainer.addEventListener("mousedown", moveMiniPlayer)
                videoContainer.addEventListener("touchstart", moveMiniPlayer, {passive: false})
                miniPlayerBtnPosition()
            } 
            if ((videoContainer.classList.contains("mini-player") && intersect) || (videoContainer.classList.contains("mini-player") && window.innerWidth < threshold)) cleanUpMiniPlayer()
            function cleanUpMiniPlayer() {
                videoContainer.classList.remove("mini-player")
                videoContainer.removeEventListener("mousedown", moveMiniPlayer)
                videoContainer.removeEventListener("touchstart", moveMiniPlayer, {passive: false})
                playbtnPosition()
            }            
            volumeState()
        }
        }
        
        //Intersection Observer Setup to watch the video
        let intersect = false
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.target != video) {
                    intersect = entry.isIntersecting
                    toggleMiniPlayerMode()
                } else {
                    if (entry.isIntersecting) {
                        document.addEventListener("keydown", handleSpaceBarDown)
                        document.addEventListener("keydown", handleKeyDown)
                    }
                    else {
                        document.removeEventListener("keydown", handleSpaceBarDown)
                        document.removeEventListener("keydown", handleKeyDown)
                    }
                }
        })
        }, {root: null, rootMargin: '0px', threshold: 0})
        videoObserver.observe(videoContainer.parentElement)
        videoObserver.observe(video)

        let scounter = 0, speedCheck = false, speedId
        const speedNotifier = notifiersContainer.querySelector(".speed-notifier")
        
        function speedUp() {
            speedCheck = true
            wasPaused = video.paused
            previousRate = video.playbackRate
            if(wasPaused) togglePlay(true)
            video.playbackRate = 2
            speedNotifier.classList.add("active")
            videoContainer.classList.add("movement")
        }

        function slowDown() {
            speedCheck = false
            if(wasPaused) togglePlay(false)
            video.playbackRate = previousRate
            speedNotifier.classList.remove("active")
            videoContainer.classList.remove('movement')
        }

        function handleSpaceBarDown(e) {
            const tagName = document.activeElement.tagName.toLowerCase()
            if (tagName === "input") return

            if (e.key === " ") {
                if(tagName === "button") return
                e.stopImmediatePropagation()
                e.preventDefault()
                scounter ++
                if(scounter === 1) document.addEventListener("keyup", handleSpaceBarUp, {once:true})
                if(scounter === 2) speedUp()
            }

            function handleSpaceBarUp() {
                if (scounter === 1) {
                    togglePlay()
                    video.paused ? fire("videopause") : fire("videoplay") 
                }
                if (speedCheck && scounter > 1) slowDown()
                scounter = 0
            }            
        }

        function handlePointerDown() {
            if (!videoContainer.classList.contains("mini-player")) {
                videoContainer.addEventListener("pointerup", handlePointerUp, {once:true})
                videoContainer.addEventListener("pointerleave", handlePointerUp, {once:true})
                speedId = setTimeout(speedUp, 500)
                function handlePointerUp(e) {
                    if(speedId) clearTimeout(speedId)
                    if(speedCheck && scounter < 1) slowDown()
                    else {
                        const rect = video.getBoundingClientRect()
                        if (((e.clientX-rect.left) > (video.offsetWidth*0.35)) && ((e.clientX-rect.left) < (video.offsetWidth*0.75))) {
                            togglePlay()
                            video.paused ? fire("videopause") : fire("videoplay") 
                        } else if(window.innerWidth > (mobileThreshold+300)) {
                            togglePlay()  
                            video.paused ? fire("videopause") : fire("videoplay")               
                        }            
                    }
                    videoContainer.removeEventListener("pointerup", handlePointerUp, {once:true})
                    videoContainer.removeEventListener("pointerleave", handlePointerUp, {once:true})
                }                
            }
        }

        function handleKeyDown(e) {
            const tagName = document.activeElement.tagName.toLowerCase()
            
            if(tagName === "input") return
            
            switch (e.key.toLowerCase()) {
                case "p":
                case "l":
                case "a":
                case "y":
                case "k":
                    togglePlay()
                    video.paused ? fire("videopause") : fire("videoplay")
                    break
                case "f":
                    toggleFullScreenMode()
                    fire("fullScreen")
                    break
                case "t":
                    if (window.innerWidth > mobileThreshold || !videoContainer.contains('.mini-player')) {
                        toggleTheaterMode()
                        fire("theatre")
                    }
                    break
                case "e":
                    expandMiniPlayer()
                    break
                case "r":
                    toggleMiniPlayerMode(false)
                    break
                case "i":
                    if(!e.shiftKey) togglePictureInPictureMode()
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
                case "arrowleft":
                    skip(-5)
                    if(e.shiftKey) skip(-10)
                    fire("bwd")
                    break
                case "arrowright":
                    skip(5)
                    if(e.shiftKey) skip(10)
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
            }
        }        
        
        function volumeChange(type, value) {
            const n = value / 100
            switch(type) {
                case "increment":
                    if ((video.volume*100).toFixed() == 95) {
                        video.volume = 1
                        fire("volumeup")
                        break
                    }
                    if((video.volume*100).toFixed() < 100) video.volume += ((video.volume*100).toFixed()%value) ? (n - video.volume%n).toFixed(2) : n 
                    fire("volumeup")
                    break
                case "decrement":
                    if(video.volume == 0 || (video.volume*100).toFixed() == 5) {
                        video.volume = 0
                        fire("volumemuted")
                        break
                    }
                    if (video.volume) video.volume -= ((video.volume*100).toFixed()%value) ? (video.volume%n) : n   
                    fire("volumedown")
                    break
            }
        }

        function handleFullScreenChange() {
            videoContainer.classList.toggle("full-screen", document.fullscreenElement)            
            if(videoContainer.classList.contains("mini-player") && videoContainer.classList.contains("full-screen")) videoContainer.classList.remove("mini-player")
            playbtnPosition()
        }

        function handleResize() {
            toggleMiniPlayerMode()
            playbtnPosition()
            miniPlayerBtnPosition()
            tapHandler()
        }
        
        //For the mobile play btn since the video height is not fixed value
        function playbtnPosition() {
            if (window.innerWidth <= mobileThreshold && !videoContainer.classList.contains("mini-player")) {
                const value = (videoContainer.offsetHeight/2) - playPauseBtn.offsetHeight/2
                videoContainer.style.setProperty("--mobile-btn-position", `${value}px`)
                videoContainer.style.setProperty("--video-height", video.offsetHeight)
            }
        }
        playbtnPosition()

        function handleEnterPip() {
            videoContainer.classList.add("picture-in-picture")
            toggleMiniPlayerMode(false)
        }
        
        function handleLeavePip() {
            videoContainer.classList.remove("picture-in-picture")
            toggleMiniPlayerMode()
        }

        function miniPlayerBtnPosition() {
            if(videoContainer.classList.contains("mini-player")) {
                const value = videoContainer.offsetHeight/2 - playPauseBtn.offsetHeight/2
                videoContainer.style.setProperty("--mini-player-btn-position", `${value}px`)
                videoContainer.style.setProperty("--video-height", video.offsetHeight)
            }
        }
        
        function togglePlay(bool) {
            bool ?? video.paused ? video.play() : video.pause()
        }

        function handlePlay(e) {
            for (const media of document.querySelectorAll("video, audio")) {
                if (media !== e.target) media.pause()
            }
            videoContainer.classList.remove("paused")

            if ('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: e.currentTarget.dataset.mediaTitle,
                    artwork: [
                        {src: e.currentTarget.dataset.mediaArtwork}
                    ]
                })
    
                navigator.mediaSession.setActionHandler('play', () => togglePlay(true))
                navigator.mediaSession.setActionHandler('pause', () => togglePlay(false))
                navigator.mediaSession.setActionHandler('seekbackward', () => skip(-10))
                navigator.mediaSession.setActionHandler('seekforward', () => skip(10))
                navigator.mediaSession.playbackState = 'playing'
            }            

        }
                
        function handlePause() {
            videoContainer.classList.add("paused")
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused'
        }
        
        const restraintTime = 3000
        let restraintId
        function handleMouseMove() {
            videoContainer.classList.add("hover")
            restraint()
        }
        function restraint() {
            if (restraintId) clearTimeout(restraintId)
            restraintId = setTimeout(() => videoContainer.classList.remove("hover"), restraintTime)
        }

        let restraintIdTwo, hoverId
        function handleVolumeMouseMove() {
            hoverId = setTimeout(() => {
                if (volumeSlider.parentElement.matches(':hover')) {
                    volumeSlider.parentElement.classList.add("hover")
                    if (restraintIdTwo) clearTimeout(restraintIdTwo)
                    restraintIdTwo = setTimeout(() => volumeSlider.parentElement.classList.remove("hover"), restraintTime)  
                }
            }, 250)
        }
        
        function moveMiniPlayer(e){
            if (!e.target.classList.contains(".timeline-container") && !e.target.classList.contains("timeline") && e.target.tagName !== "button") {
                if (videoContainer.classList.contains("mini-player")) {
                    videoContainer.addEventListener("mousemove", handleMiniPlayerPosition)
                    videoContainer.addEventListener("mouseup", emptyListeners, {once: true})
                    videoContainer.addEventListener("touchmove", handleMiniPlayerPosition, {passive: false})
                    videoContainer.addEventListener("touchend", emptyListeners, {once: true, passive: false})
                }
            }

            function emptyListeners() {
                videoContainer.classList.remove("movement")
                videoContainer.classList.add("hover")
                restraint()
                videoContainer.removeEventListener("mousemove", handleMiniPlayerPosition)
                videoContainer.removeEventListener("touchmove", handleMiniPlayerPosition, {passive: false})
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

        //custom event function for notifier events
        function fire(eventName, el = notifiersContainer, detail=null, bubbles=true, cancellable=true) {
            let evt = new CustomEvent(eventName, {
                detail, bubbles, cancellable
            })
            el.dispatchEvent(evt)
        }

        const events = ["videoplay","videopause","volumeup","volumedown","volumemuted","captions","speed","theatre","fullScreen","fwd","bwd"]
        let transitionId
        const notify = {
            init : function() {
                for (const event of events) {
                    notifiersContainer.addEventListener(event, this)
                }
            },

            handleEvent: function(e) {
                let transitionTime
                if (e.type === "fwd" || e.type === "bwd") {
                    transitionTime = Number(getComputedStyle(notifiersContainer).getPropertyValue("--dbc-transition-time").replace('ms', '')) + 10
                } else {
                    transitionTime = Number(getComputedStyle(notifiersContainer).getPropertyValue("--transition-time").replace('ms', '')) + 10
                }
                if (transitionId) clearTimeout(transitionId)
                notifiersContainer.dataset.currentNotifier = e.type
                transitionId = setTimeout(emptyDataset, transitionTime)
            }
        }
        notify.init()
        
        for(const notifier of notifiersContainer.children) {
            notifier.addEventListener('transitionend', emptyDataset)
        }
        function emptyDataset() {
            notifiersContainer.dataset.currentNotifier = ''
        }

        //Event Listeners

        //window event listeners
        window.addEventListener('load', playbtnPosition)
        window.addEventListener('resize', handleResize)

        //document event listeners
        document.addEventListener("fullscreenchange", handleFullScreenChange)
        document.addEventListener("webkitfullscreenchange", handleFullScreenChange)

        //button event listeners 
        playPauseBtn.addEventListener("click", () => togglePlay())
        speedBtn.addEventListener("click", changePlaybackSpeed)
        captionsBtn.addEventListener("click", toggleCaptions)
        muteBtn.addEventListener("click", toggleMute)
        replayBtn.addEventListener("click", handleReplay)
        theaterBtn.addEventListener("click", toggleTheaterMode)
        fullScreenBtn.addEventListener("click", toggleFullScreenMode)
        pictureInPictureBtn.addEventListener("click", togglePictureInPictureMode)
        miniPlayerExpandBtn.addEventListener("click", expandMiniPlayer)
        miniPlayerCancelBtn.addEventListener("click", () => toggleMiniPlayerMode(false))        

        //videocontainer event listeners
        videoContainer.addEventListener("mousemove", handleMouseMove)


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
        video.addEventListener("pointerdown", handlePointerDown)
        video.addEventListener("enterpictureinpicture", handleEnterPip)
        video.addEventListener("leavepictureinpicture", handleLeavePip)

        
        //timeline contanier event listeners
        timelineContainer.addEventListener("mousemove", handleTimelineUpdate)

        //volume event listeners
        volumeSlider.addEventListener("input", handleSliderInput)
        volumeSlider.parentElement.addEventListener("mousemove", handleVolumeMouseMove)
        volumeSlider.parentElement.addEventListener("mouseup", () => {if(hoverId) clearTimeout(hoverId)})
    } else {
        return
    }
})

