import React, { useState, useEffect } from "react";
import { getCurrentDate } from "@src/utils/getCurrentDate";
import "./indicadores-carousel.css";

const IndicadoresCarousel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let domain = window.location.origin;
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const testParam = params.get('test');
        let testString = testParam ? `?test=${testParam}` : "";

        const baseURL = `${domain}/api/divisas.json${testString}`;
        // const baseURL = `${domain}/api-request${testString}`;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // SELECCIONAR LENGUAJE
        const currentLang = localStorage.getItem('selectedLanguage');
        let langCode = 'es';
        if (currentLang) {
          langCode = JSON.parse(currentLang).code;
        }

        const raw = JSON.stringify({
          PluginName: "quotify",
          ServiceName: "quantify-service",
          ServiceAction: "indicadores-data",
          BodyData: {
            language_code: langCode,
            query_date: getCurrentDate(),
          },
          DataContext: null,
        });

        const response = await fetch(baseURL, {
          method: "POST",
          headers: myHeaders,
          body: raw,
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        //Provisional para visualizar en local. Se debe comentar este y descomentar el de abajo
        const indicadoresData = result.data.indicadores[0].result.divisas;


        // const indicadoresData = result.result.divisas;


        // Ensure data is an array
        setData(Array.isArray(indicadoresData) ? indicadoresData : []);
        // setData(indicadoresData);

        console.log(indicadoresData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="carousel-container w-[24rem] overflow-hidden flex justify-center">
      <article className="carrusel flex flex-nowrap w-full">
        {/* Duplicating data for carousel animation */}
        {[...data, ...data].map((indicator, index) => (
          <div
            key={index}
            className="carusel-element flex items-center justify-center"
          >
            <p className="text-white font-bold flex text-[.9rem] mr-5">
              <span>{indicator.tipoCambio}:</span>
            </p>
            <p className="text-[#ff1111] flex gap-1 items-center justify-center ">
              Venta:
              <span className="text-lime-500 mr-3">{indicator.venta}</span>
            </p>
            <p className="text-[#ff1111] flex gap-1 items-center justify-center">
              Compra:
              <span className="text-lime-500 flex gap-1 items-center justify-center mr-5">
                {indicator.compra}
              </span>
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default IndicadoresCarousel;
