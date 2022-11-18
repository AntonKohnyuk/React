import MainPage from "./pages/mainPage";
import "./App.scss";
import Header from "./components/header";
import { Route, Routes } from "react-router-dom";
import StoryPage from "./pages/storyPage";

function App(): JSX.Element {
  return (
    <>
      <div className="content-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="story/:id" element={<StoryPage />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
