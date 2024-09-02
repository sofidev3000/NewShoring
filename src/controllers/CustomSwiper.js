import Swiper from 'swiper';
import { Navigation, Pagination,Autoplay,Keyboard,EffectCoverflow,Grid} from 'swiper/modules';
import {execLazyLoad} from "@controllers/imagelazy";
export var swiperObjs = [];
var sliderBreakPoint = 991;

/****** Get window width ******/
function getWindowWidth() {
    return window.innerWidth;
}
/****** Setup swiper slider ******/
export async function setupSwiper() {
    const swiperItems = document.querySelectorAll(".swiper-container:not(.instafeed-wrapper )");
  
    for (const [index, swiperItem] of swiperItems.entries()) {
      const _this = swiperItem;
      const sliderOptions = getOptionsSwiper(_this);
  
      if (typeof sliderOptions!== 'undefined' && sliderOptions!== null) {
        _this.dataset.swiperIndex = index;
  
        if (_this.classList.contains("swiper-container--filter")) {
          await createIsotopeSwiper(_this);
          await initSwiperFilter(_this);
          //Carga las imagenes extraidas del almacen de slide de un contendeor istope
          execLazyLoad(_this);
        }
        // Crear el objeto swiper después de que se hayan generado todos los slides
        const swiperObj = new Swiper(_this, sliderOptions);
        swiperObjs.push(swiperObj);
      }
    }
  }

function removeWraperChild(swiper){
    return new Promise((resolve,reject)=>{
        try{
            const _this = swiper;
            let swiperWrapper = _this.querySelector(".swiper-wrapper");
            swiperWrapper.innerHTML = ''; // Remove all child elements
            resolve();
        }catch(error){  
            reject(error);
        }
    });
}

