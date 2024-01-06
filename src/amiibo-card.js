const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"></link>
<style>
    img
    {
        border:1px solid black;
        background-color:white;
        padding:5px;
        box-shadow: 1px 1px 2px #333;
        max-height:200px;
        width:auto;
    }
    .card
    {
        height:500px;
        overflow: auto;
    }
</style>

<div class="card has-text-centered">
    <div class="card-image">
        <figure id="amiibo-image" class="image pt-3 is-inline-block">
            <img alt="mario"/>
        </figure>
    </div>
    <div id="amiibo-info" class="content is-size-6">
        Character: 
        <br>
        Game Series: 
        <br>
        Amiibo Series: 
        <br>
        Model ID:
    </div>
    <div id="favorite-button" class="control is-inline-block">
        <button class="button is-warning is-size-6 has-text-weight-semibold" title="Favorite an Amiibo">
            Favorite
        </button>
    </div>
</div>
`;

class AmiiboCard extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){ 
        this.p1 = this.shadowRoot.querySelector("#amiibo-info");
        this.img = this.shadowRoot.querySelector("img");
        this.button = this.shadowRoot.querySelector("button");

        this.button.onclick = (e) => {
            const dataObj = {
                "name" : this.dataset.name,
                "gameSeries" : this.dataset.gameSeries,
                "amiiboSeries" : this.dataset.amiiboSeries,
                "image" : this.dataset.image,
                "model" : this.dataset.model,
                "favorited" : !this.dataset.favorited,
                "likes" : this.dataset.likes
            };
            this.button.disabled = true;
            this.button.className = "button is-success is-size-6 has-text-weight-semibold"
            this.callback(dataObj);
        }

        this.render();
    }

    disconnectedCallback(){
        this.callback = this.callback || ((obj) => console.log(`Characer: ${obj.name}, Game Series: ${obj.gameSeries}, Amiibo Series: ${obj.amiiboSeries}, Image: ${obj.image}, Model: ${obj.model}, Favorited: ${obj.favorited}`));
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        this.render();
    }

    static get observedAttributes(){
        return ["data-name", "data-game-series", "data-amiibo-series", "data-image", "data-button", "data-model", "data-favorited", "data-likes"];
    }

    render(){
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...character name...</i>";
        const gameSeries = this.getAttribute('data-game-series') ? this.getAttribute('data-game-series') : "<i>...game series...</i>";
        const amiiboSeries = this.getAttribute('data-amiibo-series') ? this.getAttribute('data-amiibo-series') : "<i>...amiibo series...</i>";
        const imageUrl = this.getAttribute('data-image') ? this.getAttribute('data-image') : "images/Super-Smash-Bros-Mario-1.png";
        const model = this.getAttribute('data-model') ? this.getAttribute('data-model') : "<i>...model #...</i>";
        const button = this.getAttribute('data-button') ? this.getAttribute('data-button') : "Favorite";
        const favorited = this.getAttribute('data-favorited') ? this.getAttribute('data-favorited') : false;

        // To-Do: Implement a use for 'likes' data so that it can be displayed on the community page
        const likes = this.getAttribute('data-likes') ? this.getAttribute('data-likes') : 0;

        if(this.p1) this.p1.innerHTML = `<b>Character:</b><br>${name}<br><b>Game Series:</b><br>${gameSeries}<br><b>Amiibo Series:</b><br>${amiiboSeries}<br><b>Model ID:</b><br>${model}`;
        if(this.button) this.button.innerHTML = `${button}`;
        if(this.img) this.img.src = imageUrl;

        // Changing the button's text and onlcick event based on whether the given amiibo has already been favorited
        if(!favorited || favorited === "false")
        {
            this.shadowRoot.querySelector("#favorite-button").innerHTML = `
                <button class="button is-warning is-size-6 has-text-weight-semibold" title="Favorite an Amiibo">
                    Favorite
                </button>
            `;

            this.button = this.shadowRoot.querySelector("button");
            this.button.onclick = (e) => {
                const dataObj = {
                    "name" : this.dataset.name,
                    "gameSeries" : this.dataset.gameSeries,
                    "amiiboSeries" : this.dataset.amiiboSeries,
                    "image" : this.dataset.image,
                    "model" : this.dataset.model,
                    "favorited" : true,
                    "likes": this.dataset.likes++
                };
                this.button.disabled = true;
                this.button.className = "button is-success is-size-6 has-text-weight-semibold"
                this.callback(dataObj);
            }
        }
        else
        {
            this.shadowRoot.querySelector("#favorite-button").innerHTML = `
                <button class="button is-danger is-size-6 has-text-weight-semibold" title="Favorite an Amiibo">
                    Remove From Favorites
                </button>
            `;

            this.button = this.shadowRoot.querySelector("button");
            this.button.onclick = (e) => {
                const dataObj = {
                    "name" : this.dataset.name,
                    "gameSeries" : this.dataset.gameSeries,
                    "amiiboSeries" : this.dataset.amiiboSeries,
                    "image" : this.dataset.image,
                    "model" : this.dataset.model,
                    "favorited" : false,
                    "likes": this.dataset.likes--
                };
                this.button.disabled = true;
                this.button.className = "button is-success is-size-6 has-text-weight-semibold"
                this.callback(dataObj);
            }
        }
    }
}

customElements.define('amiibo-card', AmiiboCard);