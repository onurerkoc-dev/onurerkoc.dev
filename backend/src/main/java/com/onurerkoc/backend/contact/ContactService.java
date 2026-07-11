package com.onurerkoc.backend.contact;

import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactService(
            ContactMessageRepository contactMessageRepository
    ) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public boolean isContactRequestValid(ContactRequestDto request) {
        if (request == null) {
            return false;
        }

        if (request.getName() == null
                || request.getName().isBlank()
                || request.getName().trim().length() > 100) {
            return false;
        }

        if (request.getEmail() == null
                || request.getEmail().isBlank()
                || request.getEmail().trim().length() > 255) {
            return false;
        }

        if (!request.getEmail().contains("@")) {
            return false;
        }

        if (request.getMessage() == null
                || request.getMessage().isBlank()
                || request.getMessage().trim().length() > 2000) {
            return false;
        }

        return true;
    }

    public String submitContact(ContactRequestDto request) {
        String cleanName = request.getName().trim();
        String cleanEmail = request.getEmail().trim();
        String cleanMessage = request.getMessage().trim();

        ContactMessage contactMessage = new ContactMessage(
                cleanName,
                cleanEmail,
                cleanMessage
        );

        contactMessageRepository.save(contactMessage);

        return "Message received from " + cleanName;
    }
}