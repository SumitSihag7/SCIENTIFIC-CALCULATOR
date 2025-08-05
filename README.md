# 🔬 Scientific Calculator

A modern, feature-rich scientific calculator built with vanilla HTML, CSS, and JavaScript. This calculator provides advanced mathematical functions with a beautiful glassmorphism UI design and comprehensive functionality.

![Calculator Preview](https://img.shields.io/badge/Status-Complete-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🧮 Mathematical Operations

-   **Basic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (/)
-   **Advanced Operations**: Exponentiation (x^y), Modulo (%), Parentheses support
-   **Expression Evaluation**: Follows BODMAS/PEMDAS order of operations

### 📐 Scientific Functions

-   **Trigonometric Functions**: sin, cos, tan, asin, acos, atan
-   **Logarithmic Functions**: log (base 10), ln (natural logarithm)
-   **Exponential Functions**: e^x, x², √x, ∛x
-   **Special Functions**: n! (factorial), 1/x (reciprocal)
-   **Mathematical Constants**: π (Pi), e (Euler's number)

### 🎨 User Interface

-   **Modern Design**: Glassmorphism UI with gradient backgrounds
-   **Responsive Layout**: Adapts to desktop, tablet, and mobile screens
-   **Interactive Animations**: Button press effects and hover animations
-   **Error Handling**: Visual feedback for invalid operations
-   **Dual Display**: Shows current input and previous operations

### ⌨️ Input Methods

-   **Mouse/Touch**: Click buttons for input
-   **Keyboard Support**: Full keyboard navigation
    -   Numbers: `0-9`
    -   Operations: `+`, `-`, `*`, `/`, `%`
    -   Functions: `Enter`/`=` (calculate), `Escape` (clear), `Backspace` (delete)
    -   Parentheses: `(`, `)`

### 🔧 Technical Features

-   **Memory Functions**: Store, recall, add, subtract operations
-   **Angle Mode**: Degree mode for trigonometric functions
-   **Precision Handling**: Automatic scientific notation for large numbers
-   **Error Prevention**: Division by zero protection, domain validation

## 🚀 Getting Started

### Prerequisites

-   Any modern web browser (Chrome, Firefox, Safari, Edge)
-   No additional dependencies required

### Installation

1. Clone or download the repository
2. Open `calci.html` in your web browser
3. Start calculating!

```bash
# Clone the repository (if using Git)
git clone https://github.com/SumitSihag7/SCIENTIFIC-CALCULATOR.git

# Navigate to the project directory
cd SCIENTIFIC-CALCULATOR

# Open in browser
open calci.html
```

## 📱 Responsive Design

The calculator automatically adapts to different screen sizes:

| Screen Size         | Layout           | Grid Columns |
| ------------------- | ---------------- | ------------ |
| Desktop (>1100px)   | Full layout      | 8 columns    |
| Tablet (768-1100px) | Compact layout   | 6 columns    |
| Mobile (<768px)     | Mobile-optimized | 4 columns    |

## 🎯 Usage Examples

### Basic Calculations

```
5 + 3 = 8
10 - 4 = 6
6 × 7 = 42
15 ÷ 3 = 5
```

### Scientific Functions

```
sin(30°) = 0.5
log(100) = 2
√16 = 4
5! = 120
2^3 = 8
```

### Complex Expressions

```
(5 + 3) × 2^2 = 32
sin(45°) + cos(45°) = 1.414...
```

## 🏗️ Project Structure

```
SciCalci/
├── calci.html          # Main HTML file
├── calciScript.js      # JavaScript logic and functionality
├── calciStyle.css      # Styling and responsive design
└── README.md          # Project documentation
```

## 🔍 Code Architecture

### ScientificCalculator Class

The core functionality is encapsulated in a JavaScript class with methods for:

-   `appendNumber()`: Handle number input
-   `chooseOperation()`: Process operator selection
-   `evaluateExpression()`: Parse and calculate expressions
-   `evaluateFunction()`: Execute scientific functions
-   `updateDisplay()`: Refresh the calculator display

### Key Features Implementation

-   **BODMAS Evaluation**: Custom expression parser following mathematical precedence
-   **Error Handling**: Comprehensive validation and user-friendly error messages
-   **Memory Management**: State management for continuous calculations
-   **Responsive Grid**: CSS Grid layout with media queries

## 🎨 Design Philosophy

-   **Glassmorphism**: Modern UI trend with translucent elements
-   **Accessibility**: High contrast colors and readable typography
-   **User Experience**: Intuitive button layout following calculator conventions
-   **Performance**: Vanilla JavaScript for fast, lightweight operation

## 🔧 Customization

### Adding New Functions

1. Add the function to the `evaluateFunction()` method in `calciScript.js`
2. Create a button in `calci.html`
3. Style the button in `calciStyle.css`

### Modifying Colors

Update the CSS variables in `calciStyle.css`:

```css
.btn.scientific {
    background: linear-gradient(145deg, #your-color, #your-darker-color);
}
```

## 🐛 Known Limitations

-   Trigonometric functions operate in degrees by default
-   Large number precision limited by JavaScript's Number type
-   Complex number operations not supported
-   No calculation history storage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Sumit Sihag**

-   GitHub: [@SumitSihag7](https://github.com/SumitSihag7)

---

⭐ **Star this repository if you found it helpful!**

## 📊 Browser Support

| Browser | Version | Status             |
| ------- | ------- | ------------------ |
| Chrome  | 60+     | ✅ Fully Supported |
| Firefox | 55+     | ✅ Fully Supported |
| Safari  | 12+     | ✅ Fully Supported |
| Edge    | 79+     | ✅ Fully Supported |

## 🚀 Future Enhancements

-   [ ] Add radian/degree mode toggle
-   [ ] Implement calculation history
-   [ ] Add more advanced functions (hyperbolic, statistical)
-   [ ] Dark/Light theme toggle
-   [ ] Keyboard shortcut customization
-   [ ] Export calculation results
