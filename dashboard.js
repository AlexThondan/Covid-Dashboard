let csvData = [];

window.onload = function () {
    Papa.parse('COVID19_India_Updated_Deaths.csv', {
        download: true,
        header: true,
        complete: function (results) {
            csvData = results.data;
            console.log("CSV Data Loaded:", csvData);
            showChart('state');
        },
        error: function (err) {
            console.error("CSV Loading Error:", err);
        }
    });
};

let chartInstance;

function showChart(type) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    if (chartInstance) {
        chartInstance.destroy();
    }

    let labels = [];
    let data = [];

    switch (type) {
        case 'state':
            const stateCount = csvData.reduce((acc, row) => {
                const state = row.State.trim();
                acc[state] = (acc[state] || 0) + 1;
                return acc;
            }, {});
            labels = Object.keys(stateCount);
            data = Object.values(stateCount);
            break;

        case 'age':
            const ageCount = csvData.reduce((acc, row) => {
                const age = row.Age.trim() || 'Unknown';
                acc[age] = (acc[age] || 0) + 1;
                return acc;
            }, {});
            labels = Object.keys(ageCount);
            data = Object.values(ageCount);
            break;

        case 'gender':
            const genderCount = csvData.reduce((acc, row) => {
                const gender = row.Gender.trim() || 'Unknown';
                acc[gender] = (acc[gender] || 0) + 1;
                return acc;
            }, {});
            labels = Object.keys(genderCount);
            data = Object.values(genderCount);
            break;
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `${type.charAt(0).toUpperCase() + type.slice(1)}-wise Distribution`,
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true }
            },
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            }
        }
    });
}
