package com.smartisenproject.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A School.
 */
@Entity
@Table(name = "school")
public class School implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "name")
    @JsonIgnore
    private Set<Building> buildings = new HashSet<>();

    @OneToMany(mappedBy = "name")
    @JsonIgnore
    private Set<Floor> floors = new HashSet<>();

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

    public School name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Building> getBuildings() {
        return buildings;
    }

    public School buildings(Set<Building> buildings) {
        this.buildings = buildings;
        return this;
    }

    public School addBuilding(Building building) {
        this.buildings.add(building);
        building.setName(building.getName());
        return this;
    }

    public School removeBuilding(Building building) {
        this.buildings.remove(building);
        building.setName(null);
        return this;
    }

    public void setBuildings(Set<Building> buildings) {
        this.buildings = buildings;
    }

    public Set<Floor> getFloors() {
        return floors;
    }

    public School floors(Set<Floor> floors) {
        this.floors = floors;
        return this;
    }

    public School addFloors(Floor floor) {
        this.floors.add(floor);
        floor.setName(floor.getName());
        return this;
    }

    public School removeFloors(Floor floor) {
        this.floors.remove(floor);
        floor.setName(null);
        return this;
    }

    public void setFloors(Set<Floor> floors) {
        this.floors = floors;
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
        School school = (School) o;
        if (school.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), school.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "School{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
