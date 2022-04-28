export const formatCurrency = (value: number) => {
   const number = Number(value);

   return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
   }).format(number);
};
