package stardust.shop.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {


    @Bean
    public OpenAPI customOAPI(){
        return new OpenAPI().info(new Info().title("STARDUST SHOP APIS").description("A simple eccommerce application")
                .version("1.0").contact(new Contact()
                        .name("Leeroy Chakanyuka")
                        .email("chakanyukaleeroy4@gmail.com")
                        .url("github.com/leeroy-chakanyuka")));
    }
}
