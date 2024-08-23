import Address from "../address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Rodrigo");
        }).toThrowError("ID is required");
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("23", "");
        }).toThrowError("Name is required");
    });

    it("Should change name", () => {
        let customer = new Customer("23", "Rodrigo");
        customer.changeName("Giovanna");

        expect(customer.name).toBe("Giovanna");
    });

    it("Should activate the customer", () => {
        let customer = new Customer("123", "Rodrigo");
        let address = new Address("Av. Palista", 6, "São Paulo", "12345-67");
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("Should throw error when address is undefined", () => {
        expect(() => {
            let customer = new Customer("123", "Rodrigo");
            
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("Should deactivate the customer", () => {
        let customer = new Customer("123", "Rodrigo");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("Should add the customer reward points", () => {
        let customer = new Customer("123", "Rodrigo");
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20)
    })
});
