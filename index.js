async function fetchToday(){
    try {
        const res = await fetch("https://api.ethioall.com/date/api");
        if(!res.ok) throw new Error("Failed to fetch data");
        return await res.json();
    } catch (error) {
        console.error("API error:", error);
        return null;
    }
}

function updateHeader(data){
    const month = document.getElementById("month");
    const date = document.getElementById("date");

    month.textContent =  `${data.month_amharic}, ${data.year}`;
    date.textContent = data.day_amharic;

}

function getWeekdayIndex(data) {
    const englishMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    const amharicMap = {
        "እሁድ": 0,
        "ሰኞ": 1,
        "ማክሰኞ": 2,
        "ረቡዕ": 3,
        "ሐሙስ": 4,
        "አርብ": 5,
        "ቅዳሜ": 6
    };

    if (data.day_english && englishMap[data.day_english] !== undefined) {
        return englishMap[data.day_english];
    }

    return amharicMap[data.day_amharic] ?? 0;
}

function renderDays(data) {
const daysContainer = document.getElementById("days");
daysContainer.innerHTML = "";



const totalDays = data.month_number === 13 ? 5 : 30; 
const today = data.date;
const todayWeekdayIndex = getWeekdayIndex(data);
const startOffset = (todayWeekdayIndex - ((today - 1) % 7) + 7) % 7;

for (let i = 0; i < startOffset; i++) {
    const emptyEl = document.createElement("div");
    emptyEl.className = "h-10";
    daysContainer.appendChild(emptyEl);
}

for (let i = 1; i <= totalDays; i++) {
    const dayEl = document.createElement("div");
    dayEl.textContent = i;

    dayEl.className = "h-10 flex items-center justify-center rounded-md cursor-pointer text-sm bg-gray-800 text-white";

    if (i === today) {
        dayEl.className = "h-10 flex items-center justify-center rounded-md cursor-pointer text-sm bg-blue-600 text-white font-semibold";
    
    }
    daysContainer.appendChild(dayEl);
}
}

(async function initCalendar(){
    const todayData = await fetchToday();
    if(!todayData) return;

    updateHeader(todayData);
    renderDays(todayData);
})();