package com.smartisenproject.web.rest;

import com.smartisenproject.SmartIsenProjectV2App;

import com.smartisenproject.domain.Brightness;
import com.smartisenproject.repository.BrightnessRepository;
import com.smartisenproject.service.BrightnessService;
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
 * Test class for the BrightnessResource REST controller.
 *
 * @see BrightnessResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SmartIsenProjectV2App.class)
public class BrightnessResourceIntTest {

    private static final Float DEFAULT_VALUE = 1F;
    private static final Float UPDATED_VALUE = 2F;

    private static final LocalDate DEFAULT_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TIME = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private BrightnessRepository brightnessRepository;

    @Autowired
    private BrightnessService brightnessService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBrightnessMockMvc;

    private Brightness brightness;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BrightnessResource brightnessResource = new BrightnessResource(brightnessService);
        this.restBrightnessMockMvc = MockMvcBuilders.standaloneSetup(brightnessResource)
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
    public static Brightness createEntity(EntityManager em) {
        Brightness brightness = new Brightness()
            .value(DEFAULT_VALUE)
            .time(DEFAULT_TIME);
        return brightness;
    }

    @Before
    public void initTest() {
        brightness = createEntity(em);
    }

    @Test
    @Transactional
    public void createBrightness() throws Exception {
        int databaseSizeBeforeCreate = brightnessRepository.findAll().size();

        // Create the Brightness
        restBrightnessMockMvc.perform(post("/api/brightnesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brightness)))
            .andExpect(status().isCreated());

        // Validate the Brightness in the database
        List<Brightness> brightnessList = brightnessRepository.findAll();
        assertThat(brightnessList).hasSize(databaseSizeBeforeCreate + 1);
        Brightness testBrightness = brightnessList.get(brightnessList.size() - 1);
        assertThat(testBrightness.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testBrightness.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    public void createBrightnessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = brightnessRepository.findAll().size();

        // Create the Brightness with an existing ID
        brightness.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBrightnessMockMvc.perform(post("/api/brightnesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brightness)))
            .andExpect(status().isBadRequest());

        // Validate the Brightness in the database
        List<Brightness> brightnessList = brightnessRepository.findAll();
        assertThat(brightnessList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBrightnesses() throws Exception {
        // Initialize the database
        brightnessRepository.saveAndFlush(brightness);

        // Get all the brightnessList
        restBrightnessMockMvc.perform(get("/api/brightnesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(brightness.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(DEFAULT_TIME.toString())));
    }

    @Test
    @Transactional
    public void getBrightness() throws Exception {
        // Initialize the database
        brightnessRepository.saveAndFlush(brightness);

        // Get the brightness
        restBrightnessMockMvc.perform(get("/api/brightnesses/{id}", brightness.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(brightness.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()))
            .andExpect(jsonPath("$.time").value(DEFAULT_TIME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBrightness() throws Exception {
        // Get the brightness
        restBrightnessMockMvc.perform(get("/api/brightnesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBrightness() throws Exception {
        // Initialize the database
        brightnessService.save(brightness);

        int databaseSizeBeforeUpdate = brightnessRepository.findAll().size();

        // Update the brightness
        Brightness updatedBrightness = brightnessRepository.findOne(brightness.getId());
        // Disconnect from session so that the updates on updatedBrightness are not directly saved in db
        em.detach(updatedBrightness);
        updatedBrightness
            .value(UPDATED_VALUE)
            .time(UPDATED_TIME);

        restBrightnessMockMvc.perform(put("/api/brightnesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBrightness)))
            .andExpect(status().isOk());

        // Validate the Brightness in the database
        List<Brightness> brightnessList = brightnessRepository.findAll();
        assertThat(brightnessList).hasSize(databaseSizeBeforeUpdate);
        Brightness testBrightness = brightnessList.get(brightnessList.size() - 1);
        assertThat(testBrightness.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testBrightness.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingBrightness() throws Exception {
        int databaseSizeBeforeUpdate = brightnessRepository.findAll().size();

        // Create the Brightness

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBrightnessMockMvc.perform(put("/api/brightnesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(brightness)))
            .andExpect(status().isCreated());

        // Validate the Brightness in the database
        List<Brightness> brightnessList = brightnessRepository.findAll();
        assertThat(brightnessList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBrightness() throws Exception {
        // Initialize the database
        brightnessService.save(brightness);

        int databaseSizeBeforeDelete = brightnessRepository.findAll().size();

        // Get the brightness
        restBrightnessMockMvc.perform(delete("/api/brightnesses/{id}", brightness.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Brightness> brightnessList = brightnessRepository.findAll();
        assertThat(brightnessList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Brightness.class);
        Brightness brightness1 = new Brightness();
        brightness1.setId(1L);
        Brightness brightness2 = new Brightness();
        brightness2.setId(brightness1.getId());
        assertThat(brightness1).isEqualTo(brightness2);
        brightness2.setId(2L);
        assertThat(brightness1).isNotEqualTo(brightness2);
        brightness1.setId(null);
        assertThat(brightness1).isNotEqualTo(brightness2);
    }
}
