import { getOrdersProductsTotalPrice } from './index';

const mockSingle = jest.fn();
const mockIn = jest.fn();

jest.mock('../../server/api', () => {
  const mockSelect = jest.fn().mockImplementation(() => ({
    in: mockIn,
    eq: jest.fn().mockImplementation(() => ({ single: mockSingle })),
  }));

  return {
    supabase: {
      from: jest.fn().mockImplementation(() => ({
        select: mockSelect,
      })),
    },
    mockSingle,
    mockIn,
    mockSelect,
  };
});

import { supabase } from '../../server/api';

describe('getOrdersProductsTotalPrice', () => {
  it('returns the correct product price without additionals', async () => {
    const product_id = 1;

    mockSingle.mockResolvedValueOnce({ data: { price: 10 } });

    const totalPrice = await getOrdersProductsTotalPrice({
      product_id,
      additionals: null,
    });

    expect(supabase.from).toHaveBeenCalledWith('products');
    expect(totalPrice).toEqual(10);
  });

  it('returns the correct product price with additionals', async () => {
    const product_id = 1;
    const additionals = [
      { additional_id: 1, quantity: 1 },
      { additional_id: 2, quantity: 2 },
    ];

    const mockData = [
      { id: 1, price: 5 },
      { id: 2, price: 10 },
    ];

    mockSingle.mockResolvedValueOnce({ data: { price: 10 } });
    mockIn.mockResolvedValueOnce({ data: mockData });

    const totalPrice = await getOrdersProductsTotalPrice({
      product_id,
      additionals,
    });

    expect(supabase.from).toHaveBeenCalledWith('additionals');
    expect(totalPrice).toEqual(35);
  });
});
