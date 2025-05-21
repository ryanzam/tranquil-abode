export const allRooms = [
    {
        id: 1,
        name: "Deluxe King Room",
        image: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 99,
        capacity: 2,
        beds: 1,
        size: 32,
        featured: true,
        facilities: ["Free WiFi", "Breakfast", "Smart TV"]
    },
    {
        id: 2,
        name: "Premium Suite",
        image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 199,
        capacity: 3,
        beds: 2,
        size: 45,
        featured: true,
        facilities: ["Free WiFi", "Breakfast", "Smart TV", "Balcony"]
    },
    {
        id: 3,
        name: "Executive Suite",
        image: "https://images.unsplash.com/photo-1594560913095-8cf34bab82ad?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 250,
        capacity: 4,
        beds: 2,
        size: 52,
        featured: true,
        facilities: ["Free WiFi", "Breakfast", "Smart TV", "City View"]
    },
    {
        id: 4,
        name: "Classic Double Room",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 159,
        capacity: 2,
        beds: 1,
        size: 28,
        facilities: ["Free WiFi", "Smart TV"]
    },
    {
        id: 5,
        name: "Family Room",
        image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 249,
        capacity: 4,
        beds: 2,
        size: 40,
        facilities: ["Free WiFi", "Breakfast", "Smart TV"]
    },
    {
        id: 6,
        name: "Penthouse Suite",
        image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
        price: 299,
        capacity: 4,
        beds: 2,
        size: 85,
        facilities: ["Free WiFi", "Breakfast", "Smart TV", "Terrace"]
    }
];

export const facilitiesOptions = [
    "Free WiFi",
    "Breakfast",
    "Smart TV",
    "Balcony",
    "City View",
    "Terrace",
];

export const bookings = [
    {
        id: "BK-24051901",
        guest: "John Doe",
        room: "Deluxe King Room",
        checkIn: "2024-05-22",
        checkOut: "2024-05-25",
        status: "Confirmed" as "Confirmed" | "Pending" | "Cancelled",
        amount: 99
    },
    {
        id: "BK-24051902",
        guest: "Jane Smith",
        room: "Premium Suite",
        checkIn: "2024-05-23",
        checkOut: "2024-05-26",
        status: "Confirmed" as "Confirmed" | "Pending" | "Cancelled",
        amount: 199
    },
    {
        id: "BK-24051903",
        guest: "Robert Johnson",
        room: "Executive Suite",
        checkIn: "2024-06-10",
        checkOut: "2024-06-15",
        status: "Pending" as "Confirmed" | "Pending" | "Cancelled",
        amount: 250
    },
    {
        id: "BK-24051904",
        guest: "Emily Brown",
        room: "Family Room",
        checkIn: "2024-05-28",
        checkOut: "2024-06-01",
        status: "Confirmed" as "Confirmed" | "Pending" | "Cancelled",
        amount: 299
    }
];
