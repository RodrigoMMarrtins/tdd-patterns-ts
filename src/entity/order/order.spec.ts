import OrderItem from "../orderItem";
import Order from "./order";

describe("Order unit tests", () => {
    it("Should calculate total", () => {
        const itens = [new OrderItem("i1", "Item 1","o1", "p1", 200, 2), new OrderItem("i2", "Item 1", "o1", "p2", 100, 1)];

        const order = new Order("order 1", "123", itens);

        expect(order.total()).toEqual(500);
    });

    it("Should throw error when ID is empty", () => {
        expect(() => {
            const itens = [new OrderItem("i1", "Item 1", "order 1", "product 1", 600, 2), new OrderItem("i2", "Item 2", "order 1", "product 2", 25, 8)];

            const order = new Order("", "123", itens);
        }).toThrowError("ID is required");
    });

    it("Should throw error when Items is empty", () => {
        expect(() => {
            const order = new Order("order 1", "123", []);
        }).toThrowError("Items are required");
    });

    it("Should throw error if the item quantity is less or equal than 0", () => {
        expect(() => {
            const itens = [new OrderItem("i1", "Item 1", "order 1", "product 1", 600, 0)];

            const order = new Order("o1", "123", itens);

        }).toThrowError("Quantity must be greater than zero")
    });
});
