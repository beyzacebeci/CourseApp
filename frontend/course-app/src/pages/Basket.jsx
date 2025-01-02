import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useBasket } from "../context/BasketContext";

function Basket() {
  const { basketItems, removeFromBasket } = useBasket();

  const totalPrice = basketItems.reduce((total, item) => total + item.price, 0);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Alışveriş Sepeti
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        {basketItems.length === 0 ? (
          <Typography>Sepetiniz boş</Typography>
        ) : (
          <>
            <List>
              {basketItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.price} TL`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => removeFromBasket(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Toplam: {totalPrice} TL</Typography>
              <Button variant="contained" color="primary" size="large">
                Ödeme Bilgileri
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Basket;
