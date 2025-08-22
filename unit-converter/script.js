// Unit definitions
const units = {
    length: {
        meter: { name: 'Meter', factor: 1 },
        kilometer: { name: 'Kilometer', factor: 1000 },
        centimeter: { name: 'Centimeter', factor: 0.01 },
        millimeter: { name: 'Millimeter', factor: 0.001 },
        mile: { name: 'Mile', factor: 1609.34 },
        yard: { name: 'Yard', factor: 0.9144 },
        foot: { name: 'Foot', factor: 0.3048 },
        inch: { name: 'Inch', factor: 0.0254 }
    },
    temperature: {
        celsius: { name: 'Celsius', isTemperature: true },
        fahrenheit: { name: 'Fahrenheit', isTemperature: true },
        kelvin: { name: 'Kelvin', isTemperature: true }
    },
    weight: {
        gram: { name: 'Gram', factor: 1 },
        kilogram: { name: 'Kilogram', factor: 1000 },
        milligram: { name: 'Milligram', factor: 0.001 },
        pound: { name: 'Pound', factor: 453.592 },
        ounce: { name: 'Ounce', factor: 28.3495 },
        ton: { name: 'Ton', factor: 1000000 }
    },
    area: {
        squareMeter: { name: 'Square Meter', factor: 1 },
        squareKilometer: { name: 'Square Kilometer', factor: 1000000 },
        squareMile: { name: 'Square Mile', factor: 2589988.11 },
        acre: { name: 'Acre', factor: 4046.86 },
        hectare: { name: 'Hectare', factor: 10000 },
        squareFoot: { name: 'Square Foot', factor: 0.092903 }
    },
    volume: {
        liter: { name: 'Liter', factor: 1 },
        milliliter: { name: 'Milliliter', factor: 0.001 },
        gallon: { name: 'Gallon', factor: 3.78541 },
        quart: { name: 'Quart', factor: 0.946353 },
        pint: { name: 'Pint', factor: 0.473176 },
        cup: { name: 'Cup', factor: 0.24 }
    },
    time: {
        second: { name: 'Second', factor: 1 },
        minute: { name: 'Minute', factor: 60 },
        hour: { name: 'Hour', factor: 3600 },
        day: { name: 'Day', factor: 86400 },
        week: { name: 'Week', factor: 604800 },
        month: { name: 'Month', factor: 2592000 },
        year: { name: 'Year', factor: 31536000 }
    }
};

// Initialize the unit dropdowns
function updateUnits() {
    const category = document.getElementById('category').value;
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    
    // Clear existing options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    
    // Add new options
    Object.entries(units[category]).forEach(([key, unit]) => {
        const option1 = document.createElement('option');
        option1.value = key;
        option1.textContent = unit.name;
        fromUnitSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = key;
        option2.textContent = unit.name;
        toUnitSelect.appendChild(option2);
    });
    
    // Set default selections
    const unitKeys = Object.keys(units[category]);
    if (unitKeys.length >= 2) {
        fromUnitSelect.value = unitKeys[0];
        toUnitSelect.value = unitKeys[1];
    }
}

// Temperature conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function fahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5/9 + 273.15;
}

function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

// Main conversion function
function convert() {
    const category = document.getElementById('category').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const inputValue = parseFloat(document.getElementById('fromValue').value);
    const resultElement = document.getElementById('resultValue');
    
    if (isNaN(inputValue)) {
        resultElement.textContent = 'Please enter a valid number';
        resultElement.style.color = '#dc3545';
        return;
    }
    
    let result;
    
    if (category === 'temperature') {
        // Handle temperature conversions
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            result = celsiusToFahrenheit(inputValue);
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            result = fahrenheitToCelsius(inputValue);
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
            result = celsiusToKelvin(inputValue);
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
            result = kelvinToCelsius(inputValue);
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
            result = fahrenheitToKelvin(inputValue);
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
            result = kelvinToFahrenheit(inputValue);
        } else {
            result = inputValue; // Same unit
        }
    } else {
        // Handle regular unit conversions
        const fromFactor = units[category][fromUnit].factor;
        const toFactor = units[category][toUnit].factor;
        result = (inputValue * fromFactor) / toFactor;
    }
    
    // Format the result
    resultElement.textContent = result.toFixed(6).replace(/\.?0+$/, '');
    resultElement.style.color = '#28a745';
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateUnits();
    
    // Add event listeners for real-time conversion
    document.getElementById('fromValue').addEventListener('input', convert);
    document.getElementById('fromUnit').addEventListener('change', convert);
    document.getElementById('toUnit').addEventListener('change', convert);
    document.getElementById('category').addEventListener('change', function() {
        updateUnits();
        convert();
    });
});
