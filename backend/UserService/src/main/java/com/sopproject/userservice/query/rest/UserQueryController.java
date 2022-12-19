package com.sopproject.userservice.query.rest;

import com.sopproject.userservice.query.FindByEmail;
import com.sopproject.userservice.query.FindUsersQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserQueryController {

    @Autowired
    QueryGateway queryGateway;

    @GetMapping
    public List<UserRestModel> getUser() {
        FindUsersQuery findUsersQuery = new FindUsersQuery();
        List<UserRestModel> users = queryGateway
                .query(findUsersQuery, ResponseTypes.multipleInstancesOf(UserRestModel.class)).join();
        return users;
    }

    @GetMapping(value = "/{email}")
    public UserRestModel getUserByEmail(@PathVariable String email) {
        FindByEmail findByEmail = new FindByEmail(email);
        UserRestModel user = queryGateway
                .query(findByEmail, ResponseTypes.instanceOf(UserRestModel.class)).join();
        return user;
    }
}

