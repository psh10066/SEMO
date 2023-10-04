package kr.or.semo.admin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.admin.model.service.AdminService;
import kr.or.semo.admin.model.vo.Admin;

@RestController
@RequestMapping(value="/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@GetMapping(value="/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		return adminService.memberList(reqPage);
	}
	@PostMapping(value="/changeType")
	public int changeType(@RequestBody Admin admin){
		return adminService.changeType(admin);
	}
}
