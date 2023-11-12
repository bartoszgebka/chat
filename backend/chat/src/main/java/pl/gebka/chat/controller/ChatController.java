package pl.gebka.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import pl.gebka.chat.controller.model.Message;
import pl.gebka.chat.controller.model.User;
import pl.gebka.chat.service.ChatService;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/login")
    @SendTo("/chat/messages")
    public Message login(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        return this.chatService.login(user, simpMessageHeaderAccessor);
    }

    @MessageMapping("/sendMessage")
    @SendTo("/chat/messages")
    public Message sendMessages(Message message) {
        return chatService.sendMessage(message);
    }

    @MessageMapping("/members")
    @SendTo("/chat/members")
    public List<User> getMembers() {
        return chatService.getAllMembers();
    }
}
