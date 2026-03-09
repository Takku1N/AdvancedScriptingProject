const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let game;

async function loadGame() {

    const response = await fetch("games.json");
    const games = await response.json();
    const content = document.getElementById('content')

    // หาเกมจาก id
    game = games.find(g => g.id == Number(id));

    if (!game) {
        document.body.innerHTML = "Game not found";
        return;
    }

    const block = `
        <section class="relative h-[80vh] md:h-[90vh] flex items-end bg-cover bg-center"
            style="background-image:url(${game.image})">

            <div class="bg-black/60 w-full p-12">

                <h1 class="text-5xl md:text-7xl font-bold mb-4">${game.title}</h1>

                <div class="flex gap-4 text-sm text-gray-300 mb-6" id="tags"></div>

                <p class="text-gray-300 max-w-xl">${game.overview}</p>

            </div>

        </section>


        <!-- GAME DETAIL SECTION -->

        <section class="max-w-6xl mx-auto px-6 pt-24 grid md:grid-cols-2 gap-16">

            <div>

                <h2 class="text-4xl font-bold mb-6">
                    About The Game
                </h2>

                <p class="text-gray-400 leading-relaxed">${game.description}</p>

            </div>


            <div class="space-y-6">

                <div>
                    <h3 class="text-xl font-semibold">Platforms</h3>
                    <p class="text-gray-400" id="platforms">PC, PlayStation, Xbox, Nintendo Switch</p>
                </div>

                <div>
                    <h3 class="text-xl font-semibold">Genre</h3>
                    <p class="text-gray-400" id="genre">Action RPG</p>
                </div>

                <div>
                    <h3 class="text-xl font-semibold">Developer</h3>
                    <p class="text-gray-400">${game.developer}</p>
                </div>

                <div>
                    <h3 class="text-xl font-semibold">Publisher</h3>
                    <p class="text-gray-400">${game.publisher}</p>
                </div>

            </div>

        </section>

        <section class="max-w-6xl mx-auto px-6 pb-24 pt-10">
            <h3 class="text-3xl font-bold mt-10 mb-6">
                System Requirements
            </h3>

            <div class="overflow-x-auto">
                <table class="w-full text-left border border-zinc-700 text-sm">

                    <thead class="bg-zinc-900">
                        <tr>
                            <th class="p-4 border border-zinc-700"></th>
                            <th class="p-4 border border-zinc-700">Minimum</th>
                            <th class="p-4 border border-zinc-700">Recommended</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-300">

                        <tr>
                            <td class="p-4 border border-zinc-700 font-semibold">OS</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.minimum.os}</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.recommended.os}</td>
                        </tr>

                        <tr>
                            <td class="p-4 border border-zinc-700 font-semibold">Processor</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.minimum.processor}</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.recommended.processor}</td>
                        </tr>

                        <tr>
                            <td class="p-4 border border-zinc-700 font-semibold">Memory</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.minimum.memory}</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.recommended.memory}</td>
                        </tr>

                        <tr>
                            <td class="p-4 border border-zinc-700 font-semibold">Graphics</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.minimum.graphics}</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.recommended.graphics}</td>
                        </tr>

                        <tr>
                            <td class="p-4 border border-zinc-700 font-semibold">Storage</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.minimum.storage}</td>
                            <td class="p-4 border border-zinc-700">${game.system_requirements.recommended.storage}</td>
                        </tr>

                    </tbody>

                </table>
            </div>
        </section>
    `
    content.innerHTML = block;

    const tag = document.getElementById('tags');
    const genre = document.getElementById('genre');
    const platforms = document.getElementById('platforms');

    genre.innerHTML = game.genre.join(", ");
    platforms.innerHTML = game.platform.join(", ");

    game.genre.map((genre) => {
        const tag_block = `
            <span class="bg-zinc-800 px-3 py-1 rounded">${genre}</span>
        `
        tag.innerHTML += tag_block;
    })


    // ใส่ข้อมูลลง HTML
    document.getElementById("title").innerHTML = game.title;

}




loadGame();