document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertBtn = document.getElementById('convert-btn');
    const resultDiv = document.getElementById('result');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            populateCurrencyDropdowns(currencies);
        })
        .catch(error => console.error('Error fetching exchange rates:', error));

    function populateCurrencyDropdowns(currencies) {
        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrency.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrency.appendChild(optionTo);
        });
    }

    convertBtn.addEventListener('click', () => {
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === '' || isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        convertCurrency(amount, from, to);
    });

    function convertCurrency(amount, from, to) {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const rateFrom = data.rates[from];
                const rateTo = data.rates[to];
                const convertedAmount = (amount / rateFrom) * rateTo;
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
            })
            .catch(error => console.error('Error converting currency:', error));
    }
});
