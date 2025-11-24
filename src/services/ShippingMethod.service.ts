import ApiError from "../utils/ApiError.js";
import { ErrorDictionary } from '../middleware/errorDictionary.js';
import { shippingMethodDao } from './../daos/ShippingMethod.dao.js';


const shippingMethodService = {

    createShippingMethod: async (data: {
        name: string;
        description: string;
        price: number;
    }) => {

        return shippingMethodDao.create(data);
    },

    getAllShippingMethods: async () => {

        return shippingMethodDao.list();
    },

    getShippingMethodById: async (id: string) => {

        const shippingMethod = await shippingMethodDao.readById(id);

        if (!shippingMethod) {
            throw new ApiError(404, "Not Found", ErrorDictionary.SHIPPING_METHOD_NOT_FOUND);
        }
        return shippingMethod;
    },

    getShippingMethodByName: async (name: string) => {

        const shippingMethod = await shippingMethodDao.readByName(name);
        if (!shippingMethod) {
            throw new ApiError(404, "Not Found", ErrorDictionary.SHIPPING_METHOD_NOT_FOUND);
        }
        return shippingMethod;
    }
}
export default shippingMethodService