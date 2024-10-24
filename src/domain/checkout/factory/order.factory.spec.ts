import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
    it("Should create an order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    productId: uuid(),
                    productName: "Product 1",
                    price: 200,
                    quantity: 2,
                },
            ],
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items).toHaveLength(1);
    });
});
