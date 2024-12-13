import './bootstrap';
import '../css/app.css';

import { createApp } from 'vue';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp({
    data() {
        return {
            dateRange:null,
            primaryDateRange: null,
            secondaryDateRange: null,
            compareToggle: false,
            toggleFlag: 0,
        };
    },
    methods: {
        updateDateRange(newRange) {
            if (!newRange || newRange.length < 2) {
                console.error("Invalid date range:", newRange);
                return;
            }

            if (this.compareToggle) {
                
                if (this.toggleFlag === 0) {
                    this.primaryDateRange = newRange;
                    this.toggleFlag = 1;
                } else {
                    this.secondaryDateRange = newRange;
                    this.toggleFlag = 0; 
                }
            } else {
               
                this.primaryDateRange = newRange;
                this.secondaryDateRange = null;
            }

            console.log("Primary:", this.primaryDateRange);
            console.log("Secondary:", this.secondaryDateRange);
        },

    },
    watch: {
        compareToggle(newValue) {
            if (!newValue) {
                this.secondaryDateRange = null;
                this.toggleFlag = 0; 
            }
        },
    },
});

app.component('datepicker', Datepicker);

app.mount('#app');

console.log('Vue is mounted');
