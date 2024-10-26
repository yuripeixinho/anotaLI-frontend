import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams } from "react-router-dom";
import FeiraService from "../../../services/feira.service";
import { useNavigate } from "react-router-dom";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const eventosMock = [
  {
    title: "Reunião de equipe",
    start: new Date(2024, 9, 25, 10, 0),
    end: new Date(2024, 9, 25, 12, 0),
  },
  {
    title: "Almoço com cliente",
    start: new Date(2024, 9, 26, 13, 0),
    end: new Date(2024, 9, 26, 14, 0),
  },
];

export default function MeuCalendario() {
  const { contaID } = useParams();
  const [feiras, setFeiras] = useState([]);

  var navigate = useNavigate();

  useEffect(() => {
    const _feiraService = new FeiraService();

    async function init() {
      const responseFeiraService = await _feiraService.listSub(contaID);

      setFeiras(responseFeiraService);
    }

    init();
  }, [contaID]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={feiras}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(ev) => navigate(`/home/${contaID}/${ev.id}`)}
        style={{ height: 500 }}
        messages={{
          today: "Hoje",
          previous: "Anterior",
          next: "Próximo",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
        }}
      />
    </div>
  );
}
