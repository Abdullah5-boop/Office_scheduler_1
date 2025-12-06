import React, { useState } from "react";
import { DayPilotScheduler } from "daypilot-pro-react";
import data from "../../../public/Data"; // your resources data

export default function SchedulerProTrial() {
  const [resources] = useState(data);

  const [config] = useState({
    startDate: "2026-04-01",
    days: 30,
    scale: "Day",
    cellWidth: 200,

    resources: resources, // pass state here
    events: [
      { id: 1, text: "Event 1", start: "2026-04-01T07:00:00", end: "2026-04-02T11:00:00", resource: "R1", barColor: "#4a90e2" },
    ],

    showTreeLines: true,
    eventMoveHandling: "Update",
    eventResizeHandling: "Update",

    // Click on row header
    onRowHeaderClick : () => {
     

        console.log("clicked")
      //}
    },

    onEventMoved: args => console.log("Moved:", args),
    onEventResized: args => console.log("Resized:", args),

    onBeforeRowHeaderRender: args => {
      args.row.headerHtml = `<span style="user-select: text;">${args.row.name}</span>`;
    },
    onBeforeEventRender: args => {
      args.e.html = `<span style="user-select: text;">${args.e.text}</span>`;
    },
  });
  // console.log(config)

  return (
    <div style={{ height: "100vh" }}>
      <DayPilotScheduler {...config} />
    </div>
  );
}
