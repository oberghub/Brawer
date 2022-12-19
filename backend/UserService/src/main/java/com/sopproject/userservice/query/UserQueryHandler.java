package com.sopproject.userservice.query;

import com.sopproject.userservice.core.UserEntity;
import com.sopproject.userservice.core.data.UserRepository;
import com.sopproject.userservice.query.rest.UserRestModel;
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
    UserRestModel findUserByEmail(FindByEmail query){
        UserRestModel userRestModel = new UserRestModel();
        UserEntity storedUser = userRepository.findByEmail(query.getEmail());
        BeanUtils.copyProperties(storedUser, userRestModel);
        return userRestModel;
    }
}

