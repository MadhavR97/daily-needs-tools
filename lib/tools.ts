export type ToolCategory =
  | "Calculators"
  | "Text"
  | "Image"
  | "Time"
  | "Converters";

export interface ToolDef {
  slug: string;
  title: string;
  short: string;
  description: string;
  category: ToolCategory;
  icon: string;
  keywords: string[];
  faq: { q: string; a: string }[];
  howTo: string[];
}

export const CATEGORIES: ToolCategory[] = [
  "Calculators",
  "Text",
  "Image",
  "Time",
  "Converters",
];

export const TOOLS: ToolDef[] = [
  {
    slug: "age-calculator",
    title: "Age Calculator",
    short: "Exact age in years, months, days",
    description:
      "Free age calculator. Enter your birth date to get exact age in years, months, days, total days and next birthday countdown.",
    category: "Calculators",
    icon: "cake",
    keywords: ["age calculator", "how old am i", "date of birth calculator"],
    faq: [
      { q: "How is age calculated?", a: "We subtract your birth date from today, borrowing months and days like a calendar, so results match official documents." },
      { q: "Is this accurate for leap years?", a: "Yes. It uses real calendar math including Feb 29 leap years." },
    ],
    howTo: ["Pick your birth date", "Click Calculate", "See years, months, days + total days + next birthday"],
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    short: "X% of Y, increase, decrease",
    description: "Calculate percentages instantly: X% of Y, percentage increase / decrease, and what percent one number is of another.",
    category: "Calculators",
    icon: "percent",
    keywords: ["percentage calculator", "percent of", "percentage increase"],
    faq: [{ q: "How to find X% of Y?", a: "Multiply Y by X then divide by 100. Example: 20% of 150 = 150 × 0.20 = 30." }],
    howTo: ["Choose mode", "Enter numbers", "Get instant result"],
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    short: "Sale price + savings",
    description: "Calculate sale price and savings from discount percent. Perfect for shopping, sales and coupons.",
    category: "Calculators",
    icon: "tag",
    keywords: ["discount calculator", "sale price calculator"],
    faq: [{ q: "Formula?", a: "Sale price = Original × (1 - discount/100). Savings = Original - Sale price." }],
    howTo: ["Enter original price", "Enter discount %", "See final price + you save"],
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    short: "Body mass index + healthy range",
    description: "Calculate BMI from height and weight, see WHO category and healthy weight range.",
    category: "Calculators",
    icon: "heart",
    keywords: ["bmi calculator", "body mass index"],
    faq: [{ q: "What is healthy BMI?", a: "18.5–24.9 is considered healthy for most adults by WHO." }],
    howTo: ["Enter height + weight", "Calculate", "See BMI + category"],
  },
  {
    slug: "emi-calculator",
    title: "EMI / Loan Calculator",
    short: "Monthly payment + total interest",
    description: "Estimate monthly EMI, total interest and total payment for loans. For education only, not financial advice.",
    category: "Calculators",
    icon: "banknote",
    keywords: ["emi calculator", "loan calculator"],
    faq: [{ q: "EMI formula?", a: "EMI = P × r × (1+r)^n / ((1+r)^n - 1), where r is monthly rate and n is months." }],
    howTo: ["Enter amount, rate, years", "See EMI + totals"],
  },
  {
    slug: "word-counter",
    title: "Word Counter",
    short: "Words, characters, reading time",
    description: "Free word counter: count words, characters, sentences, paragraphs and reading time as you type. 100% private in browser.",
    category: "Text",
    icon: "type",
    keywords: ["word counter", "character counter"],
    faq: [{ q: "Is my text uploaded?", a: "No. Everything runs locally in your browser." }],
    howTo: ["Paste or type text", "See live counts"],
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    short: "UPPER, lower, Title, Sentence",
    description: "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, alternating and inverse case instantly.",
    category: "Text",
    icon: "case",
    keywords: ["case converter", "upper to lower"],
    faq: [{ q: "Does it keep formatting?", a: "Line breaks are preserved. HTML is treated as plain text." }],
    howTo: ["Paste text", "Pick a case", "Copy result"],
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    short: "Strong random passwords offline",
    description: "Generate strong random passwords with length, symbols, numbers control. Runs offline with crypto-secure randomness.",
    category: "Text",
    icon: "key",
    keywords: ["password generator", "strong password"],
    faq: [{ q: "Are passwords stored?", a: "Never. Generated locally with crypto.getRandomValues and never sent anywhere." }],
    howTo: ["Choose length + options", "Generate", "Copy"],
  },
  {
    slug: "qr-generator",
    title: "QR Code Generator",
    short: "Text / URL / WiFi to QR",
    description: "Create QR codes for URLs, text, WiFi, email free. Download as PNG. No signup.",
    category: "Text",
    icon: "qr",
    keywords: ["qr generator", "qr code maker"],
    faq: [{ q: "Can I download?", a: "Yes, PNG download in one click." }],
    howTo: ["Enter text/URL", "Pick size", "Download PNG"],
  },
  {
    slug: "countdown-timer",
    title: "Countdown Timer",
    short: "Countdown + stopwatch",
    description: "Simple countdown timer and stopwatch that runs in your browser tab. Great for study, workouts, cooking.",
    category: "Time",
    icon: "timer",
    keywords: ["countdown timer", "online stopwatch"],
    faq: [{ q: "Does it work in background?", a: "Yes with sound alert when finished, best when tab stays open." }],
    howTo: ["Set minutes/seconds", "Start / Pause / Reset"],
  },
  {
    slug: "image-resizer-compressor",
    title: "Image Resizer + Compressor",
    short: "Resize, compress to KB, convert",
    description: "Free image resizer and compressor: resize by pixels/%, compress to target KB, convert JPG PNG WebP. 100% private in browser.",
    category: "Image",
    icon: "image",
    keywords: ["image compressor", "image resizer", "compress image to 100kb", "jpg to webp"],
    faq: [
      { q: "Are images uploaded?", a: "No. All processing uses Canvas API locally. Your photos never leave your device." },
      { q: "Can I target 100KB?", a: "Yes. Set target KB and quality auto-adjusts to meet it when possible." },
    ],
    howTo: ["Upload image", "Set width / quality / target KB / format", "Preview + Download"],
  },
  {
    slug: "unit-converter",
    title: "Unit Converter",
    short: "Length, weight, temp + more",
    description: "Convert length, weight, temperature, speed and data units instantly with accurate formulas.",
    category: "Converters",
    icon: "ruler",
    keywords: ["unit converter", "cm to inch", "kg to lbs", "c to f"],
    faq: [{ q: "Which units supported?", a: "Length, weight, temperature, speed, data size in v1. More soon." }],
    howTo: ["Pick category", "Enter value", "See all conversions"],
  },
];

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug);
}
