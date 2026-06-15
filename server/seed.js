const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Event = require("./models/events");
const Booking = require("./models/bookings");

dotenv.config();


const users = [
  {
    name: "Soham Roy",
    email: "sohamroy@gmail.com",
    password: "Soham@123",
    role: "admin",
  },
  {
    name: "Subhajit Das",
    email: "subhajit@gmail.com",
    password: "Subhajit@123",
    role: "user",
  },
  {
    name: "Ananya Ghosh",
    email: "ananya@gmail.com",
    password: "Ananya@123",
    role: "user",
  },
  {
    name: "Sayan Chakraborty",
    email: "sayan@gmail.com",
    password: "Sayan@123",
    role: "user",
  },
  {
    name: "Riya Banerjee",
    email: "riya@gmail.com",
    password: "Riya@123",
    role: "user",
  },
  {
    name: "Arindam Paul",
    email: "arindam@gmail.com",
    password: "Arindam@123",
    role: "user",
  },
  {
    name: "Moumita Dey",
    email: "moumita@gmail.com",
    password: "Moumita@123",
    role: "user",
  },
  {
    name: "Debopriyo Sen",
    email: "debopriyo@gmail.com",
    password: "Debopriyo@123",
    role: "user",
  },
  {
    name: "Priyanka Mitra",
    email: "priyanka@gmail.com",
    password: "Priyanka@123",
    role: "user",
  },
  {
    name: "Rahul Mondal",
    email: "rahul@gmail.com",
    password: "Rahul@123",
    role: "user",
  },
];

const events = [
  {
    title: "CampusHack 2026",
    description:
      "24-hour hackathon focused on AI, Web Development and Problem Solving.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    location: "Brainware University Main Campus",
    category: "Hackathon",
    totalSeats: 300,
    ticketPrice: 0,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },

  {
    title: "AI for Modern Applications Workshop",
    description:
      "Hands-on workshop covering Generative AI and Prompt Engineering.",
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    location: "Seminar Hall A",
    category: "Technology",
    totalSeats: 200,
    ticketPrice: 100,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },

  {
    title: "National Conference on AI & Emerging Technologies",
    description:
      "Research conference discussing AI, Quantum Computing and Innovation.",
    date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    location: "University Auditorium",
    category: "Conference",
    totalSeats: 400,
    ticketPrice: 300,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
  },

  {
    title: "Startup Pitch Fest 2026",
    description: "Students pitch startup ideas before investors.",
    date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    location: "Innovation & Incubation Center",
    category: "Entrepreneurship",
    totalSeats: 150,
    ticketPrice: 50,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  },

  {
    title: "Cyber Security Awareness Summit",
    description: "Learn ethical hacking and modern security practices.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    location: "Computer Science Block",
    category: "Technology",
    totalSeats: 250,
    ticketPrice: 0,
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87",
  },

  {
    title: "Anandadhara Cultural Fest 2026",
    description: "Music, dance, drama and cultural competitions.",
    date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    location: "University Ground",
    category: "Fest",
    totalSeats: 1000,
    ticketPrice: 200,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  },

  {
    title: "TechX Project Exhibition",
    description: "Students showcase AI, IoT and Robotics projects.",
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    location: "Engineering Building",
    category: "Technology",
    totalSeats: 350,
    ticketPrice: 0,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
  },

  {
    title: "Industry Connect Placement Seminar",
    description: "Industry experts discuss placements and career growth.",
    date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    location: "Placement Cell Auditorium",
    category: "Career",
    totalSeats: 300,
    ticketPrice: 0,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },
];


// Seed the database
const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/campushub",
    );
    console.log("\n✅ MongoDB connection open...");

    await User.deleteMany();
    await Event.deleteMany();
    await Booking.deleteMany();
    console.log("🗑️  Cleared existing data.");

    // Hash user passwords
    const salt = await bcrypt.genSalt(10);
    const hashedUsers = users.map((u) => ({
      ...u,
      password: bcrypt.hashSync(u.password, salt),
      isVerified: true,
    }));

    const createdUsers = await User.insertMany(hashedUsers);
    const adminUser = createdUsers.find((u) => u.role === "admin");
    const normalUsers = createdUsers.filter((u) => u.role === "user");
    console.log(`👤 Created ${createdUsers.length} total dummy users.`);

    // Link events to admin
    const eventsWithAdmin = events.map((e) => ({
      ...e,
      availableSeats: e.totalSeats,
      createdBy: adminUser._id,
    }));

    const createdEvents = await Event.insertMany(eventsWithAdmin);
    console.log(
      `🎉 Created ${createdEvents.length} distinct events with Unsplash images.`,
    );

    // Generate Bookings Data
    const bookingsData = [];

    for (const event of createdEvents) {
      // Assign 3-6 random users to each event
      const randomCount = Math.floor(Math.random() * 4) + 3;
      // Shuffle and pick random users
      const shuffledUsers = [...normalUsers].sort(() => 0.5 - Math.random());
      const selectedUsers = shuffledUsers.slice(0, randomCount);

      for (const user of selectedUsers) {
        // Randomize statuses
        const statuses = ["pending", "confirmed", "cancelled"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        let paymentStatus = "not_paid";
        if (status === "confirmed" && event.ticketPrice > 0) {
          // Usually confirmed tickets are marked paid (90% of the time)
          paymentStatus = Math.random() > 0.1 ? "paid" : "not_paid";
        } else if (event.ticketPrice === 0) {
          paymentStatus = "paid";
        }

        bookingsData.push({
          userId: user._id,
          eventId: event._id,
          status: status,
          paymentStatus: paymentStatus,
          amount: event.ticketPrice,
        });

        // Deduct available seats specifically for confirmed tickets!
        if (status === "confirmed") {
          event.availableSeats -= 1;
          await event.save();
        }
      }
    }

    // Insert bookings data
    await Booking.insertMany(bookingsData);
    console.log(
      `🎫 Inserted ${bookingsData.length} randomized dummy bookings (confirmed, pending, cancelled, paid, not_paid).`,
    );

    console.log("\n🚀 Database seeded successfully!");
    console.log("-------------------------------------------");
    console.log("Admin Email: admin@campushub.com");
    console.log("User Email:  user@campushub.com");
    console.log("Password for all users: password123");
    console.log("-------------------------------------------\n");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedDatabase();
