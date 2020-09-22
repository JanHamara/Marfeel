import { getRevenue } from './api';

// Template
class GraphComponent extends HTMLElement {
    constructor() {
        super();

        // ---------------------

        // Props
        this.area = this.getAttribute('area')
        this.colorScheme = this.getAttribute('colorScheme')
        this.data = {
            "area": "revenue",
            "stats": {
                "smartphone": 80000,
                "tablet": 120000
            }
        }
        
        // Methods
        this.separate = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        this.calcPerc = (number, total) => {
            return (((100/total)*number).toFixed(0) + "%")
        }
    }

    connectedCallback () {

        this.total = parseInt(this.data.stats.smartphone + this.data.stats.tablet);

        // ---------------------

        // render()

        this.innerHTML = `
            <div class="graph-component graph-component-${this.colorScheme}">            
                <div class="graph-component-donut">
                    ${this.area} and ${this.separate(this.total)}€
                </div>
                <div class="graph-component-stats row">
                    <div class="gc-stats-tablet col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <h2>Tablet</h2>
                        <div>
                        ${this.calcPerc(this.data.stats.tablet, this.total)}
                        <span>${this.separate(this.data.stats.tablet)}€</span>
                        </div>  
                    </div>
                    <div class="gc-stats-smartphone col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <h2>Smartphone</h2>
                        <div>${this.calcPerc(this.data.stats.smartphone, this.total)}<span>${this.separate(this.data.stats.smartphone)}€</span></div> 
                    </div>
                </div>
            </div>
        `;
    }

    attributeChangedCallback() {
        console.log(this.data)
    }
}

try {
    customElements.define('graph-component', GraphComponent)
} catch (err) {
    const h3 = document.createElement('h3')
    h3.innerHTML = "This site uses webcomponents which don't work in all browsers! Try this site in a browser that supports them!"
    document.body.appendChild(h3)
}

export default GraphComponent;