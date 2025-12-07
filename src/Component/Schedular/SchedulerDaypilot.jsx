import React, { useState, useEffect, useRef } from "react";
import { DayPilotScheduler, DayPilot } from "@daypilot/daypilot-lite-react";
import data from "../../../public/Data";
import ConnectWalletModal from "../Popup/Modal1";

export default function SchedulerDaypilot() {
  const schedulerRef = useRef();
  const newRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);

  const [events] = useState([
    {
      id: 1,
      text: "Event 1",
      start: "2026-04-01T10:00:00",
      end: "2026-04-02T11:00:00",
      resource: "R1",
      barColor: "#4a90e2",
      cssClass: "my-event",
    },
    {
      id: 2,
      text: "Event 2",
      start: "2026-04-01T07:00:00",
      end: "2026-04-01T12:00:00",
      resource: "R1",
      barColor: "#4a90e2",
      tags: { category: "category1" },
      cssClass: "my-event",

      resizeDisabled: false,
      borderColor: "green",
      borders: { top: true, bottom: true },
      horizontalAlignment: "center",
    },
  ]);

  useEffect(() => {
    const style = window.document.createElement("style");
    style.innerHTML = `
      .scheduler_default_event_bar_inner {
        position: absolute !important;
        height: 4px !important;
        background-color: red !important;
      }
   
    `;
    window.document.head.appendChild(style);
  }, []);

  const [config, setConfig] = useState({
    startDate: "2026-04-01",
    days: 60,
    scale: "Day",
    timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
    cellWidth: 100,
    resources: data,
    events: events,
    eventHeight: 32,
    eventClickHandling: "Select",

    onBeforeEventRender: (args) => {
      const eventData = args.data;
      args.data.toolTip = `
        Name: ${eventData.text}
        Start: ${eventData.start}
        End: ${eventData.end}
        Resource: ${eventData.resource}
      `;
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
      args.row.headerHtml = `<span style="user-select: text;">${args.row.name}</span>`;
    },

   onEventClick: (args) => {
  console.log("onEventClick ->", args.div);
  let el = args.div;
  let all_class = Array.from(el.classList);

  // Get the DOM element
  let dom_el = document.querySelector(
    `.${all_class[all_class.length - 1]}`
  );
  console.log("dom_el ->", dom_el);

  // Get the first child and its first class
  const firstChild = dom_el.firstElementChild;
  const firstChildClass = firstChild.classList[0]; // get a single class name
  console.log("first child class =>", firstChildClass);

  // Open modal
  setModalOpen(true);

  // Inject dynamic CSS for the element and its first child
  const style = document.createElement("style");
  style.innerHTML = `
    .${all_class[all_class.length - 1]} {
      color: blue !important;
      font-size: 16px;
      background: red !important;
    }

    .${firstChildClass} {
      
    }
  `;
  document.head.appendChild(style);
},

  });



  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      onAfterRender: () => {
        const schedulerDiv = schedulerRef.current?.control?.element;
        if (!schedulerDiv) return;

        const rows = schedulerDiv.querySelectorAll(".scheduler_default_row");
        rows.forEach((row) => {
          row.style.cursor = "pointer";
          row.onclick = () => {
            const header = row.querySelector(
              ".scheduler_default_rowheader_inner_text"
            );
            console.log("Row clicked:", header?.innerText);
            row.style.backgroundColor =
              row.style.backgroundColor === "yellow" ? "#fff" : "yellow";
          };
        });
      },
    }));
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    console.log(
      "_".repeat(50),
      "\n",
      schedulerRef.current,
      "\n",
      "_".repeat(50)
    );

    let evetnHandler = window.document.querySelectorAll(
      ".scheduler_default_event"
    );
    // console.log()
    console.log("evetnHandler useeffect - > ", evetnHandler);

    evetnHandler.forEach((el) => {
      el.addEventListener("click", () => {
        console.log("button has ben clicked ", el);
      });
    });
    // console.log()
  }, [modalOpen]);

  return (
    <div>
      <h1 className="text-red-500">hello world</h1>

      <div style={{ height: "100vh" }}>
        <DayPilotScheduler ref={schedulerRef} {...config} events={events} />
      </div>

      {/* {modalOpen && <ConnectWalletModal onClose={() => setModalOpen(false)} />} */}
    </div>
  );
}
