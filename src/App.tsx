import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import { RestaurantType } from "./types";
import { useState } from "react";
import { Container, Box } from "@mui/material";

function App() {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const restaurantsURL = "https://bohdanalu.github.io/restaurant.json";
  const menuURL = "https://bohdanalu.github.io/menu.json";

  return (
    <div className="App">
      <Container>
        <CartProvider>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      restaurants={restaurants}
                      setRestaurants={setRestaurants}
                      urlMain={restaurantsURL}
                    />
                  }
                />
                <Route
                  path="restaurant/:id"
                  element={
                    <Restaurant
                      restaurants={restaurants}
                      setRestaurants={setRestaurants}
                      urlMain={restaurantsURL}
                      menuUrl={menuURL}
                    />
                  }
                />
              </Routes>
            </BrowserRouter>
            <Cart />
          </Box>
        </CartProvider>
      </Container>
    </div>
  );
}

export default App;
