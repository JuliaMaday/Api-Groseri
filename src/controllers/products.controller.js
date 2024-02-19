import productDao from "../dao/products.dao.js";

const getAll = async (req, res) => {
   productDao.getAll()
   //PROMESA
   .then(products => {
      if(products!=null){
         res.render('../src/views/index', {products});
      }else{
         res.json({
            status:"Product not found"
         })
      }
    }).catch(err => {
    res.status(404).json("Error")
   })
}

const getOne = async (req, res) => {
   productDao.getOne(req.params.barcode)
   .then((product) => {
      if(product!= null){
         res.render('../src/views/edit', {product});
   }
   else{
      res.json({
         "status":"not found"
      })
   }
   })
   .catch(err => {
      console.log(err.msg)
      res.status(500).json({"status":"Server unaviable"})
   })
}

const insertOne = async (req, res) => {
productDao.insertOne(req.body)
.then(result => {
  if(result)
   res.redirect('/api/products/')
}).catch(err => {
   res.json({
      status:""
   })
})
}

const updateOne = async (req, res) => {
   productDao.updateOne(req.params.barcode, req.body)
   .then(result => {
      if(result){
         res.redirect('/api/products');
      }
   })
   .catch(err => {
      res.status(500).json({"status":"Server unaviable"})
   })
}

const deleteOne = async (req, res) => {
   const products = req.params.products;
   try {
       await Products.findByIdAndDelete(products);
       res.json({ message: "Producto eliminado correctamente" });
   } catch (error) {
       res.status(500).json({ message: "Error al eliminar el producto" });
   }
}

export {getAll, getOne, insertOne, updateOne, deleteOne}