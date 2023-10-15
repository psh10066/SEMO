package kr.or.semo.groupPhoto.controller;

import java.io.File;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.semo.FileUtil;
import kr.or.semo.groupPhoto.model.service.GroupPhotoService;
import kr.or.semo.groupPhoto.model.vo.GroupPhoto;

@RestController
@RequestMapping(value="/groupPhoto")
public class GroupPhotoController {
	@Autowired
	private GroupPhotoService groupPhotoService;
	@Autowired
	private FileUtil fileUtil;
	@Value("${file.root}")
	private String root;
	
	@GetMapping(value="/list/{groupNo}/{reqPage}")
	public Map list(@PathVariable int groupNo, @PathVariable int reqPage) {
		Map map = groupPhotoService.groupPhotoList(groupNo, reqPage);
		return map;
	}
	@PostMapping(value="/insert")
	public int insertGroupPhoto(@ModelAttribute GroupPhoto gp, @ModelAttribute MultipartFile thumbnail, @RequestAttribute String memberId) {
		gp.setMemberId(memberId);
		String savepath = root+"groupPhoto/";
		if(thumbnail != null) {
			String filename = thumbnail.getOriginalFilename();
			String filepath = fileUtil.getfilepath(savepath, filename, thumbnail);
			gp.setGrPhotoImg(filepath);
		}
		int result = groupPhotoService.insertGroupPhoto(gp);
		return result;
	}
	
	@GetMapping(value="/view/{grPhotoNo}")
	public GroupPhoto view(@PathVariable int grPhotoNo) {
		return groupPhotoService.selectOneGroupPhoto(grPhotoNo);
	}
	//수정
	@PostMapping(value="/modify")
	public int modify(@ModelAttribute GroupPhoto gp, @ModelAttribute MultipartFile thumbnail) {
		if(gp.getGrPhotoImg().equals("null")) {
			gp.setGrPhotoImg(null);
		}
		if(thumbnail != null) {
			String savepath = root+"groupPhoto/";
			File delFile = new File(savepath + gp.getGrPhotoImg());
			delFile.delete();
			String filepath = fileUtil.getfilepath(savepath, thumbnail.getOriginalFilename(), thumbnail);
			gp.setGrPhotoImg(filepath);
		}
		int result = groupPhotoService.updateGroupPhoto(gp);
		return result;
		}
			
	//삭제
	@GetMapping(value="/delete/{grPhotoNo}")
	public int deletePhoto(@PathVariable int grPhotoNo) {
		String grPhotoImg = groupPhotoService.delete(grPhotoNo);
		if(grPhotoImg != null) {
			String savepath = root+"groupPhoto/";
			File delFile = new File(savepath+grPhotoImg);
			delFile.delete();
			return 1;
		}else {
			return 0;
		}
	}
}