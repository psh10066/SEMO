package kr.or.semo.report.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.report.model.service.ReportService;

@RestController
@RequestMapping(value="/report")
public class ReportController {
	@Autowired
	private ReportService reportService;

	@GetMapping(value="/reportList/{reqPage}")
	public Map reportList(@PathVariable int reqPage) {
		return reportService.reportList(reqPage);
	}
}
