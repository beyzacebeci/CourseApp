import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useOrder } from "../../context/OrderContext";

function OrdersCard() {
  const { orders, fetchUserOrders } = useOrder();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Siparişlerim
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sipariş ID</TableCell>
                <TableCell>Satın Alınan Kurslar</TableCell>
                <TableCell align="right">Toplam Fiyat</TableCell>
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
                  <TableCell align="right">{order.totalPrice} TL</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default OrdersCard;
