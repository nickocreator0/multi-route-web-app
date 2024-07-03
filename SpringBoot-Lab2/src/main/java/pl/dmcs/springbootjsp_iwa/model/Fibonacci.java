package pl.dmcs.springbootjsp_iwa.model;

import jakarta.persistence.GeneratedValue;

public class Fibonacci {
    @GeneratedValue
    private int number;

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}
