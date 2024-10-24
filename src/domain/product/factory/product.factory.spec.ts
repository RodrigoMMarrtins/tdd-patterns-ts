import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {
    it("Should create a product with type a", () => {
        const product = ProductFactory.create("a", "Product A", 1);
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product A")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")
    })

    it("Should create a product with type b", () => {
        const product = ProductFactory.create("b", "Product B", 2);
        expect(product.id).toBeDefined()
        expect(product.name).toBe("Product B")
        expect(product.price).toBe(4)
        expect(product.constructor.name).toBe("ProductB")
    
    });

    it("Should throw error for invalid type", () => {
        expect(() => ProductFactory.create("c", "Product C", 3)).toThrow("Invalid product type")
    })
})