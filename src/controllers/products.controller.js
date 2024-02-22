import ProductDAO from "../dao/products.dao.js";

const productsController = {};

export const getAll = (req, res) => {
    ProductDAO.getAll()
        .then(products => {
            res.render('../src/views/index.ejs', { products }); // Aquí se pasa un objeto con la propiedad 'products'
        })
        .catch(err => res.json({
            status: "Server unavailable"
        }));
}

export const getOne = (req, res) => {
    const barcode = req.params.barcode;
    ProductDAO.getOne(barcode)
        .then(result => {
            if (result) {
                res.render("../src/views/edit.ejs", { product: result });
            } else {
                res.json({
                    status: "Product not found"
                });
            }
        })
        .catch(err => res.json({
            status: "Server unavailable"
        }));
}

export const insertOne = (req, res) => {
    ProductDAO.insertOne(req.body)
        .then(result => res.redirect('/'))
        .catch(err => res.json({
            status: "Server unavailable"
        }));
}

/* export const updateOne = (req, res) => {
    const barcode = req.params.barcode;
    const product = req.body;
    ProductDAO.updateOne(barcode, product)
       .then(result => {
        if (result) {
        res.json(result);
    } else {
        res.json({
            status: "Product not found"
        });
    }})
       .catch(err => res.json({
            status: "Server unavailable"
        }));
} */

export const updateOne = (req, res) => {
    const barcode = req.params.barcode;
    const updatedProduct = req.body;

    ProductDAO.updateOne(barcode, updatedProduct)
        .then(result => {
            if (result) {
                res.redirect(`/`); // Redirige a la página de edición
            } else {
                res.json({
                    status: "Product not found"
                });
            }
        })
        .catch(err => res.json({
            status: "Server unavailable"
        }));
}

export const deleteOne = (req, res) => {
    const barcode = req.params.barcode;
    ProductDAO.deleteOne(barcode)
      .then(result => {
        if (result) {
        res.redirect(`/`);  
        }else {
        res.json({
            status: "Product not found"
        });
    }})
      .catch(err => res.json({
            status: "Server unavailable"
        }));
};