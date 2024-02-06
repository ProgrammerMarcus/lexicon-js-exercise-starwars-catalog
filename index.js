const counter = {
    i: 0,
    limit: 50,
    increment: function () {
        this.i = (this.i + 1) % this.limit;
    },
};

const characterList = {
    list: document.querySelector(".characters .list"),
    getNext: function () {
        for (let i = 0; i < 6; i++) {
            counter.increment();
            fetcher("people", counter.i).then((v) => {
                if (this.list.children.length >= 6) {
                    this.list.firstElementChild.remove();
                }
                this.list.insertAdjacentHTML(
                    "beforeend",
                    `<span data-character="${v.url}" data-planet="${v.homeworld}">${v.name}</span>`
                );
            });
        }
    },
    getPrevious: function () {
        console.log(counter.i)
        if (counter.i < 7) {
            return
        } else {
            counter.i = Math.max(counter.i - 12, 0)
        }
        for (let i = 0; i < 6; i++) {
            counter.increment();
            fetcher("people", counter.i).then((v) => {
                if (this.list.children.length >= 6) {
                    this.list.firstElementChild.remove();
                }
                this.list.insertAdjacentHTML(
                    "beforeend",
                    `<span data-character="${v.url}" data-planet="${v.homeworld}">${v.name}</span>`
                );
            });
        }
    },
};
characterList.list.addEventListener("click", (e) => {
    document.querySelector(".details .loader").style.display = "flex";
    let selected = characterList.list.querySelector(".selected");
    if (selected) {
        selected.classList.remove("selected");
    }
    e.target.classList.add("selected");
    selectedDetails.show(e.target.dataset.character, e.target.dataset.planet).then(() => {
        document.querySelector(".details .loader").style.display = "none";
    });
});

const selectedDetails = {
    character: document.querySelector(".dual .character"),
    planet: document.querySelector(".dual .planet"),
    show: function (character, planet) {
        this.character.replaceChildren();
        this.planet.replaceChildren();
        let loading = fetch(character)
            .then((r) => r.json())
            .then((j) => {
                this.character.insertAdjacentHTML("beforeend", `<h3>${j.name}</h3>`);
                this.character.insertAdjacentHTML("beforeend", `<span>Height: ${j.height}</span>`);
                this.character.insertAdjacentHTML("beforeend", `<span>Mass: ${j.mass}kg</span>`);
                this.character.insertAdjacentHTML(
                    "beforeend",
                    `<span>Hair color: ${j.hair_color}</span>`
                );
                this.character.insertAdjacentHTML(
                    "beforeend",
                    `<span>Skin color: ${j.skin_color}</span>`
                );
                this.character.insertAdjacentHTML(
                    "beforeend",
                    `<span>Eye color: ${j.eye_color}</span>`
                );
                this.character.insertAdjacentHTML(
                    "beforeend",
                    `<span>Birth year: ${j.birth_year}</span>`
                );
                this.character.insertAdjacentHTML("beforeend", `<span>Gender: ${j.gender}</span>`);
            });
        fetch(planet)
            .then((r) => r.json())
            .then((j) => {
                this.planet.insertAdjacentHTML("beforeend", `<h3>${j.name}</h3>`);
                this.planet.insertAdjacentHTML(
                    "beforeend",
                    `<span>Rotation period: ${j.rotation_period} hours</span>`
                );
                this.planet.insertAdjacentHTML(
                    "beforeend",
                    `<span>Orbital period: ${j.orbital_period} days</span>`
                );
                this.planet.insertAdjacentHTML(
                    "beforeend",
                    `<span>Diameter: ${j.diameter} km</span>`
                );
                this.planet.insertAdjacentHTML("beforeend", `<span>Climate: ${j.climate}</span>`);
                this.planet.insertAdjacentHTML("beforeend", `<span>Gravity: ${j.gravity}</span>`);
                this.planet.insertAdjacentHTML("beforeend", `<span>Terrain: ${j.terrain}</span>`);
                this.planet.insertAdjacentHTML(
                    "beforeend",
                    `<span>Surface water: ${j.surface_water} wet</span>`
                );
                this.planet.insertAdjacentHTML(
                    "beforeend",
                    `<span>Population: ${j.population}</span>`
                );
            });
        return loading;
    },
};

async function fetcher(type, number) {
    let fetched = {
        name: "ERROR",
    };
    try {
        document.querySelectorAll(".list span").forEach(e => {
            e.style.visibility = "hidden"
        })
        document.querySelector(".characters .loader").style.display = "flex"
        const response = await fetch(`https://swapi.dev/api/${type}/${number}/`);
        const data = await response.json();
        fetched = data;
    } catch (error) {
        console.error(error);
    } finally {
        document.querySelectorAll(".list span").forEach(e => {
            e.style.visibility = "visible"
        })
        document.querySelector(".characters .loader").style.display = "none"
        return fetched;
    }
}
characterList.getNext();
document.querySelector(".more-btn").addEventListener("click", () => {
    characterList.getNext();
});
document.querySelector(".less-btn").addEventListener("click", () => {
    characterList.getPrevious();
});
