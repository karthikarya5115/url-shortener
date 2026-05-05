package com.urlshortener.service;

import com.urlshortener.entity.UrlMapping;
import com.urlshortener.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class UrlService {
    @Autowired
    private UrlRepository urlRepository;

    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int SHORT_CODE_LENGTH = 6;
    private final Random random = new Random();

    public UrlMapping shortenUrl(String originalUrl) {
        // Check if already exists
        return urlRepository.findByOriginalUrl(originalUrl)
                .orElseGet(() -> {
                    UrlMapping mapping = new UrlMapping();
                    mapping.setOriginalUrl(originalUrl);
                    mapping.setShortCode(generateUniqueShortCode());
                    mapping.setCreatedAt(LocalDateTime.now());
                    return urlRepository.save(mapping);
                });
    }

    public String resolveUrl(String shortCode) {
        return urlRepository.findByShortCode(shortCode)
                .map(UrlMapping::getOriginalUrl)
                .orElse(null);
    }

    private String generateUniqueShortCode() {
        String shortCode;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < SHORT_CODE_LENGTH; i++) {
                sb.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
            }
            shortCode = sb.toString();
        } while (urlRepository.findByShortCode(shortCode).isPresent());
        return shortCode;
    }
}
