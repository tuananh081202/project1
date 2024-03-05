import { Test, TestingModule } from '@nestjs/testing';
import { PaymentcartController } from './paymentcart.controller';

describe('PaymentcartController', () => {
  let controller: PaymentcartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentcartController],
    }).compile();

    controller = module.get<PaymentcartController>(PaymentcartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
