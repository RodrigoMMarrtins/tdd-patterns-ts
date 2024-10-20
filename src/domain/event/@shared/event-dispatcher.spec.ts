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
});
