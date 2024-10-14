var lazySlide = false;

function initiVideoLazy(){
    appearVideoFrame();
}

function appearVideoFrame() {
    if (!lazySlide) {
        // Encuentra todos los elementos de imagen de video
        var lazyVideo = [].slice.call(document.querySelectorAll(".section-video__img-temp"));
        if ("IntersectionObserver" in window) {
            let lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var videoImage = entry.target;
                        var videoElement = null;
                        var type = videoImage.dataset.type;
                        // Crea el elemento de video o iframe correspondiente
                        if (type === "video") {
                            // Oculta la imagen de video
                            videoImage.classList.add("hide-video-image");
                            var parent = videoImage.parentNode;
                            var video = document.createElement("video");
                            var srcVideo = videoImage.dataset.video;
                            video.id = videoImage.dataset.id;
                            video.src = srcVideo;
                            video.autoplay = false;
                            video.controls = true;
                            video.setAttribute("data-setup", videoImage.dataset.setup);
                            video.className = videoImage.dataset.customClass + " show-video-frame";
            
                            videoImage.remove();
                            parent.appendChild(video);
                            videoElement = video;
                            video.play();
                            // Inicializa el reproductor de video usando Video.js
                            /*if (parent.contains(video)) {
                                var player = videojs(video.id);
                                player.qualityPickerPlugin();
                                player.src({
                                    src: srcVideo,
                                    type: 'application/x-mpegURL'
                                });
                                //player.play();
                            }*/
                        } else if (type === "iframe") {
                            var iframe = document.createElement("iframe");
            
                            var parent = videoImage.parentNode;
                            iframe.src = videoImage.dataset.video;
                            iframe.setAttribute("frameborder", "0");
                            iframe.setAttribute("webkitallowfullscreen", "");
                            iframe.setAttribute("mozallowfullscreen", "");
                            iframe.setAttribute("allowfullscreen", "");
                            iframe.onload = () =>{
                                // Oculta la imagen de video
                                videoImage.classList.add("hide-video-image");
                            }; 

                            iframe.addEventListener("animationend", function () {
                                videoImage.remove();
                            });
                            iframe.className = videoImage.dataset.customClass + " show-video-frame";
                            parent.appendChild(iframe);

                            videoElement = iframe;

                        }

                        if(!videoElement)
                            videoElement = videoImage;

                        lazyVideoObserver.unobserve(videoElement);
                    }
                });
            });
            lazyVideo.forEach(function (lazyVideo) {
                lazyVideoObserver.observe(lazyVideo);
            });
        }else{
            var videoImages = document.querySelectorAll(".section-video__img-temp");

            // Itera sobre cada elemento de imagen de video encontrado
            videoImages.forEach(function (videoImage) {
                // Obtiene el tipo de elemento (video o iframe)
                var type = videoImage.dataset.type;
                // Oculta la imagen de video
                videoImage.classList.add("hide-video-image");
                // Crea el elemento de video o iframe correspondiente
                if (type === "video") {
                    var parent = videoImage.parentNode;
                    var video = document.createElement("video");
                    var srcVideo = videoImage.dataset.video;
                    video.id = videoImage.dataset.id;
                    video.autoplay = false;
                    video.controls = true;
                    video.setAttribute("data-setup", videoImage.dataset.setup);
                    video.className = videoImage.dataset.customClass + " show-video-frame";
    
                    videoImage.remove();
                    parent.appendChild(video);
    
                    // Inicializa el reproductor de video usando Video.js
                    if (parent.contains(video)) {
                        var player = videojs(video.id);
                        player.qualityPickerPlugin();
                        player.src({
                            src: srcVideo,
                            type: 'application/x-mpegURL'
                        });
                        //player.play();
                    }
                } else if (type === "iframe") {
                    var iframe = document.createElement("iframe");
    
                    var parent = videoImage.parentNode;
                    iframe.src = videoImage.dataset.video;
                    iframe.setAttribute("frameborder", "0");
                    iframe.setAttribute("webkitallowfullscreen", "");
                    iframe.setAttribute("mozallowfullscreen", "");
                    iframe.setAttribute("allowfullscreen", "");
    
                    iframe.className = videoImage.dataset.customClass + " show-video-frame";
                    videoImage.remove();
    
                    parent.appendChild(iframe);
                }
            });
    
            // Establece la bandera de desplazamiento perezoso a true
        }
        lazySlide = true;
    }
}
export {initiVideoLazy};