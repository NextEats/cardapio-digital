export default function getOrderPosition(orderDataByCashBoxId) {
  return orderDataByCashBoxId.data ? orderDataByCashBoxId?.data.length + 1 : 1;
}
