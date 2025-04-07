const browsersArr = ["Opera", 'OPR', "Edg", "Chrome", "Safari", "Firefox", "Brave", "MSIE"];
let infoBrowser = {};
// infoBrowser = {
//     'time':'',
//     'day': '',
//     'location': '',
//     'browser': '',
//     'version': '',
//     'device': ''
// }
let domain = '';
let baseURL = '';
let myHeaders = {};

export const initProcessAds = async () => {
    infoBrowser = await getInfoBrowser(); // la variables es global
    infoConnection();
    setCookies(infoBrowser);
    const adsContainersArr = getAdsContainersInit();
    adsObserver(adsContainersArr);
    // await sendSimpleData(); // al cargar y obtener informacion, envia la data.. solo envío, no se recibe anuncios
}

const setCookies = (infoBrowser) => {
    const expires = 7;

    if (infoBrowser) {
        for (const [key, value] of Object.entries(infoBrowser)) {
            document.cookie = `${key}=${value};expires=${expires};path=/`;
        }
    }
}

const getLocation = async () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve(`${lat},${lon}`);
            }, (error) => {
                // reject("Error al obtener la ubicación");
                resolve("Error al obtener la ubicación");
            });
        } else {
            // reject("Geolocalización no soportada");
            resolve("Geolocalización no soportada");
        }
    });
}

const getInfoBrowser = async () => {
    const userAg = navigator.userAgent;
    let browserUser = '';
    let version = '';
    let geolocationUser = '';

    // Detectar el navegador
    for (let i = 0; i < browsersArr.length; i++) {
        if (userAg.indexOf(browsersArr[i]) != -1) {
            browserUser = browsersArr[i];
            break;
        }
    }


    // Detectar la versión del navegador
    const regex = new RegExp(`${browserUser}\\/([0-9\\.]+)`);
    if (regex.test(userAg)) {
        version = userAg.match(regex)[1];
    }

    // Detectar la ubicación
    geolocationUser = await getLocation();

    return {
        "time": getDayHour().time,
        "day": getDayHour().day,
        "location": geolocationUser,
        "browser": browserUser,
        "version": version,
        "device": /Mobi|Android|Touch/i.test(userAg) ? "Mobile" : "Desktop"
    };
}

const infoConnection = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (window.location.port !== '4321' && window.location.port !== '4322') {
        domain = window.location.origin;
    } else {
        domain = 'http://localhost:4321';
    }

    if (domain) {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const testParam = params.get('test');

        let base = `${domain}/api-request`;

        if (testParam) {
            base = `${base}?${params.toString()}`
        }

        baseURL = base;
    }
}

const getAdsContainersInit = () => {
    const adsContainers = document.querySelectorAll('[data-campaign-id]');
    let adsContainersArr = [];
    if (!adsContainers) {
        return false;
    }

    adsContainersArr = Array.from(adsContainers);
    return adsContainersArr;
}

const adsObserver = (adsElements) => {

    if ("IntersectionObserver" in window) {

        let adsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    //ACTUALIZANDO FECHA Y HORA...
                    infoBrowser.time = getDayHour().time;
                    infoBrowser.day = getDayHour().day;

                    // PROCESO DEL OBSERVE...
                    let adContainer = entry.target;
                    const adHTML = await fetchGetAds({ adContainer });
                    if (adHTML && adHTML !== '') {
                        // observer.unobserve(adContainer);
                        adContainer.innerHTML = adHTML;
                    }
                    return;
                }
            });
        });

        adsElements.forEach(adElement => {
            adsObserver.observe(adElement);
            addEvents(adElement);
        })
    } else {
        console.log('');
    }
}

const addEvents = (element) => {
    console.log('addEvents', element)
    element.addEventListener('click', async (e) => {
       await clickAd({ adContainer: e.target });
    })
    element.addEventListener('mouseenter', (e) => {
       
    })
    element.addEventListener('mouseleave', (e) => {
    })

}

const getDayHour = () => {
    return {
        'time': new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false }),
        'day': new Date().toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }),
    };
}

// para obtener los anuncios
const fetchGetAds = async ({ adContainer }) => {
    let data = '';

    if (adContainer?.dataset?.campaignId === '' || adContainer?.dataset?.campaignId === undefined) {
        return console.error('No se tiene un id de campaña. No se puede obtener el anuncio.');
    }

    try {

        const adsRow = JSON.stringify({
            PluginName: "ads",
            ServiceName: "ads-service",
            ServiceAction: "get-ads",
            BodyData: { ...infoBrowser, "campaignId": adContainer.dataset.campaignId, "token": adContainer?.dataset?.token || '' },
            DataContext: null
        });

        await fetch(baseURL, {
            method: "POST",
            headers: myHeaders,
            body: adsRow,
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
            .then((dataResponse) => {
                data = dataResponse.result;

            })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
                throw error;
            });

    } catch (error) {
        console.error('Fallo al obtener los anuncios: ', error);
    } finally {
        return data;
    }

}

// para enviar data al dar click en un anuncio

const clickAd = async ({ adContainer }) => {
    
    const idCreative = adContainer?.closest('[data-creative]')?.dataset?.creative || '';
   const idCampaign = adContainer?.closest('[data-campaign]')?.dataset?.campaign || '';

    if (idCampaign === '' || idCampaign === undefined || idCreative === '' || idCreative === undefined) {
        return console.error('No se tiene un id de campaña o id de anuncio. No se puede obtener el anuncio.');
    }

    try {
        const adsClickRow = JSON.stringify({
            PluginName: "ads",
            ServiceName: "ads-service",
            ServiceAction: "ad-clicks",
            BodyData: { "campaignId": idCampaign, "creativeId": idCreative},
        });

        await fetch(baseURL, {
            method: "POST",
            headers: myHeaders,
            body: adsClickRow,
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            //  return response.json();
        })
            .catch((error) => {
                console.error("There was a problem with the fetch operation:", error);
                throw error;
            });


    } catch (error) {
        console.error('Fallo al registrar el click: ', error);
    }

    return;
}