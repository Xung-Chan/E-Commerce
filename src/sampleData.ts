import mongoose from "mongoose";

const brandId = new mongoose.Types.ObjectId();
const catalogId = new mongoose.Types.ObjectId();

export const products = [
    {
        name: 'PC Gaming High Performance',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC gaming cao cấp, chiến tốt mọi tựa game hiện nay với cấu hình mạnh mẽ.",
        images: [
            "/images/products/gaming-high-performance-1.jpg",
            "/images/products/gaming-high-performance-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 12400F / RTX 4070 / 16GB / 512GB", price: 23980000, stock: 10 },
            { diffTitle: "i7 12700F / RTX 4070 / 16GB / 512GB", price: 28980000, stock: 5 },
            { diffTitle: "i7 12700F / RTX 4070 Ti / 32GB / 1TB", price: 35980000, stock: 5 },
            { diffTitle: "i9 12900K / RTX 4080 / 32GB / 1TB", price: 49980000, stock: 2 }
        ]
    },
    {
        name: 'PC Gaming Ultra',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "Cấu hình cực mạnh, chơi game AAA mượt mà, livestream và đồ họa chuyên nghiệp.",
        images: [
            "/images/products/gaming-ultra-1.jpg",
            "/images/products/gaming-ultra-2.jpg",
        ],
        variants: [
            { diffTitle: "i9 13900K / RTX 4090 / 64GB / 2TB", price: 120000000, stock: 2 },
            { diffTitle: "i7 13700K / RTX 4080 / 32GB / 1TB", price: 89000000, stock: 3 }
        ]
    },
    {
        name: 'PC Gaming Starter',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming cơ bản, phù hợp cho game thủ mới bắt đầu với hiệu năng ổn định.",
        images: [
            "/images/products/gaming-starter-1.jpg",
            "/images/products/gaming-starter-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 5 5600G / GTX 1650 / 8GB / 512GB", price: 15000000, stock: 8 },
            { diffTitle: "i3 12100F / GTX 1660 / 8GB / 256GB", price: 13500000, stock: 6 }
        ]
    },
    {
        name: 'PC Gaming RGB',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming với hệ thống đèn RGB nổi bật, hiệu năng mạnh mẽ.",
        images: [
            "/images/products/gaming-rgb-1.jpg",
            "/images/products/gaming-rgb-2.jpg",
        ],
        variants: [
            { diffTitle: "i7 12700F / RTX 3060 / 16GB / 1TB", price: 27000000, stock: 7 },
            { diffTitle: "Ryzen 7 5800X / RX 6700XT / 32GB / 1TB", price: 32000000, stock: 4 }
        ]
    },
    {
        name: 'PC Gaming Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming nhỏ gọn, tiết kiệm không gian, phù hợp phòng nhỏ.",
        images: [
            "/images/products/gaming-compact-1.jpg",
            "/images/products/gaming-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 3 3200G / GTX 1050Ti / 8GB / 256GB", price: 9500000, stock: 10 },
            { diffTitle: "i5 10400F / GTX 1650 / 8GB / 512GB", price: 12000000, stock: 7 },
            { diffTitle: "i5 12400F / RTX 3060 / 16GB / 512GB", price: 22000000, stock: 5 }
        ]
    },
    {
        name: 'PC Văn Phòng Basic',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Cấu hình ổn định, đáp ứng tốt nhu cầu làm việc văn phòng, học tập.",
        images: [
            "/images/products/office-basic-1.jpg",
            "/images/products/office-basic-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 9500000, stock: 12 },
            { diffTitle: "i5 10400 / Intel UHD / 8GB / 256GB", price: 10500000, stock: 10 }
        ]
    },
    {
        name: 'PC Văn Phòng Plus',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Hiệu năng cao, đa nhiệm tốt, phù hợp cho doanh nghiệp vừa và nhỏ.",
        images: [
            "/images/products/office-plus-1.jpg",
            "/images/products/office-plus-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 5 5600G / Vega 8 / 16GB / 512GB", price: 13500000, stock: 8 },
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 }
        ]
    },
    {
        name: 'PC Văn Phòng Mini',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Thiết kế nhỏ gọn, tiết kiệm không gian, phù hợp cho văn phòng và học sinh.",
        images: [
            "/images/products/office-mini-1.jpg",
            "/images/products/office-mini-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 7900000, stock: 15 },
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 9500000, stock: 12 }
        ]
    },
    {
        name: 'PC Văn Phòng Pro',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "PC văn phòng chuyên nghiệp, hỗ trợ đa nhiệm và xử lý dữ liệu.",
        images: [
            "/images/products/office-pro-1.jpg",
            "/images/products/office-pro-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 },
            { diffTitle: "i7 12700 / Intel UHD / 32GB / 1TB", price: 22000000, stock: 4 }
        ]
    },
    {
        name: 'PC Văn Phòng Silent',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "PC văn phòng vận hành êm ái, tiết kiệm điện năng.",
        images: [
            "/images/products/office-silent-1.jpg",
            "/images/products/office-silent-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 10400 / Intel UHD / 8GB / 256GB", price: 10500000, stock: 10 },
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 }
        ]
    },
    {
        name: 'PC Mini Office',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini cho văn phòng nhỏ, tiết kiệm không gian.",
        images: [
            "/images/products/mini-office-1.jpg",
            "/images/products/mini-office-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 6500000, stock: 20 },
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 7900000, stock: 15 }
        ]
    },
    {
        name: 'PC Mini Home',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini tiết kiệm điện, phù hợp cho gia đình, giải trí nhẹ nhàng.",
        images: [
            "/images/products/mini-home-1.jpg",
            "/images/products/mini-home-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 3 3200G / Vega 3 / 8GB / 256GB", price: 7900000, stock: 15 },
            { diffTitle: "Ryzen 5 3400G / Vega 11 / 8GB / 512GB", price: 9500000, stock: 10 }
        ]
    },
    {
        name: 'PC Mini Student',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini dành cho học sinh, sinh viên, giá rẻ, hiệu năng ổn.",
        images: [
            "/images/products/mini-student-1.jpg",
            "/images/products/mini-student-2.jpg",
        ],
        variants: [
            { diffTitle: "Pentium G6400 / Intel UHD / 4GB / 128GB", price: 5900000, stock: 18 },
            { diffTitle: "Celeron G5900 / Intel UHD / 4GB / 64GB", price: 4900000, stock: 25 }
        ]
    },
    {
        name: 'PC Mini Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini siêu nhỏ, phù hợp không gian hẹp.",
        images: [
            "/images/products/mini-compact-1.jpg",
            "/images/products/mini-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "Celeron G5900 / Intel UHD / 4GB / 64GB", price: 4900000, stock: 25 },
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 6500000, stock: 20 }
        ]
    },
    {
        name: 'Workstation Pro',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Dành cho thiết kế đồ họa, dựng phim, hiệu năng xử lý chuyên nghiệp.",
        images: [
            "/images/products/workstation-pro-1.jpg",
            "/images/products/workstation-pro-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 9 5950X / RTX A4000 / 32GB / 1TB", price: 45000000, stock: 4 },
            { diffTitle: "i9 12900K / RTX A5000 / 64GB / 2TB", price: 75000000, stock: 2 }
        ]
    },
    {
        name: 'Workstation Designer',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation cho designer, tối ưu hóa cho phần mềm đồ họa.",
        images: [
            "/images/products/workstation-designer-1.jpg",
            "/images/products/workstation-designer-2.jpg",
        ],
        variants: [
            { diffTitle: "Intel Xeon / Quadro RTX / 64GB / 2TB", price: 110000000, stock: 2 },
            { diffTitle: "AMD Threadripper / RTX A6000 / 64GB / 2TB", price: 130000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation nhỏ gọn, tiết kiệm không gian, phù hợp cho studio cá nhân.",
        images: [
            "/images/products/workstation-compact-1.jpg",
            "/images/products/workstation-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "i7 12700F / RTX 3060 / 16GB / 512GB", price: 28000000, stock: 5 },
            { diffTitle: "Ryzen 7 5800X / RTX 3060 / 16GB / 512GB", price: 30000000, stock: 4 }
        ]
    },
    {
        name: 'Workstation Extreme',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Hiệu năng tối đa cho các dự án lớn, xử lý dữ liệu và đồ họa chuyên sâu.",
        images: [
            "/images/products/workstation-extreme-1.jpg",
            "/images/products/workstation-extreme-2.jpg",
        ],
        variants: [
            { diffTitle: "Xeon Gold / Quadro RTX 5000 / 128GB / 4TB", price: 150000000, stock: 1 },
            { diffTitle: "Threadripper / RTX A6000 / 128GB / 4TB", price: 180000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Silent',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation vận hành êm ái, phù hợp môi trường cần yên tĩnh.",
        images: [
            "/images/products/workstation-silent-1.jpg",
            "/images/products/workstation-silent-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 7 5800X / RTX 4000 / 32GB / 1TB", price: 39000000, stock: 3 },
            { diffTitle: "i7 12700F / RTX 4000 / 32GB / 1TB", price: 42000000, stock: 2 },
            { diffTitle: "i9 12900K / RTX 4000 / 64GB / 2TB", price: 60000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Titan',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation cấu hình khủng, dành cho các dự án lớn, AI, render.",
        images: [
            "/images/products/workstation-titan-1.jpg",
            "/images/products/workstation-titan-2.jpg",
        ],
        variants: [
            { diffTitle: "Xeon Platinum / Quadro RTX 8000 / 256GB / 8TB", price: 320000000, stock: 1 },
            { diffTitle: "Threadripper Pro / RTX A6000 / 256GB / 8TB", price: 350000000, stock: 1 }
        ]
    },
    {
        name: 'PC Gaming High Performance',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC gaming cao cấp, chiến tốt mọi tựa game hiện nay với cấu hình mạnh mẽ.",
        images: [
            "/images/products/gaming-high-performance-1.jpg",
            "/images/products/gaming-high-performance-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 12400F / RTX 4070 / 16GB / 512GB", price: 23980000, stock: 10 },
            { diffTitle: "i7 12700F / RTX 4070 / 16GB / 512GB", price: 28980000, stock: 5 },
            { diffTitle: "i7 12700F / RTX 4070 Ti / 32GB / 1TB", price: 35980000, stock: 5 },
            { diffTitle: "i9 12900K / RTX 4080 / 32GB / 1TB", price: 49980000, stock: 2 }
        ]
    },
    {
        name: 'PC Gaming Ultra',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "Cấu hình cực mạnh, chơi game AAA mượt mà, livestream và đồ họa chuyên nghiệp.",
        images: [
            "/images/products/gaming-ultra-1.jpg",
            "/images/products/gaming-ultra-2.jpg",
        ],
        variants: [
            { diffTitle: "i9 13900K / RTX 4090 / 64GB / 2TB", price: 120000000, stock: 2 },
            { diffTitle: "i7 13700K / RTX 4080 / 32GB / 1TB", price: 89000000, stock: 3 }
        ]
    },
    {
        name: 'PC Gaming Starter',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming cơ bản, phù hợp cho game thủ mới bắt đầu với hiệu năng ổn định.",
        images: [
            "/images/products/gaming-starter-1.jpg",
            "/images/products/gaming-starter-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 5 5600G / GTX 1650 / 8GB / 512GB", price: 15000000, stock: 8 },
            { diffTitle: "i3 12100F / GTX 1660 / 8GB / 256GB", price: 13500000, stock: 6 }
        ]
    },
    {
        name: 'PC Gaming RGB',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming với hệ thống đèn RGB nổi bật, hiệu năng mạnh mẽ.",
        images: [
            "/images/products/gaming-rgb-1.jpg",
            "/images/products/gaming-rgb-2.jpg",
        ],
        variants: [
            { diffTitle: "i7 12700F / RTX 3060 / 16GB / 1TB", price: 27000000, stock: 7 },
            { diffTitle: "Ryzen 7 5800X / RX 6700XT / 32GB / 1TB", price: 32000000, stock: 4 }
        ]
    },
    {
        name: 'PC Gaming Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming nhỏ gọn, tiết kiệm không gian, phù hợp phòng nhỏ.",
        images: [
            "/images/products/gaming-compact-1.jpg",
            "/images/products/gaming-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 3 3200G / GTX 1050Ti / 8GB / 256GB", price: 9500000, stock: 10 },
            { diffTitle: "i5 10400F / GTX 1650 / 8GB / 512GB", price: 12000000, stock: 7 },
            { diffTitle: "i5 12400F / RTX 3060 / 16GB / 512GB", price: 22000000, stock: 5 }
        ]
    },
    {
        name: 'PC Văn Phòng Basic',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Cấu hình ổn định, đáp ứng tốt nhu cầu làm việc văn phòng, học tập.",
        images: [
            "/images/products/office-basic-1.jpg",
            "/images/products/office-basic-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 9500000, stock: 12 },
            { diffTitle: "i5 10400 / Intel UHD / 8GB / 256GB", price: 10500000, stock: 10 }
        ]
    },
    {
        name: 'PC Văn Phòng Plus',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Hiệu năng cao, đa nhiệm tốt, phù hợp cho doanh nghiệp vừa và nhỏ.",
        images: [
            "/images/products/office-plus-1.jpg",
            "/images/products/office-plus-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 5 5600G / Vega 8 / 16GB / 512GB", price: 13500000, stock: 8 },
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 }
        ]
    },
    {
        name: 'PC Văn Phòng Mini',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Thiết kế nhỏ gọn, tiết kiệm không gian, phù hợp cho văn phòng và học sinh.",
        images: [
            "/images/products/office-mini-1.jpg",
            "/images/products/office-mini-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 7900000, stock: 15 },
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 9500000, stock: 12 }
        ]
    },
    {
        name: 'PC Văn Phòng Pro',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "PC văn phòng chuyên nghiệp, hỗ trợ đa nhiệm và xử lý dữ liệu.",
        images: [
            "/images/products/office-pro-1.jpg",
            "/images/products/office-pro-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 },
            { diffTitle: "i7 12700 / Intel UHD / 32GB / 1TB", price: 22000000, stock: 4 }
        ]
    },
    {
        name: 'PC Văn Phòng Silent',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "PC văn phòng vận hành êm ái, tiết kiệm điện năng.",
        images: [
            "/images/products/office-silent-1.jpg",
            "/images/products/office-silent-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 10400 / Intel UHD / 8GB / 256GB", price: 10500000, stock: 10 },
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 }
        ]
    },
    {
        name: 'PC Mini Office',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini cho văn phòng nhỏ, tiết kiệm không gian.",
        images: [
            "/images/products/mini-office-1.jpg",
            "/images/products/mini-office-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 6500000, stock: 20 },
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 7900000, stock: 15 }
        ]
    },
    {
        name: 'PC Mini Home',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini tiết kiệm điện, phù hợp cho gia đình, giải trí nhẹ nhàng.",
        images: [
            "/images/products/mini-home-1.jpg",
            "/images/products/mini-home-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 3 3200G / Vega 3 / 8GB / 256GB", price: 7900000, stock: 15 },
            { diffTitle: "Ryzen 5 3400G / Vega 11 / 8GB / 512GB", price: 9500000, stock: 10 }
        ]
    },
    {
        name: 'PC Mini Student',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini dành cho học sinh, sinh viên, giá rẻ, hiệu năng ổn.",
        images: [
            "/images/products/mini-student-1.jpg",
            "/images/products/mini-student-2.jpg",
        ],
        variants: [
            { diffTitle: "Pentium G6400 / Intel UHD / 4GB / 128GB", price: 5900000, stock: 18 },
            { diffTitle: "Celeron G5900 / Intel UHD / 4GB / 64GB", price: 4900000, stock: 25 }
        ]
    },
    {
        name: 'PC Mini Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini siêu nhỏ, phù hợp không gian hẹp.",
        images: [
            "/images/products/mini-compact-1.jpg",
            "/images/products/mini-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "Celeron G5900 / Intel UHD / 4GB / 64GB", price: 4900000, stock: 25 },
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 6500000, stock: 20 }
        ]
    },
    {
        name: 'Workstation Pro',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Dành cho thiết kế đồ họa, dựng phim, hiệu năng xử lý chuyên nghiệp.",
        images: [
            "/images/products/workstation-pro-1.jpg",
            "/images/products/workstation-pro-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 9 5950X / RTX A4000 / 32GB / 1TB", price: 45000000, stock: 4 },
            { diffTitle: "i9 12900K / RTX A5000 / 64GB / 2TB", price: 75000000, stock: 2 }
        ]
    },
    {
        name: 'Workstation Designer',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation cho designer, tối ưu hóa cho phần mềm đồ họa.",
        images: [
            "/images/products/workstation-designer-1.jpg",
            "/images/products/workstation-designer-2.jpg",
        ],
        variants: [
            { diffTitle: "Intel Xeon / Quadro RTX / 64GB / 2TB", price: 110000000, stock: 2 },
            { diffTitle: "AMD Threadripper / RTX A6000 / 64GB / 2TB", price: 130000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation nhỏ gọn, tiết kiệm không gian, phù hợp cho studio cá nhân.",
        images: [
            "/images/products/workstation-compact-1.jpg",
            "/images/products/workstation-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "i7 12700F / RTX 3060 / 16GB / 512GB", price: 28000000, stock: 5 },
            { diffTitle: "Ryzen 7 5800X / RTX 3060 / 16GB / 512GB", price: 30000000, stock: 4 }
        ]
    },
    {
        name: 'Workstation Extreme',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Hiệu năng tối đa cho các dự án lớn, xử lý dữ liệu và đồ họa chuyên sâu.",
        images: [
            "/images/products/workstation-extreme-1.jpg",
            "/images/products/workstation-extreme-2.jpg",
        ],
        variants: [
            { diffTitle: "Xeon Gold / Quadro RTX 5000 / 128GB / 4TB", price: 150000000, stock: 1 },
            { diffTitle: "Threadripper / RTX A6000 / 128GB / 4TB", price: 180000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Silent',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation vận hành êm ái, phù hợp môi trường cần yên tĩnh.",
        images: [
            "/images/products/workstation-silent-1.jpg",
            "/images/products/workstation-silent-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 7 5800X / RTX 4000 / 32GB / 1TB", price: 39000000, stock: 3 },
            { diffTitle: "i7 12700F / RTX 4000 / 32GB / 1TB", price: 42000000, stock: 2 },
            { diffTitle: "i9 12900K / RTX 4000 / 64GB / 2TB", price: 60000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Titan',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation cấu hình khủng, dành cho các dự án lớn, AI, render.",
        images: [
            "/images/products/workstation-titan-1.jpg",
            "/images/products/workstation-titan-2.jpg",
        ],
        variants: [
            { diffTitle: "Xeon Platinum / Quadro RTX 8000 / 256GB / 8TB", price: 320000000, stock: 1 },
            { diffTitle: "Threadripper Pro / RTX A6000 / 256GB / 8TB", price: 350000000, stock: 1 }
        ]
    },
    {
        name: 'PC Gaming High Performance',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC gaming cao cấp, chiến tốt mọi tựa game hiện nay với cấu hình mạnh mẽ.",
        images: [
            "/images/products/gaming-high-performance-1.jpg",
            "/images/products/gaming-high-performance-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 12400F / RTX 4070 / 16GB / 512GB", price: 23980000, stock: 10 },
            { diffTitle: "i7 12700F / RTX 4070 / 16GB / 512GB", price: 28980000, stock: 5 },
            { diffTitle: "i7 12700F / RTX 4070 Ti / 32GB / 1TB", price: 35980000, stock: 5 },
            { diffTitle: "i9 12900K / RTX 4080 / 32GB / 1TB", price: 49980000, stock: 2 }
        ]
    },
    {
        name: 'PC Gaming Ultra',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "Cấu hình cực mạnh, chơi game AAA mượt mà, livestream và đồ họa chuyên nghiệp.",
        images: [
            "/images/products/gaming-ultra-1.jpg",
            "/images/products/gaming-ultra-2.jpg",
        ],
        variants: [
            { diffTitle: "i9 13900K / RTX 4090 / 64GB / 2TB", price: 120000000, stock: 2 },
            { diffTitle: "i7 13700K / RTX 4080 / 32GB / 1TB", price: 89000000, stock: 3 }
        ]
    },
    {
        name: 'PC Gaming Starter',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming cơ bản, phù hợp cho game thủ mới bắt đầu với hiệu năng ổn định.",
        images: [
            "/images/products/gaming-starter-1.jpg",
            "/images/products/gaming-starter-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 5 5600G / GTX 1650 / 8GB / 512GB", price: 15000000, stock: 8 },
            { diffTitle: "i3 12100F / GTX 1660 / 8GB / 256GB", price: 13500000, stock: 6 }
        ]
    },
    {
        name: 'PC Gaming RGB',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming với hệ thống đèn RGB nổi bật, hiệu năng mạnh mẽ.",
        images: [
            "/images/products/gaming-rgb-1.jpg",
            "/images/products/gaming-rgb-2.jpg",
        ],
        variants: [
            { diffTitle: "i7 12700F / RTX 3060 / 16GB / 1TB", price: 27000000, stock: 7 },
            { diffTitle: "Ryzen 7 5800X / RX 6700XT / 32GB / 1TB", price: 32000000, stock: 4 }
        ]
    },
    {
        name: 'PC Gaming Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Gaming',
        description: "PC Gaming nhỏ gọn, tiết kiệm không gian, phù hợp phòng nhỏ.",
        images: [
            "/images/products/gaming-compact-1.jpg",
            "/images/products/gaming-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 3 3200G / GTX 1050Ti / 8GB / 256GB", price: 9500000, stock: 10 },
            { diffTitle: "i5 10400F / GTX 1650 / 8GB / 512GB", price: 12000000, stock: 7 },
            { diffTitle: "i5 12400F / RTX 3060 / 16GB / 512GB", price: 22000000, stock: 5 }
        ]
    },
    {
        name: 'PC Văn Phòng Basic',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Cấu hình ổn định, đáp ứng tốt nhu cầu làm việc văn phòng, học tập.",
        images: [
            "/images/products/office-basic-1.jpg",
            "/images/products/office-basic-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 9500000, stock: 12 },
            { diffTitle: "i5 10400 / Intel UHD / 8GB / 256GB", price: 10500000, stock: 10 }
        ]
    },
    {
        name: 'PC Văn Phòng Plus',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Hiệu năng cao, đa nhiệm tốt, phù hợp cho doanh nghiệp vừa và nhỏ.",
        images: [
            "/images/products/office-plus-1.jpg",
            "/images/products/office-plus-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 5 5600G / Vega 8 / 16GB / 512GB", price: 13500000, stock: 8 },
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 }
        ]
    },
    {
        name: 'PC Văn Phòng Mini',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "Thiết kế nhỏ gọn, tiết kiệm không gian, phù hợp cho văn phòng và học sinh.",
        images: [
            "/images/products/office-mini-1.jpg",
            "/images/products/office-mini-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 7900000, stock: 15 },
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 9500000, stock: 12 }
        ]
    },
    {
        name: 'PC Văn Phòng Pro',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "PC văn phòng chuyên nghiệp, hỗ trợ đa nhiệm và xử lý dữ liệu.",
        images: [
            "/images/products/office-pro-1.jpg",
            "/images/products/office-pro-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 },
            { diffTitle: "i7 12700 / Intel UHD / 32GB / 1TB", price: 22000000, stock: 4 }
        ]
    },
    {
        name: 'PC Văn Phòng Silent',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Văn Phòng',
        description: "PC văn phòng vận hành êm ái, tiết kiệm điện năng.",
        images: [
            "/images/products/office-silent-1.jpg",
            "/images/products/office-silent-2.jpg",
        ],
        variants: [
            { diffTitle: "i5 10400 / Intel UHD / 8GB / 256GB", price: 10500000, stock: 10 },
            { diffTitle: "i5 12400 / Intel UHD / 16GB / 512GB", price: 15500000, stock: 6 }
        ]
    },
    {
        name: 'PC Mini Office',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini cho văn phòng nhỏ, tiết kiệm không gian.",
        images: [
            "/images/products/mini-office-1.jpg",
            "/images/products/mini-office-2.jpg",
        ],
        variants: [
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 6500000, stock: 20 },
            { diffTitle: "i3 10100 / Intel UHD / 8GB / 256GB", price: 7900000, stock: 15 }
        ]
    },
    {
        name: 'PC Mini Home',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini tiết kiệm điện, phù hợp cho gia đình, giải trí nhẹ nhàng.",
        images: [
            "/images/products/mini-home-1.jpg",
            "/images/products/mini-home-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 3 3200G / Vega 3 / 8GB / 256GB", price: 7900000, stock: 15 },
            { diffTitle: "Ryzen 5 3400G / Vega 11 / 8GB / 512GB", price: 9500000, stock: 10 }
        ]
    },
    {
        name: 'PC Mini Student',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini dành cho học sinh, sinh viên, giá rẻ, hiệu năng ổn.",
        images: [
            "/images/products/mini-student-1.jpg",
            "/images/products/mini-student-2.jpg",
        ],
        variants: [
            { diffTitle: "Pentium G6400 / Intel UHD / 4GB / 128GB", price: 5900000, stock: 18 },
            { diffTitle: "Celeron G5900 / Intel UHD / 4GB / 64GB", price: 4900000, stock: 25 }
        ]
    },
    {
        name: 'PC Mini Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'PC Mini',
        description: "PC mini siêu nhỏ, phù hợp không gian hẹp.",
        images: [
            "/images/products/mini-compact-1.jpg",
            "/images/products/mini-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "Celeron G5900 / Intel UHD / 4GB / 64GB", price: 4900000, stock: 25 },
            { diffTitle: "i3 10100 / Intel UHD / 4GB / 128GB", price: 6500000, stock: 20 }
        ]
    },
    {
        name: 'Workstation Pro',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Dành cho thiết kế đồ họa, dựng phim, hiệu năng xử lý chuyên nghiệp.",
        images: [
            "/images/products/workstation-pro-1.jpg",
            "/images/products/workstation-pro-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 9 5950X / RTX A4000 / 32GB / 1TB", price: 45000000, stock: 4 },
            { diffTitle: "i9 12900K / RTX A5000 / 64GB / 2TB", price: 75000000, stock: 2 }
        ]
    },
    {
        name: 'Workstation Designer',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation cho designer, tối ưu hóa cho phần mềm đồ họa.",
        images: [
            "/images/products/workstation-designer-1.jpg",
            "/images/products/workstation-designer-2.jpg",
        ],
        variants: [
            { diffTitle: "Intel Xeon / Quadro RTX / 64GB / 2TB", price: 110000000, stock: 2 },
            { diffTitle: "AMD Threadripper / RTX A6000 / 64GB / 2TB", price: 130000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Compact',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation nhỏ gọn, tiết kiệm không gian, phù hợp cho studio cá nhân.",
        images: [
            "/images/products/workstation-compact-1.jpg",
            "/images/products/workstation-compact-2.jpg",
        ],
        variants: [
            { diffTitle: "i7 12700F / RTX 3060 / 16GB / 512GB", price: 28000000, stock: 5 },
            { diffTitle: "Ryzen 7 5800X / RTX 3060 / 16GB / 512GB", price: 30000000, stock: 4 }
        ]
    },
    {
        name: 'Workstation Extreme',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Hiệu năng tối đa cho các dự án lớn, xử lý dữ liệu và đồ họa chuyên sâu.",
        images: [
            "/images/products/workstation-extreme-1.jpg",
            "/images/products/workstation-extreme-2.jpg",
        ],
        variants: [
            { diffTitle: "Xeon Gold / Quadro RTX 5000 / 128GB / 4TB", price: 150000000, stock: 1 },
            { diffTitle: "Threadripper / RTX A6000 / 128GB / 4TB", price: 180000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Silent',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation vận hành êm ái, phù hợp môi trường cần yên tĩnh.",
        images: [
            "/images/products/workstation-silent-1.jpg",
            "/images/products/workstation-silent-2.jpg",
        ],
        variants: [
            { diffTitle: "Ryzen 7 5800X / RTX 4000 / 32GB / 1TB", price: 39000000, stock: 3 },
            { diffTitle: "i7 12700F / RTX 4000 / 32GB / 1TB", price: 42000000, stock: 2 },
            { diffTitle: "i9 12900K / RTX 4000 / 64GB / 2TB", price: 60000000, stock: 1 }
        ]
    },
    {
        name: 'Workstation Titan',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Workstation',
        description: "Workstation cấu hình khủng, dành cho các dự án lớn, AI, render.",
        images: [
            "/images/products/workstation-titan-1.jpg",
            "/images/products/workstation-titan-2.jpg",
        ],
        variants: [
            { diffTitle: "Xeon Platinum / Quadro RTX 8000 / 256GB / 8TB", price: 320000000, stock: 1 },
            { diffTitle: "Threadripper Pro / RTX A6000 / 256GB / 8TB", price: 350000000, stock: 1 }
        ]
    },
    {
        name: 'RAM Corsair Vengeance 16GB DDR4',
        brandId: brandId,
        catalogId: catalogId,
        type: 'RAM',
        description: "RAM Corsair Vengeance 16GB DDR4, tốc độ cao, ổn định cho gaming và làm việc.",
        images: [
            "/images/components/ram-vengeance-16gb-1.jpg",
            "/images/components/ram-vengeance-16gb-2.jpg"
        ],
        variants: [
            { diffTitle: "16GB DDR4 / 3200MHz", price: 1200000, stock: 20 },
            { diffTitle: "32GB DDR4 / 3200MHz", price: 2200000, stock: 15 }
        ]
    },
    {
        name: 'RAM G.SKILL Ripjaws 8GB DDR4',
        brandId: brandId,
        catalogId: catalogId,
        type: 'RAM',
        description: "RAM G.SKILL Ripjaws 8GB DDR4, phù hợp cho PC văn phòng và gaming cơ bản.",
        images: [
            "/images/components/ram-gskill-8gb-1.jpg",
            "/images/components/ram-gskill-8gb-2.jpg"
        ],
        variants: [
            { diffTitle: "8GB DDR4 / 2666MHz", price: 650000, stock: 30 }
        ]
    },
    {
        name: 'RAM Kingston Fury 32GB DDR5',
        brandId: brandId,
        catalogId: catalogId,
        type: 'RAM',
        description: "RAM Kingston Fury 32GB DDR5, hiệu năng cực cao cho workstation.",
        images: [
            "/images/components/ram-kingston-32gb-1.jpg",
            "/images/components/ram-kingston-32gb-2.jpg"
        ],
        variants: [
            { diffTitle: "32GB DDR5 / 5600MHz", price: 3500000, stock: 10 }
        ]
    },

    // CPU
    {
        name: 'CPU Intel Core i9-13900K',
        brandId: brandId,
        catalogId: catalogId,
        type: 'CPU',
        description: "CPU Intel Core i9 thế hệ 13, hiệu năng đỉnh cao cho gaming và đồ họa.",
        images: [
            "/images/components/i9-13900k-1.jpg",
            "/images/components/i9-13900k-2.jpg"
        ],
        variants: [
            { diffTitle: "i9-13900K / 24 nhân / 32 luồng / 3.0GHz", price: 14500000, stock: 8 }
        ]
    },
    {
        name: 'CPU AMD Ryzen 7 5800X',
        brandId: brandId,
        catalogId: catalogId,
        type: 'CPU',
        description: "CPU AMD Ryzen 7 5800X, phù hợp cho gaming và làm việc đa nhiệm.",
        images: [
            "/images/components/ryzen-7-5800x-1.jpg",
            "/images/components/ryzen-7-5800x-2.jpg"
        ],
        variants: [
            { diffTitle: "Ryzen 7 5800X / 8 nhân / 16 luồng / 3.8GHz", price: 6500000, stock: 12 }
        ]
    },
    {
        name: 'CPU Intel Core i5-12400F',
        brandId: brandId,
        catalogId: catalogId,
        type: 'CPU',
        description: "CPU Intel Core i5 thế hệ 12, tiết kiệm điện, hiệu năng ổn định.",
        images: [
            "/images/components/i5-12400f-1.jpg",
            "/images/components/i5-12400f-2.jpg"
        ],
        variants: [
            { diffTitle: "i5-12400F / 6 nhân / 12 luồng / 2.5GHz", price: 4200000, stock: 20 }
        ]
    },

    // VGA
    {
        name: 'VGA ASUS RTX 3060 Dual OC',
        brandId: brandId,
        catalogId: catalogId,
        type: 'VGA',
        description: "Card đồ họa ASUS RTX 3060 Dual OC, 12GB GDDR6, chơi game mượt mà.",
        images: [
            "/images/components/rtx3060-asus-1.jpg",
            "/images/components/rtx3060-asus-2.jpg"
        ],
        variants: [
            { diffTitle: "RTX 3060 / 12GB GDDR6", price: 9000000, stock: 10 }
        ]
    },
    {
        name: 'VGA MSI GTX 1660 Super',
        brandId: brandId,
        catalogId: catalogId,
        type: 'VGA',
        description: "Card đồ họa MSI GTX 1660 Super, phù hợp gaming tầm trung.",
        images: [
            "/images/components/gtx1660-msi-1.jpg",
            "/images/components/gtx1660-msi-2.jpg"
        ],
        variants: [
            { diffTitle: "GTX 1660 Super / 6GB GDDR5", price: 5200000, stock: 15 }
        ]
    },
    {
        name: 'VGA Gigabyte RTX 4070 Ti',
        brandId: brandId,
        catalogId: catalogId,
        type: 'VGA',
        description: "Card đồ họa Gigabyte RTX 4070 Ti, hiệu năng cao cho đồ họa và AI.",
        images: [
            "/images/components/rtx4070ti-gigabyte-1.jpg",
            "/images/components/rtx4070ti-gigabyte-2.jpg"
        ],
        variants: [
            { diffTitle: "RTX 4070 Ti / 12GB GDDR6X", price: 21000000, stock: 5 }
        ]
    },

    {
        name: 'SSD Samsung 970 EVO Plus 1TB',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Storage',
        description: "SSD Samsung 970 EVO Plus 1TB, tốc độ đọc ghi cực nhanh.",
        images: [
            "/images/components/ssd-970-evo-plus-1tb-1.jpg",
            "/images/components/ssd-970-evo-plus-1tb-2.jpg"
        ],
        variants: [
            { diffTitle: "1TB NVMe PCIe Gen3", price: 2500000, stock: 18 }
        ]
    },
    {
        name: 'SSD Kingston A2000 500GB',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Storage',
        description: "SSD Kingston A2000 500GB, giá rẻ, tốc độ ổn định.",
        images: [
            "/images/components/ssd-kingston-a2000-500gb-1.jpg",
            "/images/components/ssd-kingston-a2000-500gb-2.jpg"
        ],
        variants: [
            { diffTitle: "500GB NVMe PCIe Gen3", price: 1200000, stock: 25 }
        ]
    },
    {
        name: 'HDD Seagate Barracuda 2TB',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Storage',
        description: "HDD Seagate Barracuda 2TB, lưu trữ dữ liệu lớn, bền bỉ.",
        images: [
            "/images/components/hdd-seagate-2tb-1.jpg",
            "/images/components/hdd-seagate-2tb-2.jpg"
        ],
        variants: [
            { diffTitle: "2TB / 7200rpm / SATA3", price: 1500000, stock: 20 }
        ]
    },

    {
        name: 'Mainboard ASUS B660M-A DDR4',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Mainboard',
        description: "Mainboard ASUS B660M-A DDR4, hỗ trợ CPU Intel thế hệ 12.",
        images: [
            "/images/components/asus-b660m-a-1.jpg",
            "/images/components/asus-b660m-a-2.jpg"
        ],
        variants: [
            { diffTitle: "B660M-A / LGA1700 / DDR4", price: 3200000, stock: 12 }
        ]
    },
    {
        name: 'Mainboard MSI B550 Tomahawk',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Mainboard',
        description: "Mainboard MSI B550 Tomahawk, tối ưu cho CPU AMD Ryzen.",
        images: [
            "/images/components/msi-b550-tomahawk-1.jpg",
            "/images/components/msi-b550-tomahawk-2.jpg"
        ],
        variants: [
            { diffTitle: "B550 / AM4 / DDR4", price: 3500000, stock: 10 }
        ]
    },
    {
        name: 'Mainboard Gigabyte Z690 UD DDR5',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Mainboard',
        description: "Mainboard Gigabyte Z690 UD DDR5, hỗ trợ CPU Intel thế hệ 12, 13.",
        images: [
            "/images/components/gigabyte-z690-ud-1.jpg",
            "/images/components/gigabyte-z690-ud-2.jpg"
        ],
        variants: [
            { diffTitle: "Z690 UD / LGA1700 / DDR5", price: 5200000, stock: 8 }
        ]
    },

    {
        name: 'Nguồn Cooler Master MWE 650W',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Power',
        description: "Nguồn Cooler Master MWE 650W, chuẩn 80 Plus Bronze, ổn định.",
        images: [
            "/images/components/cooler-master-mwe-650w-1.jpg",
            "/images/components/cooler-master-mwe-650w-2.jpg"
        ],
        variants: [
            { diffTitle: "650W / 80 Plus Bronze", price: 1400000, stock: 18 }
        ]
    },
    {
        name: 'Nguồn Corsair RM850x 850W',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Power',
        description: "Nguồn Corsair RM850x 850W, chuẩn 80 Plus Gold, hiệu suất cao.",
        images: [
            "/images/components/corsair-rm850x-1.jpg",
            "/images/components/corsair-rm850x-2.jpg"
        ],
        variants: [
            { diffTitle: "850W / 80 Plus Gold", price: 2600000, stock: 10 }
        ]
    },
    {
        name: 'Nguồn Antec NeoEco 550W',
        brandId: brandId,
        catalogId: catalogId,
        type: 'Power',
        description: "Nguồn Antec NeoEco 550W, tiết kiệm điện, vận hành êm ái.",
        images: [
            "/images/components/antec-neoeco-550w-1.jpg",
            "/images/components/antec-neoeco-550w-2.jpg"
        ],
        variants: [
            { diffTitle: "550W / 80 Plus Bronze", price: 950000, stock: 20 }
        ]
    },
];