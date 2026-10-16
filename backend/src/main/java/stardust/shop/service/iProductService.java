package stardust.shop.service;

import stardust.shop.dto.ProductDto;

import java.util.UUID;

public interface iProductService extends IService<ProductDto, UUID> {

    ProductDto getByLegacyId(Integer legacyId);
}
