import React from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { usePayment } from "../context/PaymentContext";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useBasket } from "../context/BasketContext";
import { useTranslationContext } from "../context/TranslationContext";

function Payment() {
  const navigate = useNavigate();
  const { processPayment } = usePayment();
  const { createOrder } = useOrder();
  const { deleteAllBasketItems } = useBasket();
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const courseIds = location.state?.courseIds || [];
  const [formData, setFormData] = useState({
    cardNameSurname: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    address: "",
  });
  const { t } = useTranslationContext();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const paymentResponse = await processPayment(formData);

      if (paymentResponse.status === 200 || paymentResponse.status === 201) {
        const paymentId = paymentResponse.data.data;

        const orderResponse = await createOrder(
          paymentId,
          totalPrice,
          courseIds
        );

        if (orderResponse.status === 200 || orderResponse.status === 201) {
          await deleteAllBasketItems();
          alert(t("payment.success"));
          navigate("/");
          return;
        }

        throw orderResponse;
      }

      throw paymentResponse;
    } catch (error) {
      const errorMessage =
        error.data?.errorMessage || error.response?.data?.errorMessage;
      alert(
        Array.isArray(errorMessage)
          ? errorMessage.join("\n")
          : t("payment.error")
      );
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("payment.title")}
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label={t("payment.cardName")}
              variant="outlined"
              name="cardNameSurname"
              value={formData.cardNameSurname}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              label={t("payment.cardNumber")}
              variant="outlined"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                required
                fullWidth
                label={t("payment.expirationDate")}
                variant="outlined"
                type="month"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().slice(0, 7),
                }}
              />
              <TextField
                required
                fullWidth
                label={t("payment.cvv")}
                variant="outlined"
                name="cvc"
                value={formData.cvc}
                onChange={handleChange}
              />
            </Stack>
            <TextField
              required
              fullWidth
              label={t("payment.address")}
              variant="outlined"
              multiline
              rows={3}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                backgroundColor: "#A435F0",
                "&:hover": {
                  backgroundColor: "#8710ED",
                },
                textTransform: "none",
                py: 1.5,
              }}
            >
              {t("payment.completePayment")}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default Payment;
