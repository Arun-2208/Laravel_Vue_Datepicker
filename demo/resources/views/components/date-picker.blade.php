

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Vue Date Range Picker with Side Menu and Slider Toggle</title>
      
   @vite(['resources/css/app.css', 'resources/js/app.js'])
<style>
@media screen and (min-width:1701px){
  
.calendar-wrapper {
   max-width: 23%;
   margin:auto;
   padding:0;
   font-family: Arial, sans-serif;
}
}
.trigger-text {
   color: #1976d2;
   cursor: pointer;
   text-align:center;
}

.dp__outer_menu_wrap {
   width:100%;
   box-shadow: 0 2.5px 3px grey;
   position:absolute !important;
   border-radius: 10px;
   top:100% !important;
   left:0 !important;
}


.dp__calendar{
   font-size:11.5px; 
}


.dp__instance_calendar{
   width:60% !important;
   padding:0.5% !important;
   height:100% !important;
}
.dp__month_year_wrap{
   font-size:12px;
}
.dp__menu_inner{
   height:100% !important;
}


.dp--tp-wrap{
   display:none;
}


.dp__sidebar_left{
   width:40% !important;
   padding:0.5% !important;
   height:100% !important;
}


.sidebar {
   margin:0;
   background: #ffffff;
   padding: 1%;
   font-size: 12.5px;
   width : 100%;
   height:100%;
   overflow-y: auto;
   overflow-x: hidden;
   border:1px solid #fff;
   border-radius:6px;
}


.preset-dates{
   text-align:left;


}
 .preset-heading{
   text-align:left;
   margin-left:7%;
  
}
.preset-dates ul{
   list-style-type:none;
   width: 100%;
}
 .preset-dates button {
   background-color: #ffffff;
   border: none;
   padding:3.5%;
   padding-left:6%;
   margin: 0.8%;
   cursor: pointer;
   width: 98.4%;
   text-align:left;
}


.preset-dates button:hover {
   background-color: #F1F1F1;
   color: #0E4C92;
}


#precedingPeriod:hover{


   background-color: #F1F1F1;
   color: #0E4C92;
}


#custom:hover{


   background-color: #F1F1F1;
   color: #0E4C92;
}


.compare-option{
   padding:4%;
   display:flex;
   align-items:center;
   justify-content:center;
  
}


.toggle-text{
   width:60%;
   text-align:left;
   margin-left:3.2%;
 
}


.toggle-switch {
  
   position: relative;
   display: flex;
   width: 35%;
   margin-left:7%;
   padding:2.5%;
}


.slider {
   position: absolute;
   cursor: pointer;
   height: 75%;
   width: 75%;
   top: 13%;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: #ECECEC;
   border-radius: 25px;
   transition: background-color 0.3s ease;
}


.slider:before {
   position: absolute;
   content: "";
   height: 160%;
   width: 63%;
   top:-28%;
   right:0;
   bottom:0;
   left:-20%;
   padding:5%;
   background-color:grey ;
   border-radius: 54%;
   transition: transform 0.3s ease;
}                                                          


input:checked + .slider {
   background-color: #82b1ff;
}


input:checked + .slider:before {
   transform: translateX(140%);
   background-color:#2962ff ;
}


.my-header{


   display:block;
   width:100% ;
   padding:3% 1% 8% 1% ;
 
}


.custom-preview {
 
  margin:0% 0% 0% 7.5%;
  display:flex;
  width:85%;
  align-items:center;
  justify-content:center;
}


.input-box-a{
   width: 40%;
   margin-left:5%;
   padding:1.5%;
   text-align:center;
   border: 1px solid #F1F1F1;
   border-radius: 2px;
   font-size: 11.5px;
}


.input-box-b{
   width: 40%;
   padding:1.5%;
   margin:0%;
   text-align:center;
   border: 1px solid #F1F1F1;
   border-radius: 2px;
   font-size: 11.5px;
}


.input-box:hover {
   border:0.5px solid black;
}
.input-box::selection {
   color: #82b1ff;
}


.description-text-a{
   font-size : 10px;
   position: relative;
   left: 19%;
   pointer-events: none;
   background: white;
   color:#818589;
}


.description-text-b{
   font-size : 10px;
   position: relative;
    left: 43%;
   pointer-events: none;
   background: white;
   color:#818589;
}


.description-text-c{
   font-size : 10px;
   position: relative;
 
   left:19%;
   pointer-events: none;
   background: white;
   color:#818589;
  
}


.description-text-d{
   font-size : 10px;
   position: relative;
   left: 43%;
   pointer-events: none;
   background: white;
   color:#818589;
  
}


.description-text-2{


   width:20%;
   font-size:11.5px;
   left:9%;
   text-align:center;
   position:relative;
   margin-top:8%;
   margin-bottom:0%;
}


.active{
   background-color: lightblue;
   border: none;
   padding:4.5%;
   margin: 0.8%;
   cursor: pointer;
   width: 100%;
}


.custom-select-1{
 
   font-style:arial;
   margin-right:5%;
   padding:6% 14% 6% 14%;
   background-color:#ffffff;
   font-size:14px;
   border-radius:4px;
   color:#1976d2;
}


.custom-select-2{
 
  margin-right:5%;
  padding:4% 12% 4% 12%;
  background-color:#ffffff;
  font-size:13px;
  border-radius:4px;
  color:#1976d2;
}


