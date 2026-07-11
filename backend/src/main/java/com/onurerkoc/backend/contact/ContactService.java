package com.onurerkoc.backend.contact;

import org.springframework.stereotype.Service;

@Service
public class ContactService {
// validation için true false eklendi contact form suistimal edilip boş json formatından backende istek gönderilmesin diye güncellendi.
    public boolean isContactRequestValid(ContactRequestDto request) {
        if (request == null) {
            return false;
        }

        if (request.getName() == null || request.getName().isBlank()) {
            return false;
        }

        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return false;
        }

        if (!request.getEmail().contains("@")) {
            return false;
        }

        if (request.getMessage() == null || request.getMessage().isBlank()) {
            return false;
        }

        return true;
    }

    public String submitContact(ContactRequestDto request) {
        String cleanName = request.getName().trim();

        return "Message received from " + cleanName;
    }
}