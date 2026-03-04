"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.createProduct = void 0;
const prisma_1 = require("../../lib/prisma");
const createProduct = async (req, res) => {
    try {
        const { title, description, price, product_image } = req.body;
        if (!title || !description || !price || !product_image) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const product = await prisma_1.prisma.product.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                productImage: product_image,
            },
        });
        res.status(201).json({ message: 'Product created', product });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.createProduct = createProduct;
const getProduct = async (req, res) => {
    try {
        const product = await prisma_1.prisma.product.findUnique({ where: { id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id } });
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
    try {
        const { title, description, price, product_image } = req.body;
        const product = await prisma_1.prisma.product.update({
            where: { id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id },
            data: {
                title,
                description,
                price: parseFloat(price),
                productImage: product_image,
            },
        });
        res.json({ message: 'Product updated', product });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        await prisma_1.prisma.product.delete({ where: { id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id } });
        res.json({ message: 'Product deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
exports.deleteProduct = deleteProduct;
