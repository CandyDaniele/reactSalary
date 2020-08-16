const formatterCurrecy = Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
const formatterPercent = Intl.NumberFormat('pt-BR', {style: 'percent', maximumFractionDigits:2 });

function formatCurrency(value){
  return formatterCurrecy.format(value);
}

function formatPercent(value){
  return formatterPercent.format(value);
}
 
export { formatCurrency, formatPercent };