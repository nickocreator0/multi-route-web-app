package pl.dmcs.springbootjsp_iwa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.Address;
import pl.dmcs.springbootjsp_iwa.model.Student;
import pl.dmcs.springbootjsp_iwa.repository.AddressRepository;
import pl.dmcs.springbootjsp_iwa.repository.StudentRepository;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/addresses")
public class AddressRESTController {
    private AddressRepository addressRepository;
    private StudentRepository studentRepository;

    @Autowired
    public AddressRESTController(AddressRepository addressRepository, StudentRepository studentRepository) {
        this.addressRepository = addressRepository;
        this.studentRepository = studentRepository;
    }

    // Delete ALL addresses
    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Address> deleteAddressCollection() {
        List<Address> addresses = addressRepository.findAll();
        if (addresses.isEmpty()) {
            System.out.println("Collection Empty!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Find all students associated with each address
        for(Address address: addresses){
            List<Student> students = address.getStudentList();

            for(Student student: students){
                student.setAddress(null);

                // To prevent actual students in DB from referencing the deleted address
                studentRepository.save(student);
            }

            // Assign `null` to addresses of these students
            // address.setStudentList(null);
        }
        addressRepository.deleteAll();
        return new ResponseEntity<Address>(HttpStatus.NO_CONTENT);
    }

    // Add an address
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Address> addAddress(@RequestBody Address address) {
        System.out.println("HERE!!!???");

        addressRepository.save(address);
        return new ResponseEntity<Address>(address, HttpStatus.CREATED);
    }

    // Find all addresses
    @RequestMapping(method = RequestMethod.GET)
    public List<Address> findAllAddresses() { return addressRepository.findAll();
    }

    // Find address by id
    @RequestMapping(value="/{id}",method = RequestMethod.GET)
    public Address findAddressById(@PathVariable("id") long id) {
        return addressRepository.findById(id);
    }

    // Delete address by id
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Address> deleteAddress (@PathVariable("id") long id) {
        Address address = addressRepository.findById(id);
        // System.out.println(address.getCity());

        // Find all students associated with this address
        List<Student> students = address.getStudentList();

        for(Student student: students){
            student.setAddress(null);

            // To prevent actual students in DB from referencing the deleted address
            studentRepository.save(student);
        }
        // Assign `null` to addresses of these students
        // address.setStudentList(null);
        addressRepository.deleteById(id);
        return new ResponseEntity<Address>(HttpStatus.NO_CONTENT);
    }


    // Update address by id
    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Address> updateAddressById(@RequestBody Address address, @PathVariable("id") long id) {
        // Extract the id of the address-to-be-updated
        address.setId(id);
        addressRepository.save(address);
        return new ResponseEntity<Address>(HttpStatus.NOT_FOUND);
    }

    // Update entire collection: Replace current collection with a new one
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<List<Address>> updateAddressCollection(@RequestBody List<Address> addresses) {
        this.deleteAddressCollection();
        List<Address> newSavedAddresses = addressRepository.saveAll(addresses);

        return new ResponseEntity<>(newSavedAddresses, HttpStatus.OK);
    }


    // Add a collection of addresses
    @RequestMapping(value="/add-address-collection", method = RequestMethod.POST)
    public ResponseEntity<List<Address>> addAddressCollection(@RequestBody List<Address> addresses) {

        addressRepository.saveAll(addresses);
        return new ResponseEntity<>(addresses, HttpStatus.CREATED);
    }


}

