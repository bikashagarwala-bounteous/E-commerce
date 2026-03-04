"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCart = exports.updateCart = exports.getCart = exports.createCart = void 0;
const prisma_1 = require("../../lib/prisma");
const createCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { items } = req.body;
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ message: "Items are required" });
        }
        await prisma_1.prisma.cart.deleteMany({ where: { userId } });
        const cart = await prisma_1.prisma.cart.create({
            data: {
                userId,
                items: {
                    create: items.map((item) => ({
                        productId: item.product_id,
                        quantity: item.quantity,
                        totalPrice: item.total_price,
                    })),
                },
            },
            include: { items: true },
        });
        res.status(201).json({ message: "Cart updated", cart });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.createCart = createCart;
const getCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const cart = await prisma_1.prisma.cart.findFirst({
            where: { userId },
            include: { items: true },
        });
        if (!cart)
            return res.status(404).json({ message: "Cart not found" });
        res.json(cart);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.getCart = getCart;
const updateCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { items } = req.body;
        await prisma_1.prisma.cart.deleteMany({ where: { userId } });
        const cart = await prisma_1.prisma.cart.create({
            data: {
                userId,
                items: {
                    create: items.map((item) => ({
                        productId: item.product_id,
                        quantity: item.quantity,
                        totalPrice: item.total_price,
                    })),
                },
            },
            include: { items: true },
        });
        res.json({ message: "Cart updated", cart });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.updateCart = updateCart;
const deleteCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        await prisma_1.prisma.cart.deleteMany({ where: { userId } });
        res.json({ message: "Cart deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.deleteCart = deleteCart;
