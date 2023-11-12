package pl.gebka.chat.service;

import org.springframework.stereotype.Service;
import pl.gebka.chat.controller.model.User;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class WebSocketUserSessionService {
    private final Map<String, User> userSessions = new ConcurrentHashMap<>();

    public void addUserSession(String sessionId, User user) {
        userSessions.put(sessionId, user);
    }

    public User getUser(String sessionId) {
        return userSessions.get(sessionId);
    }

    public void removeUserSession(String sessionId) {
        userSessions.remove(sessionId);
    }

    public List<User> getAllUsers() {
        return userSessions.values().stream().toList();
    }
}
