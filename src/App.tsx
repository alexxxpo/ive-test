import { Route, Routes } from "react-router-dom";
import BrigadesPage from "./pages/BrigadesPage";
import { ChartPage } from "./pages/ChartPage";
import { Layout } from "./pages/layout";


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<BrigadesPage/>}/>
        <Route path="chart" element={<ChartPage/>}/>
        <Route path="*" element={<BrigadesPage/>}/>
      </Route>
    </Routes>
  )
}
export default App;
