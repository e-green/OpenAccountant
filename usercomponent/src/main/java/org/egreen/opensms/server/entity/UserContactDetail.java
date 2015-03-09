package org.egreen.opensms.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

/**
 * Created by dewmal on 7/14/14.
 */
@Entity
@Table(name = "user_contact_detail")
@JsonIgnoreProperties
public class UserContactDetail implements EntityInterface<Long> {
    private Long userId;
    private String title;
    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;
    private String mobileNumber;
    private String email;
    private String fax;
;



    @Id
    @Column(name = "user_id")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "firstname")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "middlename")
    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    @Basic
    @Column(name = "lastname")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "mobile_number")
    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    @Basic
    @Column(name = "fax")
    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    @Basic
    @Column(name = "phone_number")
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }



    @Transient
    @Override
    public Long getId() {
        return getUserId();
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserContactDetail detail = (UserContactDetail) o;

        if (email != null ? !email.equals(detail.email) : detail.email != null) return false;
        if (fax != null ? !fax.equals(detail.fax) : detail.fax != null) return false;
        if (firstName != null ? !firstName.equals(detail.firstName) : detail.firstName != null) return false;
        if (lastName != null ? !lastName.equals(detail.lastName) : detail.lastName != null) return false;
        if (middleName != null ? !middleName.equals(detail.middleName) : detail.middleName != null) return false;
        if (mobileNumber != null ? !mobileNumber.equals(detail.mobileNumber) : detail.mobileNumber != null)
            return false;
        if (phoneNumber != null ? !phoneNumber.equals(detail.phoneNumber) : detail.phoneNumber != null) return false;
        if (title != null ? !title.equals(detail.title) : detail.title != null) return false;
        if (userId != null ? !userId.equals(detail.userId) : detail.userId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId != null ? userId.hashCode() : 0;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (firstName != null ? firstName.hashCode() : 0);
        result = 31 * result + (middleName != null ? middleName.hashCode() : 0);
        result = 31 * result + (lastName != null ? lastName.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);
        result = 31 * result + (mobileNumber != null ? mobileNumber.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (fax != null ? fax.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "UserContactDetail{" +
                "userId=" + userId +
                ", title='" + title + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", email='" + email + '\'' +
                ", fax='" + fax + '\'' +
                '}';
    }
}
