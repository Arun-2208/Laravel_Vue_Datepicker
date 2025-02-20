
import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';


var flag = 0;
let presetFlag = 0;

let precedingFlag = 0;
let customFlag = 1;

const app = createApp({
   data() {
       return{
           closeOnAutoApply: false,
           showDatepicker: true,
           DateRange: [],
           compareToggle: false,
           primaryStartDate: "",
           primaryEndDate: "",
           secondaryStartDate: "",
           secondaryEndDate: "",
           actionPreviewArray: [],
           presets:[
               {label:'Today', range:[new Date(new Date().setDate(new Date().getDate())),new Date(new Date().setDate(new Date().getDate()))]},
               {label:'Yesterday', range:[new Date(new Date().setDate(new Date().getDate() - 1)) , new Date(new Date().setDate(new Date().getDate() - 1))]},
               { label: 'Last 7 Days', range: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date(new Date().setDate(new Date().getDate() - 1))]},
               { label: 'Last 28 Days', range: [new Date(new Date().setDate(new Date().getDate() - 28)), new Date(new Date().setDate(new Date().getDate() - 1))] },
               { label: 'Last 30 Days', range: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date(new Date().setDate(new Date().getDate() - 1))] },
               {label: 'Last 90 days' , range: [new Date(new Date().setDate(new Date().getDate() - 90)), new Date(new Date().setDate(new Date().getDate() - 1))]},
              
               { label: 'Last 12 Months', range: [
                   new Date((new Date(new Date().setDate(new Date().getDate() - 1))).setFullYear((new Date(new Date().setDate(new Date().getDate() - 1))).getFullYear() - 1)),
                   new Date(new Date().setDate(new Date().getDate() - 1))
               ]},
              
               { label: 'Last Calendar Month', range: [
                   new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0)]},
             
               {label:'Last Calendar Year', range:[new Date(new Date().getFullYear(), new Date().getMonth() - 12 , 1),new Date(new Date().getFullYear(), new Date().getMonth(), 0)
               ]},


               { label: 'This Month', range: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()] },
              
               {label:'This Calendar Year', range: [new Date(new Date().getFullYear(), 0, 1), new Date()]  }
                
               ]
          
       };
   },
   methods: {

       enableCustomDate(){
              
           precedingFlag = 0;
           customFlag = 1;

           document.querySelector('#custom').style.backgroundColor = 'lightblue';
          
           document.querySelector('#precedingPeriod').style.backgroundColor = 'white';

           const presets = document.querySelectorAll(".preset-buttons");

           presets.forEach(button =>{
              
               if(button.style.backgroundColor = "lightblue"){
                 
                   button.style.backgroundColor = "white";
                   }
               });
           },

       selectPrecedingDate(){

           precedingFlag = 1;
           customFlag = 0;

           document.querySelector('#custom').style.backgroundColor = 'white';
          
           document.querySelector('#precedingPeriod').style.backgroundColor = 'lightblue';
            
           if(this.primaryStartDate && this.primaryEndDate){


               let startDate = new Date(this.primaryStartDate);
               let endDate = new Date(this.primaryEndDate);


               let range = endDate - startDate;


               let   precedingStartDate = startDate - range - (1000*60*60*24);
               let   precedingEndDate = startDate - (1000*60*60*24);
              
               this.secondaryStartDate = this.formatDate(new Date(precedingStartDate));
               this.secondaryEndDate = this.formatDate(new Date(precedingEndDate));
           }


           else
               return "";
           },

       customDate(newRange){

           let startDate = this.formatDate(newRange[0]);
           let endDate = this.formatDate(newRange[1]);


           if(!newRange || newRange.length!=2)
               return "";


           if(!this.compareToggle){
               this.primaryStartDate = startDate;
               this.primaryEndDate = endDate;
           }


           else{

               if(presetFlag == 0){


               if(customFlag ==1 && precedingFlag == 0){  


                   if (flag == 0) {
                       this.primaryStartDate = startDate;
                       this.primaryEndDate = endDate;
                       flag = 1;
                     
                   } else {
                       this.secondaryStartDate = startDate;
                       this.secondaryEndDate = endDate;
                       flag = 0;
                   }
               }

               if(customFlag == 0 && precedingFlag == 1){


                   this.primaryStartDate = startDate;
                   this.primaryEndDate = endDate;
               }
           }
          
           if(presetFlag ==1){

               this.primaryStartDate = startDate;
               this.primaryEndDate = endDate;
               presetFlag = 0;

                   if(customFlag == 0 && precedingFlag == 1 ){  
                      
                       let startDate = new Date(this.primaryStartDate);
                       let endDate = new Date(this.primaryEndDate);
          
                       let range = endDate - startDate;
          
                       let   precedingStartDate = startDate - range - (1000*60*60*24);
                       let   precedingEndDate = startDate - (1000*60*60*24);
                      
                       this.secondaryStartDate = this.formatDate(new Date(precedingStartDate));
                       this.secondaryEndDate = this.formatDate(new Date(precedingEndDate));
                       }
                   }
               }
       },
        
       getPrimaryStartDate() {
           return this.primaryStartDate;
       },
       getPrimaryEndDate() {
           return this.primaryEndDate;
       },
       getSecondaryStartDate() {
           return this.secondaryStartDate;
       },
       getSecondaryEndDate() {
           return this.secondaryEndDate;
       },
     
       selectPreset(preset){
          
           this.DateRange = preset.range;

           presetFlag = 1;

           const currentButton = preset.label;


           const presets = document.querySelectorAll(".preset-buttons");


           presets.forEach(button =>{
              
               if(button.textContent == currentButton){
                 
                   button.style.backgroundColor = "lightblue";
               }
               else{


                   button.style.backgroundColor = "white";
               }
           });
 
       },

       formatDate(dateString){

           const date = new Date(dateString);

           const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

           const day = date.getDate();
           const month = months[date.getMonth()];
           const year = date.getFullYear();

           const formattedDate = `${month} ${day}, ${year}`;
          
           return formattedDate;
       },

       handleDate() {

           if ((this.primaryStartDate && this.primaryEndDate) || (this.secondaryStartDate && this.secondaryEndDate)){


               const data = {
                   'from_1': this.primaryStartDate,
                   'to_1': this.primaryEndDate,
                   'from_2': this.secondaryStartDate,
                   'to_2': this.secondaryEndDate
               };
      
               let url = new URL(window.location.href);


               url.search = '';
      
               Object.keys(data).forEach(key => {


                   const value = data[key];
                   if (value !== "" && value !== null && value !== undefined && !Number.isNaN(value)) {
                       url.searchParams.set(key, value);
                   }
               });

               window.history.pushState({}, '', url);

               sessionStorage.setItem('primaryStartDate',this.primaryStartDate);
               sessionStorage.setItem('primaryEndDate',this.primaryEndDate);
               sessionStorage.setItem('secondaryStartDate',this.secondaryStartDate);
               sessionStorage.setItem('secondaryEndDate',this.secondaryEndDate);


               window.location.reload();
           }


           else{
               alert("Please select a Date Range !!")
           }
       },

       closeCalendar(){


           const calendar = document.querySelector('.dp__outer_menu_wrap');


           if(calendar){


               calendar.style.display = 'none';
           }
       },


       formatValue(newValue) {


           let date = new Date(newValue);
           let year = date.getFullYear();
           let month = String(date.getMonth() + 1).padStart(2, '0');
           let day = String(date.getDate()).padStart(2, '0');
           let formattedValue = `${year}-${month}-${day}`;


           return formattedValue;
       },

       preloadDates(){
          
           if(!this.compareToggle){

               if(sessionStorage.getItem('primaryStartDate')!="" && sessionStorage.getItem('primaryEndDate')!="" ){


                   this.primaryStartDate = sessionStorage.getItem('primaryStartDate');
                   this.primaryEndDate = sessionStorage.getItem('primaryEndDate');
               }
               else if((!sessionStorage.getItem('primaryStartDate') && !sessionStorage.getItem('primaryEndDate'))||
               (sessionStorage.getItem('primaryStartDate')=="" && sessionStorage.getItem('primaryEndDate')=="")){


                   let startDate = (new Date(new Date().setDate(new Date().getDate() - 7)));


                   const startMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

                   const startDay = startDate.getDate();
                   const startMonth = startMonths[startDate.getMonth()];
                   const startYear = startDate.getFullYear();
      
                   const formattedStartDate = `${startMonth} ${startDay}, ${startYear}`;

                   let endDate = (new Date(new Date().setDate(new Date().getDate() - 1)));

                   const endMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

                   const endDay = endDate.getDate();
                   const endMonth = endMonths[endDate.getMonth()];
                   const endYear = endDate.getFullYear();
      
                   const formattedEndDate = `${endMonth} ${endDay}, ${endYear}`;
                  
                   this.primaryStartDate = formattedStartDate;
                   this.primaryEndDate = formattedEndDate;
               }
           }
      
       },
   },

   watch:{

       compareToggle(newValue){

           if(!this.compareToggle){

               console.log("function1 triggered");
               this.secondaryStartDate = "";
               this.secondaryEndDate = "" ;

            const allDates = document.querySelectorAll('.dp__calendar_item');

            allDates.forEach(eachDate =>{ 

                    eachDate.children[0].style.setProperty("background-color", "white", "important");
                    eachDate.children[0].style.setProperty("border-radius", "0px", "important");    
             });
           }

           else if(this.compareToggle){

               if(sessionStorage.getItem('secondaryStartDate')!="" && sessionStorage.getItem('secondaryEndDate')!=""){


                   this.secondaryStartDate = sessionStorage.getItem('secondaryStartDate');
                   this.secondaryEndDate = sessionStorage.getItem('secondaryEndDate');
               }

               else if((!sessionStorage.getItem('secondaryStartDate') && !sessionStorage.getItem('secondaryEndDate'))||
               (sessionStorage.getItem('secondaryStartDate')=="" && sessionStorage.getItem('secondaryEndDate')=="")){


                   let startDate = (new Date(new Date().setDate(new Date().getDate() - 14)));

                   const startMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

                   const startDay = startDate.getDate();
                   const startMonth = startMonths[startDate.getMonth()];
                   const startYear = startDate.getFullYear();
      
                   const formattedStartDate = `${startMonth} ${startDay}, ${startYear}`;

                   let endDate = (new Date(new Date().setDate(new Date().getDate() - 8)));

                   const endMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

                   const endDay = endDate.getDate();
                   const endMonth = endMonths[endDate.getMonth()];
                   const endYear = endDate.getFullYear();
      
                   const formattedEndDate = `${endMonth} ${endDay}, ${endYear}`;

                   this.secondaryStartDate = formattedStartDate;
                   this.secondaryEndDate = formattedEndDate;
               }
            }
       },


       primaryStartDate(newValue){

        const allDates = document.querySelectorAll('.dp__calendar_item');

        allDates.forEach(eachDate=>{
        
            eachDate.children[0].style.setProperty("background-color", "white", "important");
            eachDate.children[0].style.setProperty("border-radius", "0px", "important");
            eachDate.children[0].style.setProperty("color", "black", "important");
            eachDate.children[0].style.removeProperty("font-weight");
        
        });


        if(precedingFlag ==1){

            if(this.primaryStartDate && this.primaryEndDate){


                let startDate = new Date(this.primaryStartDate);
                let endDate = new Date(this.primaryEndDate);

                let range = endDate - startDate;

                let   precedingStartDate = startDate - range - (1000*60*60*24);
                let   precedingEndDate = startDate - (1000*60*60*24);
            
                this.secondaryStartDate = this.formatDate(new Date(precedingStartDate));
                this.secondaryEndDate = this.formatDate(new Date(precedingEndDate));

            }
        }

        
        allDates.forEach(eachDate =>{
                                    
            if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear())){
        
                if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){

                        eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                        eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
        
                }
            
            }
            
            else if((new Date(eachDate.getAttribute('id')) > new Date(this.secondaryStartDate)) &&
                    (new Date(eachDate.getAttribute('id')) < new Date(this.secondaryEndDate))){
        
                        if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                        (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                        (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))&&
                            !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){
                    
                        eachDate.children[0].style.setProperty("background-color", "#FAEED8", "important");
                        eachDate.children[0].style.setProperty("border-radius", "0px", "important");
        
                    }
                    
                    else if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                        (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                        (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear())){

                            if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))&&
                                !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){

                                eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                                eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                            }
        
                            else if(((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))||
                            ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){
                    
                                eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                                eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");
        
                            }
                            
                    }
        
                }
        
                else if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear())){
                
                      if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){

                        eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                        eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                    }

                   else if(((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))||
                            ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){
        
                        eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                        eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                    }
                    
                }
        
                if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }


                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }  


                
                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }   
                      

        }); 
        
        
        allDates.forEach(eachDate =>{
            
            if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){
            
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
        
                }
            
            }
            
            else if((new Date(eachDate.getAttribute('id')) > new Date(this.primaryStartDate)) &&
                    (new Date(eachDate.getAttribute('id')) < new Date(this.primaryEndDate))){
        
                        if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                        (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                        (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))&&
                            !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){
                    
                        eachDate.children[0].style.setProperty("background-color", "#F0F8FF", "important");
                        eachDate.children[0].style.setProperty("border-radius", "0px", "important");
        
                    }
                    
                    else if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                        (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                        (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                            if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))&&
                                !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){

                                eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                                eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                            }
        
                            else if(((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))||
                            ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){
                    

                                eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                                eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                            }
                            
                    }

                    else{
                        if(presetFlag ==1){

                            eachDate.children[0].style.setProperty("background-color", "#FAEED8", "important");
                            eachDate.children[0].style.setProperty("border-radius", "0px", "important");
        
                        }
                    }

                }
        
                else if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
                
                  if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){

                        eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                        eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                    }
                    else if(((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))||
                    ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){
        
                        eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                        eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                    }
        
                }
        
                if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }


                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }  
         
        });
           
       },

       secondaryStartDate(newValue){

        const allDates = document.querySelectorAll('.dp__calendar_item');

        allDates.forEach(eachDate=>{

            eachDate.children[0].style.setProperty("background-color", "white", "important");
            eachDate.children[0].style.setProperty("border-radius", "0px", "important");
            eachDate.children[0].style.setProperty("color", "black", "important");
            eachDate.children[0].style.removeProperty("font-weight");
        });

                               
        allDates.forEach(eachDate =>{
              
            if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){

               if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){
            
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");

                }
        
            }
            
            else if((new Date(eachDate.getAttribute('id')) > new Date(this.primaryStartDate)) &&
                    (new Date(eachDate.getAttribute('id')) < new Date(this.primaryEndDate))){
                        

                        if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                        (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                        (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))&&
                            !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){
                       
                        eachDate.children[0].style.setProperty("background-color", "#F0F8FF", "important");
                        eachDate.children[0].style.setProperty("border-radius", "0px", "important");

                    }
                    
                    else if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                        (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                        (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){

                            if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))&&
                                !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){

                                eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                                eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                            }

                            else if(((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))||
                            ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){

                                eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                                eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                            }
   
                       }

                       else{
                        if(presetFlag ==1){

                            eachDate.children[0].style.setProperty("background-color", "#FAEED8", "important");
                            eachDate.children[0].style.setProperty("border-radius", "0px", "important");
        
                        }
                    }

                }

                else if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
                
                  if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){

                        eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                        eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                    }
                        else if(((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()))||
                            ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()))){

                        eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                        eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                    }

                }
        
                if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }


                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                    eachDate.children[0].style.setProperty("border-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }  
         
        });


        allDates.forEach(eachDate =>{
              
        
            if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear())){

                 if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){
            
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");

                }
            
            }
            
            else if((new Date(eachDate.getAttribute('id')) > new Date(this.secondaryStartDate)) &&
                    (new Date(eachDate.getAttribute('id')) < new Date(this.secondaryEndDate))){

                        if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){

                        eachDate.children[0].style.setProperty("background-color", "#FAEED8", "important");
                        eachDate.children[0].style.setProperty("border-radius", "0px", "important");
                       

                    }
                    
                       else if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                        (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                        (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear())){

                            if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                        (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                        (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))&&
                            !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){

                                eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                                eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                            }

                               else if(((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))||
                            ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){
                    
                    
                                eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                                eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");

                            } 

                            else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()) &&
                            (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                            (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                            (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
                    
                                eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                                eachDate.children[0].style.setProperty("border-radius", "20px", "important");
                                eachDate.children[0].style.setProperty("color", "black", "important");
                                eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                            }  
                   
                       }

                }

                else if((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear())){
                
                    
                      if(!((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))&&
                    !((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){

                        eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                        eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                    }
                    else if(((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear()))||
                    ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate())&&
                    (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth())&&
                    (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear()))){
            

                        eachDate.children[0].style.setProperty("background-color", "#007FFF", "important");
                        eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                        eachDate.children[0].style.setProperty("color", "black", "important");
                        eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                    }
                    
                }
        
                if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }

                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-right-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }


                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.primaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.primaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.primaryStartDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-top-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("border-bottom-left-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }   


                else if ((new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryStartDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryStartDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryStartDate).getFullYear()) &&
                (new Date(eachDate.getAttribute('id')).getDate() == new Date(this.secondaryEndDate).getDate()) &&
                (new Date(eachDate.getAttribute('id')).getMonth() == new Date(this.secondaryEndDate).getMonth()) &&
                (new Date(eachDate.getAttribute('id')).getFullYear() == new Date(this.secondaryEndDate).getFullYear())){
        
                    eachDate.children[0].style.setProperty("background-color", "#E1C16E", "important");
                    eachDate.children[0].style.setProperty("border-radius", "20px", "important");
                    eachDate.children[0].style.setProperty("color", "black", "important");
                    eachDate.children[0].style.setProperty("font-weight", "bold", "important");
                }   
                
        }); 

       },
       
}
});

app.component('datepicker', Datepicker);

app.mount('#app');




