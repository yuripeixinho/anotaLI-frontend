import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams } from "react-router-dom";
import FeiraService from "../../../services/feira.service";
import { useNavigate } from "react-router-dom";
import ModalCriarFeira from "./ModalCriarFeira";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

export default function MeuCalendario() {
  const { contaID } = useParams();
  const [modalCriarFeiraAberto, setModalCriarFeiraAberto] = useState(false);
  const [feiras, setFeiras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const _feiraService = new FeiraService();

    async function init() {
      const responseFeiraService = await _feiraService.listSub(contaID);
      setFeiras(responseFeiraService);
    }

    init();
  }, [contaID]);

  const handleSelectSlot = ({ start, end }) => {
    setModalCriarFeiraAberto(true);
  };

  const aoSalvarNovaFeira = (novaFeira) => {
    setFeiras([...feiras, novaFeira]); // Adiciona a nova feira ao estado
  };

  const moveEvent = ({ event, start, end }) => {
    const updatedEvents = feiras.map(existingEvent => {
      if (existingEvent.id === event.id) {
        return { ...existingEvent, start, end };
      }
      return existingEvent;
    });

    setFeiras(updatedEvents);
  };

  return (
    <div>
      <ModalCriarFeira
        setModalCriarFeiraAberto={setModalCriarFeiraAberto}
        modalCriarFeiraAberto={modalCriarFeiraAberto}
        aoSalvarNovaFeira={aoSalvarNovaFeira}
      />

      <Calendar
        localizer={localizer}
        events={feiras}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        onEventDrop={moveEvent} // Habilita o evento de arrastar
        selectable={true}
        resizable={true} // Habilita a redimensionação
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
