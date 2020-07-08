import { log } from 'meteor/unchained:core-logger';
import { Orders } from 'meteor/unchained:core-orders';
import { OrderNotFoundError } from '../../errors';

export default function (root, { orderId }, { userId }) {
  log(`query order ${orderId}`, { userId, orderId });

  if (!orderId) throw new Error('invalid order ID provided');
  const selector = { _id: orderId };
  const order = Orders.findOne(selector);
  if (!order) throw new OrderNotFoundError({ orderId });

  return order;
}
