package com.example.funtest;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.example.funtest.objects.Bug;
import com.example.funtest.objects.Test;
import com.example.funtest.objects.TestCase;
import com.example.funtest.objects.TestProcedure;
import com.example.funtest.objects.TestStep;
import com.example.funtest.utils.ListViewUtils;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;

public class PerformTestActivity extends AppCompatActivity {

    TextView textView_testname, textView_stepNumber, textView_stepName, textView_controlpoint;
    ListView listView_testData, listView_associatedBugs;
    FloatingActionButton fab_reportError;
    Button button_previous, button_next;

    static ArrayList<TestStep> currentTestSteps;
    int test_step_position = 0;
    static TestStep currentTestStep;

    private String testId;
    private String testName;

    private Handler uiThreadHandler = new Handler();
    private Thread nextThread,prevThread;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perform_test);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        initializeViews();
        get_testId();
        getTestSteps();

        //initialize data
        currentTestStep = currentTestSteps.get(test_step_position);
        ArrayList<String> testDataLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getTestData().size();i++){
            testDataLabels.add("Test Data "+ (i+1));
        }
        ArrayList<String> associatedBugsLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getStepErrors().size();i++){
            associatedBugsLabels.add(currentTestStep.getStepErrors().get(i).getCode());
        }
        //set layout data content

        textView_testname.setText(testName);
        textView_stepNumber.setText(""+(test_step_position+1));

        textView_stepName.setText(currentTestStep.getName());
        textView_controlpoint.setText(currentTestStep.getControlPoint());

        ArrayAdapter<String> testDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, testDataLabels);
        listView_testData.setAdapter(testDataAdapter );

        ArrayAdapter<String> associatedBugsAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, associatedBugsLabels);
        listView_associatedBugs.setAdapter(associatedBugsAdapter);

        ListViewUtils.setListViewHeightBasedOnChildren(listView_testData);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_associatedBugs);

        //set listeners for fab and listviews
        fab_reportError.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), BugReportActivity.class);
                intent.putExtra("id",testId);
                startActivity(intent);
            }
        });

        listView_testData.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent intent = new Intent(getApplicationContext(), DataDisplayActivity.class);
                intent.putExtra("data",currentTestStep.getTestData().get(i));
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onResume() {
        next_press_button_thread();
        prev_press_button_thread();
        super.onResume();
    }

    private void getTestSteps() {
        if(currentTestSteps != null){
            currentTestSteps.clear();
        }
        else{
            currentTestSteps = new ArrayList<TestStep>();
        }
        for(int i=0;i<3;i++){
            TestStep currentTestStep = new TestStep();
            currentTestStep.setName("Perfrorm certain action number " +(i+1));
            currentTestStep.setStepNumber(i+1);
            currentTestStep.setControlPoint("Check if screen shows result number "+(i+1));
            ArrayList<String> currentTestData = new ArrayList<>();
            ArrayList<Bug> currentstepErrors = new ArrayList<>();
            for(int j=0;j<4;j++){
                currentTestData.add("TestData " + (j+1));
                Bug currentBug = new Bug();
                currentBug.setCode("E-125" +j);
                currentstepErrors.add(currentBug);
            }
            currentTestStep.setTestData(currentTestData);
            currentTestStep.setStepErrors(currentstepErrors);

            currentTestSteps.add(currentTestStep);
        }

    }

    private void get_testId() {

        testId = getIntent().getStringExtra("id");
        testName = "Test X";

    }

    private void initializeViews() {
        textView_testname = findViewById(R.id.pt_textView_name);
        textView_testname.setSelected(true);
        textView_stepNumber = findViewById(R.id.pt_textView_step);
        textView_stepNumber.setSelected(true);
        textView_stepName = findViewById(R.id.td_textView_stepname);
        textView_controlpoint = findViewById(R.id.td_textView_controlpoint);

        listView_testData = findViewById(R.id.pt_listView_testdata);
        listView_associatedBugs = findViewById(R.id.pt_listView_errors);

        fab_reportError = findViewById(R.id.pt_fab_reportBug);

        button_previous = findViewById(R.id.button_previous);
        button_next = findViewById(R.id.button_next);



    }

    private void next_press_button_thread() {
        nextThread = new Thread(){
            @Override
            public void run() {
                super.run();
                button_next.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        nextButtonClicked();
                    }
                });

            }
        };
        nextThread.start();
    }

    private void nextButtonClicked() {
        test_step_position = ((test_step_position + 1 ) > (currentTestSteps.size() - 1) ? (currentTestSteps.size() - 1) : (test_step_position  + 1 ));
        currentTestStep = currentTestSteps.get(test_step_position);

        //initialize data
        currentTestStep = currentTestSteps.get(test_step_position);
        ArrayList<String> testDataLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getTestData().size();i++){
            testDataLabels.add("Test Data "+ (i+1));
        }
        ArrayList<String> associatedBugsLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getStepErrors().size();i++){
            associatedBugsLabels.add(currentTestStep.getStepErrors().get(i).getCode());
        }
        //set layout data content

        textView_testname.setText(testName);
        textView_stepNumber.setText(""+(test_step_position+1));

        textView_stepName.setText(currentTestStep.getName());
        textView_controlpoint.setText(currentTestStep.getControlPoint());

        ArrayAdapter<String> testDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, testDataLabels);
        listView_testData.setAdapter(testDataAdapter );

        ArrayAdapter<String> associatedBugsAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, associatedBugsLabels);
        listView_associatedBugs.setAdapter(associatedBugsAdapter);


        ListViewUtils.setListViewHeightBasedOnChildren(listView_testData);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_associatedBugs);

    }

    private void prev_press_button_thread() {
        prevThread = new Thread(){
            @Override
            public void run() {
                super.run();
                button_previous.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        prevButtonClicked();
                    }
                });

            }
        };
        prevThread.start();
    }

    private void prevButtonClicked() {
        test_step_position = ((test_step_position - 1 ) < 0 ? (0) : (test_step_position -1 ));
        currentTestStep = currentTestSteps.get(test_step_position);


        //initialize data
        currentTestStep = currentTestSteps.get(test_step_position);
        ArrayList<String> testDataLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getTestData().size();i++){
            testDataLabels.add("Test Data "+ (i+1));
        }
        ArrayList<String> associatedBugsLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getStepErrors().size();i++){
            associatedBugsLabels.add(currentTestStep.getStepErrors().get(i).getCode());
        }
        //set layout data content

        textView_testname.setText(testName);
        textView_stepNumber.setText(""+(test_step_position+1));

        textView_stepName.setText(currentTestStep.getName());
        textView_controlpoint.setText(currentTestStep.getControlPoint());

        ArrayAdapter<String> testDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, testDataLabels);
        listView_testData.setAdapter(testDataAdapter );

        ArrayAdapter<String> associatedBugsAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, associatedBugsLabels);
        listView_associatedBugs.setAdapter(associatedBugsAdapter);

        ListViewUtils.setListViewHeightBasedOnChildren(listView_testData);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_associatedBugs);
    }
}