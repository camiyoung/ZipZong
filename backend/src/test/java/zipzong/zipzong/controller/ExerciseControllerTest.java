package zipzong.zipzong.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import zipzong.zipzong.api.controller.ExerciseController;
import zipzong.zipzong.api.dto.exercise.request.ExerciseResultRequest;
import zipzong.zipzong.api.dto.exercise.response.ExerciseResultResponse;
import zipzong.zipzong.api.service.ExerciseService;
import zipzong.zipzong.config.auth.OAuthService;
import zipzong.zipzong.config.jwt.JwtService;
import zipzong.zipzong.db.domain.Exercise;
import zipzong.zipzong.db.repository.memberteam.MemberRepository;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ExerciseController.class)
@AutoConfigureRestDocs
@MockBean(JpaMetamodelMappingContext.class)
public class ExerciseControllerTest {

    MockMvc mockMvc;

    @MockBean
    private OAuthService oAuthService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private MemberRepository memberRepository;

    @MockBean
    private ExerciseService exerciseService;

    @Test
    @DisplayName("운동 결과 저장 후 달성률 반환")
    void saveExerciseResult() throws  Exception {
//        // given
//        ExerciseResultRequest exerciseResultRequest = makeExerciseResultRequest();
//        ExerciseResultResponse exerciseResultResponse = makeExerciseResultResponse();
//        String body = (new ObjectMapper()).writeValueAsString(exerciseResultRequest);
//        given(exerciseService.calculatePercentageAvg(any())).willReturn(exerciseResultResponse);
//
//        // when
//        RequestBuilder requestBuilder = RestDocumentationRequestBuilders.post("/exercise/result")
//                .content(body)
//                .contentType(MediaType.APPLICATION_JSON);
//
//        ResultActions resultActions = mockMvc.perform(requestBuilder);
//
//        // then
//        resultActions.andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data").value(exerciseResultResponse))
//                .andDo(document("exercise-result",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()))
//                );
    }

    private ExerciseResultRequest makeExerciseResultRequest() {
        ExerciseResultRequest exerciseResultRequest = new ExerciseResultRequest();

        exerciseResultRequest.setTeamId(1L);
        List<ExerciseResultRequest.PersonalResult> personalResults = new ArrayList<>();

        ExerciseResultRequest.PersonalResult personalResult1 = new ExerciseResultRequest.PersonalResult();
        personalResult1.setMemberId(1L);

        List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails1 = new ArrayList<>();
        ExerciseResultRequest.PersonalResultDetail personalResultDetail1 = new ExerciseResultRequest.PersonalResultDetail();
        personalResultDetail1.setExerciseName("PUSHUP");
        personalResultDetail1.setPerformNum(5);
        personalResultDetail1.setTargetNum(10);
        personalResultDetails1.add(personalResultDetail1);
        personalResult1.setPersonalResultDetails(personalResultDetails1);

        ExerciseResultRequest.PersonalResult personalResult2 = new ExerciseResultRequest.PersonalResult();
        personalResult2.setMemberId(2L);

        List<ExerciseResultRequest.PersonalResultDetail> personalResultDetails2 = new ArrayList<>();
        ExerciseResultRequest.PersonalResultDetail personalResultDetail2 = new ExerciseResultRequest.PersonalResultDetail();
        personalResultDetail2.setExerciseName("PUSHUP");
        personalResultDetail2.setPerformNum(8);
        personalResultDetail2.setTargetNum(10);
        personalResultDetails2.add(personalResultDetail2);
        personalResult2.setPersonalResultDetails(personalResultDetails2);

        personalResults.add(personalResult1);
        personalResults.add(personalResult2);

        exerciseResultRequest.setPersonalResults(personalResults);

        return exerciseResultRequest;
    }

    private ExerciseResultResponse makeExerciseResultResponse() {
        ExerciseResultResponse exerciseResultResponse = new ExerciseResultResponse();

        List<ExerciseResultResponse.PersonalPercentage> personalPercentages = new ArrayList<>();
        ExerciseResultResponse.PersonalPercentage personalPercentage = new ExerciseResultResponse.PersonalPercentage();
        ExerciseResultResponse.PersonalPercentage personalPercentage2 = new ExerciseResultResponse.PersonalPercentage();

        personalPercentage.setNickname("닉네임1");
        personalPercentage.setPercentage(50);
        personalPercentage2.setNickname("닉네임2");
        personalPercentage2.setPercentage(80);

        personalPercentages.add(personalPercentage);
        personalPercentages.add(personalPercentage);

        exerciseResultResponse.setAvgPercentage(65);
        exerciseResultResponse.setPersonalPercentages(personalPercentages);

        return exerciseResultResponse;
    }
}
