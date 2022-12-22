package com.example.userservice.server;

import com.example.userservice.core.data.UserRepository;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

public class UserServer {


    public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder.forPort(50054)
                .addService(new UserServiceImpl())
                .build();
        server.start();
        Runtime.getRuntime().addShutdownHook(new Thread(()->{
            System.out.println("Server Shutdown");
            server.shutdown();
        }));
        server.awaitTermination();
    }
}
