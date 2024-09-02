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
        
        let domain = "http://localhost:3000";
        if (window.location.port!== '4321') {
          domain = window.location.origin;
        }

        const baseURL = `${domain}/api-request`;
        // ejecuta
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "PluginName": "quotify",
          "ServiceName": "quantify-service",
          "ServiceAction": "indicadores-data",
          "BodyData": {
            "language_code": "es",
            "query_date": getCurrentDate()
          },
          "DataContext": null
        });
        
        const response = await fetch(baseURL, {
          method: "POST",
          headers: myHeaders,
          body: raw
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        const indicadoresData = result.result.divisas;

        // Asegúrate de que data sea un array
        setData(Array.isArray(indicadoresData) ? indicadoresData : []);
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
    <section className="carousel-container w-[24rem] overflow-hidden flex  justify-center">
      <article className="carrusel flex flex-nowrap w-full">
        {/* se necesita la data dos veces para que funcione la animación del  carrusel */}
        {[...data, ...data].map((indicator, index) => (
          <div
            key={index}
            className="carusel-element flex items-center justify-center *:text-xs "
          >
            <p className="text-white font-bold flex w-[4.6rem] *:text-xs ">
              <span className="">{indicator.tipoCambio}:</span>
            </p>
            <p className="text-guardsman-red-500 flex gap-1 items-center justify-center *:text-xs mr-3">
              Venta:
              <span className="text-lime-500">{indicator.venta}</span>
            </p>
            <p className="text-guardsman-red-500 flex gap-1 items-center justify-center ">
              Compra:
              <span className="text-lime-500 flex gap-1 items-center justify-center mr-5">
                {" "}
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
