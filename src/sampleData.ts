import mongoose from "mongoose";
import { slugify } from "./utils/slug.js";

export const rawProducts = [
    // PC Gaming
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        rate: 4.3,
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Gaming Alpha",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Gaming",
            description: "High-performance gaming PCs designed for immersive experiences."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Mini Beta",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Mini",
            description: "Compact and efficient PCs perfect for everyday tasks and small spaces."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 12400F/RTX 3060/16GB RAM/512GB SSD", price: 25000000, stock: 10 },
            { diffTitle: "i7 12700H/RTX 3070/32GB RAM/1TB SSD", price: 30000000, stock: 5 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "PC Văn Phòng",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "PC Office",
            description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i5 10400/8GB RAM/256GB SSD", price: 10000000, stock: 20 },
            { diffTitle: "i3 10100/8GB RAM/1TB HDD", price: 8000000, stock: 15 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "Workstation Pro",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Brand A",
            description: "Description for Brand A"
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Workstation",
            description: "High-performance workstations designed for professionals in need of powerful computing solutions."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "i9 10900K/32GB RAM/1TB SSD", price: 30000000, stock: 10 },
            { diffTitle: "i7 10700K/16GB RAM/512GB SSD", price: 20000000, stock: 5 }
        ]
    },
    {
        name: "RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Corsair",
            description: "Corsair is a leading brand in high-performance PC components and peripherals."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "RAM",
            description: "High-quality RAM modules to enhance your computer's performance and multitasking capabilities."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "16GB (2x8GB) DDR4 3200MHz", price: 2000000, stock: 50 },
            { diffTitle: "32GB (2x16GB) DDR4 3200MHz", price: 3500000, stock: 30 }
        ]
    },
    {
        name: "RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Corsair",
            description: "Corsair is a leading brand in high-performance PC components and peripherals."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "RAM",
            description: "High-quality RAM modules to enhance your computer's performance and multitasking capabilities."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "16GB (2x8GB) DDR4 3200MHz", price: 2000000, stock: 50 },
            { diffTitle: "32GB (2x16GB) DDR4 3200MHz", price: 3500000, stock: 30 }
        ]
    },
    {
        name: "RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Corsair",
            description: "Corsair is a leading brand in high-performance PC components and peripherals."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "RAM",
            description: "High-quality RAM modules to enhance your computer's performance and multitasking capabilities."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "16GB (2x8GB) DDR4 3200MHz", price: 2000000, stock: 50 },
            { diffTitle: "32GB (2x16GB) DDR4 3200MHz", price: 3500000, stock: 30 }
        ]
    },
    {
        name: "Intel Core i5-12400F",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Intel",
            description: "Intel is a global leader in semiconductor manufacturing and technology innovation."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "CPU",
            description: "High-performance CPUs for gaming, productivity, and professional applications."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "6 Cores, 12 Threads, 2.5GHz Base, 4.4GHz Boost", price: 4000000, stock: 40 }
        ]
    },
    {
        name: "Intel Core i7-12700F",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Intel",
            description: "Intel is a global leader in semiconductor manufacturing and technology innovation."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "CPU",
            description: "High-performance CPUs for gaming, productivity, and professional applications."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "12 Cores, 20 Threads, 2.1GHz Base, 4.9GHz Boost", price: 6000000, stock: 25 }
        ]
    },
    {
        name: "Intel Core i9-12900K",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "Intel",
            description: "Intel is a global leader in semiconductor manufacturing and technology innovation."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "CPU",
            description: "High-performance CPUs for gaming, productivity, and professional applications."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "16 Cores, 24 Threads, 3.2GHz Base, 5.2GHz Boost", price: 9000000, stock: 15 }
        ]
    },
    {
        name: "NVIDIA GeForce RTX 3060",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "NVIDIA",
            description: "NVIDIA is a leading technology company known for its graphics processing units (GPUs) and AI solutions."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "VGA",
            description: "High-performance graphics cards for gaming, content creation, and professional applications."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "12GB GDDR6, PCIe 4.0", price: 8000000, stock: 30 }
        ]
    },
    {
        name: "NVIDIA GeForce RTX 5090",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "NVIDIA",
            description: "NVIDIA is a leading technology company known for its graphics processing units (GPUs) and AI solutions."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "VGA",
            description: "High-performance graphics cards for gaming, content creation, and professional applications."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "24GB GDDR6X, PCIe 5.0", price: 25000000, stock: 10 }
        ]
    },
    {
        name: "NVIDIA GeForce RTX 4070 Ti",
        brandId: {
            _id: new mongoose.Types.ObjectId(),
            name: "NVIDIA",
            description: "NVIDIA is a leading technology company known for its graphics processing units (GPUs) and AI solutions."
        },
        categoryId: {
            _id: new mongoose.Types.ObjectId(),
            name: "VGA",
            description: "High-performance graphics cards for gaming, content creation, and professional applications."
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        images: [
            "https://placehold.co/600x400?text=Product+Placeholder+1",
            "https://placehold.co/600x400?text=Product+Placeholder+2",
            "https://placehold.co/600x400?text=Product+Placeholder+3",
            "https://placehold.co/600x400?text=Product+Placeholder+4",
            "https://placehold.co/600x400?text=Product+Placeholder+5"
        ],
        variants: [
            { diffTitle: "12GB GDDR6X, PCIe 4.0", price: 12000000, stock: 20 }
        ]
    }
];

const slugCount = new Map<string, number>();

export const products = rawProducts.map(p => {
    let base = slugify(p.name);
    let final = base;
    if (slugCount.has(base)) {
        const n = slugCount.get(base)! + 1;
        slugCount.set(base, n);
        final = `${base}-${n}`;
    } else slugCount.set(base, 1);

    const variants = (p.variants || []).map(v => ({
        ...v,
        slug: slugify(v.diffTitle)
    }));

    return { ...p, slug: final, variants };
});

export const product = products[0];

export const categories = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "PC Gaming",
        description: "High-performance gaming PCs designed for immersive experiences and top-tier performance."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "PC Office",
        description: "Reliable and efficient office PCs tailored for productivity and everyday tasks."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "PC Mini",
        description: "Compact and versatile mini PCs that deliver performance in a small form factor."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Workstation",
        description: "High-performance workstations designed for professionals in need of powerful computing solutions."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "RAM",
        description: "High-quality RAM modules to enhance your computer's performance and multitasking capabilities."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "CPU",
        description: "High-performance CPUs for gaming, productivity, and professional applications."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "VGA",
        description: "High-performance graphics cards for gaming, content creation, and professional applications."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Mainboard",
        description: "Reliable and feature-rich motherboards to build a solid foundation for your PC."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Power Supply",
        description: "Reliable and efficient power supplies to ensure stable and continuous operation of your PC."
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Storage",
        description: "High-speed storage solutions including SSDs and HDDs for all your data needs."
    }
];

export const comments = [
    {
        userId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        content: "Great product! Highly recommend.",
        date: new Date('2023-10-01')
    },
    {
        userId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        content: "Good value for the price.",
        date: new Date('2023-10-05')
    },
    {
        userId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        content: "Performance could be better.",
        date: new Date('2023-10-10')
    },
    {
        userId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        content: "Exceeded my expectations!",
        date: new Date('2023-10-15')
    },
    {
        userId: new mongoose.Types.ObjectId(),
        productId: new mongoose.Types.ObjectId(),
        content: "Would buy again.",
        date: new Date('2023-10-20')
    }
]