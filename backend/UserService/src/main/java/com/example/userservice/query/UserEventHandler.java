package com.example.userservice.query;

import com.example.userservice.core.UserEntity;
import com.example.userservice.core.data.UserRepository;
import com.example.userservice.core.event.UserCreatedEvent;
import com.example.userservice.core.event.UserDeletedEvent;
import com.example.userservice.core.event.UserUpdatedEvent;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class UserEventHandler {
    private final UserRepository userRepository;

    public UserEventHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @EventHandler
    public void on(UserCreatedEvent event){
        UserEntity entity = new UserEntity();
        BeanUtils.copyProperties(event,entity);
        userRepository.save(entity);
    }
    @EventHandler
    public void on(UserUpdatedEvent event){
        UserEntity entity = new UserEntity();
        BeanUtils.copyProperties(event,entity);
        userRepository.save(entity);
    }
    @EventHandler
    public void on(UserDeletedEvent event){
        userRepository.deleteById(event.get_id());
    }
}
