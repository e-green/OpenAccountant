package org.egreen.opensms.server.model;

/**
 * Created by Pramoda Fernando on 3/23/2015.
 */


import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
public class MailMail {

    private MailSender mailSender;

    public void setMailSender(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String from, String to, String subject, String msg) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(msg);
        mailSender.send(message);
    }
}
