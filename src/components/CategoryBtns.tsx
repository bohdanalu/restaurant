import { useCart } from "../context/CartContext";
import { Button, Box } from "@mui/material";
import { MenuType } from "../types";

const buttons = [
  "All",
  "Main Course",
  "Appetizer",
  "Pizza",
  "Pasta",
  "Salad",
  "Risotto",
  "Dessert",
];

interface CategoryProps {
  menu: MenuType[];
  // setMenu: React.Dispatch<React.SetStateAction<MenuType[]>>;
  handleChooseCategories: (btn: string) => void;
}

function CategoryBtns({ menu, handleChooseCategories }: CategoryProps) {
  return (
    <Box mb={2}>
      {buttons.map((btn) => (
        <Button key={btn} onClick={() => handleChooseCategories(btn)}>
          {btn}
        </Button>
      ))}
    </Box>
  );
}

export default CategoryBtns;
