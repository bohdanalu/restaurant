import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { Container, Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <Header />

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="restaurant/:id" element={<Restaurant />} />
            </Routes>
            <Cart />
          </Box>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
