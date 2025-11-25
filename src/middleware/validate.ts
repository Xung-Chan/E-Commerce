import Joi from "joi";

const createOrder = Joi.object({
    userId: Joi.string().required(),
    variants: Joi.array().items(
        Joi.object({
            variantId: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
        })
    ).min(1).required(),
    couponId: Joi.string().optional(),
    shippingMethodId: Joi.string().required(),
    isUseUserPoint: Joi.boolean().required(),
    address: Joi.string().required(),
});

const updateUserStatus = Joi.object({
    userId: Joi.string().required(),
    status: Joi.string().valid("active", "inactive", "banned").required(),
});


const createaRating = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
});
export {
    createOrder,
    updateUserStatus,
    createaRating,
};