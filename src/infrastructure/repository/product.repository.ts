import { where } from "sequelize";
import Product from "../../domain/entity/product/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        try {
            await ProductModel.create({
                id: entity.id,
                name: entity.name,
                price: entity.price,
            });
        } catch (error) {
            console.error("Error creating a product:", error);
            throw new Error("Failed to create a product");
        }
    }

    async update(entity: Product): Promise<void> {
        try {
            await ProductModel.update(
                {
                    name: entity.name,
                    price: entity.price,
                },
                {
                    where: {
                        id: entity.id,
                    },
                }
            );
        } catch (error) {
            console.error("Error updating a product:", error);
            throw new Error("Failed to update a product");
        }
    }

    async find(id: string): Promise<Product> {
        let product;
        try {
            product = await ProductModel.findOne({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            console.error("Error finding a product:", error);
            throw new Error("Failed to find a product");
        }
        return new Product(product.id, product.name, product.price);
    }

    async findAll(): Promise<Product[]> {
        let products;
        try {
            products = await ProductModel.findAll();
        } catch (error) {
            console.error("Error finding all products:", error);
            throw new Error("Failed to find all products");
        }
        return products.map((p) => new Product(p.id, p.name, p.price));
    }
}
