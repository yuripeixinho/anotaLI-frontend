import React, { useEffect, useState, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment-timezone"; // Importa moment-timezone
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams, useNavigate } from "react-router-dom";
import FeiraService from "../../../services/feira.service";
import ModalCriarFeira from "./ModalCriarFeira";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

export default function MeuCalendario() {
  const { contaID } = useParams();
  const [modalCriarFeiraAberto, setModalCriarFeiraAberto] = useState(false);
  const [feiras, setFeiras] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const navigate = useNavigate();

  console.log(feiras);

  useEffect(() => {
    const _feiraService = new FeiraService();

    const init = async () => {
      const responseFeiraService = await _feiraService.listSub(contaID);
      setFeiras(responseFeiraService);
    };

    init();
  }, [contaID]);

  const handleSelectSlot = () => {
    setModalCriarFeiraAberto(true);
  };

  const aoSalvarNovaFeira = (novaFeira) => {
    setFeiras((prevFeiras) => [...prevFeiras, novaFeira]); // Adiciona a nova feira ao estado
  };

  const moveEvent = useCallback(
    async ({ event, start, end }) => {
      const updatedEvents = feiras.map((e) =>
        e.id === event.id ? { ...e, start, end } : e
      );
      debugger;
      const _feiraService = new FeiraService();
      const values = {
        id: event.id,
        nome: event.title,
        // Use o start e end diretamente sem conversão
        dataInicio: start.toISOString(), // Salva como ISO sem alterar o fuso
        dataFim: end.toISOString(), // Salva como ISO sem alterar o fuso
      };

      try {
        const res = await _feiraService.dragDataFeiraCalendario(
          contaID,
          values
        );
        setModalCriarFeiraAberto(false);
        aoSalvarNovaFeira(res); // Passa a nova feira para o componente pai
      } catch (err) {
        const message =
          err?.response?.data?.Message ||
          "Erro interno. Tente novamente mais tarde.";
        // setErrorMsg(message); // Você pode habilitar isso se tiver um estado de erro
      }

      setFeiras(updatedEvents);
    },
    [feiras, contaID, aoSalvarNovaFeira]
  );

  const onDropFromOutside = useCallback(
    ({ start, end }) => {
      if (!draggedEvent) return;

      const newEvent = {
        ...draggedEvent,
        start,
        end,
      };
      setFeiras((prev) => [...prev, newEvent]);
      setDraggedEvent(null);
    },
    [draggedEvent]
  );

  return (
    <div>
      <ModalCriarFeira
        setModalCriarFeiraAberto={setModalCriarFeiraAberto}
        modalCriarFeiraAberto={modalCriarFeiraAberto}
        aoSalvarNovaFeira={aoSalvarNovaFeira}
      />

      <DragAndDropCalendar
        localizer={localizer}
        events={feiras}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        selectable
        onEventDrop={moveEvent}
        onDropFromOutside={onDropFromOutside}
        onSelectEvent={(ev) => navigate(`/home/${contaID}/${ev.id}`)}
        style={{ height: 700 }}
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
