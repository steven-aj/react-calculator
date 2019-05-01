const input = {
    is: {
        numerical: function(value) {
            return ( !isNaN(parseInt(value)) ) || (value === '.')
        },

        modifier: function(value) { 
            return (value === 'AC') || (value === 'Escape') || (value === 'c') || (value === '+/-') || (value === 'n') || (value === '%') || (value === 'Backspace');
        },

        operation: function(value) {
            return (value === '+') || (value === '-') || (value === '=') || (value === 'Enter') || (value === "x") || (value === "*") || (value === '÷') || (value === '/');
        }
    }
}

export default input;