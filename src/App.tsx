import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import QuestionList from "./pages/QuestionList"
import VideoQuestion from "./pages/VideoQuestion"

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuestionList />
  },
  {
    path: "video/:questionId",
    element: <VideoQuestion />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
