import { Code, BarChart, Palette, Briefcase } from "react-bootstrap-icons";
export const categories = [
  { title: "IT & Software", icon: <Code size={40} />, color: "#E3F2FD" },
  { title: "Marketing", icon: <BarChart size={40} />, color: "#FFF3E0" },
  { title: "Design", icon: <Palette size={40} />, color: "#FCE4EC" },
  { title: "Business", icon: <Briefcase size={40} />, color: "#E8F5E9" },
];

export const companies = [
  { title: "Google", image: "/images/google.png" },
  { title: "Amazon", image: "/images/amazon.webp" },
  { title: "Reliance", image: "images/reliance.png" },
  { title: "TCS", image: "/images/tcs.png" },
  { title: "Uber", image: "/images/uber.png" },
  { title: "Salesforce", image: "/images/salesforce.png" },
  { title: "Microsoft", image: "/images/microsoft.png" },
];

export const fields = [
  "Finance",
  "Marketing",
  "IT & Software",
  "Business",
  "Human Resources",
  "Design",
];

export const experiences = ["Entry", "Mid", "Senior", "Manager"];

export const types = ["Part-time", "Full-time", "Internship"];

export const minSalaries = ["10000", "20000", "30000", "40000"];

export const maxSalaries = ["50000", "70000", "100000", "150000"];
