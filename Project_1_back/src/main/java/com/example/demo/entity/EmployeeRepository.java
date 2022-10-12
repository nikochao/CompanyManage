package com.example.demo.entity;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.ArrayList;
import java.util.List;
public interface EmployeeRepository extends CrudRepository<Employee, Integer>{
    @Query(value="SELECT idemployee, employee_name, employee_depart FROM employee WHERE employee_depart = :depart_id", nativeQuery = true)
    List <Employee> findByDepart_id(Integer depart_id);
}
