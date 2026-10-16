package stardust.shop.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.util.Locale;

/** Keeps stored object keys portable between local static files and public S3/CDN URLs. */
@Component
public class MediaUrlResolver {

    private final String baseUrl;

    public MediaUrlResolver(@Value("${app.media.base-url:/images}") String baseUrl) {
        String value = baseUrl.strip();
        URI base = URI.create(value);
        if ((!value.startsWith("/") && !isAbsoluteUrl(value))
                || value.startsWith("//") || base.getQuery() != null || base.getFragment() != null) {
            throw new IllegalArgumentException("Media base URL must be an HTTP(S) URL or root-relative path");
        }
        this.baseUrl = value.replaceAll("/+$", "");
    }

    /** Resolve a key for the API, leaving remote originals intact. */
    public String toUrl(String reference) {
        String key = toReference(reference);
        if (key == null || key.isBlank() || isAbsoluteUrl(key) || key.startsWith("//")) {
            return key;
        }
        return baseUrl + "/" + key;
    }

    /** Accept API read-back values without persisting the environment-specific prefix. */
    public String toReference(String reference) {
        if (reference == null || reference.isBlank()) {
            return reference;
        }
        String value = reference.strip();
        if (value.startsWith("//")) {
            return value;
        }
        String prefix = baseUrl + "/";
        if (value.startsWith(prefix)) {
            value = value.substring(prefix.length());
        }
        if (isAbsoluteUrl(value) || value.startsWith("//")) {
            return value;
        }
        return value.replaceAll("^/+", "");
    }

    private static boolean isAbsoluteUrl(String value) {
        String lower = value.toLowerCase(Locale.ROOT);
        return lower.startsWith("https://") || lower.startsWith("http://");
    }
}
