package pl.gebka.chat.controller.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class User {
    private String uuid;
    private String name;
    private String color;

    public User(String name) {
        this.name = name;
    }
}
