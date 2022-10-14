package com.example.demo.entity;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartService {
    @Autowired
    DepartDao departDao;

    public Optional<Department> getEmployeeByDepartId(Integer id) {
        Optional<Department> data = departDao.findById(id);
        return data;
    }
}
