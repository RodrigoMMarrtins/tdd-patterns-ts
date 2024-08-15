import Customer from "../../entity/customer/customer";
import Order from "../../entity/order/order";
import OrderItem from "../../entity/orderItem"
import OrderService from "./order.service";

describe("Order service unit test", () => {

    it("Should place an order", () => {

        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "Item 1", "p1", 10, 1)

        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it("Should get tottal of all orders", () => {
        const orderItem1 = new OrderItem("i1", "Item 1", "p1", 100, 1);
        const orderItem2 = new OrderItem("i2", "Item 2", "p2", 200, 2);

        const order = new Order("o1", "c1", [orderItem1]);
        const order2 = new Order("o2", "c1", [orderItem2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(500)
    })
})