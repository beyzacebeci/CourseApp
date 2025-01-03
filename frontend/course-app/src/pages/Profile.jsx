import React, { useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function Profile() {
  const { orders, fetchUserOrders } = useOrder();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Siparişlerim
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sipariş ID</TableCell>
              <TableCell>Satın Alınan Kurslar</TableCell>
              <TableCell>Toplam Fiyat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>

                <TableCell>
                  <List dense>
                    {order.courses.map((course) => (
                      <ListItem key={course.id}>
                        <ListItemText
                          primary={course.name}
                          secondary={`${course.price} TL`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
                <TableCell>{order.totalPrice} TL</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Profile;
