package kr.or.semo.notice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.notice.model.service.NoticeService;
import kr.or.semo.notice.model.vo.Notice;

@RestController
@RequestMapping(value="/notice")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	@GetMapping(value="/list/{reqPage}")
	public Map list(@PathVariable int reqPage) {
		Map map = noticeService.noticeList(reqPage);
		return map;
	}
	
	@GetMapping(value="/view/{noticeNo}")
	public Notice view(@PathVariable int noticeNo) {
		return noticeService.selectOneNotice(noticeNo);
	}
	
	@PostMapping(value="/insert")
	public int insertNotice(@ModelAttribute Notice n, @RequestAttribute String memberId) {
		System.out.println("n은 "+n);
		System.out.println("memberId는 "+memberId);
		n.setMemberId(memberId);
		int result = noticeService.insertNotice(n);
		return result;
	}
}
