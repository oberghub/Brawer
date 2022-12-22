package com.example.userservice.query;

import com.example.userservice.core.UserEntity;
import com.example.userservice.core.data.UserRepository;
import com.example.userservice.query.rest.UserRestModel;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserQueryHandler {

    private final UserRepository userRepository;

    public UserQueryHandler(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @QueryHandler
    List<UserRestModel> findUsers(FindUsersQuery query){
        List<UserRestModel> usersRest = new ArrayList<>();
        List<UserEntity> storedUsers = userRepository.findAll();
        for(UserEntity userEntity : storedUsers){
            UserRestModel userRestModel = new UserRestModel();
            BeanUtils.copyProperties(userEntity, userRestModel);
            usersRest.add(userRestModel);
        }
        return usersRest;
    }

    @QueryHandler
    public UserRestModel findUserByEmail(FindByEmail query){
        UserRestModel userRestModel = new UserRestModel();
        UserEntity storedUser = userRepository.findByEmail(query.getEmail());
        if(storedUser != null){
            BeanUtils.copyProperties(storedUser, userRestModel);
            return userRestModel;
        }
        return null;
    }

    @QueryHandler
    public UserRestModel findUserById(FindUserByIdQuery query){
        UserRestModel userRestModel = new UserRestModel();
        UserEntity storedUser = userRepository.findByUserId(query.get_id());
        if(storedUser != null){
            BeanUtils.copyProperties(storedUser, userRestModel);
            return userRestModel;
        }
        return null;
    }
}

