package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.entity.Department;
import com.example.demo.entity.Employee;
import com.example.demo.entity.EmployeeRepository;
import com.example.demo.modal.vo.DepartmentVO;
import com.example.demo.modal.vo.EmployeeVO;
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
        System.out.println(employee.getDepartment());
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
    public EmployeeVO findEmployee(@PathVariable("id") Integer employeeId){
        Employee data= employeeRepository.findById(employeeId).orElse(null);
        EmployeeVO result = new EmployeeVO();
        result.setId(data.getId());
        result.setName(data.getName());

        Department eItem=data.getDepartment();
        DepartmentVO departmentvo = new DepartmentVO();
        departmentvo.setId(eItem.getId());
        departmentvo.setName(eItem.getName());

        result.setDepartment(departmentvo);
        
        return result;
    }

    @GetMapping("/employee")
    public List<EmployeeVO> findAllEmployee(){

        List<Employee> data=(List<Employee>) employeeRepository.findAll();
        List<EmployeeVO> result = new ArrayList<EmployeeVO>();
        for(Employee item:data){
            EmployeeVO newdata = new EmployeeVO();
            newdata.setId(item.getId());
            newdata.setName(item.getName());

            Department eItem=item.getDepartment();
            DepartmentVO departmentvo = new DepartmentVO();
            departmentvo.setId(eItem.getId());
            departmentvo.setName(eItem.getName());

            newdata.setDepartment(departmentvo);
            
            result.add(newdata);
        }
        return result;
        
    }

    @GetMapping("/employeedepartment/{id}")
    public List<EmployeeVO> findDepartmentEmployee(@PathVariable("id") Integer departId){
        List<Employee> data= (List<Employee>) employeeRepository.findByDepart_id(departId);
        List<EmployeeVO> result = new ArrayList<EmployeeVO>();
        for(Employee item:data){
            EmployeeVO newdata = new EmployeeVO();
            newdata.setId(item.getId());
            newdata.setName(item.getName());

            Department eItem=item.getDepartment();
            DepartmentVO departmentvo = new DepartmentVO();
            departmentvo.setId(eItem.getId());
            departmentvo.setName(eItem.getName());

            newdata.setDepartment(departmentvo);
            
            result.add(newdata);
        }
        return result;
        }
    



    
    
}


