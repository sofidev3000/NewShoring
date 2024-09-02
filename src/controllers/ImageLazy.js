

function execLazyLoad(selector) {
    var content = selector != undefined ? selector : document;
    var canUse = canUseWebP();
    var lazyImages = [].slice.call(content.querySelectorAll(".lazy"));
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    if (lazyImage.dataset.bg!=undefined) {
                        lazyImage.style.backgroundImage=lazyloadBG(lazyImage,canUse);
                        lazyImage.removeAttribute("data-bg");
                        lazyImage.removeAttribute("data-webp-bg");
                        lazyImage.removeAttribute("data-bg-srcset");
                        lazyImage.removeAttribute("data-webp-bg-srcset");
                        lazyImage.classList.add(lazyImage.dataset.loaded);
                        lazyImage.classList.remove("lazy");
                    }
                    else {
                        lazyImage.src = UseWebp(lazyImage.dataset.src, lazyImage.dataset.webpSrc, canUse);
                        var srcset = convertWebpSrcset(lazyImage.dataset.srcset, lazyImage.dataset.webpSrcset, canUse);
                        if (srcset != "" && srcset != undefined) {
                            lazyImage.srcset = srcset;
                        }
                        lazyImage.removeAttribute("data-src");
                        lazyImage.removeAttribute("data-webp-src");
                        lazyImage.removeAttribute("data-srcset");
                        lazyImage.removeAttribute("data-webp-srcset");
                        lazyImage.classList.add(lazyImage.dataset.loaded);
                        removeLoader(lazyImage);
                        lazyImage.classList.remove("lazy");
                        lazyImageObserver.unobserve(lazyImage);
                    }

                }
            });
        });
        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
        var lazyLoaded = {};
        var objectLazy = {};
        lazyImages.forEach(function (lazyImage) {
            var keyexist = false;
            for (let key in lazyLoaded) {
                if (key == lazyImage.dataset.loaded) {
                    keyexist = true;
                    break;
                }
            }
            if (!keyexist) lazyLoaded[lazyImage.dataset.loaded] = [];
            lazyLoaded[lazyImage.dataset.loaded].push(lazyImage);
        });
        for (let key in lazyLoaded) {
            objectLazy[key] = new LazyLoad(
                {
                    class_loaded: key
                },
                lazyLoaded[key]
            );
        }
    }
}

function removeLoader(lazyImage) {
    var previous = lazyImage.previousElementSibling;
    var parent = lazyImage.parentElement;
    var classlistParent = parent.classList;
    if (previous != null) {
        if (previous.classList.contains("loader-icon")) {
            previous.classList.add("loader-icon--hidden");
        }
    }
}

function convertWebpSrcset(urlimage, urlwebp = "", canUseWebP) {
    if (canUseWebP) {
        if (urlwebp == "" && urlwebp == undefined) {
            var url = urlimage;
        } else {
            var url = urlwebp;
        }
        return url;
    }
    return urlimage;
}

function UseWebp(urlimage, urlwebp = "", canUseWebP) {
    if (canUseWebP) {
        if (urlwebp == "" || urlwebp == undefined) {
            var url = urlimage;
        } else {
            var url = urlwebp;
        }
        return url;
    }
    return urlimage;
}

function canUseWebP() {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
}

function lazyloadBG(lazyImage,canUse){
    if (lazyImage.dataset.bgSrcset!=undefined) {
        /*lazyImage.dataset.bg
        lazyImage.dataset.webpBg*/
        var urlimage=lazyImage.dataset.bgSrcset;
        var urlwebp=lazyImage.dataset.webpBgSrcset;
        if (canUse) {
            if(urlwebp=="" || urlwebp==undefined){
                var data=urlimage.split(',');
            }else {
                var data=urlwebp.split(',');
            }
        }else{
            var data=urlimage.split(',');
        }
        return getDataSrcsetBG(UseWebp(lazyImage.dataset.bg,lazyImage.dataset.webpBg,canUse),data);
    }else{

        return "url('"+UseWebp(lazyImage.dataset.bg,lazyImage.dataset.webpBg,canUse)+"')";
    }
}

function getDataSrcsetBG(src,srcset){
    var url="";
    for (var i = 0; i < srcset.length; i++) {
        var data=srcset[i].split('|');
        if(parseInt(data[1]) <= document.querySelector('html').clientWidth){
            url="url('"+data[0]+"')";
            break;
        }
    }
    if(url==""){
        var srcset_max=srcset.reverse();
        for (var i = 0; i < srcset_max.length; i++) {
            var data=srcset_max[i].split('|');
            if(document.querySelector('html').clientWidth <= parseInt(data[1])){
                url="url('"+data[0]+"')";
                break;
            }
        }
    }
    if (url==""){
        url="url('"+src+"')";
    }
    return url;
}
export { execLazyLoad, removeLoader, convertWebpSrcset, UseWebp, canUseWebP };