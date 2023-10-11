package kr.or.semo.page.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.page.model.service.PageService;

@RestController
@RequestMapping(value="/page")
public class PageController {
	@Autowired
	private PageService pageService;
	
	@GetMapping(value="/list/{reqPage}/{categoryLocal}/{categoryValue}")
	public Map list(@PathVariable int reqPage, @PathVariable String categoryLocal, @PathVariable String categoryValue) {
		System.out.println("reqPage는 "+reqPage);
		System.out.println("categoryLocal은 "+categoryLocal);
		System.out.println("categoryValue는 "+categoryValue);
		Map map = pageService.pageList(reqPage,categoryLocal,categoryValue);
		return map;
	}
}
