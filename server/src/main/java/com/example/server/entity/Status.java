package com.example.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "status")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Username")
    private String username;

    @Column(name = "runningDistance")
    private String runningDistance;

    @Column(name = "runningTime")
    private String runningTime;

    @Column(name = "runningPace")
    private String runningPace;

    @Column(name = "pushupsCount")
    private String pushupsCount;

    @Column(name = "weightliftWeight")
    private String weightliftWeight;

    public Status() {
    }

    public Status(Integer id, String username, String runningDistance, String runningTime, String runningPace,
            String pushupsCount, String weightliftWeight) {
        this.id = id;
        this.username = username;
        this.runningDistance = runningDistance;
        this.runningTime = runningTime;
        this.runningPace = runningPace;
        this.pushupsCount = pushupsCount;
        this.weightliftWeight = weightliftWeight;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRunningDistance() {
        return runningDistance;
    }

    public void setRunningDistance(String runningDistance) {
        this.runningDistance = runningDistance;
    }

    public String getRunningTime() {
        return runningTime;
    }

    public void setRunningTime(String runningTime) {
        this.runningTime = runningTime;
    }

    public String getRunningPace() {
        return runningPace;
    }

    public void setRunningPace(String runningPace) {
        this.runningPace = runningPace;
    }

    public String getPushupsCount() {
        return pushupsCount;
    }

    public void setPushupsCount(String pushupsCount) {
        this.pushupsCount = pushupsCount;
    }

    public String getWeightliftWeight() {
        return weightliftWeight;
    }

    public void setWeightliftWeight(String weightliftWeight) {
        this.weightliftWeight = weightliftWeight;
    }

    @Override
    public String toString() {
        return "Status{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", runningDistance='" + runningDistance + '\'' +
                ", runningTime='" + runningTime + '\'' +
                ", runningPace='" + runningPace + '\'' +
                ", pushupsCount='" + pushupsCount + '\'' +
                ", weightliftWeight='" + weightliftWeight + '\'' +
                '}';
    }
}
