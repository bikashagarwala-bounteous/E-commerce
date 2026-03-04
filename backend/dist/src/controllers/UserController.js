"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const prisma_1 = require("../../lib/prisma");
const createUser = async (req, res) => {
    try {
        const { name, email, password, role, address } = req.body;
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password,
                role,
                address: {
                    create: address,
                },
            },
            include: { address: true },
        });
        res.status(201).json({ message: "User created", user });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
            include: { address: true },
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await prisma_1.prisma.user.update({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
            data: { name, email, password, role },
            include: { address: true },
        });
        res.json({ message: "User updated", user });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        await prisma_1.prisma.user.delete({
            where: {
                id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
            },
        });
        res.json({ message: "User deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
exports.deleteUser = deleteUser;
