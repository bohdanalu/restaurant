import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/cart_slice";
import { MenuType } from "../types";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";

interface MenuItemProps {
  menuItem: MenuType;
  restaurantId: number;
}

const MenuItem = ({ menuItem, restaurantId }: MenuItemProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = (menuItem: MenuType) => {
    dispatch(addItemToCart({ menuItem, restaurantId }));
  };

  return (
    <Card
      sx={{
        height: "160px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent sx={{ padding: "0px", textAlign: "left" }}>
          <Typography variant="h6" component="h3">
            {menuItem.name}
          </Typography>
          <Typography variant="body1" pl={2} mb={1}>
            {menuItem.price} EUR
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            marginTop: "auto",
          }}
        >
          <Button
            variant="outlined"
            sx={{ textTransform: "none", position: "absolute" }}
            size="small"
            onClick={() => handleAddToCart(menuItem)}
          >
            Add to cart
          </Button>
        </CardActions>
      </Box>
      <CardMedia
        sx={{ width: "40%" }}
        component="img"
        image={menuItem.photo}
        alt={menuItem.name}
      />
    </Card>
  );
};

export default MenuItem;
