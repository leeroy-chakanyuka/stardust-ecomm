package stardust.shop.runner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.FileSystemResource;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

/** Runs the catalog seed only when explicitly enabled, after JPA validates the schema. */
@Component
@ConditionalOnProperty(prefix = "app.seed", name = "enabled", havingValue = "true")
public class CatalogSeedRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(CatalogSeedRunner.class);

    private final DataSource dataSource;
    private final Path seedPath;

    public CatalogSeedRunner(DataSource dataSource, @Value("${app.seed.path}") String seedPath) {
        if (seedPath.isBlank()) {
            throw new IllegalArgumentException("app.seed.path must point to a catalog SQL file");
        }
        this.dataSource = dataSource;
        this.seedPath = Path.of(seedPath).toAbsolutePath().normalize();
    }

    @Override
    public void run(String... args) {
        if (!Files.isRegularFile(seedPath) || !Files.isReadable(seedPath)) {
            throw new IllegalStateException("Catalog seed SQL file is missing or unreadable: " + seedPath);
        }

        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.addScript(new FileSystemResource(seedPath));
        populator.setSqlScriptEncoding(StandardCharsets.UTF_8.name());
        populator.setSeparator(";");
        populator.setContinueOnError(false);

        log.info("Seeding catalog from {}", seedPath);
        // Roll back on SQL failure before returning the connection to the pool.
        TransactionTemplate transaction = new TransactionTemplate(new DataSourceTransactionManager(dataSource));
        transaction.executeWithoutResult(status -> populator.execute(dataSource));
        log.info("Catalog seeding complete");
    }
}
