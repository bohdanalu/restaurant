import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MenuType } from "../types";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import Menu from "../components/Menu";
import { useState } from "react";
import CategoryBtns from "../components/CategoryBtns";
import { menuURL } from "../constants";
import { useSelector } from "react-redux";
import { selectRestaurants } from "../store/restaurants_slice";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { fetchRestaurants } from "../store/restaurants_slice";
import { RootState } from "../store/store";

function Restaurant() {
  const { id } = useParams<{ id: string }>();
  const [menu, setMenu] = useState<MenuType[]>([]);
  const [initialMenu, setInitialMenu] = useState<MenuType[]>([]);
  const restaurants = useSelector(selectRestaurants);
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      console.log(id);
      axios
        .get(`${menuURL}`)
        .then((response) => {
          const fetchedMenu = response.data.find(
            (restaurant: { id: string }) => restaurant.id.toString() === id
          );
          if (fetchedMenu) {
            setMenu(fetchedMenu.items);
            setInitialMenu(fetchedMenu.items);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [setMenu, setInitialMenu, id]);

  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.id === parseInt(id || "", 10)
  );

  const handleChooseCategories = (btn: string) => {
    let filteredMenu;
    if (btn.toLowerCase() === "all") {
      filteredMenu = initialMenu;
    } else {
      filteredMenu = initialMenu.filter(
        (item) => item.category?.toLowerCase() === btn.toLowerCase()
      );
    }
    setMenu([...filteredMenu]);
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
