const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"></link>

<section class="section has-background-danger-dark">
    <div class="container">
        <div class="column">  
            <div class="hero is-large is-info p-2">
                <div class="hero-head">
                    <p class="title">
                        Amiibo Finder Home
                    </p>
                    <p class="subtitle">
                        Your first stop for tracking your Amiibo collection!
                    </p>
                    <p style="float:left;width:50%">
                        You can use the Amiibo Finder in the "App" tab to look up any amiibo; all amiibos can be searched for via their amiibo series, game series, and character name, and will be displayed with all the prior information along with the amiibo's release date in North America. You can favorite any amiibo you find, and you can view all favorited amiibos in the "Favorites" tab.
                    </p>
                    <img class="p-3" style="float:right;width:50%" src="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png" alt="Mario">
                </div>
            </div>
        </div>
    </div>
</section>
`;

class WCHome extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){ 
        this.render();
    }

    disconnectedCallback(){
        this.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        this.render();
    }

    static get observedAttributes(){
        return;
    }

    render(){
        
    }
}

customElements.define('wc-home', WCHome);