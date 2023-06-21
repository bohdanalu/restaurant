import { useEffect } from "react";
import { MenuType } from "../types";
import MenuItem from "./MenuItem";
import { Grid } from "@mui/material";
import { useCart } from "../context/CartContext";

interface MenuProps {
  menu: MenuType[];
}

function Menu({ menu }: MenuProps) {
  const { cartItems } = useCart();

  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={2}>
        {menu &&
          menu.map((menuItem) => (
            <Grid
              item
              xs={12}
              sm={cartItems.length !== 0 ? 12 : 6}
              md={cartItems.length !== 0 ? 6 : 4}
            >
              <MenuItem key={menuItem.id} menuItem={menuItem} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Menu;
