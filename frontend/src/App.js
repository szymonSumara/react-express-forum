import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./Components/Login";
import { Container, Row } from "react-bootstrap";
import RegisterForm from "./Components/RegisterForm";
import ForumNavBar from "./Components/NavBar";
import CreateNewPostForm from "./Components/NewPostForm";
import PostsView from "./Components/PostsView";
import * as auth from "./Services/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Logout from "./Components/Logout";
import PostPreview from "./Components/PostPreviev";
import EditPostForm from "./Components/EditPost";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const isLogged = auth.getLoggedUser() ? true : false;
  const nick = auth.getLoggedUser()?.nick;

  return (
    <BrowserRouter>
      {isLogged ? (
        <>
          <ForumNavBar userName={nick} />
          <div className="container h-100 .bg-light ">
            <Row className=" d-flex   justify-content-center">
              <Row className="col-sx-12 col-md-8 col-lg-6">
                <Routes>
                  <Route path="/addPost" element={<CreateNewPostForm />}/>
                  <Route path="/post/:id" element={<PostPreview />} />
                  <Route path="/editPost/:id" element={<EditPostForm />}/>
                  <Route path="/logout" element={<Logout />} />
                  <Route index element={<PostsView />} />
                </Routes>
              </Row>
            </Row>
          </div>
        </>
      ) : (
        <div className="container h-100 .bg-light ">
          <Row className="h-100 d-flex align-items-center justify-content-center">
            <Routes>
              <Route path="/newAccount" element={<RegisterForm />}/>
              <Route path="/login" element={<LoginForm />}/>
              <Route index element={<LoginForm />} />
            </Routes>
          </Row>
        </div>
      )}
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
