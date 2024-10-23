import Product from "./product";

describe('Product unit tests', () => { 
    it("Should throw error when ID is empty", () => {
        expect(()=>{
            const product = new Product("", "Product 1", 101);
        }).toThrowError("ID is required");
    })

    it("Should throw error when Name is empty", () => {
        expect(()=>{
            const product = new Product("123", "", 101);
        }).toThrowError("Name is required");
    })

    it("Should throw error when Price equal or less than zero", () => {
        expect(()=>{
            const product = new Product("123", "Product 1", -101);
        }).toThrowError("Price must be greater than 0");
    })

    it("Should change name", () => {
        const product = new Product("123", "Product 1", 101);
        product.changeName("Product 2")
        expect(product.name).toBe("Product 2");
    })

    it("Should change price", () => {
        const product = new Product("123", "Product 1", 101);
        product.changePrice(202)
        expect(product.price).toBe(202);
    })
 })