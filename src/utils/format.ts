export function formatCurrency(
  amount: number,
  currency = "NGN"
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
