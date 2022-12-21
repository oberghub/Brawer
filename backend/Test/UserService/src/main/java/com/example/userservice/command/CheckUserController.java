package com.example.userservice.command;

import com.example.userservice.command.rest.UserRestModel;
import com.proto.user.CreateUserRequest;
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

import java.util.ArrayList;

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
        System.out.println("it me "+response);

        if(response.getId().isEmpty()){
            System.out.println("out empty");
            CreateUserRequest createRequest = CreateUserRequest.newBuilder()
                    .setName(model.getName())
                    .setEmail(model.getEmail())
                    .build();
            User createResponse = syncClient.createUser(createRequest);
            System.out.println(createResponse);

            UserRestModel model2 = new UserRestModel();
            BeanUtils.copyProperties(createResponse, model2);
            model2.set_id(createResponse.getId());
            ArrayList<String> favBooks = new ArrayList<>();
            for(int i=0;i<createResponse.getFavouriteBooksCount();i++){
                favBooks.add(createResponse.getFavouriteBooks(i));
            }
            model2.setFavouriteBooks(favBooks);
            channel.shutdown();
            return model2;
        }else{
            System.out.println("out data");
            UserRestModel model2 = new UserRestModel();
            BeanUtils.copyProperties(response, model2);
            model2.set_id(response.getId());
            ArrayList<String> favBooks = new ArrayList<>();
            for(int i=0;i<response.getFavouriteBooksCount();i++){
                favBooks.add(response.getFavouriteBooks(i));
            }
            model2.setFavouriteBooks(favBooks);
            channel.shutdown();
            return model2;
        }



    }
}
