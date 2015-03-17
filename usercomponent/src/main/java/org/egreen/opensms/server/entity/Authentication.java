package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

/**
 * Created by Pramoda Fernando on 3/17/2015.
 */

@Entity
@Table(name = "authentication")
@JsonIgnoreProperties
public class Authentication implements EntityInterface<Long> {

    private Long authenticationId;
    private String userName;
    private String password;
    private boolean status;



    @Id
    @Column(name = "authentication_id")
    public Long getAuthenticationId() {
        return authenticationId;
    }

    public void setAuthenticationId(Long authenticationId) {
        this.authenticationId = authenticationId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    @Transient
    public Long getId() {
        return getAuthenticationId();
    }

    @Override
    public String toString() {
        return "Authentication{" +
                "authenticationId=" + authenticationId +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", status=" + status +
                '}';
    }
}
