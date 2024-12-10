import './bootstrap';
import '../css/app.css';

import { createApp } from 'vue';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp({
    data() {
        return {
            DateRange:null,
            primaryDateRange: null, 
            secondaryDateRange: null, 
            compareToggle: false, 
        };
    },
    methods: {
        updateDateRange(newRange) {
            console.log("Date range updated:", newRange);
    
            if (!newRange || newRange.length < 2) {
                console.error("Invalid date range:", newRange);
                return;
            }
    
            if (this.compareToggle) {
                if (this.secondaryDateRange === null) {
                    this.secondaryDateRange = newRange; 
                } else {
                    this.primaryDateRange = newRange; 
                    this.secondaryDateRange = null;  
                }
            } else {
                this.primaryDateRange = newRange; 
            }
        },
    
    },
    watch: {
        compareToggle(newValue) {
            if (!newValue) {
                
                this.secondaryDateRange = null;
            } else {
                
                if (this.secondaryDateRange === null) {
                    this.secondaryDateRange = []; 
                }
            }
        },
        primaryDateRange(newValue) {
            console.log("Primary Date Range updated:", newValue);
        },
        secondaryDateRange(newValue) {
            console.log("Secondary Date Range updated:", newValue);
        },
    },
});

app.component('datepicker', Datepicker);

app.mount('#app');

console.log('Vue is mounted');
