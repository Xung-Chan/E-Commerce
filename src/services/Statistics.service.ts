import { create } from "express-handlebars";
import { userDao } from "../daos/User.dao.js";
import { StatisticResponse } from "../dto/Response.dto.js";
import { orderDao } from "../daos/Order.dao.js";
import productService from "./Product.service.js";

const statisticsService = {
    getSimpleStatistic: async (): Promise<any> => {
        //Tổng số users
        const totalUsers = await userDao.count({});

        //Tổng số new users
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        const newUsers = await userDao.count({ createdAt: { $gte: lastMonth } });

        //Tổng số đơn hàng
        const totalOrders = await orderDao.count({});

        //Danh thu
        const revenue = await orderDao.sumRevenue();

        //Top 5 sản phẩm bán chạy
        const topProducts = await productService.getBestSellingProducts(5);

        const statistics: StatisticResponse = {
            totalUsers: totalUsers,
            newUsers: newUsers,
            totalOrders: totalOrders,
            revenue: revenue,
            topProducts: topProducts
        };
        return statistics;
    }
}
export default statisticsService;