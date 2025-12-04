import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import SchedulerDaypilot from './Component/Schedular/SchedulerDaypilot'
import SchedulerProTrial from './Component/Schedular/SchedulerPro'
// import Modal1 from './Component/Popup/Modal1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SchedulerDaypilot></SchedulerDaypilot>
     <SchedulerProTrial></SchedulerProTrial>
     {/* <Modal1></Modal1> */}
    </>
  )
}

export default App
