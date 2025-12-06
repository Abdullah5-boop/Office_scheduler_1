import React, { useState, useEffect, useRef } from "react";
import { DayPilotScheduler, DayPilot } from "@daypilot/daypilot-lite-react";
import data from "../../../public/Data";
// import "../Schedular/"
export default function SchedulerDaypilot() {
  const schedulerRef = useRef(); // ref to scheduler

  const [events, setEvents] = useState([
    {
      id: 1,
      text: "Event 1",
      start: "2026-04-01T10:00:00",
      end: "2026-04-02T11:00:00",
      resource: "R1",
      barColor: "#4a90e2",
    },
  
    {
      id: 2,
      text: "Event 2",
      start: "2026-04-01T07:00:00",
      end: "2026-04-01T12:00:00",
      resource: "R1",
      barColor: "#4a90e2", 
      tags : { category: "category1" },
      cssClass: "my-event",
      fontColor : "red",
      resizeDisabled :true
    },
  ]);
useEffect(() => {
  const style = window.document.createElement("style");

  style.innerHTML = `
    .scheduler_default_event_bar_inner { 
      position: absolute !important;
      height: 4px !important;
      width: 500px !important;
      background-color: red !important;
    }
  `;
  window.document.head.appendChild(style);
}, []);

  const editEvent = (e) => {
    console.log("editEvent called ->", e);
    const updated = { ...e.data, text: "Edited Event" };
    setEvents(events.map((ev) => (ev.id === updated.id ? updated : ev)));
  };

  const deleteEvent = (e) => {
    console.log("deleteEvent called ->", e);
    setEvents(events.filter((ev) => ev.id !== e.data.id));
  };

  const [config, setConfig] = useState({
    startDate: "2026-04-01",
    days: 60,
    scale: "Day",
    timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
    cellWidth: 100,
    resources: data,
    events: events,
    eventHeight: 32,

    onBeforeEventRender: (args) => {
      console.log("onBeforeEventRender ->", args);
      const eventData = args.data;
      args.data.toolTip = `\n Name: ${eventData.text} \nStart: ${eventData.start} \nEnd: ${eventData.end} \nResource: ${eventData.resource} `;
    },

    eventMoveHandling: "Update",
    eventResizeHandling: "Update",

    onEventMoved: (args) => {
      console.log("onEventMoved ->", args);
    },
    onEventResized: (args) => {
      console.log("onEventResized ->", args);
    },

    onBeforeRowHeaderRender: (args) => {
      console.log("onBeforeRowHeaderRender ->", args);
      args.row.headerHtml = `<span style="user-select: text;">${args.row.name}</span>`;
    },

    onEventClick: async (args) => {
      console.log("onEventClick ->", args);
      if (args.mouse?.button === 2) {
        const menu = new DayPilot.Menu([
          { text: "Edit Event", onClick: () => editEvent(args.e) },
          { text: "Delete Event", onClick: () => deleteEvent(args.e) },
        ]);

        menu.show(args.nativeEvent.clientX, args.nativeEvent.clientY);
      }
    },
  });

  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      onAfterRender: (args) => {
        console.log("onAfterRender ->", args);
        const schedulerDiv = schedulerRef.current?.control?.element;
        if (!schedulerDiv) return;

        const rows = schedulerDiv.querySelectorAll(".scheduler_default_row");
        rows.forEach((row) => {
          row.style.cursor = "pointer";
          row.onclick = () => {
            const header = row.querySelector(".scheduler_default_rowheader_inner_text");
            console.log("Row clicked ->", header?.innerText);

            row.style.backgroundColor =
              row.style.backgroundColor === "yellow" ? "#fff" : "yellow";
          };
        });
      },
    }));
  }, []);

  console.log("Rendering Scheduler component");

  return (
<div style={{ height: "100vh" }}>
  <DayPilotScheduler ref={schedulerRef} {...config} events={events} />
</div>

  );
}
