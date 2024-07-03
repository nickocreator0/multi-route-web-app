package pl.dmcs.springbootjsp_iwa.controllers;

import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.springbootjsp_iwa.model.Address;
import pl.dmcs.springbootjsp_iwa.model.Student;
import pl.dmcs.springbootjsp_iwa.repository.AddressRepository;
import pl.dmcs.springbootjsp_iwa.repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/students")
public class StudentRESTController {

    private StudentRepository studentRepository;
    private AddressRepository addressRepository;

    @Autowired
    public StudentRESTController(StudentRepository studentRepository, AddressRepository addressRepository) {
        this.studentRepository = studentRepository;
        this.addressRepository = addressRepository;
    }


    // Get all students
    @RequestMapping(method = RequestMethod.GET/*, produces = "application/xml"*/)
    //@GetMapping
    public List<Student> findAllStudents() { return studentRepository.findAll();
    }

    // Get student by id
    @RequestMapping(value= "/{id}",method = RequestMethod.GET)
    public Student findStudentById(@PathVariable("id") long id) {
        return studentRepository.findById(id);
    }

    // Add one student
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {

        System.out.println("Student object:");
        System.out.println(student);

        if (student.getAddress() == null) {
            // Student has no address
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Is the address a new address
        if (student.getAddress().getId() <= 0 )
        {
            System.out.println("Saving new address...");
            addressRepository.save(student.getAddress());
        }
        studentRepository.save(student);
        System.out.println("Received student object: " + student);
        return new ResponseEntity<Student>(student, HttpStatus.CREATED);
    }

    // Add a collection of students
    @RequestMapping(value="/add-collection", method = RequestMethod.POST)
    public ResponseEntity<List<Student>> addStudentCollection(@RequestBody List<Student> students) {

        // Do the addresses already exist
        for (Student student : students) {
            if (student.getAddress().getId() <= 0)
                addressRepository.save(student.getAddress());
        }
        studentRepository.saveAll(students);
        return new ResponseEntity<>(students, HttpStatus.CREATED);
    }

    // Delete student by id
    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Student> deleteStudent (@PathVariable("id") long id) {
        Student student = studentRepository.findById(id);
        if (student == null) {
            System.out.println("Student not found!");
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
        studentRepository.deleteById(id);
        return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
    }

    // Delete the entire collection
    @RequestMapping(value="/del-all-students", method = RequestMethod.DELETE)
    public ResponseEntity<Student> deleteStudentCollection() {
        List<Student> students = studentRepository.findAll();
        if (students.isEmpty()) {
            System.out.println("Collection Empty!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        studentRepository.deleteAll();
        return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
    }

    // Update student by id
    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Student> updateStudent(@RequestBody Student student, @PathVariable("id") long id) {
        // Extract the id of the student-to-be-updated
        student.setId(id);
        studentRepository.save(student);
        return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
    }

    // Update entire student collection
    @RequestMapping(value="/update-all-students", method = RequestMethod.PUT)
    public ResponseEntity<List<Student>> updateStudentCollection(@RequestBody List<Student> students) {
        //studentRepository.deleteAll();
        //studentRepository.saveAll(students);
        deleteStudentCollection();
        addStudentCollection(students);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Update without having to send the entire student object in the request body
    @RequestMapping(value="/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Student> partialUpdateStudent(@RequestBody Map<String, Object> updates, @PathVariable("id") long id) {
        Student student = studentRepository.findById(id);
        if (student == null) {
            System.out.println("Student not found!");
            return new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(student,updates);
        return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
    }



    @RequestMapping(method = RequestMethod.HEAD)
    public void findStudentsNoResponseBody() { studentRepository.findAll();
    }

    // Returns the HTTP methods available
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> ShowAvailableMethods() {
        return ResponseEntity.ok().allow(
                HttpMethod.GET, HttpMethod.POST,
                HttpMethod.DELETE, HttpMethod.PUT, HttpMethod.PATCH,
                HttpMethod.OPTIONS
        ).build();
    }


    private void partialUpdate(Student student, Map<String, Object> updates) {
        if (updates.containsKey("firstname")) {
            student.setFirstname((String) updates.get("firstname"));
        }
        if (updates.containsKey("lastname")) {
            student.setLastname((String) updates.get("lastname"));
        }
        if (updates.containsKey("email")) {
            student.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("telephone")) {
            student.setTelephone((String) updates.get("telephone"));
        }
        studentRepository.save(student);
    }

}
