import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import ProtectedRoute from "./ProtectedRoute";
import VerifyToken from "./VerifyToken";
import NavBar from "./components/NavBar";
import NotFound from "./NotFound";



function App() {
  const client = new ApolloClient({
    uri: import.meta.env.VITE_BACKEND_URI,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route element={<VerifyToken/>}>
            <Route path="/" element={<Home />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
              <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
