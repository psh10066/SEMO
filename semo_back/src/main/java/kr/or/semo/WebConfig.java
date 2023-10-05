package kr.or.semo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// TODO Auto-generated method stub
		registry.addResourceHandler("/groupBoard/**")
		.addResourceLocations("file:///C:/Temp/semo/groupBoard/");
		
		registry.addResourceHandler("/groupBoard/editor/**")
		.addResourceLocations("file:///C:/Temp/semo/groupBoard/editor/");
		
		registry.addResourceHandler("/group/**")
		.addResourceLocations("file:///C:/Temp/semo/group/");
		
		registry.addResourceHandler("/group/editor/**")
		.addResourceLocations("file:///C:/Temp/semo/group/editor/");
	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
