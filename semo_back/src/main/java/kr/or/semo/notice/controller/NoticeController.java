package kr.or.semo.notice.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
}
