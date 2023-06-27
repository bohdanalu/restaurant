import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantType, MenuType } from "../types";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import Menu from "../components/Menu";
import { useState } from "react";
import CategoryBtns from "../components/CategoryBtns";

interface restaurantProps {
  restaurants: RestaurantType[];
  setRestaurants: React.Dispatch<React.SetStateAction<RestaurantType[]>>;
  urlMain: string;
  menuUrl: string;
}

function Restaurant({
  restaurants,
  setRestaurants,
  urlMain,
  menuUrl,
}: restaurantProps) {
  const { id } = useParams<{ id: string }>();
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [menuFetched, setMenuFetched] = useState<MenuType[]>([]);

  useEffect(() => {
    if (restaurants.length === 0) {
      axios
        .get(`${urlMain}`)
        .then((response) => {
          setRestaurants(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [restaurants, setRestaurants, urlMain]);

  useEffect(() => {
    if (id) {
      axios
        .get(`${menuUrl}`)
        .then((response) => {
          const fetchedMenu = response.data[id].items;
          setMenu(fetchedMenu);
          setMenuFetched(fetchedMenu);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [menuUrl, setMenu, setMenuFetched, id]);

  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.id === parseInt(id || "", 10)
  );

  const handleChooseCategories = (btn: string) => {
    let filteredMenu;
    if (btn.toLowerCase() === "all") {
      filteredMenu = menuFetched;
    } else {
      filteredMenu = menuFetched.filter(
        (item) => item.category?.toLowerCase() === btn.toLowerCase()
      );
    }
    setMenu(filteredMenu);
  };

  return selectedRestaurant ? (
    <Box pt={2}>
      <Typography variant="h3" component={"h2"}>
        {selectedRestaurant.name}
      </Typography>
      <Typography sx={{ fontFamily: "Monospace" }}>
        {selectedRestaurant.description}
      </Typography>
      <Typography variant="h4" p={2}>
        Menu
      </Typography>
      <CategoryBtns
        menu={menu}
        handleChooseCategories={handleChooseCategories}
      />
      <Menu menu={menu} restaurantId={selectedRestaurant.id} />
    </Box>
  ) : (
    <p>Menu not found</p>
  );
}

export default Restaurant;
