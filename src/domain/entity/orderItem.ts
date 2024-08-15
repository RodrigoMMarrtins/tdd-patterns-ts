export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;
    //
    constructor(id: string, name: string, productId: string, price: number, quantity: number) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._productId = productId;
        this._price = price;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    get quantity(): number {
        return this._quantity;
    }
}
