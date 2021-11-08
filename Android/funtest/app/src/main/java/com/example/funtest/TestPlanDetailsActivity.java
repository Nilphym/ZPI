package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ExpandableListView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.funtest.objects.Test;
import com.example.funtest.objects.TestPlan;
import com.example.funtest.objects.TestSuite;

import java.util.ArrayList;

public class TestPlanDetailsActivity extends AppCompatActivity {

    TextView textView_name;
    ExpandableListView expandableListView_tests;
    TestSuiteAdapterExpandableListView testSuiteAdapterExpandableListView;

    public static ArrayList<TestPlan> currentTestPlanList = MainActivity.testPlanList;
    int testPlan_list_position = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_plan_details);

        initializeViews();
        get_position();
        getTestPlansData();

        //setting textviews in layout with current bug details
        textView_name.setText(currentTestPlanList.get(testPlan_list_position).getName());

        //setting expandable list adapter
        testSuiteAdapterExpandableListView = new TestSuiteAdapterExpandableListView(this,currentTestPlanList.get(testPlan_list_position).getTestSuites());
        expandableListView_tests.setAdapter(testSuiteAdapterExpandableListView);
        expandableListView_tests.setOnChildClickListener(new ExpandableListView.OnChildClickListener() {
            @Override
            public boolean onChildClick(ExpandableListView expandableListView, View view, int i, int i1, long l) {
                Intent intent = new Intent(getApplicationContext(), TestDetailsActivity.class);
                intent.putExtra("id",currentTestPlanList.get(testPlan_list_position).getTestSuites().get(i).getTests().get(i1).getId());
                startActivity(intent);

                return false;
            }
        });
    }

    private void getTestPlansData() {
        TestPlan currentTestPLan = currentTestPlanList.get(testPlan_list_position);
        ArrayList<TestSuite>currentTestSuiteList = new ArrayList<>();
        for(int i=0;i<8;i++){
            TestSuite currentTestSuite = new TestSuite();
            currentTestSuite.setCategory("Category " + (i+1));
            ArrayList<Test> currentTestList = new ArrayList<>();
            for(int j=0;j<5;j++){
                Test currentTest = new Test();
                currentTest.setName("Test "+(j+1));
                currentTestList.add(currentTest);
            }
            currentTestSuite.setTests(currentTestList);
            currentTestSuiteList.add(currentTestSuite);
        }
        currentTestPLan.setTestSuites(currentTestSuiteList);
    }

    private void get_position() {

        testPlan_list_position = getIntent().getIntExtra("position",-1);

    }

    private void initializeViews() {
        textView_name = findViewById(R.id.tpd_textView_name);
        textView_name.setSelected(true);

        expandableListView_tests = findViewById(R.id.tpd_expandableListView);




    }
}