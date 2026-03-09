let games = [];
let currentIndex = 0;

async function loadGamesData(number){

    const response = await fetch("games.json");
    const data = await response.json();

    games = data.slice(0, number);

    createDots();

    showGame();

}

async function loadFeaturedGames(){

    const response = await fetch("games.json");
    const games = await response.json();

    const container = document.getElementById("featuredGames");

    games.slice(0,4).forEach(game => {

        const card = `
        <div class="relative rounded-xl overflow-hidden group">

            <img src="${game.image}"
            class="w-full h-[260px] object-cover group-hover:scale-105 transition duration-500">

            <div class="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

            <div class="absolute bottom-6 left-6 text-white">

                <h3 class="text-2xl font-bold">
                    ${game.title}
                </h3>

            </div>

            <div class="absolute bottom-6 right-6 flex gap-3">

                <button class="bg-white text-black px-4 py-2 rounded-full scale-loop text-sm" onclick='window.location.href="game-detail.html?id=${game.id}"'>
                    Details
                </button>

            </div>

        </div>
        `

        container.innerHTML += card

    })

}

function goToDetail(){

  const game = games[currentIndex]

  window.location.href = `game-detail.html?id=${game.id}`

}

function showGame(){

    const game = games[currentIndex];

    document.getElementById("gameTitle").textContent = game.title;
    document.getElementById("gameImage").src = game.image;

    updateDots();
}


function nextGame(){

    currentIndex++;

    if(currentIndex >= games.length){
        currentIndex = 0;
    }

    showGame();

}


function prevGame(){

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = games.length - 1;
    }

    showGame();

}

function createDots(){

    const dotsContainer = document.getElementById("dots");
    dotsContainer.innerHTML = "";

    games.forEach((game, index) => {

        const dot = document.createElement("div");

        dot.className = "w-3 h-3 rounded-full bg-gray-500 cursor-pointer";

        dot.onclick = () => {
            currentIndex = index;
            showGame();
        }

        dotsContainer.appendChild(dot);

    })

}

function updateDots(){

    const dots = document.querySelectorAll("#dots div");

    dots.forEach((dot, index) => {

        if(index === currentIndex){
            dot.classList.remove("bg-gray-500");
            dot.classList.add("bg-white");
        }else{
            dot.classList.remove("bg-white");
            dot.classList.add("bg-gray-500");
        }

    })

}


loadGamesData(3);
loadFeaturedGames();