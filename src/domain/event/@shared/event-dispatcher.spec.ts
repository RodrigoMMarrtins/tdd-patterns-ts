import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import SendConsoleLogWhenCustomerIsCreated1 from "../customer/handler/send-console-log-when-customer-is-created1";
import SendConsoleLogWhenCustomerIsCreated2 from "../customer/handler/send-console-log-when-customer-is-created2";
import SendLogWhenCustomerAddresIsChanged from "../customer/handler/send-log-when-customer-address-is-changed";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events testes", () => {
    it("Should register an event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("Should unregister event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBe(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toBeUndefined();
    });

    it("Should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler2 = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler1);

        eventDispatcher.register("ProductCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][1]).toMatchObject(eventHandler2);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("Should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandle = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler1);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler1);

        const productCreatedEvent = new ProductCreatedEvent({
            productId: "123",
            productName: "Product 1",
            price: 10.0,
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandle).toBeCalled();
    });

    it("Should notify when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLogWhenCustomerIsCreated1();
        const spyEventHandle1 = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

        const eventHandler2 = new SendConsoleLogWhenCustomerIsCreated2();
        const spyEventHandle2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "123",
            name: "Customer1",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandle1).toBeCalled();
        expect(spyEventHandle2).toBeCalled();
    });

    it("Should notify when customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendLogWhenCustomerAddresIsChanged();
        const spyEventHandle1 = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler1);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "123",
            name: "Customer1",
            address: {
                street: "Street 1",
                number: 1,
                city: "City 1",
                zipcode: "12345",
            }
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandle1).toBeCalled();
    });
});
