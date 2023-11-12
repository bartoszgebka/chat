package pl.gebka.chat.controller.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Builder
@AllArgsConstructor
@Getter
public class Message {
    private User user;
    private String text;
    private Date date;
    private MessageType type;
}
