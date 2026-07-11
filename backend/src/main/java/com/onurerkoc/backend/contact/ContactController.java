package com.onurerkoc.backend.contact;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/api/contact")
    public ResponseEntity<String> submitContactForm(
            @RequestBody ContactRequestDto request
    ) {
        boolean validRequest =
                contactService.isContactRequestValid(request);

        if (!validRequest) {
            return ResponseEntity
                    .badRequest()
                    .body("Name, valid email and message are required and must be within allowed lengths.");
        }

        String responseMessage =
                contactService.submitContact(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responseMessage);
    }
}