import { orderDao } from "../daos/Order.dao.js";
import { userDao } from "../daos/User.dao.js";
import { SimpleStatisticResponse, } from "../dto/Response.dto.js";
import productService from "./Product.service.js";

class SatisticsService {
    async getSimpleStatistic(): Promise<SimpleStatisticResponse> {
        // Tổng số users
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

        const revenueByMonth: { month: string; revenue: number }[] = [];
        for (let i = 0; i < 12; i++) {
            const start = new Date(new Date().getFullYear(), i, 1);
            const end = new Date(new Date().getFullYear(), i + 1, 0, 23, 59, 59);
            const monthlyRevenue = await orderDao.sumRevenue({ start, end });
            revenueByMonth.push({ month: `${i + 1}`, revenue: monthlyRevenue });
        }

        const statistics: SimpleStatisticResponse = {
            totalUsers: totalUsers,
            newUsers: newUsers,
            totalOrders: totalOrders,
            revenue: revenue,
            topProducts: topProducts,
            revenueByMonth: {
                unit: "VND",
                values: revenueByMonth.map(item => item.revenue),
                xaxis: revenueByMonth.map(item => item.month)
            }
        };
        return statistics;
    }


    async getAdvancedStatistic() {


    }


}


const statisticsService = new SatisticsService();
export default statisticsService;