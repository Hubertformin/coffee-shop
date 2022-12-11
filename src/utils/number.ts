export function formatCurrency(amount: number) {
    let value = amount || 0;
    const formatter = new Intl.NumberFormat('en-CM', {
        style: 'currency',
        currency: 'XAF'
    });

    return formatter.format(value);
}