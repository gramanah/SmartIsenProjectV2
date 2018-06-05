package com.smartisenproject.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Room.
 */
@Entity
@Table(name = "room")
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "windows")
    private Boolean windows;

    @Column(name = "door")
    private Boolean door;

    @Column(name = "heater")
    private Boolean heater;

    @Column(name = "light")
    private Boolean light;

    @Column(name = "presence")
    private Boolean presence;

    @Column(name = "global_temperature")
    private Float globalTemperature;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    private Floor floor;

    @ManyToOne
    private Building building;

    @OneToMany(mappedBy = "room")
    @JsonIgnore
    private Set<Sensor> sensors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Room name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isActive() {
        return active;
    }

    public Room active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean isWindows() {
        return windows;
    }

    public Room windows(Boolean windows) {
        this.windows = windows;
        return this;
    }

    public void setWindows(Boolean windows) {
        this.windows = windows;
    }

    public Boolean isDoor() {
        return door;
    }

    public Room door(Boolean door) {
        this.door = door;
        return this;
    }

    public void setDoor(Boolean door) {
        this.door = door;
    }

    public Boolean isHeater() {
        return heater;
    }

    public Room heater(Boolean heater) {
        this.heater = heater;
        return this;
    }

    public void setHeater(Boolean heater) {
        this.heater = heater;
    }

    public Boolean isLight() {
        return light;
    }

    public Room light(Boolean light) {
        this.light = light;
        return this;
    }

    public void setLight(Boolean light) {
        this.light = light;
    }

    public Boolean isPresence() {
        return presence;
    }

    public Room presence(Boolean presence) {
        this.presence = presence;
        return this;
    }

    public void setPresence(Boolean presence) {
        this.presence = presence;
    }

    public Float getGlobalTemperature() {
        return globalTemperature;
    }

    public Room globalTemperature(Float globalTemperature) {
        this.globalTemperature = globalTemperature;
        return this;
    }

    public void setGlobalTemperature(Float globalTemperature) {
        this.globalTemperature = globalTemperature;
    }

    public User getUser() {
        return user;
    }

    public Room user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Floor getFloor() {
        return floor;
    }

    public Room floor(Floor floor) {
        this.floor = floor;
        return this;
    }

    public void setFloor(Floor floor) {
        this.floor = floor;
    }

    public Building getBuilding() {
        return building;
    }

    public Room building(Building building) {
        this.building = building;
        return this;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }

    public Set<Sensor> getSensors() {
        return sensors;
    }

    public Room sensors(Set<Sensor> sensors) {
        this.sensors = sensors;
        return this;
    }

    public Room addSensors(Sensor sensor) {
        this.sensors.add(sensor);
        sensor.setRoom(this);
        return this;
    }

    public Room removeSensors(Sensor sensor) {
        this.sensors.remove(sensor);
        sensor.setRoom(null);
        return this;
    }

    public void setSensors(Set<Sensor> sensors) {
        this.sensors = sensors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Room room = (Room) o;
        if (room.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), room.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", active='" + isActive() + "'" +
            ", windows='" + isWindows() + "'" +
            ", door='" + isDoor() + "'" +
            ", heater='" + isHeater() + "'" +
            ", light='" + isLight() + "'" +
            ", presence='" + isPresence() + "'" +
            ", globalTemperature=" + getGlobalTemperature() +
            "}";
    }
}
