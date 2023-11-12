package pl.gebka.chat.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import pl.gebka.chat.controller.model.Message;
import pl.gebka.chat.controller.model.MessageType;
import pl.gebka.chat.service.WebSocketUserSessionService;

import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketDisconnectListener {

    private final SimpMessageSendingOperations messageSendingOperations;
    private final WebSocketUserSessionService webSocketUserSessionService;

    @EventListener
    public void handleDisconnectListener(SessionDisconnectEvent event) {
        var headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        var sessionId = headerAccessor.getSessionId();
        var user = webSocketUserSessionService.getUser(sessionId);

        log.info("user disconnected, {}", user.getName());

        var message = Message.builder()
                .date(new Date())
                .text(String.format("Użytkownik %s opuścił chat.", user.getName()))
                .user(user)
                .type(MessageType.DISCONNECT)
                .build();

        webSocketUserSessionService.removeUserSession(sessionId);
        messageSendingOperations.convertAndSend("/chat/members", webSocketUserSessionService.getAllUsers());
        messageSendingOperations.convertAndSend("/chat/messages", message);
    }

}
