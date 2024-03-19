const form = document.querySelector("header form");
const section = document.querySelector("section");
const defal = document.querySelector("#defal");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    section.innerText = "";
    let tvShow = (form.elements.query.value);
    try {
        let shows = await axios.get(`https://api.tvmaze.com/search/shows?q=${tvShow}`);
        shows = shows.data
        createShowDiv(shows);


    }
    catch (err) {
        section.append("server issue, Please try again after some time");
    }

})

const watchbox = document.querySelector(".watchings")

const emptyBox = document.querySelector(".watchings h2");


function createShowDiv(shows) {
    for (let s of shows) {
        if (s.show.image) {
            const div = document.createElement("div");
            const img = document.createElement("img");
            img.src = s.show.image.medium;
            img.style.borderRadius = "1.5em"
            div.append(img);
            const h2 = document.createElement("h2");
            h2.innerText = s.show.name
            h2.style.width = "100%";
            div.append(h2);
            const h3 = document.createElement("h3");
            h3.innerText = "IMDb: " + s.show.rating.average
            h3.style.width = "100%"
            div.append(h3);
            div.style.width = "250px"
            div.style.margin = "1em"
            const addToWatch = document.createElement("button");
            addToWatch.innerHTML = 'Add to WatchList <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/><path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4"/></svg> ';
            div.append(addToWatch)
            addToWatch.classList.add("watchlist");
            section.append(div);


            addToWatch.addEventListener("click", (v) => {
                if (watchbox.contains(emptyBox)) {
                    emptyBox.remove();
                }

                const newdiv = document.createElement("div");
                const newimg = document.createElement("img")
                newdiv.style.display = "block"
                newimg.src = s.show.image.medium;
                newimg.style.borderRadius = "1.5em"
                newimg.style.height = "80%"
                newimg.style.width = "100%"
                newdiv.append(newimg);

                const newh2 = document.createElement("h2");
                newh2.innerText = s.show.name
                newh2.style.width = "100%";
                newh2.style.lineHeight = "2em";
                newdiv.append(newh2);
                newdiv.style.width = "100%"
                newdiv.style.margin = "1em"
                const removeButton = document.createElement("button");
                removeButton.classList.add("removebutton");
                removeButton.innerHTML = `Remove X`
                newdiv.append(removeButton);
                removeButton.addEventListener("click", (e) => {
                    newdiv.remove();
                    if (watchbox.childElementCount === 0) {
                        watchbox.append(emptyBox);
                    }
                    toWatch.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
                    <path
                        d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                </svg>`+ watchbox.getElementsByTagName("div").length;
                    e.stopPropagation();

                })
                watchbox.append(newdiv)
                toWatch.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
                    <path
                        d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                </svg>`+ watchbox.getElementsByTagName("div").length;
                v.stopPropagation();


            })
        }
    }
}


const toWatch = document.querySelector("#towatch");

toWatch.addEventListener("click", (e) => {
    watchbox.classList.toggle("invisible");
    e.stopPropagation();
})

document.body.addEventListener("click", () => {
    watchbox.classList.add("invisible");

})

