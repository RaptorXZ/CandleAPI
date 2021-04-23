function removeItem(products, request, response, db) {
    const cart = db.get('cart').value();
    // Make sure we're trying to remove a valid product
    if (cart.indexOf(parseInt(request.params.id)) !== -1) {
        db.get('cart')
            .pull(parseInt(request.params.id))
            .write();
        response.status(300).send(
        {
            'status': 'success',
            'text': 'Product removed from cart'
        });
    }
    // Respond with an error if the product we're trying to remove isn't in the cart
    else {
        response.status(403).send(
        {
            'status': 'error',
            'text': 'Product does not exist in cart'
        });
    }
}

exports.removeItem = removeItem;