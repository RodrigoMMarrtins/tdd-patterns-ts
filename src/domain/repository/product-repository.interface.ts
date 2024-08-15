import Product from "../entity/product/product";
import RepositoryInterface from "./repository-interface";

export default interface ProductRepositoryInterface 
    extends RepositoryInterface<Product> {
    }