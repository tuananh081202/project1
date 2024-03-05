import { Test, TestingModule } from '@nestjs/testing';
import { PaymentcartService } from './paymentcart.service';

describe('PaymentcartService', () => {
  let service: PaymentcartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentcartService],
    }).compile();

    service = module.get<PaymentcartService>(PaymentcartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
