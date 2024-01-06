const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"></link>

<style>
    footer
    {
        border-top:2px solid black;
        border-bottom:2px solid black;
    }
    img
    {
        max-height:20px;
        width:auto;
    }
</style>

<footer class="has-background-info">
    <div class="hero-footer is-size-5 has-text-centered has-text-black pb-1">
        <b>Contact:</b> jjp1723@rit.edu &emsp;
        <a href="https://bulma.io" target="external">
            <img class="mt-1" src="https://bulma.io/images/bulma-logo.png" alt="Bulma Logo">
        </a>
    </div>
</footer>
`;

class WCFooter extends HTMLElement{
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

customElements.define('wc-footer', WCFooter);