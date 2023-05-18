

const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();
const Crypto = require("crypto-js");
const Cart = require("../models/Cart")


router.post("/", verifyToken, async (req,res) =>{
    const newCart = new Cart(req.body);

    try{
        const savedProduct = await newCart.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{

    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedCart);
    } catch (err){
        res.status(500).json(err);
    }
});


//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req,res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...");
    } catch (err){
        res.status(500).json(err);
    }
});

//GET user cart
router.get("/find/:userId", verifyTokenAndAuthorization,async (req,res) => {
    try{
        const cart = await Cart.findOne({ userId: req.params.userId})
        res.status(200).json(cart);
    } catch (err){
        res.status(500).json(err);
    }
});

// //GET ALL PRODUCTS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts)
    }
    catch(err){
        res.status(401).json(err);
    }
});



module.exports = router