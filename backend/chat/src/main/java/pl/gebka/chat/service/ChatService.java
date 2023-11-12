package pl.gebka.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import pl.gebka.chat.controller.model.Message;
import pl.gebka.chat.controller.model.MessageType;
import pl.gebka.chat.controller.model.User;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final WebSocketUserSessionService webSocketUserSessionService;
    private final SimpMessageSendingOperations messageSendingOperations;

    public Message login(User user, SimpMessageHeaderAccessor simpMessageHeaderAccessor) {
        webSocketUserSessionService.addUserSession(simpMessageHeaderAccessor.getSessionId(), user);

        messageSendingOperations.convertAndSend("/chat/members", webSocketUserSessionService.getAllUsers());

        return Message.builder()
                .date(new Date())
                .text(String.format("Użytkownik %s dołączył do chatu.", user.getName()))
                .user(user)
                .type(MessageType.JOIN)
                .build();
    }

    public Message sendMessage(Message message) {
        return Message.builder()
                .user(message.getUser())
                .text(message.getText())
                .type(message.getType())
                .date(message.getDate())
                .build();
    }

    public List<User> getAllMembers() {
        return webSocketUserSessionService.getAllUsers();
    }
}
