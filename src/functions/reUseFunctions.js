
const totalPrice = productCart => {
    return productCart.reduce(
        (acc, curr) => acc + Number(curr.discountPrice) * curr.quantity,
        0
    );
}
const totalQuantity = productCart => {

    return productCart.reduce(
        (acc, curr) => acc + curr.quantity,
        0
    );
}
const totalDiscount = productCart => {
    return productCart.reduce(
        (acc, curr) => acc + (Number(curr.price) - Number(curr.discountPrice)),
        0
    );
}

export {
    totalPrice,
    totalQuantity,
    totalDiscount
}