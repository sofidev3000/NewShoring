import React, { useState, useEffect } from "react";
import "./bannerCookies.css";
import coockiesImg from "./CoockiesImg.svg";

const BannerCoockies = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  return (
    <>
      <div
        id="myModal"
        class="modal"
        style={{ display: isVisible === true ? "block" : "none" }}
      >
        <div className="modal-content ">
          <div className="flex items-center mb-3">
            <img src={coockiesImg.src} alt="" width={30} height={30} className="mr-2" />
            <h3 className="font-bold">Aviso de uso de Cookies</h3>
          </div>
          <p>
            Utilizamos cookies propias y de terceros para mejorar nuestros
            servicios
          </p>

          <div className=" flex flex-col mt-5">
            <button
              className="border-2 border-indigo-500 text-sm text-indigo-600   hover:bg-indigo-600 hover:text-white transition ease-in-out  font-bold rounded p-1"
              onClick={() => {
                handleAccept();
              }}
            >
              De acuerdo
            </button>
            <button className="border-2 border-green-500 text-sm text-green-600   hover:bg-green-600 hover:text-white transition ease-in-out  font-bold rounded p-1 my-2">
              Seleccionar
            </button>
            <button className="border-2 border-red-500 text-sm text-red-600   hover:bg-red-600 hover:text-white transition ease-in-out  font-bold rounded p-1 ">
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerCoockies;
