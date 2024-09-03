import React, { Profiler, useCallback, lazy, Suspense, memo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Providers from "./providers/providers";
import Loader from "./components/loader/loader";

// Lazy loading components
const RoundOne = memo(lazy(() => import("./components/roundDesigns/RoundOne")));
const RoundTwo = memo(lazy(() => import("./components/roundDesigns/RoundTwo")));
const RoundThree = memo(
  lazy(() => import("./components/roundDesigns/RoundThree"))
);
const RoundFour = memo(
  lazy(() => import("./components/roundDesigns/RoundFour"))
);
const RoundFive = memo(
  lazy(() => import("./components/roundDesigns/RoundFive"))
);
const Home = lazy(() => import("./Home"));
const ProjectDetail = lazy(() => import("./components/projects/ProjectDetail"));
const BlogDetailPage = lazy(() => import("./components/blog/blogdetails"));

const BackgroundShapes = memo(() => (
  <div className="w-full h-full absolute top-0 left-0 z-10">
    <RoundOne />
    <RoundTwo />
    <RoundThree />
    <RoundFour />
    <RoundFive />
  </div>
));

function App() {
  const onRenderCallback = useCallback((id, phase, actualDuration) => {
    if (process.env.NODE_ENV === "development") {
      console.log({ id, phase, actualDuration });
    }
  }, []);

  const AppContent = (
    <Router>
      <Providers>
        <div className="w-full lgl:h-screen font-bodyfont overflow-hidden text-textColor bg-black relative">
          <div className="max-w-screen-2xl h-full mx-auto flex justify-center items-center">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/projects/:projectId"
                  element={<ProjectDetail />}
                />
                <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
              </Routes>
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <BackgroundShapes />
          </Suspense>
        </div>
      </Providers>
    </Router>
  );

  return process.env.NODE_ENV === "development" ? (
    <Profiler id="App" onRender={onRenderCallback}>
      {AppContent}
    </Profiler>
  ) : (
    AppContent
  );
}

export default App;
