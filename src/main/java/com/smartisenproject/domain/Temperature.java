package com.smartisenproject.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Temperature.
 */
@Entity
@Table(name = "temperature")
public class Temperature implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_value")
    private Float value;

    @Column(name = "jhi_time")
    private LocalDate time;

    @OneToOne
    @JoinColumn(unique = true)
    private Sensor sensor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getValue() {
        return value;
    }

    public Temperature value(Float value) {
        this.value = value;
        return this;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public LocalDate getTime() {
        return time;
    }

    public Temperature time(LocalDate time) {
        this.time = time;
        return this;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    public Sensor getSensor() {
        return sensor;
    }

    public Temperature sensor(Sensor sensor) {
        this.sensor = sensor;
        return this;
    }

    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
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
        Temperature temperature = (Temperature) o;
        if (temperature.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), temperature.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Temperature{" +
            "id=" + getId() +
            ", value=" + getValue() +
            ", time='" + getTime() + "'" +
            "}";
    }
}
