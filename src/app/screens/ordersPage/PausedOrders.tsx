import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "@reduxjs/toolkit";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

/** REDUX SELECTOR **/
const pausedOrdersRetriever = createSelector(
   retrievePausedOrders,
   (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
    setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
    const { setValue } = props;
    const { authMember, setOrderBuilder } = useGlobals();   // <-- setOrderBuilder qo'shildi
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    /** Handlers */

    const deleteOrderHandler = async (e: T) => {
        try {
            if(!authMember) throw new Error("Messages.error2");
            const orderId = e.currentTarget.value;   // <-- target -> currentTarget
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.DELETE
            };

            const confirmation = window.confirm("Are you sure you want to delete this order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                // Order Rebuild
                setOrderBuilder(new Date());
                
            }
    }catch (err) {
        console.log(err);
        sweetErrorHandling(err);
    }
}

 const proceedOrderHandler = async (e: T) => {
        try {
            if(!authMember) throw new Error("Messages.error2");
            // PAYMENT PROCESS
            const orderId = e.currentTarget.value;
            const input: OrderUpdateInput = {
                orderId: orderId,
                orderStatus: OrderStatus.PROCESS
            };

            const confirmation = window.confirm(
                "Are you sure you want to proceed with this order?"
            );
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                // => PROCCESS 
                setValue("2");
                setOrderBuilder(new Date());
                
            }
    }catch (err) {
        console.log(err);
        sweetErrorHandling(err);
    }
}

    return (
     <TabPanel value={"1"}>
    <Stack>
         {pausedOrders?.map((order: Order) => {
            return (
                <Box key={order._id} className={"order-main-box"}>
                    <Box className={"order-box-scroll"}>
                         {order?.orderItems.map((item: OrderItem) => {
                            const product = order.productData.find(   // <-- filter()[0] -> find
                                (ele: Product) => item.productId === ele._id
                            );
                            if (!product) return null;   // <-- qo'shildi
                            const imagePath = `${serverApi}/${product.productImages?.[0] ?? ""}`;
                             return (
                                <Box key={item._id} className={"orders-name-price"}>
                                      <img
                                        src={imagePath}
                                         className={"order-dish-img"}
                                         alt={product.productName}
                                      />
                                        <p className={"title-dish"}>{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>${item.itemPrice}</p>
                                                <img src={"/icons/close.svg"} alt="x" />
                                                <p>{item.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} alt="=" />
                                                <p style={{ marginLeft: "15px" }}>
                                                    ${item.itemPrice * item.itemQuantity}
                                                </p>   {/* <-- ortiqcha "/" olib tashlandi */}
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
                                    <img
                                        src={"/icons/pause.svg"}
                                        alt="="
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <Button
                                value={order._id}
                                    variant="contained"
                                    color="secondary"
                                    className={"cancel-button"}
                                    onClick={deleteOrderHandler}
                                >
                                    Cancel
                                </Button>
                                <Button
                                value={order._id}
                                 variant="contained" 
                                 className={"pay-button"}
                                 onClick={proceedOrderHandler}>
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {(!pausedOrders || pausedOrders.length === 0) && (   // <-- qavs to'g'rilandi
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
// <-- fayl oxiridagi setOrderBuilder stub funksiyasi o'chirildi