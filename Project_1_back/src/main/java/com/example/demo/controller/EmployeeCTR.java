package com.example.demo.controller;

import java.util.List;


import com.example.demo.entity.Employee;
import com.example.demo.entity.EmployeeRepository;
import com.example.demo.modal.vo.ResponseResultVO;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")//因為安全性的關係，瀏覽器預設都會限制跨網域請求。需要開放一個對應的API連線，而CORS就是一個瀏覽器要做跨網域請求的規範
@RestController //某个控制器中所有的方法都只是返回数据而不是页面的话，就可以使用@RestController注解。@RestController是一个组合注解，它组合了@Controller注解和@ResponseBody注解，

public class EmployeeCTR {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee){
        employeeRepository.save(employee);
        ResponseResultVO responseResultVO = new ResponseResultVO();
        responseResultVO.setResultMessage("Create Completely");
        return ResponseEntity.ok().body(responseResultVO);

    }
    
    
    @PutMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(
        @PathVariable("id") Integer employeeId, @RequestBody Employee employee){

        employee.setId(employeeId);
        employeeRepository.save(employee);
        ResponseResultVO responseResultVO = new ResponseResultVO();
        responseResultVO.setResultMessage("Update Completely");
        return ResponseEntity.ok().body(responseResultVO);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteProduct( @PathVariable("id") Integer employeeid){
        employeeRepository.deleteById(employeeid);
        //資源原先是存在的，就回傳狀態碼204（No Content），意思跟200一樣是請求成功，但回應主體沒有內容。若資源原先並不存在，則回傳狀態碼404
        ResponseResultVO responseResultVO = new ResponseResultVO();
        responseResultVO.setResultMessage("Delete Completely");
        return ResponseEntity.ok().body(responseResultVO);

    }

    @GetMapping("/employee/{id}")
    public Employee findEmployee(@PathVariable("id") Integer employeeId){
        Employee employee= employeeRepository.findById(employeeId).orElse(null);
        return employee;
    }

    @GetMapping("/employee")
    public List<Employee> findAllEmployee(){
        return (List<Employee>) employeeRepository.findAll();
    }

    @GetMapping("/department/{id}")
    public List<Employee> findDepartmentEmployee(@PathVariable("id") Integer departId){
        return (List<Employee>) employeeRepository.findByDepart_id(departId);
    }



    
    
}


