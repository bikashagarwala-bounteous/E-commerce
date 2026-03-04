"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeatured = exports.updateFeatured = exports.getFeatured = exports.createFeatured = void 0;
const prisma_1 = require("../../lib/prisma");
const createFeatured = async (req, res) => {
    try {
        const { product_id } = req.body;
        if (!product_id)
            return res.status(400).json({ message: "Product ID is required" });
        const featured = await prisma_1.prisma.featured.create({
            data: {
                productId: product_id,
            },
        });
        res.status(201).json({ message: "Featured item created", featured });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.createFeatured = createFeatured;
const getFeatured = async (req, res) => {
    try {
        const featured = await prisma_1.prisma.featured.findUnique({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
        });
        if (!featured)
            return res.status(404).json({ message: "Featured item not found" });
        res.json(featured);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.getFeatured = getFeatured;
const updateFeatured = async (req, res) => {
    try {
        const { product_id } = req.body;
        const featured = await prisma_1.prisma.featured.update({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
            data: { productId: product_id },
        });
        res.json({ message: "Featured item updated", featured });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.updateFeatured = updateFeatured;
const deleteFeatured = async (req, res) => {
    try {
        await prisma_1.prisma.featured.delete({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
        });
        res.json({ message: "Featured item deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.deleteFeatured = deleteFeatured;
