package com.example.userservice.server;

import com.example.userservice.core.UserEntity;
import com.example.userservice.core.data.UserRepository;
import com.example.userservice.query.UserQueryHandler;
import com.proto.user.GetUserByEmailRequest;
import com.proto.user.User;
import com.proto.user.UserServiceGrpc;
import io.grpc.stub.StreamObserver;

import java.util.ArrayList;

public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {



    @Override
    public void getUserByEmail(GetUserByEmailRequest request, StreamObserver<User> responseObserver){
        String email = request.getEmail();
        System.out.println(email);
//        UserEntity storedUser = userRepository.findByEmail(email);
//        System.out.println(storedUser);

        User response = User.newBuilder()
                .setId("001")
                .setEmail("eeeee")
                .setName("dddd")
                .setRole("admin")
//                .setFavouriteBooks(0,"abc")
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
