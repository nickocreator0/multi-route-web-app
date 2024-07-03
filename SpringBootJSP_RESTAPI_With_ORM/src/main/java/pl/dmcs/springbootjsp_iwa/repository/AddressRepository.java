package pl.dmcs.springbootjsp_iwa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dmcs.springbootjsp_iwa.model.Address;
import pl.dmcs.springbootjsp_iwa.model.Student;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Address findById(long id);
}
