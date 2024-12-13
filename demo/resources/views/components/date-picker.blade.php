<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue Date Range Picker with Side Menu and Slider Toggle</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
     .calendar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 600px;
    margin: auto;
    font-family: Arial, sans-serif;
}

.calendar-contogic.ainer {
    width: 100%;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
}

.sidebar {
    position: relative;
    top: 0px;
    right: 0px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 2px;
    font-size: 12px;
}

.toggle-switch {
    display: flex;
    align-items: center;
    gap: 10px;
}

.toggle-switch input {
    margin-left: auto;
}

.apply-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    transition: background-color 0.3s ease;
}

.apply-button:hover {
    background-color: #0056b3;
}

.toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    margin-right: 10px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 24px;
    transition: background-color 0.3s ease;
}

.slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
}

input:checked + .slider {
    background-color: #007bff;
}

input:checked + .slider:before {
    transform: translateX(26px);
}
.my-header {
    padding: 5px;
    border: 0.2px solid grey;
    width: 100%; 
    text-align: center;
  }

  .custom-preview{
   margin:5%;
   display:flex;
   align-items:center;
   justify-content:center;
   width:100;
  }
  .input-box{
    width:30%;
    border: 0.2px solid grey;
    border radius:25px;
  }
    </style>
</head>
<body>
    <h1>Vue Date Range Picker with Side Menu and Slider Toggle</h1>
    <div id="app" class="calendar-wrapper">
   
    <div class="calendar-container">
        <datepicker 
            v-model="DateRange" 
            :range="true" 
            placeholder="Select date range"
            @update:model-value="updateDateRange"
            text-input
           
            enable-time-picker="false"
        >
        
        <template #menu-header>
        <div class="my-header">
        <div class ="custom-preview">
        <span>
            From <input class ="input-box" type="text" >  To : <input class ="input-box" type="text" >
        </span>
        </div>
        <div class ="custom-preview">
        <span v-if="compareToggle">
            From <input class ="input-box" type="text" >  To : <input class ="input-box" type="text">
        </span> 
        </div>

        </div>
        </template>
        <template #left-sidebar>
        <div class="sidebar">
        <label class="toggle-switch">
            <input type="checkbox" v-model="compareToggle">
            <span class="slider"></span>
        </label>
        <span>Compare Dates</span>
        </div>
        </template>

        </datepicker>
        
    </div>
</div>
</body>
</html>
