import React, { useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const UserCourses = () => {
  const { orders, fetchUserOrders } = useOrder();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  // Tüm siparişlerden kursları düz bir diziye çıkaralım
  const allCourses = orders.flatMap((order) => order.courses);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Satın Alınan Kurslar
        <hr />
      </Typography>
      <Grid container spacing={3}>
        {allCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserCourses;
