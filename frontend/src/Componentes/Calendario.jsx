import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { useState, useEffect } from "react";
import { obtenerTontosDelMes } from "../API/Api";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "dayjs/locale/es";

dayjs.locale("es");

const Calendario = () => {
  const localizar = dayjsLocalizer(dayjs);
  const messages = {
    today: "Hoy",
    previous: "Mes anterior",
    next: "Mes siguiente",
  };

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // PARAHACER: como carajo obtener el rango de fechas inicial en el calendario?
    // const inicio = ??????
    // const fin = ??????
    // obtenerTontosEntreFechas(inicio, fin)
    // Alternativa
    // - Otener fecha actual
    // - Otener inicio del mes
    // - Obtener fin del mes
    // obtenerTontosEntreFechas(inicio, fin)
  }, []);

  const manejarCambioDeMes = (rango) => {
    obtenerTontosEntreFechas(rango.start, rango.end);
  };

  const obtenerTontosEntreFechas = async (inicio, fin) => {
    // console.log("Fecha inicio", inicio);
    // console.log("Fecha fin", fin);

    const tontos = await obtenerTontosDelMes(inicio, fin);

    const eventoCalendario = (tonto) => {
      const diaInicio = new Date(tonto.dia);
      if (isNaN(diaInicio)) {
        console.error(`Error de fechas: ${tonto.dia}`);
        return null;
      }
      return {
        start: diaInicio,
        end: diaInicio,
        title: tonto.nombre,
      };
    };

    const listaEventos = tontos.map(eventoCalendario);
    setEventos(listaEventos);
  };

  return (
    <>
      <div className="calendarioTamaño">
        <Calendar
          localizer={localizar}
          messages={messages}
          views={["month"]}
          events={eventos}
          onRangeChange={(rango) => manejarCambioDeMes(rango)}
        />
      </div>
    </>
  );
};

export default Calendario;
