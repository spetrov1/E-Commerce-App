package full.stack.rest.config;

import full.stack.rest.entity.Product;
import full.stack.rest.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.HttpMethods;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    HttpMethod[] unsupportedMethods = { HttpMethod.DELETE, HttpMethod.PUT, HttpMethod.POST };

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure( ((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)) )
                .withCollectionExposure( ((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)));

        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure( ((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)) )
                .withCollectionExposure( ((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)));
    }
}
