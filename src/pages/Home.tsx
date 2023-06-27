import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RestaurantType } from "../types";
import { Typography, Box, styled } from "@mui/material";
import type { RootState } from "../store/store";

interface restaurantProps {
  restaurants: RestaurantType[];
  setRestaurants: React.Dispatch<React.SetStateAction<RestaurantType[]>>;
  urlMain: string;
}
const ImageButton = styled(Link)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

function Home({ restaurants, setRestaurants, urlMain }: restaurantProps) {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  useEffect(() => {
    axios.get(`${urlMain}`).then((response) => {
      setRestaurants(response.data);
    });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h2">Restaurant List</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          width: "100%",
          gap: "20px",
        }}
      >
        {restaurants &&
          restaurants.map((restaurant) => (
            <ImageButton
              to={`/restaurant/${restaurant.id}`}
              key={restaurant.id}
              sx={{
                "@media (max-width: 960px)": {
                  width: cartItems.length !== 0 ? "80%" : "48%",
                },
                "@media (min-width: 960px)": {
                  width: cartItems.length !== 0 ? "48%" : "30%",
                },
              }}
            >
              <ImageSrc
                style={{ backgroundImage: `url(${restaurant.photo})` }}
              />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {restaurant.name}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
      </Box>
    </div>
  );
}

export default Home;
