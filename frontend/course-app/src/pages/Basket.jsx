import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useBasket } from "../context/BasketContext";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslationContext } from "../context/TranslationContext";

function Basket() {
  const { t } = useTranslationContext();
  const [basketItems, setBasketItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { getBasketItems, removeFromBasket, fetchBasketCount } = useBasket();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBasketItems();
  }, [getBasketItems, fetchBasketCount]);

  const fetchBasketItems = async () => {
    const userId = localStorage.getItem("userId");
    const items = await getBasketItems(userId);
    setBasketItems(items);
    const total = items.reduce((sum, item) => sum + item.coursePrice, 0);
    setTotalPrice(total);
  };

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedItemId) {
      await removeFromBasket(selectedItemId);
      await fetchBasketItems();
    }
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedItemId(null);
  };

  const handlePayment = () => {
    const courseIds = basketItems.map((item) => item.courseId);
    navigate("/payment", {
      state: {
        totalPrice: totalPrice,
        courseIds: courseIds,
      },
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography variant="h5" gutterBottom align="left">
        {t("basket.title")}
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="left">
        {t("basket.itemCount", { count: basketItems.length })}
        <hr />
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Paper elevation={2} sx={{ p: 3, flex: 2 }}>
          {basketItems.length === 0 ? (
            <Typography>{t("basket.empty")}</Typography>
          ) : (
            <List>
              {basketItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(item.id)}
                        sx={{ color: "error.main" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="h6">{item.courseName}</Typography>
                      <Typography color="text.secondary">
                        Kategori: {item.categoryName}
                      </Typography>
                      <Typography color="primary" sx={{ mt: 1 }}>
                        {item.coursePrice} TL
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < basketItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>

        {basketItems.length > 0 && (
          <Paper elevation={2} sx={{ p: 3, flex: 1, height: "fit-content" }}>
            <Typography variant="h6" gutterBottom>
              {t("basket.total")}:
            </Typography>
            <Typography
              variant="h4"
              color="primary"
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              {totalPrice} TL
            </Typography>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handlePayment}
              sx={{
                backgroundColor: "#A435F0",
                "&:hover": {
                  backgroundColor: "#8710ED",
                },
                textTransform: "none",
                py: 1.5,
              }}
            >
              {t("basket.proceedToPayment")}
            </Button>
          </Paper>
        )}
      </Box>

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>{t("basket.deleteDialog.title")}</DialogTitle>
        <DialogContent>
          <Typography>{t("basket.deleteDialog.message")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            {t("basket.deleteDialog.confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Basket;
