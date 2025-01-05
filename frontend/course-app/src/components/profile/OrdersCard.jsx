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
import { useTranslationContext } from "../../context/TranslationContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DateRangeIcon from "@mui/icons-material/DateRange";

function OrdersCard() {
  const { orders, fetchUserOrders } = useOrder();
  const { t } = useTranslationContext();

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <ShoppingCartIcon />
          {t("orders.title")}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <ReceiptIcon fontSize="small" />
                    {t("orders.orderId")}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                    {t("orders.purchasedCourses")}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    <DateRangeIcon fontSize="small" />
                    {t("orders.createdTime")}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    {t("orders.totalPrice")}
                  </div>
                </TableCell>
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
                  <TableCell align="right">
                    {new Date(order.createdTime).toLocaleDateString()}
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
