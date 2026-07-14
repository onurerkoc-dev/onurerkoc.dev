package com.onurerkoc.backend.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactNotificationService {

    private static final Logger logger =
            LoggerFactory.getLogger(ContactNotificationService.class);

    private final JavaMailSender mailSender;
    private final boolean notificationEnabled;
    private final String senderEmail;
    private final String recipientEmail;

    public ContactNotificationService(
            JavaMailSender mailSender,
            @Value("${contact.notification.enabled:false}")
            boolean notificationEnabled,
            @Value("${spring.mail.username:}")
            String senderEmail,
            @Value("${contact.notification.to:}")
            String recipientEmail
    ) {
        this.mailSender = mailSender;
        this.notificationEnabled = notificationEnabled;
        this.senderEmail = senderEmail;
        this.recipientEmail = recipientEmail;
    }

    public void sendNewContactNotification(
            String name,
            String email,
            String message
    ) {
        if (!notificationEnabled) {
            logger.info("Contact email notification is disabled.");
            return;
        }

        if (senderEmail.isBlank() || recipientEmail.isBlank()) {
            logger.warn(
                    "Contact email notification skipped because email configuration is incomplete."
            );
            return;
        }

        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom(senderEmail);
        mailMessage.setTo(recipientEmail);
        mailMessage.setReplyTo(email);
        mailMessage.setSubject("New contact message from onurerkoc.dev");

        mailMessage.setText(
                """
                A new contact message was submitted.

                Name:
                %s

                Email:
                %s

                Message:
                %s
                """.formatted(name, email, message)
        );

        try {
            mailSender.send(mailMessage);
            logger.info("Contact email notification sent successfully.");
        } catch (MailException exception) {
            logger.error(
                    "Contact message was stored, but email notification could not be sent.",
                    exception
            );
        }
    }
}