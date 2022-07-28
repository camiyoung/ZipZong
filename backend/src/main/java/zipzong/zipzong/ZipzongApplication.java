package zipzong.zipzong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing //시간에 대해 값을 자동으로 넣어줌
public class ZipzongApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZipzongApplication.class, args);
	}

}
