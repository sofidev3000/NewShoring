import React, { useState, useEffect } from "react";
import "./bannerCookies.css";

const cookiesArr = [
  {
    id: 1,
    title: "Necesarias",
    content:
      "Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas. Por lo general, solo se configuran en respuesta a acciones que realizas y que equivalen a una solicitud de servicios, como configurar tus preferencias de privacidad, iniciar sesión o completar formularios.",
    show: true,
    required: true,
    checked: true,
    cookieName: "necessary",
  },
  {
    id: 2,
    title: "Analíticas",
    content:
      "Estas cookies nos ayudan a comprender cómo interactúan los visitantes con el sitio web. Podemos utilizar un conjunto de cookies para recopilar información y generar estadísticas de uso del sitio. ",
    checked: true,
    show: false,
    required: true,
    cookieName: "analytics",
  },
  {
    id: 3,
    title: "Publicidad",
    content:
      "Utilizamos cookies para hacer que nuestros anuncios sean más atractivos y valiosos para los visitantes del sitio. Algunas aplicaciones comunes de las cookies son seleccionar anuncios basados en lo que es relevante para ti como usuario, mejorar la información sobre el rendimiento de las campañas publicitarias y evitar mostrar anuncios que ya has visto.",
    checked: true,
    show: false,
    required: true,
    cookieName: "advertising",
  },
  {
    id: 4,
    title: "Funcionalidad",
    content:
      "Utilizamos un conjunto de cookies que son opcionales para que el sitio web funcione. Por lo general, solo se configuran en respuesta a la información proporcionada al sitio web para personalizar y optimizar tu experiencia, así como para recordar el historial de tus conversaciones.",
    checked: true,
    show: false,
    required: true,
    cookieName: "functionality",
  },
];

