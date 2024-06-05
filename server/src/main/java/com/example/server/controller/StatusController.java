package com.example.server.controller;

import java.util.List;
import java.util.Optional;

import com.example.server.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entity.Status;
import com.example.server.repository.StatusRepository;

@CrossOrigin(origins = "*")
@RestController
public class StatusController {

    @Autowired
    StatusRepository repo;

    @GetMapping("/status/all")
    public List<Status> getAllStatus() {
        List<Status> status = repo.findAll();
        return status;
    }

    // localhost:8080/status/1
    @GetMapping("/status/{id}")
    public Status getStatus(@PathVariable int id) {
        Status status = repo.findById(id).get();
        return status;
    }

    @PostMapping("/status/add")
    public ResponseEntity<Status> createStatus(@RequestBody Status status) {
        try {
            Status newStatus = repo.save(status);
            return new ResponseEntity<>(newStatus, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/status/update/{id}")
    public ResponseEntity<ApiResponse> updateStatus(@PathVariable("id") int id, @RequestBody Status status) {
        try {
            Optional<Status> statusData = repo.findById(id);
            if (statusData.isPresent()) {
                Status _status = statusData.get();
                _status.setUsername(status.getUsername());
                _status.setRunningDistance(status.getRunningDistance());
                _status.setRunningTime(status.getRunningTime());
                _status.setRunningPace(status.getRunningPace());
                _status.setPushupsCount(status.getPushupsCount());
                _status.setWeightliftWeight(status.getWeightliftWeight());
                repo.save(_status);
                return ResponseEntity.ok().body(new ApiResponse("Status updated successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Status with id " + id + " not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed to update status: " + e.getMessage()));
        }
    }


    @DeleteMapping("/status/delete/{id}")
    public ApiResponse removeStatus(@PathVariable int id){
        Status status = repo.findById(id).get();
        repo.delete(status);
        return new ApiResponse("Status deleted successfully");
    }
}