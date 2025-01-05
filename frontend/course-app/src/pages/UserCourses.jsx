import React, { useEffect, useState } from "react";
import { useOrder } from "../context/OrderContext";
import { useTranslationContext } from "../context/TranslationContext";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";

const UserCourses = () => {
  const { orders, fetchUserOrders } = useOrder();
  const { t } = useTranslationContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchUserOrders().finally(() => {
      setIsLoading(false);
    });
  }, []);

  // Tüm siparişlerden kursları düz bir diziye çıkaralım
  const allCourses = orders.flatMap((order) => order.courses);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h6" gutterBottom>
        {t("orders.purchasedCourses")}
        <hr />
      </Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "flex-start",
          }}
        >
          {allCourses.map((course) => (
            <Box
              key={course.id}
              sx={{
                flexBasis: {
                  xs: "100%",
                  sm: "calc(50% - 24px)",
                  md: "calc(33.333% - 24px)",
                },
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    objectFit: "cover",
                  }}
                  image={course.base64Image}
                  alt={course.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {course.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default UserCourses;
