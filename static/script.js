document.addEventListener("DOMContentLoaded", function () {

    const fileInput = document.getElementById("file-upload");
    const fileNameDisplay = document.getElementById("file-name");
    const resultText = document.getElementById("result");
    const historyList = document.getElementById("history-list");
    const analyzeBtn = document.getElementById("analyze-btn");

    // counter animation
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;

        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // fake history generator
    const generateFakeHistory = () => {
        const statuses = ['Parasitized', 'Uninfected'];
        let html = '';

        for (let i = 1; i <= 6; i++) {
            const id = `PID-${Math.floor(Math.random() * 9000) + 1000}`;
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const conf = (Math.random() * (99 - 85) + 85).toFixed(2);
            const cssClass = status === 'Parasitized'
                ? 'status-infected'
                : 'status-clean';

            html += `
            <li class="history-item" onclick="loadFakeResult('${id}','${status}','${conf}')">
                <span class="history-id">${id}</span>
                <span class="history-status ${cssClass}">${status}</span>
            </li>`;
        }

        historyList.innerHTML = html;
    };

    window.loadFakeResult = function (id, status, conf) {
        const icon = status === "Parasitized"
            ? '<i class="fa-solid fa-triangle-exclamation"></i>'
            : '<i class="fa-solid fa-check-circle"></i>';

        resultText.innerHTML = `
            <div style="animation: fadeInUp 0.5s ease;">
                ${icon} Diagnosis: <strong>${status}</strong>
                <br>
                <span>Confidence: ${conf}%</span>
            </div>
        `;
    };

    generateFakeHistory();

    // open chooser on button
    analyzeBtn.addEventListener("click", () => {
        fileInput.click();
    });

    // real upload
    fileInput.addEventListener("change", function (event) {

        const file = event.target.files[0];
        if (!file) return;

        fileNameDisplay.textContent =
            `Analyzing: ${file.name}`;

        resultText.innerHTML =
            'AI Processing...';

        const formData = new FormData();
        formData.append("image", file);

        // MAIN ENDPOINT FOR VERCEL
        fetch("/api/predict", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Server Error");
            return response.json();
        })
        .then(data => {

            if (data.error)
                throw new Error(data.error);

            const confidence =
                (data.confidence * 100).toFixed(2);

            resultText.innerHTML = `
                <div style="animation: fadeInUp 0.5s ease;">
                    Result: <strong>${data.result}</strong>
                    <br>
                    <span>Confidence: ${confidence}%</span>
                </div>
            `;
        })
        .catch(error => {

            console.error("Fetch Error:", error);

            resultText.innerHTML =
                `<span style="color:red">
                    Analysis Failed. Ensure Backend is running.
                </span>`;
        });

    });

});
