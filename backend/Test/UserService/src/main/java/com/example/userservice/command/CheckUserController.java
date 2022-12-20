package com.example.userservice.command;

import com.example.userservice.command.rest.UserRestModel;
import com.proto.user.GetUserByEmailRequest;
import com.proto.user.User;
import com.proto.user.UserServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class CheckUserController {
    @GetMapping("/isexist")
    public UserRestModel checkUser(@RequestBody UserRestModel model){
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress("localhost",50054)
                .usePlaintext()
                .build();
        UserServiceGrpc.UserServiceBlockingStub syncClient = UserServiceGrpc.newBlockingStub(channel);
        GetUserByEmailRequest request = GetUserByEmailRequest.newBuilder().setEmail(model.getEmail()).build();
        User response = syncClient.getUserByEmail(request);
        System.out.println(response);
        channel.shutdown();
        UserRestModel model2 = new UserRestModel();
        BeanUtils.copyProperties(response, model2);
        model2.set_id(response.getId());
        return model2;

    }
}
