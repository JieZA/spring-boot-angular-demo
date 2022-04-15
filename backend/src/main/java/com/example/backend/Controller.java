package com.example.backend;

import com.example.backend.repository.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class Controller {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    @PostMapping("/users")
    public void addUser(@RequestBody User user,
                        HttpServletResponse response) {
        Optional<User> u = userRepository.findById(user.getId());
        if(!u.equals(Optional.empty())){
            System.out.println("Id for user already exists!");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id for user already exists!");
        }
        userRepository.save(user);
        response.setStatus(HttpServletResponse.SC_OK);
    }

    @GetMapping("/users/{id}")
    public Optional<User> getUser(@PathVariable Long id,
                        HttpServletResponse response) throws IOException {
        Optional<User> user = userRepository.findById(id);
        if(user.equals(Optional.empty())){
            System.out.println("Id for user not found!");
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");
        }
        return user;
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id,
                           HttpServletResponse response) throws IOException {
        Optional<User> user = userRepository.findById(id);
        if(user.equals(Optional.empty())){
            System.out.println("Id for user not found!");
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!");
        } else {
            userRepository.deleteById(id);
            response.setStatus(HttpServletResponse.SC_OK);
        }
    }
}
