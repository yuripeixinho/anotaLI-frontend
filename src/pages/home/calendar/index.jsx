import React, { useEffect, useState, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment-timezone"; // Importa moment-timezone
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useParams, useNavigate } from "react-router-dom";
import FeiraService from "../../../services/feira.service";
import ModalCriarFeira from "./ModalCriarFeira";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "./styles.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import EventNoteIcon from "@mui/icons-material/EventNote";
moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

export default function MeuCalendario({feiras, setFeiras}) {
  const { contaID } = useParams();
  const [modalCriarFeiraAberto, setModalCriarFeiraAberto] = useState(false);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const _feiraService = new FeiraService();

    const init = async () => {
      const responseFeiraService = await _feiraService.listSub(contaID);
      setFeiras(responseFeiraService);
    };

    init();
  }, [contaID]);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setModalCriarFeiraAberto(true);
  };

  const aoSalvarNovaFeira = (novaFeira) => {
    setFeiras((prevFeiras) => [...prevFeiras, novaFeira]); // Adiciona a nova feira ao estado
  };

  useEffect(() => {
    // Este código será executado sempre que 'feiras' for atualizado
    console.log("Feiras atualizadas:", feiras);
  }, [feiras]); // Dependência no estado 'feiras'

  const moveEvent = useCallback(
    async ({ event, start, end }) => {
      // Atualiza o evento movido
      const updatedEvents = feiras.map((e) =>
        e.id === event.id ? { ...e, start, end } : e
      );

      // Ordena os eventos pela data de início (start)
      updatedEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

      // Atualiza o estado das feiras ordenadas
      setFeiras(updatedEvents);

      const _feiraService = new FeiraService();
      const values = {
        id: event.id,
        nome: event.title,
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
        selectedDate={selectedDate} // Nova prop
      />

      <DragAndDropCalendar
        localizer={localizer}
        events={feiras}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        selectable
        className="calendar-container"
        onEventDrop={moveEvent}
        onDropFromOutside={onDropFromOutside}
        onSelectEvent={(ev) => navigate(`/home/${contaID}/${ev.id}`)}
        messages={{
          today: "Hoje",
          previous: <ArrowBackIosIcon />,
          next: <ArrowForwardIosIcon />,
          month: <CalendarMonthIcon></CalendarMonthIcon>,
          week: <CalendarViewWeekIcon></CalendarViewWeekIcon>,
          day: <TodayIcon></TodayIcon>,
          agenda: <EventNoteIcon></EventNoteIcon>,
        }}
      />
    </div>
  );
}
