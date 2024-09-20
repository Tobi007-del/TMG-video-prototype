// TODO: alt for shortcuts and custom events for the big notifiers


const videos = document.querySelectorAll("video")

videos.forEach((video,i) => {
    // if (video.dataset.controls === "tmg-controls") {
        // const videoContainers[i] = document.createElement('div')
        // videoContainers[i].classList = "video-container paused theater"
        // videoContainers[i].innerHTML = `<div id="balls-container">
        //     <div id="two-balls"></div>
        //     <div id="other-two-balls"></div>
        //     <div id="another-two-balls"></div>
        // </div>
        // <img class="thumbnail-img">
        // <div class="video-controls-container">
        //     <div class="timeline-container">
        //         <div class="timeline">
        //             <div class="preview-img-container"><img class="preview-img"></div>
        //             <div class="thumb-indicator"></div>
        //         </div>
        //     </div>
        //     <div class="controls">
        //         <button class="play-pause-btn">
        //             <svg class="play-icon" viewBox="0 0 24 24">
        //                 <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        //             </svg>
        //             <svg class="pause-icon" viewBox="0 0 24 24">
        //                 <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
        //             </svg>
        //         </button>
        //         <div class="volume-container">
        //             <button class="mute-btn">
        //                 <svg class="volume-high-icon" viewBox="0 0 24 24">
        //                     <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
        //                 </svg>
        //                 <svg class="volume-low-icon" viewBox="0 0 24 24">
        //                     <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
        //                 </svg>
        //                 <svg class="volume-muted-icon" viewBox="0 0 24 24">
        //                     <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
        //                 </svg>
        //             </button>
        //             <input class="volume-slider" type="range" min="0" max="100" step="any" value="">
        //         </div>
        //         <div class="duration-container">
        //             <div class="current-time">0.00</div>
        //             /
        //             <div class="total-time">0.00</div>
        //         </div>
        //         <button class="captions-btn">
        //             <svg viewBox="0 0 24 24">
        //                 <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
        //             </svg>
        //         </button>
        //         <button class="speed-btn wide-btn">1x</button>
        //         <button class="mini-player-btn">
        //             <svg viewBox="0 0 24 24">
        //                 <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
        //             </svg>
        //         </button>
        //         <button class="theater-btn">
        //             <svg class="tall" viewBox="0 0 24 24">
        //                 <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
        //             </svg>
        //              <svg class="wide" viewBox="0 0 24 24">
        //                 <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
        //             </svg>
        //         </button>
        //         <button class="full-screen-btn">
        //             <svg class="open" viewBox="0 0 24 24">
        //                 <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
        //             </svg>
        //             <svg class="close" viewBox="0 0 24 24">
        //                 <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
        //             </svg>
        //         </button>
        //     </div>
        // </div>`
        // const parentDiv = video.parentNode;
        // parentDiv.insertBefore(videoContainers[i], video)
        // videoContainers[i].append(video)

        const videoContainers = document.querySelectorAll(".video-container")
        const replayBtn = videoContainers[i].querySelector(".replay-btn") 
        const playPauseBtn = videoContainers[i].querySelector(".play-pause-btn")
        const theaterBtn = videoContainers[i].querySelector(".theater-btn")
        const fullScreenBtn = videoContainers[i].querySelector(".full-screen-btn")
        const pictureInPictureBtn = videoContainers[i].querySelector(".picture-in-picture-btn")
        const miniPlayerExpandBtn = videoContainers[i].querySelector(".mini-player-expand-btn")
        const miniPlayerCancelBtn = videoContainers[i].querySelector(".mini-player-cancel-btn")
        const muteBtn = videoContainers[i].querySelector(".mute-btn")
        const captionsBtn = videoContainers[i].querySelector(".captions-btn")
        const speedBtn = videoContainers[i].querySelector(".speed-btn")
        const currentTimeElem = videoContainers[i].querySelector(".current-time")
        const totalTimeElem = videoContainers[i].querySelector(".total-time")
        const previewImg = videoContainers[i].querySelector(".preview-img")
        const thumbnailImg = videoContainers[i].querySelector(".thumbnail-img")
        const volumeSlider = videoContainers[i].querySelector(".volume-slider")
        const previewImgContainer = videoContainers[i].querySelector(".preview-img-container")
        const timelineContainer = videoContainers[i].querySelector(".timeline-container")
        const svgs = videoContainers[i].querySelectorAll("svg")
        const notifiersContainer = videoContainers[i].querySelector(".notifiers-container")


        //resizing controls
        function controlsResize() {           
            let controlsSize = 25;
            // controlsSize = getComputedStyle(videoContainers[i]).getPropertyValue("--controls-size")
            svgs.forEach(svg => {
                svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
                if(!svg.classList.contains("settings-icon"))
                if(!svg.classList.contains("mini-player-expand-icon"))  
                if(!svg.classList.contains("mini-player-cancel-icon"))
                if(!svg.classList.contains("replay-icon")) 
                if(!svg.classList.contains("fwd-notifier-icon")) 
                if(!svg.classList.contains("bwd-notifier-icon"))
                    svg.setAttribute("viewBox", `0 0 ${controlsSize} ${controlsSize}`)
            })
        }
        controlsResize()
        //skip variable for time skips
        let skipped;
        
        //variable to check if video is in view
        let videoInView = true;

        //a variable containing the delay for all delay required events
        let notifierDelay = getComputedStyle(notifiersContainer).getPropertyValue("--delay")
        notifierDelay = notifierDelay.replace("s","")
        notifierDelay = Number(notifierDelay)*1000

        //a debounce function to prevent execution too many keypresses at a given time
        const debounceKeyPresses = (mainFunction, delay = notifierDelay) => {
            let timer;
            return function(...args) {
                //Clear the timeout of previeous timer to prevent the execution of 'mainFunction'
                clearTimeout(timer)

                timer = setTimeout(() => {
                    mainFunction(...args)
                }, delay)
            }
        }
        //a throttle function to limit number of clicks in a certain time
        const throttleKeyPresses = (mainFunction, delay = notifierDelay) => {
            let runTimerFlag = null;
            return function(...args) {
                if (runTimerFlag === null) {
                    mainFunction(...args)
                    runTimerFlag = setTimeout(() => {
                        runTimerFlag = null
                    }, delay)
                }
            }
        }

        document.addEventListener("keydown", throttleKeyPresses(function(e) {
        if(videoInView) {
            const tagName = document.activeElement.tagName.toLowerCase()
        
            if(tagName === "input") return
        
            switch (e.key.toLowerCase()) {
                case " ":
                    if(tagName === "button") return
                e.preventDefault()
                case "p":
                case "l":
                case "a":
                case "y":
                case "k":
                    togglePlay()
                    break
                case "f":
                    toggleFullScreenMode()
                    break
                case "t":
                    toggleTheaterMode()
                    break
                case "e":
                    expandMiniPlayer()
                    break
                case "r":
                    toggleMiniPlayerMode(false)
                    break
                case "i":
                    if(!e.shiftKey)
                        togglePictureInPictureMode()
                        break
                case "m":
                    toggleMute()
                    if(video.muted) fire("volumemuted") 
                    else fire("volumeup")
                    break
                case "s": 
                    changePlaybackSpeed()
                    break
                case "c":
                    toggleCaptions()
                    break
                case "arrowleft":
                        skip(-5)
                        skipped = 5
                        if(e.shiftKey) {
                            skip(-10)
                            skipped = 10
                        }
                        fire("bwd")
                        break
                case "arrowright":
                    case "":
                        skip(5)
                        skipped = 5
                        if(e.shiftKey) { 
                            skip(10)
                            skipped = 10
                        }
                        fire("fwd")
                        break
                case "arrowup":
                    e.preventDefault()
                    if(video.volume < 1) {video.volume += (video.volume*100)%10 ? (0.1 - video.volume%0.1) : 0.1}
                    fire("volumeup")
                    break
                case "arrowdown":
                    e.preventDefault()
                    if(video.volume == 0) {
                        fire("volumemuted")
                        break
                    }
                    if((video.volume*100).toFixed() == 10) {
                        fire("volumemuted")
                        video.volume = 0;
                        break
                    }
                    if(video.volume) {video.volume -= ((video.volume*100).toFixed()%10) ? (video.volume%0.1) : 0.1}
                    fire("volumedown")
            }
        }
        })
        )

        //Disabling right click
        video.addEventListener("contextmenu", (e) => {
            e.preventDefault()
        })
        
        //Loading 
        video.addEventListener("waiting", () => {
            videoContainers[i].classList.add("buffer")
        })
        video.addEventListener("playing", () => {
            videoContainers[i].classList.remove("buffer")
        })
        
        //Timeline
        timelineContainer.addEventListener("mousemove", handleTimelineUpdate)
        timelineContainer.addEventListener("mousedown", toggleScrubbing)
        document.addEventListener("mouseup", e => {
            if (isScrubbing) toggleScrubbing(e)
        })
        document.addEventListener("mousemove", e => {
            if (isScrubbing) handleTimelineUpdate(e)
        })
        
        
        let isScrubbing = false
        function toggleScrubbing(e) {
            const rect = timelineContainer.getBoundingClientRect()
            const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
            isScrubbing = (e.buttons & 1) === 1
            videoContainers[i].classList.toggle("scrubbing", isScrubbing)
            if (isScrubbing) {
                wasPaused = video.paused
                video.pause()
            } else {
                video.currentTime = percent * video.duration
                if (!wasPaused) video.play()     
                videoContainers[i].classList.remove("seeking");
            }
        
            handleTimelineUpdate(e)
        }
         
        function handleTimelineUpdate(e) { 
            const rect = timelineContainer.getBoundingClientRect()
            const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
            const previewImgMin = (previewImg.offsetWidth / 2) / rect.width
            const previewImgPercent = Math.min(Math.max(percent, previewImgMin),(1 - previewImgMin))
            const previewImgNumber = Math.max(1, Math.floor((percent * video.duration) / 10))
            const previewImgSrc = `assets/previewImgs/preview${previewImgNumber}.jpg`
            previewImg.src = previewImgSrc
            timelineContainer.style.setProperty("--preview-position", percent)
            timelineContainer.style.setProperty("--preview-img-position", previewImgPercent)
        
            if(isScrubbing) {
                e.preventDefault()
                thumbnailImg.src = previewImgSrc
                timelineContainer.style.setProperty("--progress-position", percent)
                videoContainers[i].classList.add("seeking");
            }
        
            const previewTime = parseInt(percent * video.duration) > 0 ? formatDuration(percent * video.duration) : ''
            previewImgContainer.dataset.previewTime = previewTime  
        }
        
        //Playback Speed
        speedBtn.addEventListener("click", changePlaybackSpeed)
        
        function changePlaybackSpeed() {
            let newPlaybackRate = video.playbackRate + .25
            if (newPlaybackRate > 2) newPlaybackRate = .25
            video.playbackRate = newPlaybackRate
        }
        
        video.addEventListener("ratechange", () => {
            speedBtn.textContent = `${video.playbackRate}x`    
        })
        
        //Captions
        const captions = video.textTracks[0]
        captions.mode = "hidden"
        
        captionsBtn.addEventListener("click", toggleCaptions)
        
        function toggleCaptions() {
            const isHidden = captions.mode === "hidden"
            captions.mode = isHidden ? "showing" : "hidden"
            videoContainers[i].classList.toggle("captions", isHidden)
        }
        
        //Duration
        video.addEventListener("loadeddata", () => {
            totalTimeElem.textContent = formatDuration(video.duration)
        })
        
        video.addEventListener("timeupdate", () => {
            currentTimeElem.textContent = formatDuration(video.currentTime)
            const percent = video.currentTime / video.duration
            timelineContainer.style.setProperty("--progress-position", percent)
            if(video.currentTime < video.duration)
                videoContainers[i].classList.remove("replay")
        })
        
        const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
            minimumIntegerDigits: 2,
        })
        
        function formatDuration(time) {
            const seconds = Math.floor(time % 60)
            const minutes = Math.floor(time / 60) % 60
            const hours = Math.floor(time / 3600)
            if(hours === 0)
                return `${minutes}:${leadingZeroFormatter.format(seconds)}`
            else 
                return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
        }
        
        function skip(duration) {
            video.currentTime += duration
        }
        
        //Volume
        muteBtn.addEventListener("click", toggleMute)
        
        volumeSlider.addEventListener("input", e => {
            video.volume = (e.target.value / 100)
            video.muted = e.target.value === 0
        })
        
        function toggleMute() {
            video.muted = !video.muted
        }
        
        video.addEventListener("volumechange", volumeState)
            
        function volumeState() {
            let { min, max, value, offsetWidth } = volumeSlider
            value = video.volume * 100
            if(video.muted || value === 0) {
                value = 0;
                volumeLevel = "muted"
            } else if(value > (max/2)) {
                volumeLevel = "high"
            } else {
                volumeLevel = "low"
            }
            let volumePosition = `${((value - min) / (max - min)) * ((offsetWidth - 5) > 0 ? (offsetWidth - 5) : 55) }px`
            let volumePercent = `${((value-min) / (max - min)) * 100}%`
            volumeSlider.value = value
            volumeSlider.dataset.volume = `${value.toFixed()}`
            videoContainers[i].querySelectorAll(".volume-up-notifier,.volume-down-notifier,.volume-muted-notifier").forEach((elem) => {
                elem.dataset.volume = `${value.toFixed()}%`
            })
            volumeSlider.style.setProperty("--volume-position", volumePosition)
            volumeSlider.style.setProperty("--volume-percent", volumePercent)
            videoContainers[i].dataset.volumeLevel = volumeLevel
        }
        
        volumeState()
        
        video.addEventListener("ended", () => {
            videoContainers[i].classList.add("replay")
        })
        replayBtn.addEventListener("click", () => {
            video.currentTime = 0
            if(video.autoplay == true) 
                video.play()
            else 
                video.pause()
            videoContainers[i].classList.remove("replay")
        })
        
        // View Modes
        theaterBtn.addEventListener("click", toggleTheaterMode)
        fullScreenBtn.addEventListener("click", toggleFullScreenMode)
        video.addEventListener("dblclick", toggleFullScreenMode)
        pictureInPictureBtn.addEventListener("click", togglePictureInPictureMode)
        miniPlayerExpandBtn.addEventListener("click", () => {
            expandMiniPlayer()
        })
        function expandMiniPlayer() {
            concerned = true
            toggleMiniPlayerMode(false)
            window.scroll({
                top: video.parentNode.offsetTop,
                left: 0,
                behavior: "instant",
            })
        }
        miniPlayerCancelBtn.addEventListener("click", () => {
            toggleMiniPlayerMode(false) 
        })

        
        function toggleTheaterMode() {
            videoContainers[i].classList.toggle("theater")
        }
        
        function toggleFullScreenMode() {
            if (document.fullscreenElement == null) {
                videoContainers[i].requestFullscreen()
            } else {
                document.exitFullscreen()
            }
        }

        function togglePictureInPictureMode() {
            if(videoContainers[i].classList.contains("picture-in-picture")) {
                document.exitPictureInPicture()
            } else {
                video.requestPictureInPicture()
            }
        } 

        //a variable to check if the user is concerned in the current video while in mini-player mode
        let concerned = false
        function toggleMiniPlayerMode(bool = true) {
        if(!document.fullscreenElement) {
            if (!bool) {
                videoContainers[i].classList.remove("mini-player")
                if(!video.paused && !concerned) {
                    video.pause() 
                }
                concerned = false
                volumeState()
                return
            }
            if (!video.paused && window.innerWidth > mobileThreshold && !document.pictureInPictureElement && !intersect) {
                videoContainers[i].classList.add("mini-player")
            } 
            if ((videoContainers[i].classList.contains("mini-player") && intersect) || (videoContainers[i].classList.contains("mini-player") && window.innerWidth < mobileThreshold)) {
                videoContainers[i].classList.remove("mini-player")
                if(!video.paused) {video.pause()}
            }
            volumeState()
        }
        }
        
        //Intersection Observer Setup to watch the video
        const mobileThreshold = 600
        let intersect = false;
        let videoOptions = {
            root: null,
            rootMargin: '0px',
            threshold: (() => {
                let threshold = []
                let step = 20
                for(let i = 1.0; i <= step; i++) {
                    let ratio = i/step
                    threshold.push(ratio)
                }
                threshold.push(0)
                return threshold;
            })(),
        }
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.target != video) {
                    intersect = entry.isIntersecting
                    toggleMiniPlayerMode()
                } else {
                    videoInView = entry.isIntersecting
                }
        })
        }, videoOptions)
        videoObserver.observe(videoContainers[i].parentElement)
        videoObserver.observe(video)

        
        document.addEventListener("fullscreenchange", ()=> {
            videoContainers[i].classList.toggle("full-screen", document.fullscreenElement)            
            if(videoContainers[i].classList.contains("mini-player") && videoContainers[i].classList.contains("full-screen")) {
                videoContainers[i].classList.remove("mini-player")
            }
        })
        document.addEventListener("webkitfullscreenchange", ()=> {
            videoContainers[i].classList.toggle("full-screen", document.fullscreenElement)
            if(videoContainers[i].classList.contains("mini-player") && videoContainers[i].classList.contains("full-screen")) {
                videoContainers[i].classList.remove("mini-player")
            }
        })

        window.addEventListener('resize', () => {
            toggleMiniPlayerMode()
        })

        video.addEventListener("enterpictureinpicture", () => {
            videoContainers[i].classList.add("picture-in-picture")
            toggleMiniPlayerMode(false)
        })
        
        video.addEventListener("leavepictureinpicture", () => {
            videoContainers[i].classList.remove("picture-in-picture")
            toggleMiniPlayerMode()
        })
        
        // Play/Pause
        playPauseBtn.addEventListener("click", togglePlay)
        video.addEventListener("click", togglePlay)
        
        function togglePlay() {
            video.paused ? video.play() : video.pause()
        }
        
        video.addEventListener("play", ()=> {
            videoContainers[i].classList.remove("paused")
            fire("videoplay")
        })
        
        video.addEventListener("pause", ()=> {
            videoContainers[i].classList.add("paused")
            fire("videopause")
        })        

        if('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: "Justice League Preview",
                artwork: [
                    {src: '/assets/justice-league.jpg'}
                ]
            })

            navigator.mediaSession.setActionHandler('play', ()=>{video.play()})
            navigator.mediaSession.setActionHandler('pause', ()=>{video.pause()})
            navigator.mediaSession.setActionHandler('seekbackward', ()=>{skip(-30)})
            navigator.mediaSession.setActionHandler('seekforward', ()=>{video.skip(30)})
        }
        
        //custom event function for notifier events
        const fire = (eventName, el = notifiersContainer, detail=null, bubbles=true, cancellable=true) => {
            let evt = new CustomEvent(eventName, {
                detail, bubbles, cancellable
            })
            el.dispatchEvent(evt)
        }
        //event listeners for notifiers
        notifiersContainer.addEventListener("videopause", () => {
            notifiersContainer.dataset.currentNotifier = "videopause"
            emptyDataset()
        })
        notifiersContainer.addEventListener("videoplay", () => {
            notifiersContainer.dataset.currentNotifier = "videoplay"
            emptyDataset()
        })
        notifiersContainer.addEventListener("volumeup", () => {
            notifiersContainer.dataset.currentNotifier = "volumeup"
            emptyDataset()
        })
        notifiersContainer.addEventListener("volumedown", () => {
            notifiersContainer.dataset.currentNotifier = "volumedown"
            emptyDataset()
        })
        notifiersContainer.addEventListener("volumemuted", () => {
            notifiersContainer.dataset.currentNotifier = "volumemuted"
            emptyDataset()
        })
        notifiersContainer.addEventListener("fwd", () => {
            notifiersContainer.querySelectorAll(".fwd-notifier,.bwd-notifier").forEach(elem => {
                elem.dataset.skip = `${skipped} seconds`
            })
            notifiersContainer.dataset.currentNotifier = "fwd"
            emptyDataset()
        })
        notifiersContainer.addEventListener("bwd", () => {
            notifiersContainer.querySelectorAll(".fwd-notifier,.bwd-notifier").forEach(elem => {
                elem.dataset.skip = `${skipped} seconds`
            })
            notifiersContainer.dataset.currentNotifier = "bwd"
            emptyDataset()
        })
        const emptyDataset = () => {
            setTimeout(()=>{notifiersContainer.dataset.currentNotifier = ''}, notifierDelay)
        }
    // } else {
    //     return
    // }
})

