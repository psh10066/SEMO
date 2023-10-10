package kr.or.semo.groupPhoto.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.semo.FileUtil;
import kr.or.semo.groupPhoto.model.service.GroupPhotoService;

@RestController
@RequestMapping(value="/groupPhoto")
public class GroupPhotoController {
	@Autowired
	private GroupPhotoService groupPhotoService;
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping(value="/list/{groupNo}/{reqPage}")
	public Map list(@PathVariable int groupNo, @PathVariable int reqPage) {
		Map map = groupPhotoService.groupPhotoList(groupNo, reqPage);
		return map;
	}
	

}
