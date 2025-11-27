import { Route, Router, Routes } from "react-router-dom";
import SidebarLayout from "./components/common/SidebarLayout";
import Pomodoro from "./pages/Pomodoro";
import HomeApps from "./pages/HomeApps";
import About from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<HomeApps />} />
          <Route path="about-me" element={<About />} />
          <Route path="pomodoro" element={<Pomodoro />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
