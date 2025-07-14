import { RailwayContext } from './context/railwayContext'
import Routing from './Router/Routing'
function App() {
  return (
    <RailwayContext>
      <Routing />
    </RailwayContext>
  )
}

export default App