.custom-select-1 :hover {


   cursor:pointer;
   background-color:#F5FBFF;
   color:#2962ff;
}


.custom-select-2 :hover {


cursor:pointer;
background-color:#F5FBFF;
color:#2962ff;
}


.rangeMarker{


   margin:0%;
   padding:1%;
   box-sizing:border-box;
}


.highlight {
           background-color: lightblue;
       }
  
.dp__action_row{
   padding:0 !important;

}
.dp__calendar_item{


   aria-pressed : false !important;
}
@media screen and (max-width:600px){
   .calendar-wrapper {
   max-width: 90%;
   margin:auto;
   padding:0;
   font-family: Arial, sans-serif;


}
}
@media screen and (max-width:1400px) and (min-width:601px) {
   .calendar-wrapper {
   max-width: 75%;
   margin:auto;
   padding:0;
   font-family: Arial, sans-serif;


}
}
@media screen and ( min-width:1401px) and (max-width :1700px ) {
   .calendar-wrapper {
   max-width: 50%;
   margin:auto;
   padding:0;
   font-family: Arial, sans-serif;
}
}

</style>
</head>
<body>
   <div id="app" class="calendar-wrapper">
       <datepicker
           v-model="DateRange"
           :highlight = "[]"
           :range="true"
           :range-default="false"
           placeholder="Select date range"
           vertical
           :show-time="false"
           :clearable="true"
           :max-date="new Date()"
           @open = "preloadDates"
       >
           <template #trigger>
               <p class="trigger-text">Click here to open the calendar</p>
           </template>
           <template #action-preview="{ value }">
               @{{ customDate(value) }}
           </template>

           <template #top-extra class="header-wrap">
               <div class="my-header">
                   <label class="description-text-a">Start Date</label>
                   <label class="description-text-b">End Date</label>
                   <div class="custom-preview">
                       <span>
                           <input id="primaryStartDate" class="input-box-a" type="text" :value="getPrimaryStartDate()">
                           <span class="rangeMarker"> -- </span>
                           <input id="primaryEndDate" class="input-box-b" type="text" :value="getPrimaryEndDate()">
                       </span>
                   </div>
                   <p v-if="compareToggle" class="description-text-2"><strong>Compare</strong></p>
                   <label v-if="compareToggle" class="description-text-c">Start Date</label>
                   <label v-if="compareToggle" class="description-text-d">End Date</label>
                   <div class="custom-preview" v-if="compareToggle">
                       <span>
                           <input id="secondaryStartDate" class="input-box-a" type="text" :value="getSecondaryStartDate()">
                           <span class="rangeMarker"> -- </span>
                           <input id="secondaryEndDate" class="input-box-b" type="text" :value="getSecondaryEndDate()">
                       </span>
                   </div>
               </div>
           </template>
           <template #left-sidebar>
               <div class="sidebar">
                   <div class="preset-dates">
                       <h3 class="preset-heading"><strong>Presets</strong></h3>
                       <ul>
                           <li v-for="preset in presets" :key="preset.label">
                               <button class="preset-buttons" @click="selectPreset(preset)">@{{ preset.label }}</button>
                           </li>
                       </ul>
                       <div class="compare-option">
                           <span class="toggle-text"><strong>Compare</strong></span>
                           <label class="toggle-switch">
                               <input type="checkbox" v-model="compareToggle">
                               <span class="slider"></span>
                           </label>
                       </div>
                       <button id="precedingPeriod" v-if="compareToggle" @click="selectPrecedingDate()">Preceding period</button>
                       <button id="custom" v-if="compareToggle" @click="enableCustomDate()">Custom</button>
                   </div>
               </div>
           </template>
           
           <template #action-buttons>
               <p id="closeCalendar" class="custom-select-2" @click="closeCalendar"><strong>Cancel</strong></p>
               <p  id="selectCalendar" class="custom-select-1" @click="handleDate"><strong>Select</strong></p>
           </template>
       </datepicker>
   </div>
   
<script>
    if(!sessionStorage.getItem('primaryStartDate') && !sessionStorage.getItem('primaryEndDate') && !sessionStorage.getItem('secondaryStartDate') &&
      !sessionStorage.getItem('secondaryEndDate')){


           sessionStorage.setItem('primaryStartDate','');
           sessionStorage.setItem('primaryEndDate','');
           sessionStorage.setItem('secondaryStartDate','');
           sessionStorage.setItem('secondaryEndDate','');
   }


   if(sessionStorage.getItem('primaryStartDate') && sessionStorage.getItem('primaryEndDate') && sessionStorage.getItem('secondaryStartDate') &&
   sessionStorage.getItem('secondaryEndDate')){
   
       let url = new URL(window.location.href);

        if((sessionStorage.getItem('primaryStartDate')!="" && sessionStorage.getItem('primaryEndDate')!="")||
            (sessionStorage.getItem('secondaryStartDate')!="" && sessionStorage.getItem('secondaryEndDate'))!=""){

               const data ={

                   'from_1' : sessionStorage.getItem('primaryStartDate'),
                   'to_1' : sessionStorage.getItem('primaryEndDate') ,
                   'from_2' : sessionStorage.getItem('secondaryStartDate') ,
                   'to_2' : sessionStorage.getItem('secondaryEndDate')
               }


               Object.keys(data).forEach(key =>{
                   let value = data[key];
                   if(value!=""){
                       url.searchParams.set(key,value) ;
                   }
               });

           }
        
       }
</script>
</body>
</html>