package com.smartisenproject.web.rest;

import com.smartisenproject.SmartIsenProjectV2App;

import com.smartisenproject.domain.Temperature;
import com.smartisenproject.repository.TemperatureRepository;
import com.smartisenproject.service.TemperatureService;
import com.smartisenproject.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.smartisenproject.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TemperatureResource REST controller.
 *
 * @see TemperatureResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SmartIsenProjectV2App.class)
public class TemperatureResourceIntTest {

    private static final Float DEFAULT_VALUE = 1F;
    private static final Float UPDATED_VALUE = 2F;

    private static final LocalDate DEFAULT_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TIME = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TemperatureRepository temperatureRepository;

    @Autowired
    private TemperatureService temperatureService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTemperatureMockMvc;

    private Temperature temperature;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TemperatureResource temperatureResource = new TemperatureResource(temperatureService);
        this.restTemperatureMockMvc = MockMvcBuilders.standaloneSetup(temperatureResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Temperature createEntity(EntityManager em) {
        Temperature temperature = new Temperature()
            .value(DEFAULT_VALUE)
            .time(DEFAULT_TIME);
        return temperature;
    }

    @Before
    public void initTest() {
        temperature = createEntity(em);
    }

    @Test
    @Transactional
    public void createTemperature() throws Exception {
        int databaseSizeBeforeCreate = temperatureRepository.findAll().size();

        // Create the Temperature
        restTemperatureMockMvc.perform(post("/api/temperatures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(temperature)))
            .andExpect(status().isCreated());

        // Validate the Temperature in the database
        List<Temperature> temperatureList = temperatureRepository.findAll();
        assertThat(temperatureList).hasSize(databaseSizeBeforeCreate + 1);
        Temperature testTemperature = temperatureList.get(temperatureList.size() - 1);
        assertThat(testTemperature.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testTemperature.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    public void createTemperatureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = temperatureRepository.findAll().size();

        // Create the Temperature with an existing ID
        temperature.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTemperatureMockMvc.perform(post("/api/temperatures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(temperature)))
            .andExpect(status().isBadRequest());

        // Validate the Temperature in the database
        List<Temperature> temperatureList = temperatureRepository.findAll();
        assertThat(temperatureList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTemperatures() throws Exception {
        // Initialize the database
        temperatureRepository.saveAndFlush(temperature);

        // Get all the temperatureList
        restTemperatureMockMvc.perform(get("/api/temperatures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(temperature.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }

    @Test
    @Transactional
    public void getTemperature() throws Exception {
        // Initialize the database
        temperatureRepository.saveAndFlush(temperature);

        // Get the temperature
        restTemperatureMockMvc.perform(get("/api/temperatures/{id}", temperature.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(temperature.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTemperature() throws Exception {
        // Get the temperature
        restTemperatureMockMvc.perform(get("/api/temperatures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTemperature() throws Exception {
        // Initialize the database
        temperatureService.save(temperature);

        int databaseSizeBeforeUpdate = temperatureRepository.findAll().size();

        // Update the temperature
        Temperature updatedTemperature = temperatureRepository.findOne(temperature.getId());
        // Disconnect from session so that the updates on updatedTemperature are not directly saved in db
        em.detach(updatedTemperature);
        updatedTemperature
            .value(UPDATED_VALUE)
            .time(UPDATED_TIME);

        restTemperatureMockMvc.perform(put("/api/temperatures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTemperature)))
            .andExpect(status().isOk());

        // Validate the Temperature in the database
        List<Temperature> temperatureList = temperatureRepository.findAll();
        assertThat(temperatureList).hasSize(databaseSizeBeforeUpdate);
        Temperature testTemperature = temperatureList.get(temperatureList.size() - 1);
        assertThat(testTemperature.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testTemperature.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingTemperature() throws Exception {
        int databaseSizeBeforeUpdate = temperatureRepository.findAll().size();

        // Create the Temperature

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTemperatureMockMvc.perform(put("/api/temperatures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(temperature)))
            .andExpect(status().isCreated());

        // Validate the Temperature in the database
        List<Temperature> temperatureList = temperatureRepository.findAll();
        assertThat(temperatureList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTemperature() throws Exception {
        // Initialize the database
        temperatureService.save(temperature);

        int databaseSizeBeforeDelete = temperatureRepository.findAll().size();

        // Get the temperature
        restTemperatureMockMvc.perform(delete("/api/temperatures/{id}", temperature.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Temperature> temperatureList = temperatureRepository.findAll();
        assertThat(temperatureList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Temperature.class);
        Temperature temperature1 = new Temperature();
        temperature1.setId(1L);
        Temperature temperature2 = new Temperature();
        temperature2.setId(temperature1.getId());
        assertThat(temperature1).isEqualTo(temperature2);
        temperature2.setId(2L);
        assertThat(temperature1).isNotEqualTo(temperature2);
        temperature1.setId(null);
        assertThat(temperature1).isNotEqualTo(temperature2);
    }
}
