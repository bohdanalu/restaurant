import { MenuType } from "../types";
import MenuItem from "./MenuItem";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface MenuProps {
  menu: MenuType[];
  restaurantId: number;
}

function Menu({ menu, restaurantId }: MenuProps) {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const _ = require("lodash");

  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={2}>
        {menu &&
          menu.map((menuItem) => (
            <Grid
              key={menuItem.id}
              item
              xs={12}
              sm={!_.isEmpty(cartItems) ? 12 : 6}
              md={!_.isEmpty(cartItems) ? 6 : 4}
            >
              <MenuItem menuItem={menuItem} restaurantId={restaurantId} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Menu;
