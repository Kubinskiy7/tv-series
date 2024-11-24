document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const suggestionsBox = document.getElementById("suggestions");
    const seriesList = document.getElementById("series-list");
    const seriesDetails = document.getElementById("series-details");
    const homePage = document.getElementById("home-page");
    const backButton = document.getElementById("back-button");
    const seriesInfo = document.getElementById("series-info");

    let seriesData = [];

    // Загрузка данных
    fetch("./data/series.json")
        .then(response => response.json())
        .then(data => {
            seriesData = data;
            displaySeriesList();
        });

    function displaySeriesList() {
        seriesList.innerHTML = "";
        seriesData.forEach(series => {
            const card = document.createElement("div");
            card.className = "series-card";
            card.innerHTML = `
                <img src="./images/${series.image}" alt="${series.name}">
                <h3>${series.name}</h3>
            `;
            card.addEventListener("click", () => openSeriesPage(series));
            seriesList.appendChild(card);
        });
    }

    function openSeriesPage(series) {
        homePage.classList.add("hidden");
        seriesDetails.classList.remove("hidden");
        seriesInfo.innerHTML = `
            <h2>${series.name}</h2>
            <img src="./images/${series.image}" alt="${series.name}">
            <table class="ratings-table">
                <thead>
                    <tr>
                        <th>Эпизод</th>
                        <th>Рейтинг</th>
                    </tr>
                </thead>
                <tbody>
                    ${series.episodes.map((rating, index) => `
                        <tr>
                            <td>Эпизод ${index + 1}</td>
                            <td>${rating}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }

    backButton.addEventListener("click", () => {
        homePage.classList.remove("hidden");
        seriesDetails.classList.add("hidden");
    });

    // Умный поиск
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestionsBox.innerHTML = "";
        if (query) {
            const matches = seriesData.filter(series =>
                series.name.toLowerCase().startsWith(query)
            );
            matches.forEach(series => {
                const div = document.createElement("div");
                div.textContent = series.name;
                div.addEventListener("click", () => openSeriesPage(series));
                suggestionsBox.appendChild(div);
            });
        }
    });
});
