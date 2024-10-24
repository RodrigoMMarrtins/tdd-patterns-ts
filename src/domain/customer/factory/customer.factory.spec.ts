import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("Should create a customer", () => {
        const customer = CustomerFactory.create("Customer 1");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBeUndefined();
        expect(customer.constructor.name).toBe("Customer");
    });

    it("Shoul cretate a customer with an address", () => {
        const address = new Address("Av. Palista", 6, "São Paulo", "12345-67");
        const customer = CustomerFactory.createWithAddress("Customer 1", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer 1");
        expect(customer.address).toBeDefined();
        expect(customer.address.street).toBe("Av. Palista");
        expect(customer.address.number).toBe(6);
        expect(customer.address.city).toBe("São Paulo");
        expect(customer.address.zipcode).toBe("12345-67");
        expect(customer.constructor.name).toBe("Customer");
    })
});
