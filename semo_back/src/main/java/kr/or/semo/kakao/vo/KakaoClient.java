package kr.or.semo.kakao.vo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import kr.or.semo.kakao.oauth.OauthClient;
import kr.or.semo.kakao.oauth.OauthMember;
import kr.or.semo.kakao.oauth.OauthParams;
import kr.or.semo.kakao.oauth.OauthProvider;
import lombok.extern.slf4j.Slf4j;

//카카오 로그인의 토큰 발급 및 유저정보 요청 객체
@Slf4j
@Component
public class KakaoClient implements OauthClient{
	private static final String GRANT_TYPE = "authorization_code";
	
	@Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
	private String token_url;
	@Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
	private String user_url;
	@Value("${spring.security.oauth2.client.registration.kakao.client-id}")
	private String client_id;
	@Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
	private String redirect_uri;
	
	@Override
	public OauthProvider oauthProvider() {
		return OauthProvider.KAKAO;
	}
	
	@Override
	public String getOauthLoginToken(OauthParams oauthParams) {
		String url = token_url;
		log.debug("전달할 code:: " + oauthParams.getAuthorizationCode());

		RestTemplate rt = new RestTemplate();
		// 헤더 생성
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		// 바디 생성
		MultiValueMap<String, String> body = oauthParams.makeBody();
		body.add("grant_type", GRANT_TYPE);
		body.add("client_id", client_id);
		body.add("redirect_uri", redirect_uri);

		// 헤더와 바디 합체
		HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity(body, headers);
		log.debug("현재 httpEntity 상태:: " + tokenRequest);

		// 토큰 수신
		KakaoToken accessToken = rt.postForObject(url, tokenRequest, KakaoToken.class);
		log.debug("accessToken :: " + accessToken);

		return accessToken.getAccess_token();
	}

	@Override
	public OauthMember getMemberInfo(String accessToken) {
		String url = user_url;
		
		log.debug("넘어온 토큰은:: " + accessToken);

		// 요청 객체 생성
		RestTemplate rt = new RestTemplate();

		// 헤더 생성
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		headers.add("Authorization", "Bearer " + accessToken); // accessToken 정보 전달
		
		// 바디 생성
		MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
		body.add("property_keys",  "[\"kakao_account.email\", \"kakao_account.profile\"]");
		
		// 헤더 + 바디 조합
		HttpEntity<MultiValueMap<String, String>> infoRequest = new HttpEntity<>(body, headers);
		
		//요청 반환데이터를 메소드 리턴값으로 반환
		return rt.postForObject(url, infoRequest, KakaoMember.class);
	}
}