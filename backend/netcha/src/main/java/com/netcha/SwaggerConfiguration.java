package com.netcha;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;

import springfox.documentation.builders.*;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

//	Swagger 설정 확인
//	http://localhost:8000/{your-app-root}/v2/api-docs
//	http://localhost:8000/guestbook/v2/api-docs?group=V1
//	Swagger-UI 확인
//	http://localhost:8080/{your-app-root}/swagger-ui.html
//	http://localhost:8000/guestbook/swagger-ui.html

//	http://localhost:9000/netcha/swagger-ui.html#/
	private String version = "V1";
	private String title = "NETCHA API " + version;
	

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(this.apiInfo())
				.select()
				.apis(Predicates.not(RequestHandlerSelectors.basePackage("org.springframework.boot")))
				.paths(PathSelectors.any()).build();
	}
	
//	@Bean
//	public Docket api() {
//		List<ResponseMessage> responseMessages = new ArrayList<ResponseMessage>();
//		responseMessages.add(new ResponseMessageBuilder().code(200).message("OK !!!").build());
//		responseMessages.add(new ResponseMessageBuilder().code(500).message("서버 문제 발생 !!!").responseModel(new ModelRef("Error")).build());
//		responseMessages.add(new ResponseMessageBuilder().code(404).message("페이지를 찾을 수 없습니다 !!!").build());
//		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).groupName(version).select()
//					.apis(RequestHandlerSelectors.basePackage("com.netcha.movie.controller"))
//					.paths(postPaths()).build()
//					.useDefaultResponseMessages(false)
//					.globalResponseMessage(RequestMethod.GET,responseMessages);
//	}
	
	private Predicate<String> postPaths() {
		return PathSelectors.any();
//		return or(regex("/admin/.*"), regex("/user/.*"));
//		return regex("/admin/.*");
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title(title)
				.description("<h3>NETCHA</h3>").build();

	}
	

}
