(function(){
  var CARD_MM = 85.6;
  var ppi = (323 / CARD_MM) * 25.4;
  var calEl  = document.getElementById('ml-calibrate');
  var cardEl = document.getElementById('ml-card-box');
  var ppiEl  = document.getElementById('ml-ppi');
  var mEl    = document.getElementById('ml-measure');
  var barEl  = document.getElementById('ml-bar');
  var mmEl   = document.getElementById('ml-mm');
  var szEl   = document.getElementById('ml-size');
  var dsEl   = document.getElementById('ml-desc');
  if(!calEl) return;
  var chart = [
    {s:'XS', min:5,    max:10.4, d:'Petite / Small hands'},
    {s:'S',  min:10.5, max:12.4, d:'Most common fit'},
    {s:'M',  min:12.5, max:13.4, d:'Average hands ✓ Best seller'},
    {s:'L',  min:13.5, max:20,   d:'Wider / Larger hands'}
  ];
  function mmToPct(mm){
    var px = mm * (ppi / 25.4);
    var maxPx = barEl.parentElement.offsetWidth;
    return Math.min((px / maxPx) * 100, 100);
  }
  function getSize(mm){
    for(var i=0;i<chart.length;i++){
      if(mm >= chart[i].min && mm <= chart[i].max) return chart[i];
    }
    return mm > 20 ? {s:'L+', d:'Contact us for custom sizing'} : chart[0];
  }
  function updateMeasure(){
    var mm = parseFloat(mEl.value);
    barEl.style.width = mmToPct(mm) + '%';
    mmEl.textContent = mm.toFixed(1) + ' mm';
    var s = getSize(mm);
    szEl.textContent = s.s;
    dsEl.textContent = s.d;
  }
  calEl.addEventListener('input', function(){
    var px = parseInt(calEl.value);
    cardEl.style.width = px + 'px';
    ppi = (px / CARD_MM) * 25.4;
    ppiEl.textContent = 'PPI: ' + ppi.toFixed(1) + ' ✓ calibrated';
    updateMeasure();
  });
  mEl.addEventListener('input', updateMeasure);
  updateMeasure();
})();
