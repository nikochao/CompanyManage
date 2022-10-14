package com.example.demo.modal.vo;

import com.example.demo.entity.Department;

public class EmployeeVO {
    private int id;

    private String name;
    
    private DepartmentVO department;

    public int getId() {
        return id;
    }

    public DepartmentVO getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentVO department) {
        this.department = department;
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


    
}
