
export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}


export function computeAveragePriceWithReward(discountPercentage, price, threshold) {
  // compute the average price per snowball per person with the given price
  // threshold and discount percentage
  // compute this as the discount percent times two?
  // this is equivelant to making team size threshold + 1 then dividing by total price
  // 5 threahold team at 50 percent off for 5 dollars original price
  // discount price = 2.50
  // actual average sale price with reward = (price -(price * discountPercent )+ (price - (price * discountPercent * 2))   / teamSize
  price = Number(price);
  const amountOff = (price * discountPercentage);
  console.log(amountOff, price, discountPercentage, threshold);
  return (((price - amountOff) * threshold - 1) + (price - (amountOff * 2))) / threshold;
}
