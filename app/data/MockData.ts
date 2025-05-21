export const allRooms = [
    { id: 1, name: "Deluxe King Room", type: "Standard", capacity: 2, price: 199, status: "Available" as "Available" | "Occupied" | "Maintenance" },
    { id: 2, name: "Premium Suite", type: "Suite", capacity: 3, price: 299, status: "Available" as "Available" | "Occupied" | "Maintenance" },
    { id: 3, name: "Executive Suite", type: "Suite", capacity: 4, price: 349, status: "Occupied" as "Available" | "Occupied" | "Maintenance" },
    { id: 4, name: "Classic Double Room", type: "Standard", capacity: 2, price: 159, status: "Maintenance" as "Available" | "Occupied" | "Maintenance" },
    { id: 5, name: "Family Room", type: "Family", capacity: 4, price: 249, status: "Available" as "Available" | "Occupied" | "Maintenance" }
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
