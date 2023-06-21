import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
  useMediaQuery,
  Badge,
} from "@mui/material";
import {
  Delete,
  RemoveCircle,
  AddCircle,
  ShoppingBasket,
} from "@mui/icons-material";

function Cart() {
  const { cartItems, handleRemoveFromCart, handleAddtoCart, handleClearCart } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0 as number);
  const [totalItems, setTotalItems] = useState(0 as number);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const currentTime = new Date().getTime();
  localStorage.setItem("lastActivityTime", `${currentTime}`);
  const lastActivityTime = localStorage.getItem("lastActivityTime");

  useEffect(() => {
    if (lastActivityTime) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - parseInt(lastActivityTime, 10);

      if (timeElapsed > 1800000) {
        handleClearCart();
        localStorage.setItem("lastActivityTime", `${currentTime}`);
      }
    }
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const totalVal = cartItems.reduce((acc, curVal) => {
        return acc + curVal.quantity * curVal.menuItem.price;
      }, 0);
      setTotal(+totalVal.toFixed(2));
    };

    calculateTotal();
  }, [cartItems]);

  useEffect(() => {
    const calculateTotalItems = () => {
      const items = cartItems.reduce((acc, val) => {
        return acc + val.quantity;
      }, 0);

      setTotalItems(items);
    };

    calculateTotalItems();
  }, [cartItems]);

  const handleToggleCart = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isSmallScreen) {
      setIsOpen(true);
    }
    if (isSmallScreen) {
      setIsOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <div>
      {isSmallScreen && cartItems.length !== 0 && (
        <IconButton aria-label="cart" onClick={handleToggleCart}>
          <Badge color="secondary" badgeContent={totalItems}>
            <ShoppingBasket />
          </Badge>
        </IconButton>
      )}
      {cartItems.length !== 0 && isOpen && (
        <Box
          style={{
            position: isSmallScreen ? "fixed" : "sticky",
            right: "0",
            top: "0",
            width: "300px",
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "ButtonHighlight",
          }}
        >
          <Divider />
          <Typography variant="h4" component="span" mr={2} pt={2}>
            Total:
          </Typography>
          <Typography variant="h6" component="span">
            {`${total} EUR`}
          </Typography>
          <Divider />
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.menuItem.id}>
                <ListItemText>{item.menuItem.name}</ListItemText>
                <ListItemSecondaryAction
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <IconButton
                    aria-label="add to shopping cart"
                    onClick={() => handleAddtoCart(item.menuItem)}
                  >
                    <AddCircle />
                  </IconButton>
                  <ListItemText color="primary">{` ${item.quantity} `}</ListItemText>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFromCart(item.menuItem)}
                  >
                    {item.quantity > 1 ? <RemoveCircle /> : <Delete />}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Button onClick={handleClearCart}>Clear cart</Button>
        </Box>
      )}
    </div>
  );
}

export default Cart;
