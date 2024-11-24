document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const suggestionsBox = document.getElementById("suggestions");
    const seriesDetails = document.getElementById("series-details");

    fetch("./data/series.json")
        .then(response => response.json())
        .then(data => {
            searchInput.addEventListener("input", (event) => {
                const query = event.target.value.toLowerCase();
                suggestionsBox.innerHTML = "";

                if (query) {
                    const matches = data.filter(series =>
                        series.name.toLowerCase().includes(query)
                    );

                    matches.forEach(series => {
                        const div = document.createElement("div");
                        div.textContent = series.name;
                        div.addEventListener("click", () => {
                            displaySeriesDetails(series);
                        });
                        suggestionsBox.appendChild(div);
                    });
                }
            });
        });

    function displaySeriesDetails(series) {
        seriesDetails.innerHTML = `
            <button class="close-btn" onclick="closeDetails()">✖</button>
            <img src="./images/${series.image}" alt="${series.name}">
            <h2>${series.name}</h2>
            <p>${series.description}</p>
            <div class="ratings-grid">
                ${series.ratings.map((rating, index) => `
                    <div class="rating-box" style="background-color: ${getRatingColor(rating)}">
                        <span>Season ${index + 1}</span>
                        <span>${rating}</span>
                    </div>
                `).join("")}
            </div>
        `;
        seriesDetails.classList.remove("hidden");
    }

    function closeDetails() {
        seriesDetails.classList.add("hidden");
    }

    function getRatingColor(rating) {
        if (rating >= 9) return "#4CAF50";
        if (rating >= 8) return "#FFC107";
        if (rating >= 7) return "#FF9800";
        return "#F44336";
    }
});
