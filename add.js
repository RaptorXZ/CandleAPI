// Add product to cart
function addItem(products, request, response, db) {
    // Make sure we're adding a product that exists
    if (products.find(x => x.id === parseInt(request.params.id)) !== undefined) {
        const cart = db.get('cart').value();
        // Add the product if it doesn't already exist in the cart
        if (cart.indexOf(parseInt(request.params.id)) === -1) {
            db.get('cart')
                .push(parseInt(request.params.id))
                .write();
            response.status(300).send(
            {
                'status': 'success',
                'text': 'Product added to cart'
            });
        }
        // Respond with an error if the product ID already exists in the cart
        else {
            response.status(409).send(
            {
                'status': 'error',
                'text': 'Product already exists in cart'
            });
        }
    }
    // Respond with an error if the product ID doesn't exist
    else {
        response.status(403).send(
        {
            'status': 'error',
            'text': 'Product ID does not exist'
        });
    }
}

exports.addItem = addItem;