export const categories = [
  { label: "Career", color: "#f77171" },
  { label: "Controversial", color: "#f6996a" },
  { label: "Creative", color: "#f5c564" },
  { label: "Curiosity", color: "#f3f35c" },
  { label: "Ethical", color: "#bbf255" },
  { label: "Fun", color: "#81f04e" },
  { label: "Hypothetical", color: "#47ef4a" },
  { label: "Knowledge-based", color: "#40ee7d" },
  { label: "Open-ended", color: "#39ecb3" },
  { label: "Opinion-based", color: "#34e8eb" },
  { label: "Personal", color: "#2da5ea" },
  { label: "Philosophical", color: "#2660e8" },
  { label: "Relationship", color: "#2620e7" },
  { label: "Reflective", color: "#6419e6" },
];

export const types = [
  "What",
  "Do",
  "Where",
  "When",
  "How",
  "Who",
  "Which",
  "Should",
  "Would",
  "Are",
  "Why",
  "Have",
  "Siri",
  "Alexa",
  "If",
];

export const specials = ["Siri", "Alexa", "Would You Rather", "Icebreaker"];

export const getCategoryColor = (category: string) => {
  const filtered = categories.filter((cat) => cat.label == category)[0];
  if (filtered) {
    return filtered.color;
  }
  return `NO COLOR FOUND FOR ${category}.`;
};

export const questions = [];
