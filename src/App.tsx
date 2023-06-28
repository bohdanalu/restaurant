import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { RestaurantType } from "./types";
import { useState } from "react";
import { Container, Box } from "@mui/material";

function App() {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);

  // variables restaurantsURL, menuURL -> keep them in some separate `constants.ts` file. There is no need to keep these variable in this component
  const restaurantsURL = "https://bohdanalu.github.io/restaurant.json";
  const menuURL = "https://bohdanalu.github.io/menu.json";

  return (
    <div className="App">
      <Container>
        <Header />
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
      </Container>
    </div>
  );
}

export default App;
