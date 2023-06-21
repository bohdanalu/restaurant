import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RestaurantType } from "../types";
import { Grid, Stack, Typography } from "@mui/material";
import { useCart } from "../context/CartContext";

interface restaurantProps {
  restaurants: RestaurantType[];
  setRestaurants: React.Dispatch<React.SetStateAction<RestaurantType[]>>;
  urlMain: string;
}

function Home({ restaurants, setRestaurants, urlMain }: restaurantProps) {
  const { cartItems } = useCart();
  useEffect(() => {
    axios.get(`${urlMain}`).then((response) => {
      setRestaurants(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Restaurant List</h2>
      <Grid container rowSpacing={3} columnSpacing={{ sm: 2, md: 3 }}>
        {restaurants &&
          restaurants.map((restaurant) => (
            <Grid
              item
              xs={12}
              sm={cartItems.length !== 0 ? 12 : 6}
              md={cartItems.length !== 0 ? 6 : 4}
              key={restaurant.id}
            >
              <Link
                to={`/restaurant/${restaurant.id}`}
                style={{ textDecoration: "none" }}
              >
                <Stack
                  boxShadow={1}
                  direction="column"
                  height={1}
                  p={1}
                  sx={{
                    ":hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "200px",
                      marginBottom: "20px",
                    }}
                    src={restaurant.photo}
                    alt={restaurant.name}
                  />
                  <Typography
                    gutterBottom
                    variant="body1"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    {restaurant.name}
                  </Typography>
                </Stack>
              </Link>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Home;
