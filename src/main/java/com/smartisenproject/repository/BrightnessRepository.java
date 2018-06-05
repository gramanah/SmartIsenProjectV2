package com.smartisenproject.repository;

import com.smartisenproject.domain.Brightness;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Brightness entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BrightnessRepository extends JpaRepository<Brightness, Long> {

}
