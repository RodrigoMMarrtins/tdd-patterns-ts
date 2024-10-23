import Order from "../../domain/checkout/order";
import OrderItem from "../../domain/checkout/orderItem";
import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        try {
            await OrderModel.create(
                {
                    id: entity.id,
                    customer_id: entity.customerId,
                    total: entity.total(),
                    items: entity.items.map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                    })),
                },
                {
                    include: [{ model: OrderItemModel }],
                }
            );
        } catch (error) {
            console.error("Error creating order:", error);
            throw new Error("Failed to create order");
        }
    }

    async update(entity: Order): Promise<void> {
        try {
            await OrderModel.update(
                {
                    total: entity.total(),
                },
                {
                    where: { id: entity.id },
                }
            );

            const existingItems = await OrderItemModel.findAll({
                where: { order_id: entity.id },
            });

            for (const item of entity.items) {
                const existingItem = existingItems.find((i) => i.id === item.id);

                if (existingItem) {
                    await OrderItemModel.update(
                        {
                            name: item.name,
                            price: item.price,
                            product_id: item.productId,
                            quantity: item.quantity,
                        },
                        {
                            where: { id: item.id, order_id: entity.id },
                        }
                    );
                } else {
                    await OrderItemModel.create({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                        order_id: entity.id,
                    });
                }
            }

            const itemIds = entity.items.map((item) => item.id);
            for (const existingItem of existingItems) {
                if (!itemIds.includes(existingItem.id)) {
                    await OrderItemModel.destroy({ where: { id: existingItem.id } });
                }
            }
        } catch (error) {
            console.error("Error updating order:", error);
            throw new Error("Failed to update order");
        }
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
                include: ["items"],
            });
        } catch (error) {
            console.error("Error finding order:", error);
            throw new Error("Failed to find order");
        }
        const orderItem = orderModel.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        });
        const order = new Order(id, orderModel.customer_id, orderItem);
        return order;
    }

    async findAll(): Promise<Order[]> {
        let orders;
        try {
            orders = await OrderModel.findAll({
                include: ["items"],
            });
        } catch (error) {
            console.error("Error finding all orders:", error);
            throw new Error("Failed to find all orders");
        }
        const ordersArray = orders.map((order) => {
            const orderItem = order.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            });
            return new Order(order.id, order.customer_id, orderItem);
        });
        return ordersArray;
    }
}
