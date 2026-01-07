document.addEventListener("DOMContentLoaded", function () {

    const fileInput = document.getElementById("file-upload");
    const resultText = document.getElementById("result");
    const analyzeBtn = document.getElementById("analyze-btn");

    if (!fileInput || !analyzeBtn) {
        console.log("inputs not found");
        return;
    }

    analyzeBtn.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", function (event) {

        const file = event.target.files[0];
        if (!file) return;

        resultText.innerHTML = "AI Processing...";

        const formData = new FormData();
        formData.append("image", file);

        fetch("/api/predict", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error("Server Error");
            return response.json();
        })
        .then(data => {

            const confidence = (data.confidence * 100).toFixed(2);

            resultText.innerHTML =
                "Result: <strong>" + data.result + "</strong><br>" +
                "Confidence: " + confidence + "%";
        })
        .catch(error => {
            console.error("Fetch Error:", error);

            resultText.innerHTML =
                "<span style='color:red'>" +
                "Analysis Failed. Ensure Backend is running." +
                "</span>";
        });

    });

});
