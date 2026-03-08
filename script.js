// Hilfsfunktionen
function toggleTooltip(id) {
    document.getElementById(id).classList.toggle('hidden');
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'text-white');
        btn.classList.add('text-slate-500');
    });

    document.getElementById('tab-' + tabName).classList.remove('hidden');
    const activeBtn = document.getElementById('btn-' + tabName);
    activeBtn.classList.add('active', 'text-white');
    activeBtn.classList.remove('text-slate-500');
}

function calculateAll() {
    const cent = parseFloat(document.getElementById('priceCent').value) || 0;
    const euro = cent / 100;

    // --- HAUSHALT ---
    const watt = parseFloat(document.getElementById('wattInput').value) || 0;
    const hours = parseFloat(document.getElementById('hoursInput').value) || 0;
    const kwhYear = (watt * hours / 1000) * 365;
    document.getElementById('resDay').innerText = ((watt * hours / 1000) * euro).toFixed(2);
    document.getElementById('resYear').innerText = (kwhYear * euro).toFixed(2);

    // --- SOLAR DETAILS ---
    const solarWatt = parseFloat(document.getElementById('solarInput').value) || 0;
    const sunHours = parseFloat(document.getElementById('sunHours').value) || 0;
    const solarGenYear = (solarWatt / 1000) * sunHours; // Ertrag in kWh
    const solarSave = solarGenYear * euro;
    
    document.getElementById('solarSaveYear').innerText = solarSave.toFixed(0);
    document.getElementById('calcProd').innerText = solarGenYear.toFixed(0);

    // --- AUTO & JAHRESERSPARNIS ---
    const kmYear = parseFloat(document.getElementById('annualKm').value) || 0;
    const evKwh = parseFloat(document.getElementById('evCons').value) || 0;
    const fPrice = parseFloat(document.getElementById('fuelPrice').value) || 0;
    const iceL = parseFloat(document.getElementById('iceCons').value) || 0;
    
    const ev100 = evKwh * euro;
    const ice100 = iceL * fPrice;
    const saving100 = ice100 - ev100;
    const savingYear = (saving100 / 100) * kmYear;
    
    document.getElementById('evResult').innerHTML = `
        <div class="p-4 rounded-2xl mint-bg border-2 mint-border shadow-sm">
            <div class="flex justify-between text-xs font-medium text-slate-500 mb-2">
                <span>⚡ E-Auto Kosten:</span> <span>${ev100.toFixed(2)}€ / 100km</span>
            </div>
            <div class="flex justify-between text-xs font-medium text-slate-500 mb-4 pb-2 border-b border-white">
                <span>⛽ Verbrenner:</span> <span>${ice100.toFixed(2)}€ / 100km</span>
            </div>
            <div class="text-center">
                <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Deine Ersparnis pro Jahr</p>
                <p class="text-3xl font-black mint-text-dark">
                    ${savingYear.toFixed(2)} € 🎉
                </p>
                <p class="text-[9px] text-slate-400 mt-1">(bei ${kmYear.toLocaleString()} km Fahrleistung)</p>
            </div>
        </div>
    `;
}

function updateDeviceTemplate() {
    const val = document.getElementById('deviceSelect').value;
    if (val !== "0") document.getElementById('wattInput').value = val;
    calculateAll();
}

window.onload = () => {
    document.querySelectorAll('input').forEach(i => i.addEventListener('input', calculateAll));
    calculateAll();
};