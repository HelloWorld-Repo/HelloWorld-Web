import { Routes as Switch, Route } from "react-router-dom";

import { Navbar } from "../components";
import Home from "../pages/Home";
import Classes from "../pages/StudentClass";
import Students from "../pages/Students";
import Modules from "../pages/Modules";
import Results from "../pages/Results";
import ClassDetails from "../pages/ClassDetails";
import StudentDetails from "../pages/StudentDetails";
import ModuleDetails from "../pages/ModuleDetails";
import ChapterDetails from "../pages/ChapterDetails";
import Chapters from "../pages/Chapters";
import Questions from "../pages/Questions";
import QuestionDetails from "../pages/QuestionDetails";

const OtherRoutes = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/users" element={<Students />} />
        <Route path="/user" element={<StudentDetails />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/class" element={<ClassDetails />} />
        <Route path="/module/:id" element={<ModuleDetails />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/chapter/:id" element={<ChapterDetails />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/question/:id" element={<QuestionDetails />} />
        <Route path="/analytic" element={<Results />} />
        <Route path="/" element={<Home />} />
      </Switch>
    </>
  );
};

export default OtherRoutes;
