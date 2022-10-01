package com.example.gerenciamentobens;

import lombok.NonNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class GerenciamentoDeBensApplication {

	public static void main(String[] args) {
		SpringApplication.run(GerenciamentoDeBensApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(@NonNull CorsRegistry registry) {
				registry
						.addMapping("**")
						.allowedOrigins("**")
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}
}
