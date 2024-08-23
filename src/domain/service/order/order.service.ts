import Customer from "../../entity/customer/customer";
import Order from "../../entity/order/order";
import OrderItem from "../../entity/orderItem";
import {v4 as uuid} from "uuid";

export default class OrderService {

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if(items.length === 0) {
            throw new Error("No items in the order");
        }

        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);

        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }
}