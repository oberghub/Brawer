package com.example.userservice.server;

import com.example.userservice.command.rest.UserRestModel;
import com.example.userservice.core.UserEntity;
import com.example.userservice.core.data.UserRepository;
import com.example.userservice.query.UserQueryHandler;

import com.proto.user.CreateUserRequest;
import com.proto.user.GetUserByEmailRequest;
import com.proto.user.User;
import com.proto.user.UserServiceGrpc;
import io.grpc.stub.StreamObserver;
import org.springframework.beans.BeanUtils;
import org.springframework.web.reactive.function.BodyInserter;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.ArrayList;

public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {

    @Override
    public void getUserByEmail(GetUserByEmailRequest request, StreamObserver<User> responseObserver){
        String email = request.getEmail();
        System.out.println(email);
        UserRestModel model = WebClient.create()
                .get()
                .uri("http://localhost:8082/user-service/users/" + email)
                .retrieve()
                .bodyToMono(UserRestModel.class)
                .block();
        if(model != null){
            System.out.println("i come not null path");
            User response = User.newBuilder()
                    .setId(model.get_id())
                    .setEmail(model.getEmail())
                    .setName(model.getName())
                    .setRole(model.getRole())
                    .addAllFavouriteBooks(model.getFavouriteBooks())
                    .build();
            System.out.println(model.getFavouriteBooks());
            responseObserver.onNext(response);
        }else{
            System.out.println("i come null path");
            responseObserver.onNext(null);
        }

        responseObserver.onCompleted();
    }

    @Override
    public void createUser(CreateUserRequest request, StreamObserver<User> responseObserver){
        System.out.println(request);
        UserRestModel modeltosent = new UserRestModel();
        modeltosent.setName(request.getName());
        modeltosent.setEmail(request.getEmail());
        modeltosent.setRole("user");
        String out = WebClient.create()
                .post()
                .uri("http://localhost:8082/user-service/user")
                .body(BodyInserters.fromValue(modeltosent))
                .retrieve()
                .bodyToMono(String.class)
                .block();
        UserRestModel model = WebClient.create()
                .get()
                .uri("http://localhost:8082/user-service/users/id/"+out)
                .retrieve()
                .bodyToMono(UserRestModel.class)
                .block();
        System.out.println(model);
        User response = User.newBuilder()
                .setId(model.get_id())
                .setEmail(model.getEmail())
                .setName(model.getName())
                .setRole(model.getRole())
                .addAllFavouriteBooks(model.getFavouriteBooks())
                .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
