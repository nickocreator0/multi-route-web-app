package pl.dmcs.springbootjsp_iwa.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Student {

    @Id
    @GeneratedValue
    private long id;
    private String firstname;
    private String lastname;
    private String email;
    private String telephone;

    // Commented out due to simplify http requests sent from angular app
    // CascadeType.All -> when storing student, it also stores the account


    //ORL
    @OneToOne(cascade = CascadeType.ALL)
    private Account account;
    //ORL

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE)
    private Address address;

    //ORL
    @ManyToMany(cascade = CascadeType.ALL)
    private List<Team> teamList;
    //ORL



    // Commented out due to simplify http requests sent from angular app

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    // Commented out due to simplify http requests sent from angular app

    //ORL
    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
    //ORL

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    //ORL
    public List<Team> getTeamList() {
        return teamList;
    }

    public void setTeamList(List<Team> teamList) {
        this.teamList = teamList;
    }
    //ORL


    // Commented out due to simplify http requests sent from angular app

}


