import { importDao } from "../daos/Import.dao.js";
import { orderDao } from "../daos/Order.dao.js";
import { userDao } from "../daos/User.dao.js";
import { AdvancedStatisticResponse, SimpleStatisticResponse, } from "../dto/Response.dto.js";
import productService from "./Product.service.js";

export enum StatisticPeriod {
    QUARTER = "quarter",
    MONTH = "month",
    DAY = "day",
    NEAREST_30_DAYS = "30_days"
}

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
        const importCost = await importDao.sumImportPrice();
        const profit = revenue - importCost;

        //Top 5 sản phẩm bán chạy
        const topProducts = await productService.getBestSellingProducts(5);

        const accumulatedRevenue: { month: string; revenue: number }[] = [];
        const accumulatedProfit: { month: string; revenue: number }[] = [];
        for (let i = 0; i < new Date().getMonth() + 1; i++) {
            const start = new Date()
            start.setFullYear(new Date().getFullYear() - 1);
            const end = new Date(new Date().getFullYear(), i + 1, 0, 23, 59, 59);
            const monthlyRevenue = await orderDao.sumRevenue({ start, end });
            const monthlyImportCost = await importDao.sumImportPrice({ start, end });
            const monthlyProfit = monthlyRevenue - monthlyImportCost;
            accumulatedRevenue.push({ month: `Tháng ${i + 1}`, revenue: monthlyRevenue });
            accumulatedProfit.push({ month: `Tháng ${i + 1}`, revenue: monthlyProfit });
        }

        const statistics: SimpleStatisticResponse = {
            totalUsers: totalUsers,
            newUsers: newUsers,
            totalOrders: totalOrders,
            revenue: revenue,
            profit: profit,
            topProducts: topProducts,
            accumulatedRevenue: {
                name: "Doanh thu tích lũy",
                unit: "VND",
                values: accumulatedRevenue.map(item => item.revenue),
                xaxis: accumulatedRevenue.map(item => item.month)
            },
            accumulatedProfit: {
                name: "Lợi nhuận tích lũy",
                unit: "VND",
                values: accumulatedProfit.map(item => item.revenue),
                xaxis: accumulatedProfit.map(item => item.month)
            }
        };
        return statistics;
    }


    async getAdvancedStatistic(period: string, interval: { startDate: Date, endDate: Date } | null = null): Promise<AdvancedStatisticResponse> {
        //Lợi nhuận
        const profitData: { date: string; profit: number }[] = [];
        const revenueData: { date: string; revenue: number }[] = [];
        const ordersData: { date: string; orders: number }[] = [];
        const totalImportCost = await importDao.sumImportPrice();
        const totalRevenue = await orderDao.sumRevenue();
        const totalProfit = totalRevenue - totalImportCost;
        switch (period) {
            case StatisticPeriod.NEAREST_30_DAYS: {
                let endDate = new Date();
                let startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                if (interval?.startDate) {
                    startDate = interval.startDate;
                }
                if (interval?.endDate) {
                    endDate = interval.endDate;
                }
                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
                    const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
                    const revenue = await orderDao.sumRevenue({ start: dayStart, end: dayEnd });
                    const importCost = await importDao.sumImportPrice({ start: dayStart, end: dayEnd });
                    const orders = await orderDao.countOrders({ start: dayStart, end: dayEnd });
                    const profit = revenue - importCost;
                    revenueData.push({ date: d.toLocaleDateString("vi-VN"), revenue: revenue });
                    profitData.push({ date: d.toLocaleDateString("vi-VN"), profit: profit });
                    ordersData.push({ date: d.toLocaleDateString("vi-VN"), orders: orders });
                }
                break;
            }
            case StatisticPeriod.DAY: {
                let endDate = new Date();
                let startDate = new Date();
                startDate.setDate(1);
                if (interval?.startDate) {
                    startDate = interval.startDate;
                }
                if (interval?.endDate) {
                    endDate = interval.endDate;
                }
                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
                    const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
                    const revenue = await orderDao.sumRevenue({ start: dayStart, end: dayEnd });
                    const importCost = await importDao.sumImportPrice({ start: dayStart, end: dayEnd });
                    const orders = await orderDao.countOrders({ start: dayStart, end: dayEnd });
                    const profit = revenue - importCost;
                    revenueData.push({ date: d.toLocaleDateString("vi-VN"), revenue: revenue });
                    profitData.push({ date: d.toLocaleDateString("vi-VN"), profit: profit });
                    ordersData.push({ date: d.toLocaleDateString("vi-VN"), orders: orders });
                }
                break;

            }
            case StatisticPeriod.MONTH: {
                let endDate = new Date();
                let startDate = new Date();
                startDate.setMonth(0);
                if (interval?.startDate) {
                    startDate = interval.startDate;
                }
                if (interval?.endDate) {
                    endDate = interval.endDate;
                }
                for (let m = 0; m < 12; m++) {
                    const monthStart = new Date(startDate.getFullYear(), m, 1, 0, 0, 0);
                    const monthEnd = new Date(startDate.getFullYear(), m + 1, 0, 23, 59, 59);
                    const revenue = await orderDao.sumRevenue({ start: monthStart, end: monthEnd });
                    const importCost = await importDao.sumImportPrice({ start: monthStart, end: monthEnd });
                    const orders = await orderDao.countOrders({ start: monthStart, end: monthEnd });
                    const profit = revenue - importCost;
                    revenueData.push({ date: `Tháng ${m + 1}`, revenue: revenue });
                    profitData.push({ date: `Tháng ${m + 1}`, profit: profit });
                    ordersData.push({ date: `Tháng ${m + 1}`, orders: orders });
                }
                break;
            }
            case StatisticPeriod.QUARTER: {
                let endDate = new Date();
                let startDate = new Date();
                startDate.setMonth(0);
                if (interval?.startDate) {
                    startDate = interval.startDate;
                }
                if (interval?.endDate) {
                    endDate = interval.endDate;
                }
                for (let q = 0; q < 4; q++) {
                    const quarterStart = new Date(startDate.getFullYear(), q * 3, 1, 0, 0, 0);
                    const quarterEnd = new Date(startDate.getFullYear(), q * 3 + 3, 0, 23, 59, 59);
                    const revenue = await orderDao.sumRevenue({ start: quarterStart, end: quarterEnd });
                    const importCost = await importDao.sumImportPrice({ start: quarterStart, end: quarterEnd });
                    const orders = await orderDao.countOrders({ start: quarterStart, end: quarterEnd });
                    const profit = revenue - importCost;
                    revenueData.push({ date: `Quý ${q + 1}`, revenue: revenue });
                    profitData.push({ date: `Quý ${q + 1}`, profit: profit });
                    ordersData.push({ date: `Quý ${q + 1}`, orders: orders });
                }
                break;
            }

        }
        const statistics: AdvancedStatisticResponse = {
            totalProfit: totalProfit,
            orders: {
                unit: "Đơn",
                name: "Tổng đơn hàng",
                values: ordersData.map(item => item.orders),
                xaxis: ordersData.map(item => item.date)
            },
            revenues: {

                unit: "VND",
                name: "Tổng doanh thu",
                values: revenueData.map(item => item.revenue),
                xaxis: revenueData.map(item => item.date)
            },
            profits: {
                unit: "VND",
                name: "Tổng lợi nhuận",
                values: profitData.map(item => item.profit),
                xaxis: profitData.map(item => item.date)
            }
        };
        return statistics;
    }
}
const statisticsService = new SatisticsService();
export default statisticsService;