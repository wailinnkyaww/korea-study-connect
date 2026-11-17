export interface University {
  id: string;
  name: string;
  location: string;
  description: string;
  programs: ("D-2" | "D-4")[];
  image: string;
  tuition: string;
}

export interface Agency {
  id: string;
  name: string;
  location: string;
  description: string;
  universities: string[];
  image: string;
}

export const universities: University[] = [
  {
    id: "u1",
    name: "Hanyang University",
    location: "Seoul, South Korea",
    description:
      "A leading university known for engineering, technology and research.",
    programs: ["D-2", "D-4"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    tuition: "Check official tuition",
  },
  {
    id: "u2",
    name: "Kyung Hee University",
    location: "Seoul, South Korea",
    description:
      "Known for its beautiful campus and diverse academic programs.",
    programs: ["D-2", "D-4"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    tuition: "Check official tuition",
  },
  {
    id: "u3",
    name: "Sejong University",
    location: "Seoul, South Korea",
    description:
      "Offers a range of academic opportunities and international programs.",
    programs: ["D-2"],
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
    tuition: "Check official tuition",
  },
  {
    id: "u4",
    name: "Pusan National University",
    location: "Busan, South Korea",
    description: "A major national university located in the city of Busan.",
    programs: ["D-2", "D-4"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    tuition: "Check official tuition",
  },
];

export const agencies: Agency[] = [
  {
    id: "a1",
    name: "Seoul Bridge Education",
    location: "Yangon, Myanmar",
    description: "Education consulting and study-abroad guidance.",
    universities: ["u1", "u2"],
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
  },
  {
    id: "a2",
    name: "K-Path Myanmar",
    location: "Yangon, Myanmar",
    description: "Korean university application guidance.",
    universities: ["u2", "u3"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
  },
  {
    id: "a3",
    name: "Global Education Center",
    location: "Mandalay, Myanmar",
    description: "International education consulting services.",
    universities: ["u1", "u4"],
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
  },
];
