package kr.or.semo.report.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.member.model.vo.Member;
import kr.or.semo.report.model.service.ReportService;
import kr.or.semo.report.model.vo.Report;

@RestController
@RequestMapping(value="/report")
public class ReportController {
	@Autowired
	private ReportService reportService;

	@GetMapping(value="/reportList/{reqPage}")
	public Map reportList(@PathVariable int reqPage) {
		return reportService.reportList(reqPage);
	}
	
	@PostMapping(value="/insert")
	public int insertReport(@ModelAttribute Report r) {
		System.out.println("r은 "+r);
		//System.out.println("memberNo는 "+memberNo);
		//r.setMemberNo(memberNo);
		int result = reportService.insertReport(r);
		return result;
	}
	
	@GetMapping(value="/mygroup/{memberNo}")
	public List myGroupList(@PathVariable int memberNo) {
		return reportService.myGroupList(memberNo);
	}
	
}
