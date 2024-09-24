// client/src/App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [inputs, setInputs] = useState(Array(6).fill(''));
    const [error, setError] = useState('');
    
    const handleInputChange = (index, value) => {
        if (value.match(/^\d?$/)) {
            const newInputs = [...inputs];
            newInputs[index] = value;
            setInputs(newInputs);
            if (value && index < 5) {
                document.getElementById(`input-${index + 1}`).focus();
            }
            setError('');
        } else {
            setError('Invalid input');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = inputs.join('');
        
        if (inputs.some(input => input === '') || inputs.some(input => isNaN(input))) {
            setError('Please fill all digits correctly');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            if (!response.ok) {
                throw new Error('Verification Error');
            }

            const result = await response.json();
            alert(result.message); // Redirect logic here
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="App">
            <h1>Verification Code</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {inputs.map((input, index) => (
                        <input
                            key={index}
                            id={`input-${index}`}
                            type="text"
                            maxLength="1"
                            value={input}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            className={error ? 'error' : ''}
                        />
                    ))}
                </div>
                <button type="submit">Submit</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default App;
