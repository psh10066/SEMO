package kr.or.semo.kakao.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import kr.or.semo.kakao.oauth.OauthMember;
import kr.or.semo.kakao.oauth.OauthProvider;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class KakaoMember implements OauthMember{
	
	@JsonProperty("kakao_account") 
	private KakaoAccount kakao_account; // response와 데이터 매핑을 위한 _사용
	
	
	
	@Getter
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class KakaoAccount{
		private Profile profile;
		private String email;
		
		@Getter
		@JsonIgnoreProperties(ignoreUnknown = true)
		public class Profile{
			private String nickname;
		}
	}

	@Override
	public String getEmail() {
		return kakao_account.email;
	}

	@Override
	public String getNickName() {
		return kakao_account.profile.nickname;
	}

	@Override
	public OauthProvider getOauthProvider() {
		return OauthProvider.KAKAO;
	}
}