const BannerCoockies = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleAllCookies, setIsVisibleAllCookies] = useState(false);
  const [allCookiesArr, setAllCookiesArr] = useState(cookiesArr);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("storedCookies");
    if (!cookieConsent) {
      // si no hay cookies
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  

  const handleModalAllCookies = () => {
    setIsVisibleAllCookies(!isVisibleAllCookies);
  };

// ACEPTA COOKIES DESDE CONFIGURACIÓN DE COOKIES
  const handleAcceptConfig = () => {

    if (allCookiesArr.some(c => c.error === true)) {
        return;
    }
    
    //  guardar las cookies...
    const days = 7;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();

    allCookiesArr.map((c) => {
      // document.cookie = "nombre=valor; expires=fecha; path=ruta; secure; SameSite=opción";
      document.cookie = `${c.cookieName}=${c.checked}; expires=${expires}; path = path=; sameSite=Strict `;
    });

    // --------
    document.body.style.overflow = "auto";
    handleModalAllCookies(); // cerrar el modal de las cookies detalle
    setIsVisible(false); // cerrar modal inicial de cookies
    // update storage para no volver a pedir cookies si ya existen...
    localStorage.setItem("storedCookies", "true");
  
};

// ACEPTA COOKIES DESDE "ACEPTAR TODAS"
const handleAcceptALL = () => {
     //  guardar las cookies...
     const days = 7;
     const date = new Date();
     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
     const expires = "; expires=" + date.toUTCString();
 
     allCookiesArr.map((c) => {
       // document.cookie = "nombre=valor; expires=fecha; path=ruta; secure; SameSite=opción";
       document.cookie = `${c.cookieName}=${true}; expires=${expires}; path = path=; sameSite=Strict `;
     });
     document.body.style.overflow = "auto";
    localStorage.setItem("storedCookies", "true");
    setIsVisible(false);
  };

  const showHideTab = ({ id }) => {
    let csArr = allCookiesArr;

    csArr = csArr.map((cs) => {
      if (cs.id == id) {
        cs.show = !cs.show;
      }
      return cs;
    });

    setAllCookiesArr(csArr);
  };

  const handleCheck = ({ id }) => {
    // ACTUALIZAR EL ARR DE COOKIES
    let csArr = allCookiesArr;

    csArr = csArr.map((cs) => {
      if (cs.id == id) {
        cs.checked = !cs.checked;
      }
      if (cs.required === true && cs.checked === false) {
        cs.error = true;
      }else {
        cs.error = false
      }
      return cs;
    });

    setAllCookiesArr(csArr);
  };

  return (
    <>
      <div
        id="myModal"
        className="modal"
        style={{ display: isVisible === true ? "block" : "none" }}
      >
        <div className="modal-content ">
          <div className="flex items-center mb-3">
            <img
              src='/img/near/coockiesImg.svg'
              alt=""
              width={30}
              height={30}
              className="mr-2"
            />
            <h3 className="font-bold">Aviso de uso de Cookies</h3>
          </div>
          <p>
            Utilizamos cookies propias y de terceros para mejorar nuestros
            servicios
          </p>

          <div className=" flex flex-col mt-5">
            <button
              className="bg-[--button-base] text-sm hover:bg-[--button-hover] :activebg-[--button-active] text-[--button-color]  font-bold rounded-[7px] p-1"
              onClick={() => {
                handleAcceptALL();
              }}
            >
              Aceptar todas
            </button>
            <button
              className="border-2 border-green-500 text-sm text-green-600   hover:bg-green-600 hover:text-white transition ease-in-out  font-bold rounded-[7px] p-1 my-2"
              onClick={() => {
                handleModalAllCookies();
              }}
            >
              Configuración de cookies
            </button>
            {/* <button className="border-2 border-red-500 text-sm text-red-600   hover:bg-red-600 hover:text-white transition ease-in-out  font-bold rounded p-1 ">
              Rechazar todas
            </button> */}
          </div>
        </div>
      </div>

      {/* MODAL COOKIES DESC */}

      <div
        id="myModal"
        className="modal"
        style={{ display: isVisibleAllCookies === true ? "block" : "none" }}
      >
        <div className="modal-content-cookies ">
          <h3 className="font-bold p-3 mb-2">Acerca de las cookies</h3>
          <div className="modal-content-cookies-cont px-4">
            {allCookiesArr.map((c) => {
              return (
                <div key={c.id} className="mb-4">
                  <div className="flex items-center justify-between mb-1 py-1">
                    <p
                      className="font-bold hover:cursor-pointer"
                      onClick={() => {
                        showHideTab({ id: c.id });
                      }}
                    >
                      - {c.title}
                    </p>

                    <input
                      className={`checkStyle`}
                    //   disabled={c.required}
                      type="checkbox"
                      name={c.title}
                      id=""
                      checked={c.checked}
                      onChange={() => handleCheck({ id: c.id })}
                      style={{ outline: c.error ? "2px solid red" : "none" }}
                    />
                  </div>

                  <p
                    className={`text-xs ml-2 ${c.show ? "show" : "hide"}`}
                    style={{ overflow: "hidden" }}
                  >
                    {c.content}
                  </p>
                  <hr className="mt-1" />
                </div>
              );
            })}
          </div>

          <div className="  mt-6 modal-content-cookies-btns px-4 pb-3">
          <button
              className="bg-[--button-base] text-sm hover:bg-[--button-hover] :activebg-[--button-active] text-[--button-color]  font-bold rounded-[7px] p-1 mr-2"
              onClick={() => {
                handleAcceptALL();
                setIsVisibleAllCookies(false);
              }}
            >
              Aceptar todas (Recomendado)
            </button>

            <button
              className="bg-[--button-base] text-sm hover:bg-[--button-hover] :activebg-[--button-active] text-[--button-color]  font-bold rounded-[7px] p-1 mr-2"
              onClick={() => {
                handleAcceptConfig();
              }}
            >
              Mi configuración
            </button>
            <button
              className="border-2 border-red-500 text-sm text-red-600   hover:bg-red-600 hover:text-white transition ease-in-out  font-bold rounded p-1 "
              onClick={() => {
                handleModalAllCookies();
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default BannerCoockies;
