package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

/**
 * Created by Pramoda Fernando on 3/23/2015.
 */

@Entity
@Table(name = "authentication_user")
@JsonIgnoreProperties
public class AuthenticationUser implements EntityInterface<Long>{

    private Long authentication_userId;
    private String username;
    private String password;
    private String status;

    @Id
    @Column(name = "authentication_userId")
    public Long getAuthentication_userId() {
        return authentication_userId;
    }

    public void setAuthentication_userId(Long authentication_userId) {
        this.authentication_userId = authentication_userId;
    }

    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "status")
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AuthenticationUser that = (AuthenticationUser) o;

        if (authentication_userId != null ? !authentication_userId.equals(that.authentication_userId) : that.authentication_userId != null)
            return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (username != null ? !username.equals(that.username) : that.username != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = authentication_userId != null ? authentication_userId.hashCode() : 0;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }

    @Override
    @Transient
    public Long getId() {
        return getAuthentication_userId();
    }

    @Override
    public String toString() {
        return "AuthenticationUser{" +
                "authentication_userId=" + authentication_userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
