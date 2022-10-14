package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Department;
import com.example.demo.entity.DepartmentRepository;
import com.example.demo.entity.Employee;
import com.example.demo.modal.vo.DepartmentVO;
import com.example.demo.modal.vo.EmployeeVO;
import com.example.demo.modal.vo.ResponseResultVO;

@CrossOrigin("*")//因為安全性的關係，瀏覽器預設都會限制跨網域請求。需要開放一個對應的API連線，而CORS就是一個瀏覽器要做跨網域請求的規範
@RestController //某个控制器中所有的方法都只是返回数据而不是页面的话，就可以使用@RestController注解。@RestController是一个组合注解，它组合了@Controller注解和@ResponseBody注解，

public class DepartmentCTR {

    @Autowired
    private DepartmentRepository departmentRepository;
    
    @PostMapping("/department")
    public ResponseEntity<?> createDepartment(@RequestBody Department department){
        departmentRepository.save(department);
        ResponseResultVO responseResultVO = new ResponseResultVO();
        responseResultVO.setResultMessage("Create Completely");
        return ResponseEntity.ok().body(responseResultVO);

    }
    
    
    @PutMapping("/department/{id}")
    public ResponseEntity<?> updateEmployee(
        @PathVariable("id") Integer deaprtmentId, @RequestBody Department department){

        department.setId(deaprtmentId);
        departmentRepository.save(department);
        ResponseResultVO responseResultVO = new ResponseResultVO();
        responseResultVO.setResultMessage("Update Completely");
        return ResponseEntity.ok().body(responseResultVO);
    }

    @DeleteMapping("/department/{id}")
    public ResponseEntity<?> deleteDepartment( @PathVariable("id") Integer employeeId){
        departmentRepository.deleteById(employeeId);
        //資源原先是存在的，就回傳狀態碼204（No Content），意思跟200一樣是請求成功，但回應主體沒有內容。若資源原先並不存在，則回傳狀態碼404
        ResponseResultVO responseResultVO = new ResponseResultVO();
        responseResultVO.setResultMessage("Delete Completely");
        return ResponseEntity.ok().body(responseResultVO);

    }

    @GetMapping("/department/{id}")
    public DepartmentVO findDepartment(@PathVariable("id") Integer Id){
        Department data= departmentRepository.findById(Id).orElse(null);
        System.out.println(data.getName());
        DepartmentVO result = new DepartmentVO();
        result.setId(data.getId());
        result.setName(data.getName());
        List<EmployeeVO> employeeList  = new ArrayList<EmployeeVO>();
        for(Employee eItem:data.getEmployees()){
            EmployeeVO employeeVO = new EmployeeVO();
            employeeVO.setId(eItem.getId());
            employeeVO.setName(eItem.getName());
            employeeList.add(employeeVO);
        }
        result.setEmployees(employeeList);
        return result;
    }

    @GetMapping("/department")
    public List<DepartmentVO> findAllDepartment(){
         

        List<Department> data = (List<Department>) departmentRepository.findAll();
        List<DepartmentVO> result = new ArrayList<DepartmentVO>();
        for(Department item:data){
            DepartmentVO newData = new DepartmentVO();
            newData.setId(item.getId());
            newData.setName(item.getName());

            List<EmployeeVO> employeeList  = new ArrayList<EmployeeVO>();
            for(Employee eItem:item.getEmployees()){
                EmployeeVO employeeVO = new EmployeeVO();
                employeeVO.setId(eItem.getId());
                employeeVO.setName(eItem.getName());
                employeeList.add(employeeVO);
            }
            newData.setEmployees(employeeList);

            result.add(newData);
        }
        
        // System.out.println(result.get(0).getEmployees().size());
        return result;
    }

    
}
