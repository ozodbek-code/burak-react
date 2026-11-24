import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";


const pausedOrdersRetriever = createSelector(
   retrievePausedOrders,
   (pausedOrders) => ({ pausedOrders })
);

export default function PausedOrders() {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => (
          <Box key={order._id} className={"order-main-box"}>
            <Box className={"order-box-scroll"}>
              {order.orderItems.map((item: OrderItem) => {
                const product = order.productData.find(
                  (ele: Product) => item.productId === ele._id
                );
                if (!product) return null;

                return (
                  <Box key={item._id} className={"orders-name-price"}>
                    <img
                      src={product.productImages?.[0] ?? ""}
                      alt={product.productName}
                      className={"order-dish-img"}
                    />
                    <p className={"title-dish"}>{product.productName}</p>
                    <Box className={"price-box"}>
                      <p>${item.itemPrice}</p>
                      <img src={"/icons/close.svg"} alt="x" />
                      <p>{item.itemQuantity}</p>
                      <img src={"/icons/pause.svg"} alt="=" />
                      <p style={{ marginLeft: "15px" }}>
                        ${item.itemPrice * item.itemQuantity}
                      </p>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box className={"total-price-box"}>
              <Box className={"box-total"}>
                <p>Product price</p>
                <p>${order.orderTotal - order.orderDelivery}</p>
                <img src={"/icons/plus.svg"} alt="+" style={{ marginLeft: "20px" }} />
                <p>Delivery cost</p>
                <p>${order.orderDelivery}</p>
                <img src={"/icons/pause.svg"} alt="=" style={{ marginLeft: "20px" }} />
                <p>Total</p>
                <p>${order.orderTotal}</p>
              </Box>
              <Button variant="contained" color="secondary" className={"cancel-button"}>
                Cancel
              </Button>
              <Button variant="contained" className={"pay-button"}>
                Payment
              </Button>
            </Box>
          </Box>
        ))}

        {(!pausedOrders || pausedOrders.length === 0) && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              alt="No orders"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
