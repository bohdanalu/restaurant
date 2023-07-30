import Form from "./Form";
import { NavLink } from "react-router-dom";
import { Container, Box } from "@mui/material";

function Header() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid grey",
        }}
      >
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "24px",
            fontWeight: "bold",
            color: "inherit",
            padding: "10px 0",
          }}
        >
          Home
        </NavLink>
        <Form />
      </Box>
    </Container>
  );
}

export default Header;
