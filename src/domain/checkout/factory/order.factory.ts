import Order from "../entity/order";
import OrderItem from "../entity/orderItem";

export interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        productId: string;
        productName: string;
        price: number;
        quantity: number;
    }[];
}
export default class OrderFactory {
    public static create(orderProps: OrderFactoryProps): Order {
        const items = orderProps.items.map((item) => new OrderItem(item.id, item.productName, item.price, item.productId, item.quantity));
        return new Order(orderProps.id, orderProps.customerId, items);
    }
}