function initSwiperFilter(swiper) {
    return new Promise((resolve, reject) => {
      try {
        const _this = swiper;
        let isotopeContainer = _this.closest(".swiper-isotope");
        
        let swiperWrapper = _this.querySelector(".swiper-wrapper");
        
        removeWraperChild(_this).then(()=>{

            let [firstElement, filterValue] = getFirstFilterValue(isotopeContainer);
            let value = filterValue;
      
            if (value == null) {
              value = firstElement;
              // Buscar dentro del almacen de slides
              var filterNav = isotopeContainer.querySelector(".swiper__filter[data-filter=\"" + value + "\"]");
      
              if (filterNav) {
                filterNav.classList.add("swiper__filter--active");
              }
            }
      
            storeSlide.querySelectorAll(".swiper-slide--filter[data-filter='" + value.split(".")[1] + "']").forEach(function (element) {
              // Añadir la clase "swiper-slide--none"
              // element.classList.add("swiper-slide--none");
              // Eliminar la clase "swiper-slide"
              // element.classList.remove("swiper-slide");
              let clone = element.cloneNode(true);
              swiperWrapper.appendChild(clone);
            });
      
        });

      
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

async function createIsotopeSwiper(swiper){
    const _this = swiper;
   
    let isotopeContainer = _this.closest(".swiper-isotope");
    let storeSlide = isotopeContainer.querySelector(".storeSlide");

    if(!storeSlide){
        storeSlide = await createElement(isotopeContainer,"div",{
            "id": "storeSlide",
            "class": "storeSlide hidden"
        }).then(element => {
            return element;
        })
        .catch(error => {
            console.error("Error al crear el elemento:", error);
        });
        
        //Pasa los nombres de filtros dentro de cada elemento interno de un swiper slide a swiper slide como atributo data-filter
    _this.querySelectorAll("[data-by-filter]").forEach(function (element) {
        
        //obtener slide al que pertenece
        let parentNode = element.closest(".swiper-slide--filter");
        
        //Agregar el filtro como clase
        parentNode.classList.add(element.dataset.byFilter);
        parentNode.dataset.filter = element.dataset.byFilter;

        storeSlide.appendChild(parentNode);
    });
    }
    
     
}

function getFirstFilterValue(isotopeContainer){
    // Seleccionar todos los elementos con el atributo "data-filter" igual a la variable "filter"
    let filterNavList = isotopeContainer.querySelectorAll(".swiper__filter");
    let firstElement = null;
    let filterValue = null;
    filterNavList.forEach(function(item){ 
        if(item.classList.contains("swiper__filter--active")){
            filterValue = item.dataset.filter;
        }
        if(firstElement == null){
            firstElement = item.dataset.filter;
        }
    });
    return [firstElement,filterValue];
}

function createElement(parentNode, tag, attr) {
    return new Promise((resolve, reject) => {
      try {
        let element = document.createElement(tag);
  
        // Añadir los atributos del objeto JSON al nuevo elemento
        for (let key in attr) {
          if (attr.hasOwnProperty(key)) {
            element.setAttribute(key, attr[key]);
          }
        }
        
        parentNode.appendChild(element);
  
        resolve(element);
  
      } catch (error) {
        reject(error);
      }
    });
  }


/****** Convierte las opciones del swiper ******/
function getOptionsSwiper(element) {

    var _this = element;
    var sliderOptionsString = _this.getAttribute('data-slider-options');
    
    var sliderOptions = null;
    
    if (typeof (sliderOptionsString) !== 'undefined' && sliderOptionsString !== null) {
        var sliderOptions = JSON.parse(sliderOptionsString, function(key, value) {
            if (key === 'modules') {
                return value.map(moduleName => {
                    switch (moduleName) {
                        case 'Navigation':
                            return Navigation;
                        case 'Pagination':
                            return Pagination;
                        case 'Autoplay':
                            return Autoplay;
                        case 'Keyboard':
                            return Keyboard;
                        case 'Grid':
                            return Grid;
                        case 'EffectCoverflow':
                            return EffectCoverflow;
                        default:
                            return null;
                    }
                }).filter(module => module !== null);
            } else {
                return value;
            }
        });
    }
    return sliderOptions;
}
/****** Destroy swiper loop ******/
export function destroySwiperLoop() {

    for (var i = 0; i < swiperObjs.length; i++) {
        
        var swiperObj = swiperObjs[i];
        swiperObj.destroy(); // Destroy swiper
       
    };
    swiperObjs=[];
    setupSwiper();
}

/****** Reset swiper loop ******/
export function resetSwiperLoop() {
    setTimeout(function() {
        for (var i = 0; i < swiperObjs.length; i++) {
            var swiperObj = swiperObjs[i];
            swiperObj.update();
        }
    }, 500);
}

/****** Setup swiper slider ******/
export async function setupSwiperFilter(event,_this){
        const currentSwiper = _this.closest(".swiper-isotope");
        const swiperContent = currentSwiper.querySelector(".swiper__content");
        const swiperIndex = swiperContent.dataset.swiperIndex;
        //limpiar filtro
        currentSwiper.querySelectorAll(".swiper__filter--active").forEach(function (item) {
            item.classList.remove("swiper__filter--active");
        });

        //let filterValue = event.target.getAttribute('data-filter').split(".");
        _this.classList.add("swiper__filter--active");

        /*swiperContent.querySelectorAll(".swiper-slide--filter:not([data-filter='" + filterValue[1] + "'])").forEach(function (element) {
            // Añadir la clase "swiper-slide--none"
            element.classList.add("swiper-slide--none");
            // Eliminar la clase "swiper-slide"
            element.classList.remove("swiper-slide");
        });*/

        // Seleccionar todos los elementos con el atributo "data-filter" igual a la variable "filter"
        
    
        swiperObjs[swiperIndex].destroy();
        swiperObjs[swiperIndex] = null;
        
        /*const reInitSwiperSlide = new Promise((resolve,reject)=>{
            try{

                store.querySelectorAll("[data-filter='" + filterValue[1] + "']").forEach(function (element) {
                    let clone = element.cloneNode(true);
                    swiperWrapper.appendChild(clone);
                });
                
                resolve();
            }
            catch(error){
                reject(error);
            }
        });

        await reInitSwiperSlide.then(()=>{

            
    
            if (typeof (sliderOptions) !== 'undefined' && sliderOptions !== null) {
                const swiperObj = new Swiper(swiperContent, sliderOptions);
                swiperObjs[swiperIndex] = swiperObj;
                execLazyLoad(currentSwiper);
            }
        });*/
      
        const sliderOptions = getOptionsSwiper(swiperContent);
        
        initSwiperFilter(swiperContent).then(() => {
            // Crear el objeto swiper después de que se hayan generado todos los slides
            execLazyLoad(swiperContent);
            const swiperObj = new Swiper(swiperContent, sliderOptions);
           
            swiperObjs[swiperIndex] = swiperObj;
            swiperObjs[swiperIndex].slideToLoop(0);

        });
};