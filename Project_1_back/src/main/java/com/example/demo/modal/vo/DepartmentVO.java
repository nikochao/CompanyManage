package com.example.demo.modal.vo;

import java.util.List;

public class DepartmentVO {
    private int id;

    private String name;

    private List<EmployeeVO> employees;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<EmployeeVO> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeVO> employees) {
        this.employees = employees;
    } 

    
}
