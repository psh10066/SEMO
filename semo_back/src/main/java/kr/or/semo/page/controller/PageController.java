package kr.or.semo.page.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.group.model.vo.Group;
import kr.or.semo.page.model.service.PageService;

@RestController
@RequestMapping(value="/page")
public class PageController {
	@Autowired
	private PageService pageService;
	
	@GetMapping(value="/list/{reqPage}/{categoryLocal}/{categoryValue}")
	public Map list(@PathVariable int reqPage, @PathVariable String categoryLocal, @PathVariable String categoryValue) {
		//System.out.println("reqPage는 "+reqPage);
		//System.out.println("categoryLocal은 "+categoryLocal);
		//System.out.println("categoryValue는 "+categoryValue);
		Map map = pageService.pageList(reqPage,categoryLocal,categoryValue);
		return map;
	}
	
	@GetMapping(value="/searchSocialing/{searchKeyword}/{reqPage}")
	public Map searchSocialing(@PathVariable String searchKeyword, @PathVariable int reqPage) {
		//System.out.println("searchKeyword는 "+searchKeyword);
		//System.out.println("reqPage는 "+reqPage);
		Map map = pageService.searchSocialing(searchKeyword,reqPage);
		return map;
	}
	
	@GetMapping(value="/searchFeed/{searchKeyword}/{reqPage}")
	public Map searchFeed(@PathVariable String searchKeyword, @PathVariable int reqPage) {
		//System.out.println("searchKeyword는 "+searchKeyword);
		//System.out.println("reqPage는 "+reqPage);
		Map map = pageService.searchFeed(searchKeyword,reqPage);
		return map;
	}
	
	@GetMapping(value="/loungeList/{reqPage}")
	public Map loungeList(@PathVariable int reqPage) {
		//System.out.println("reqPage는 ");
		Map map = pageService.loungeList(reqPage);
		return map;
	}
	
	//지역 검색
	@GetMapping(value="/searchLocal/{searchKeyword}/{reqPage}")
	public Map searchLocal(@PathVariable String searchKeyword, @PathVariable int reqPage) {
		Map map = pageService.searchLocal(searchKeyword,reqPage);
		return map;
	}
	
	
}
