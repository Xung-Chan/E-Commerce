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

export {
    createOrder
};