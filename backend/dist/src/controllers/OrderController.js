"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrder = exports.createOrder = void 0;
const prisma_1 = require("../../lib/prisma");
const createOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { items, payment_method, expected_delivery_date, shipping_address, total_amount, } = req.body;
        if (!items ||
            !payment_method ||
            !expected_delivery_date ||
            !shipping_address ||
            !total_amount) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const order = await prisma_1.prisma.order.create({
            data: {
                userId,
                paymentMethod: payment_method,
                expectedDeliveryDate: new Date(expected_delivery_date),
                shippingAddress: shipping_address,
                totalAmount: parseFloat(total_amount),
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
        res.status(201).json({ message: "Order placed", order });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.createOrder = createOrder;
const getOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const order = await prisma_1.prisma.order.findFirst({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
                userId,
            },
            include: { items: true },
        });
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        res.json(order);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.getOrder = getOrder;
const updateOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const { status } = req.body;
        const order = await prisma_1.prisma.order.update({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
            data: { status },
            include: { items: true },
        });
        if (!order || order.userId !== userId)
            return res
                .status(404)
                .json({ message: "Order not found or not authorized" });
        res.json({ message: "Order updated", order });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const order = await prisma_1.prisma.order.findUnique({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
        });
        if (!order || order.userId !== userId)
            return res
                .status(404)
                .json({ message: "Order not found or not authorized" });
        await prisma_1.prisma.order.delete({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
        });
        res.json({ message: "Order deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.deleteOrder = deleteOrder;
