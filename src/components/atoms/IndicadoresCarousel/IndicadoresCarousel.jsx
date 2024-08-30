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
        // ejecuta
        const response = await fetch("http://localhost:3000/api-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PluginName: "quotify",
            ServiceName: "quantify-service",
            ServiceAction: "indicadores-data",
            BodyData: {
              language_code: "es",
              query_date: getCurrentDate,
            },
            DataContext: null,
          }),
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        const indicadoresData = result.indicadores[0].result.divisas;

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
    <section className="carousel-container w-[28rem] overflow-hidden flex  justify-center">
      <article className="carrusel flex flex-nowrap ga-5 w-full">
        {/* se necesita la data dos veces para que funcione la animación del  carrusel */}
        {[...data, ...data].map((indicator, index) => (
          <div key={index} className="carusel-element flex items-center justify-center *:text-sm *:mr-1">
            <p className="text-white font-bold flex w-[4.6rem]"  >
              <span className="basis-auto flex-1 text-sm">{indicator.tipoCambio}:</span>
            </p>
            <p className="text-guardsman-red-500 flex gap-1 items-center justify-center ">
              Venta:
              <span className="text-lime-500">{indicator.venta}</span>
            </p>
            <p className="text-guardsman-red-500 flex gap-1 items-center justify-center ">
              Compra:
              <span className="text-lime-500 flex gap-1 items-center justify-center mr-2"> {indicator.compra}</span>
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

export default IndicadoresCarousel;
