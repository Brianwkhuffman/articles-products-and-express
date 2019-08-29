let products = [{ id: 1, name: 'Bri', price: '100', inventory: '1337' }, { id: 2, name: 'Vrtra', price: '200', inventory: '1111111' }, { id: 3, name: 'Third', price: '123', inventory: '666' }];
// let products = [];
let counter = 4;
module.exports = {
    getProducts: function () {
        return products;
    },
    getProductById: function (paramId) {
        let parsedId = parseInt(paramId);
        if (parsedId !== NaN) {
            if (products.filter((product) => product.id == paramId)[0]) {
                return products.filter((product) => product.id == paramId)[0]
            } else {
                return false;
            }
        } else {
            return false;
        }
        return false;
    },
    addProducts: function (data) {
        for (let i = 0; i < products.length; i++) {
            if (data.name.toLowerCase() === products[i].name.toLowerCase()) {
                return false;
            };
        }
        let newProduct = {
            id: counter,
            name: data.name,
            price: data.price,
            inventory: data.inventory
        };
        products.push(newProduct);
        counter++;

    },
    editProduct: function (paramId, obj, res) {
        let parsedId = parseInt(paramId);
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === parsedId || products[i].name === paramId) {
                for (key in obj) {
                    products[i][key] = obj[key];
                }
                console.log('Sucessful edit.');
            }
        }
    },
    deleteProduct: function (paramId, res) {
        let productId = parseInt(paramId);
        if (typeof productId !== 'number') {
            return res.send('Must be a number');
        }
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == paramId) {
                products.splice(i, 1)
                return "Item deleted";
            }
        };
    }
};