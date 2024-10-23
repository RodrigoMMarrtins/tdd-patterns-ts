import OrderItem from "./orderItem";
import Order from "./order";

describe("Order unit tests", () => {
    it("Should calculate total", () => {
        const itens = [new OrderItem("i1", "Item 1", 200, "p1", 2), new OrderItem("i2", "Item 1", 100, "p2", 1)];

        const order = new Order("order 1", "123", itens);

        expect(order.total()).toEqual(500);
    });

    it("Should throw error when ID is empty", () => {
        expect(() => {
            const itens = [new OrderItem("i1", "Item 1", 600, "product 1", 2), new OrderItem("i2", "Item 2", 25, "product 2", 8)];

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
            const itens = [new OrderItem("i1", "Item 1", 600, "product 1", 0)];

            const order = new Order("o1", "123", itens);

        }).toThrowError("Quantity must be greater than zero")
    });
});
