package guru.springframework.juniemvc.mappers;

import guru.springframework.juniemvc.entities.Customer;
import guru.springframework.juniemvc.models.CustomerDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for Customer entity and CustomerDto
 */
@Mapper
public interface CustomerMapper {

    @Mapping(target = "beerOrders", ignore = true)
    CustomerDto customerToCustomerDto(Customer customer);

    @Mapping(target = "beerOrders", ignore = true)
    Customer customerDtoToCustomer(CustomerDto customerDto);
}
