import { useEffect, useState } from "react";
import type { RootState } from "../store/store";
import {
  incrementItem,
  removeItemFromCart,
  clearCart,
} from "../store/cart_slice";
import { useDispatch, useSelector } from "react-redux";
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
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0 as number);
  const [totalItems, setTotalItems] = useState(0 as number);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const currentTime = new Date().getTime();
  localStorage.setItem("lastActivityTime", `${currentTime}`);
  const lastActivityTime = localStorage.getItem("lastActivityTime");

  const handleToggleCart = () => {
    setIsOpen(!isOpen);
  };

  const handleAddToCart = (id: number) => {
    dispatch(incrementItem(id));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (lastActivityTime) {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - parseInt(lastActivityTime, 10);

      if (timeElapsed > 1800000) {
        handleClearCart();
        localStorage.setItem("lastActivityTime", `${currentTime}`);
      }
    }
  }, [lastActivityTime]);

  useEffect(() => {
    const calculateTotal = () => {
      if (!cartItems || cartItems.length === 0) {
        setTotal(0);
        return;
      }

      const totalVal = cartItems.reduce((acc, curVal) => {
        if (curVal.menuItem && curVal.menuItem.price) {
          return acc + curVal.quantity * curVal.menuItem.price;
        }
        return acc;
      }, 0);

      setTotal(+totalVal.toFixed(2));
    };

    const calculateTotalItems = () => {
      if (!cartItems || cartItems.length === 0) {
        setTotalItems(0);
        return;
      }

      const items = cartItems.reduce((acc, val) => {
        return acc + val.quantity;
      }, 0);

      setTotalItems(items);
    };

    calculateTotalItems();
    calculateTotal();
  }, [cartItems]);

  useEffect(() => {
    setIsOpen(!isSmallScreen);
  }, [isSmallScreen]);

  return (
    <div>
      {cartItems && cartItems.length !== 0 && (
        <>
          {isSmallScreen && (
            <IconButton
              aria-label="cart"
              sx={{ position: "absolute", right: "1rem", top: "1rem" }}
              onClick={handleToggleCart}
            >
              <Badge color="secondary" badgeContent={totalItems}>
                <ShoppingBasket />
              </Badge>
            </IconButton>
          )}
          {isOpen && (
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
                        onClick={() => handleAddToCart(item.menuItem.id)}
                      >
                        <AddCircle />
                      </IconButton>
                      <ListItemText color="primary">{` ${item.quantity} `}</ListItemText>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveFromCart(item.menuItem.id)}
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
        </>
      )}
    </div>
  );
}

export default Cart;
